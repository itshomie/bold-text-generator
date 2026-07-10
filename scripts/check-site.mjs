import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SITE_ORIGIN = 'https://boldtextgenerator.me';
const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules', 'dist', 'build']);
const errors = new Set();

function fail(message) {
  errors.add(message);
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(absolutePath));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function relativePath(absolutePath) {
  return toPosix(path.relative(ROOT, absolutePath));
}

function routeFromHtml(relativeHtmlPath) {
  if (relativeHtmlPath === 'index.html') return '/';
  return `/${relativeHtmlPath.replace(/\.html$/i, '')}`;
}

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

function parseAttributes(tag) {
  const attributes = new Map();
  const body = tag
    .replace(/^<\s*[\w:-]+/i, '')
    .replace(/\/?>\s*$/i, '');
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;

  while ((match = attributePattern.exec(body)) !== null) {
    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }

  return attributes;
}

function openingTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function innerContents(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi'))]
    .map((match) => match[1]);
}

function plainText(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeRoute(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function safeUrl(rawValue, baseRoute = '/') {
  try {
    const url = new URL(rawValue, `${SITE_ORIGIN}${baseRoute}`);
    return url.origin === SITE_ORIGIN ? url : null;
  } catch {
    return null;
  }
}

function physicalRelativePath(pathname) {
  try {
    return decodeURIComponent(pathname).replace(/^\/+/, '');
  } catch {
    return pathname.replace(/^\/+/, '');
  }
}

function isAssetPath(pathname) {
  return pathname.startsWith('/assets/')
    || pathname.startsWith('/css/')
    || pathname.startsWith('/js/')
    || pathname === '/site.webmanifest'
    || pathname === '/sw.js'
    || /\.(?:avif|css|gif|ico|jpe?g|js|json|png|svg|webmanifest|webp|woff2?|ttf|otf|xml)$/i.test(pathname);
}

function collectIds(html) {
  const ids = new Set();
  for (const tag of html.match(/<[^>]+>/g) ?? []) {
    const id = parseAttributes(tag).get('id');
    if (id) ids.add(id);
  }
  return ids;
}

function collectJsonLd(html, file) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];

  for (const [, rawAttributes, body] of scripts) {
    const attributes = parseAttributes(`<script ${rawAttributes}>`);
    if ((attributes.get('type') ?? '').toLowerCase() !== 'application/ld+json') continue;

    if (!body.trim()) {
      fail(`${file}: JSON-LD block is empty`);
      continue;
    }

    try {
      JSON.parse(body.trim());
    } catch (error) {
      fail(`${file}: JSON-LD is invalid (${error.message})`);
    }
  }
}

