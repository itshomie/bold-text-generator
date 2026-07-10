# SEO rebuild notes

Updated: 2026-07-10

## Goal

Improve crawl quality and page usefulness without changing the domain or the indexed homepage URL.

## Canonical URL plan

### Keep and index

- `https://boldtextgenerator.me/`
- `https://boldtextgenerator.me/blog`
- `https://boldtextgenerator.me/blog/instagram-bold-text-guide`
- `https://boldtextgenerator.me/blog/social-media-bold-marketing`
- `https://boldtextgenerator.me/blog/unicode-text-guide`

These are the only URLs in `sitemap.xml`.

### Keep accessible but do not index

- `https://boldtextgenerator.me/services`
- `https://boldtextgenerator.me/privacy`

The services page is now an honest tool features and limits page. The privacy page now matches the actual GA4, Cloudflare, localStorage, and Clipboard API behavior. Both use `noindex,follow` because they are not search landing pages.

### Redirect

- `/blog/unicode-text-styles-explained` to `/blog/unicode-text-guide`
- `/blog/social-media-bold` to `/blog/social-media-bold-marketing`
- `/blog/instagram-typography` to `/blog/instagram-bold-text-guide`
- `/blog/unicode-history` to `/blog/unicode-text-guide`

Both extensionless and `.html` legacy forms are covered in `_redirects` where needed. Internal links, canonical elements, and the sitemap point directly to final extensionless URLs.

### Return 404

All other missing URLs should return the custom `404.html` with an actual HTTP 404 status. This prevents the previous behavior where missing pages and assets returned the homepage with a 200 status.

## What changed

- Removed unsupported ratings, social profiles, APIs, SDKs, premium plans, anonymous case studies, and unsourced performance percentages.
- Replaced overlapping Unicode articles with one stronger guide and a permanent redirect.
- Rewrote Instagram and social media guides around distinct user tasks.
- Rebuilt the homepage around the working generator, practical limits, accessibility, and internal links.
- Fixed the result generation race that could mix old and new output cards.
- Removed unsafe user text rendering through `innerHTML`.
- Added a real OG image and removed references to missing icons and service workers.
- Added a zero-dependency site checker available through `npm run check`.

## Post-deploy checks

Run these checks against the live domain before using Search Console:

1. Confirm `/` and all five sitemap URLs return 200.
2. Confirm a random missing URL returns 404 and shows the custom not-found page.
3. Confirm `/assets/og-image.png` returns `image/png`, not homepage HTML.
4. Confirm each `.html` form redirects to the matching extensionless URL.
5. Confirm the merged Unicode article redirects in one hop to `/blog/unicode-text-guide`.
6. Run `npm run check` locally one more time against the deployed source.

## Google Search Console steps

1. Submit `https://boldtextgenerator.me/sitemap.xml` again.
2. Inspect the homepage and the three guide URLs with URL Inspection.
3. Test each live URL, then request indexing for the canonical pages only.
4. Do not request indexing for redirect URLs, `/services`, `/privacy`, or the 404 page.
5. If Search Console has a soft 404 issue group, start validation only after the live random-URL test returns a real 404.
6. Review Page indexing and Performance after Google recrawls the site. Use real impressions and queries to decide the next content update.

## Important expectation

This rebuild removes technical conflicts and improves content quality, but it cannot guarantee a ranking position. The supplied keyword research still indicates meaningful competition and a separate need for relevant links and brand mentions.