function collectGaIds(html) {
  const loaderIds = [];
  for (const script of openingTags(html, 'script')) {
    const src = parseAttributes(script).get('src');
    if (!src) continue;

    try {
      const url = new URL(src, SITE_ORIGIN);
      if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') {
        const id = url.searchParams.get('id');
        if (id?.startsWith('G-')) loaderIds.push(id);
      }
    } catch {
      // A malformed script URL is covered by normal browser/HTML validation.
    }
  }

  const configIds = [...html.matchAll(/gtag\s*\(\s*['"]config['"]\s*,\s*['"](G-[A-Z0-9]+)['"]/gi)]
    .map((match) => match[1].toUpperCase());

  return { loaderIds, configIds };
}

function parseRedirects(source) {
  const redirects = new Map();

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const [from, to, status] = line.split(/\s+/);
    if (!from || !to || !['301', '308'].includes(status)) continue;
    redirects.set(normalizeRoute(from), normalizeRoute(to));
  }

  return redirects;
}

const allAbsoluteFiles = await walk(ROOT);
const allRelativeFiles = allAbsoluteFiles.map(relativePath);
const fileSet = new Set(allRelativeFiles);
const htmlFiles = allRelativeFiles.filter((file) => file.endsWith('.html')).sort();

if (htmlFiles.length === 0) {
  fail('No HTML files were found');
}

const redirectsSource = await fs.readFile(path.join(ROOT, '_redirects'), 'utf8').catch(() => '');
const redirects = parseRedirects(redirectsSource);
const htmlPages = [];

for (const file of htmlFiles) {
  const rawHtml = await fs.readFile(path.join(ROOT, file), 'utf8');
  const html = stripComments(rawHtml);
  const route = routeFromHtml(file);
  const titles = innerContents(html, 'title').map(plainText).filter(Boolean);
  const h1s = innerContents(html, 'h1').map(plainText).filter(Boolean);
  const metaTags = openingTags(html, 'meta').map(parseAttributes);
  const linkTags = openingTags(html, 'link').map(parseAttributes);
  const descriptions = metaTags
    .filter((attributes) => (attributes.get('name') ?? '').toLowerCase() === 'description')
    .map((attributes) => (attributes.get('content') ?? '').trim())
    .filter(Boolean);
  const canonicals = linkTags
    .filter((attributes) => (attributes.get('rel') ?? '').toLowerCase().split(/\s+/).includes('canonical'))
    .map((attributes) => (attributes.get('href') ?? '').trim())
    .filter(Boolean);
  const noindex = metaTags.some((attributes) => {
    const name = (attributes.get('name') ?? '').toLowerCase();
    return ['robots', 'googlebot'].includes(name)
      && /(?:^|[,\s])noindex(?:$|[,\s])/i.test(attributes.get('content') ?? '');
  });
  const hasMetaKeywords = metaTags.some((attributes) => {
    return (attributes.get('name') ?? '').toLowerCase() === 'keywords';
  });

  if (titles.length !== 1) fail(`${file}: expected exactly one non-empty <title>, found ${titles.length}`);
  if (descriptions.length !== 1) fail(`${file}: expected exactly one meta description, found ${descriptions.length}`);
  if (h1s.length !== 1) fail(`${file}: expected exactly one non-empty <h1>, found ${h1s.length}`);
  if (hasMetaKeywords) fail(`${file}: meta keywords are not used by this site`);
  if (/[—–]/.test(html)) fail(`${file}: visible long-dash characters are not allowed by the design system`);
  if (html.includes('GA_MEASUREMENT_ID')) fail(`${file}: placeholder analytics ID is still present`);
  if (file === '404.html') {
    if (canonicals.length !== 0) fail(`${file}: a not-found page must not declare a canonical URL`);
  } else if (canonicals.length !== 1) {
    fail(`${file}: expected exactly one canonical link, found ${canonicals.length}`);
  }

  collectJsonLd(html, file);

  htmlPages.push({
    file,
    html,
    route,
    title: titles[0],
    h1: h1s[0],
    canonical: canonicals[0],
    noindex,
    ids: collectIds(html),
    ...collectGaIds(html),
  });
}

const routes = new Set(htmlPages.map((page) => page.route));
const pageByRoute = new Map(htmlPages.map((page) => [page.route, page]));
const h1Owners = new Map();
const titleOwners = new Map();

for (const page of htmlPages) {
  if (page.h1) {
    const key = page.h1.toLowerCase();
    if (h1Owners.has(key)) fail(`${page.file}: H1 duplicates ${h1Owners.get(key)} (${page.h1})`);
    else h1Owners.set(key, page.file);
  }

  if (page.title) {
    const key = page.title.toLowerCase();
    if (titleOwners.has(key)) fail(`${page.file}: title duplicates ${titleOwners.get(key)} (${page.title})`);
    else titleOwners.set(key, page.file);
  }

  if (!page.canonical) continue;

  let canonicalUrl;
  try {
    canonicalUrl = new URL(page.canonical);
  } catch {
    fail(`${page.file}: canonical is not an absolute URL (${page.canonical})`);
    continue;
  }

  if (canonicalUrl.origin !== SITE_ORIGIN) {
    fail(`${page.file}: canonical must use ${SITE_ORIGIN}`);
  }
  if (canonicalUrl.pathname.endsWith('.html')) {
    fail(`${page.file}: canonical must not use .html (${page.canonical})`);
  }
  if (canonicalUrl.search || canonicalUrl.hash) {
    fail(`${page.file}: canonical must not include a query or fragment (${page.canonical})`);
  }
  if (canonicalUrl.pathname !== '/' && canonicalUrl.pathname.endsWith('/')) {
    fail(`${page.file}: canonical must use the final non-trailing-slash URL (${page.canonical})`);
  }

  const canonicalRoute = normalizeRoute(canonicalUrl.pathname);
  const redirectTarget = redirects.get(page.route);
  if (redirectTarget && canonicalRoute !== redirectTarget) {
    fail(`${page.file}: redirect source must canonicalize to ${redirectTarget}`);
  } else if (!redirectTarget && !page.noindex && canonicalRoute !== page.route) {
    fail(`${page.file}: indexable page must self-canonicalize to ${page.route}`);
  }
}

function existingInternalPath(pathname) {
  const normalized = normalizeRoute(pathname);
  if (routes.has(normalized) || redirects.has(normalized)) return true;
  return fileSet.has(physicalRelativePath(pathname));
}

function pageForInternalPath(pathname) {
  const normalized = normalizeRoute(pathname);
  if (pageByRoute.has(normalized)) return pageByRoute.get(normalized);

  const redirected = redirects.get(normalized);
  if (redirected && pageByRoute.has(redirected)) return pageByRoute.get(redirected);

  if (/\.html$/i.test(pathname)) {
    return htmlPages.find((page) => page.file === physicalRelativePath(pathname));
  }

  return null;
}

for (const page of htmlPages) {
  for (const anchor of openingTags(page.html, 'a')) {
    const href = (parseAttributes(anchor).get('href') ?? '').trim();
    if (!href) continue;

    if (href === '#') {
      fail(`${page.file}: href="#" is not allowed`);
      continue;
    }

    const url = safeUrl(href, page.route);
    if (!url) continue;

    if (url.pathname.endsWith('.html')) {
      fail(`${page.file}: internal href must not use .html (${href})`);
    }
    if (!existingInternalPath(url.pathname)) {
      fail(`${page.file}: internal href does not exist (${href})`);
      continue;
    }
    if (redirects.has(normalizeRoute(url.pathname))) {
      fail(`${page.file}: internal href must point directly to the redirect target (${href})`);
    }

    if (url.hash) {
      const targetPage = pageForInternalPath(url.pathname);
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (targetPage && fragment && !targetPage.ids.has(fragment)) {
        fail(`${page.file}: fragment target does not exist (${href})`);
      }
    }
  }
}

for (const page of htmlPages) {
  const attributePattern = /\b(?:content|href|src)\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;
  let match;

  while ((match = attributePattern.exec(page.html)) !== null) {
    const rawValue = (match[1] ?? match[2]).trim();
    const url = safeUrl(rawValue, page.route);
    if (!url || !isAssetPath(url.pathname)) continue;

    const assetFile = physicalRelativePath(url.pathname);
    if (!fileSet.has(assetFile)) {
      fail(`${page.file}: referenced local asset is missing (${url.pathname})`);
    }
  }
}

for (const cssFile of allRelativeFiles.filter((file) => file.endsWith('.css'))) {
  const css = await fs.readFile(path.join(ROOT, cssFile), 'utf8');
  const baseUrl = `${SITE_ORIGIN}/${cssFile}`;

  for (const match of css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
    const rawValue = match[2].trim();
    if (!rawValue || rawValue.startsWith('data:') || rawValue.startsWith('#')) continue;

    const url = safeUrl(rawValue, new URL(baseUrl).pathname);
    if (!url || !isAssetPath(url.pathname)) continue;
    if (!fileSet.has(physicalRelativePath(url.pathname))) {
      fail(`${cssFile}: referenced local asset is missing (${url.pathname})`);
    }
  }
}

for (const jsFile of allRelativeFiles.filter((file) => file.endsWith('.js'))) {
  const source = await fs.readFile(path.join(ROOT, jsFile), 'utf8');
  for (const match of source.matchAll(/serviceWorker\.register\(\s*['"]([^'"]+)['"]/g)) {
    const url = safeUrl(match[1], '/');
    if (url && !fileSet.has(physicalRelativePath(url.pathname))) {
      fail(`${jsFile}: registered service worker is missing (${url.pathname})`);
    }
  }
}

const manifestPath = path.join(ROOT, 'site.webmanifest');
try {
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const manifestAssets = [
    ...(manifest.icons ?? []).map((item) => item.src),
    ...(manifest.screenshots ?? []).map((item) => item.src),
  ].filter(Boolean);

  for (const rawValue of manifestAssets) {
    const url = safeUrl(rawValue, '/');
    if (url && !fileSet.has(physicalRelativePath(url.pathname))) {
      fail(`site.webmanifest: referenced local asset is missing (${url.pathname})`);
    }
  }
} catch (error) {
  fail(`site.webmanifest: invalid JSON (${error.message})`);
}

const homepage = pageByRoute.get('/');
const measurementId = homepage?.configIds[0] ?? homepage?.loaderIds[0];

if (!measurementId) {
  fail('index.html: could not determine the GA4 measurement ID');
} else {
  for (const page of htmlPages) {
    if (page.loaderIds.length !== 1 || page.loaderIds[0] !== measurementId) {
      fail(`${page.file}: expected one GA loader for ${measurementId}, found ${page.loaderIds.join(', ') || 'none'}`);
    }
    if (page.configIds.length !== 1 || page.configIds[0] !== measurementId) {
      fail(`${page.file}: expected one GA config for ${measurementId}, found ${page.configIds.join(', ') || 'none'}`);
    }
  }
}

const sitemapSource = await fs.readFile(path.join(ROOT, 'sitemap.xml'), 'utf8').catch(() => '');
if (!sitemapSource) {
  fail('sitemap.xml is missing or empty');
} else {
  if (/<(?:priority|changefreq)>/i.test(sitemapSource)) {
    fail('sitemap.xml: priority and changefreq are not allowed');
  }

  const sitemapUrls = new Set();
  const urlBlocks = [...sitemapSource.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)];

  for (const [, block] of urlBlocks) {
    const locations = [...block.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => match[1].trim());
    const lastmods = [...block.matchAll(/<lastmod>([\s\S]*?)<\/lastmod>/gi)].map((match) => match[1].trim());

    if (locations.length !== 1) {
      fail(`sitemap.xml: each <url> needs exactly one <loc>`);
      continue;
    }
    if (lastmods.length !== 1 || !/^\d{4}-\d{2}-\d{2}$/.test(lastmods[0])) {
      fail(`sitemap.xml: ${locations[0]} needs one YYYY-MM-DD lastmod`);
    }

    let url;
    try {
      url = new URL(locations[0]);
    } catch {
      fail(`sitemap.xml: invalid URL (${locations[0]})`);
      continue;
    }

    if (url.origin !== SITE_ORIGIN) fail(`sitemap.xml: URL must use ${SITE_ORIGIN} (${url.href})`);
    if (url.pathname.endsWith('.html')) fail(`sitemap.xml: redirected .html URL is not allowed (${url.href})`);
    if (url.pathname !== '/' && url.pathname.endsWith('/')) fail(`sitemap.xml: trailing-slash redirect URL is not allowed (${url.href})`);
    if (url.search || url.hash) fail(`sitemap.xml: query strings and fragments are not allowed (${url.href})`);
    if (redirects.has(normalizeRoute(url.pathname))) fail(`sitemap.xml: redirect source is not allowed (${url.href})`);
    if (!routes.has(normalizeRoute(url.pathname))) fail(`sitemap.xml: URL has no local HTML page (${url.href})`);
    if (sitemapUrls.has(url.href)) fail(`sitemap.xml: duplicate URL (${url.href})`);
    sitemapUrls.add(url.href);
  }

  const expectedIndexableCanonicals = new Set();
  const canonicalOwner = new Map();

  for (const page of htmlPages) {
    if (page.noindex || redirects.has(page.route) || !page.canonical) continue;

    try {
      const canonical = new URL(page.canonical).href;
      if (canonicalOwner.has(canonical)) {
        fail(`${page.file}: canonical duplicates ${canonicalOwner.get(canonical)} (${canonical})`);
      } else {
        canonicalOwner.set(canonical, page.file);
      }
      expectedIndexableCanonicals.add(canonical);
    } catch {
      // Invalid canonical URLs were already reported above.
    }
  }

  for (const canonical of expectedIndexableCanonicals) {
    if (!sitemapUrls.has(canonical)) fail(`sitemap.xml: missing indexable canonical (${canonical})`);
  }
  for (const sitemapUrl of sitemapUrls) {
    if (!expectedIndexableCanonicals.has(sitemapUrl)) fail(`sitemap.xml: contains a non-indexable or non-canonical URL (${sitemapUrl})`);
  }
}

if (errors.size > 0) {
  console.error(`Site check failed with ${errors.size} issue(s):`);
  for (const error of [...errors].sort()) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Site check passed: ${htmlPages.length} HTML files, GA4 ${measurementId}, sitemap and local assets verified.`);
}
