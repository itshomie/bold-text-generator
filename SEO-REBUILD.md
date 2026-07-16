# SEO rebuild notes

Updated: 2026-07-16

## Goal

Improve crawl quality and page usefulness without changing the domain or the indexed homepage URL.

## Canonical URL plan

### Keep and index

- `https://boldtextgenerator.me/`
- `https://boldtextgenerator.me/blog`
- `https://boldtextgenerator.me/blog/instagram-bold-text-guide`
- `https://boldtextgenerator.me/blog/social-media-bold-marketing`
- `https://boldtextgenerator.me/blog/unicode-text-guide`
- `https://boldtextgenerator.me/blog/remove-unicode-formatting`
- `https://boldtextgenerator.me/blog/unicode-text-accessibility`
- `https://boldtextgenerator.me/blog/unicode-compatibility-checklist`
- `https://boldtextgenerator.me/blog/unicode-character-counts`
- `https://boldtextgenerator.me/services`

These are the only indexable URLs in `sitemap.xml`.

### Keep accessible but do not index

- `https://boldtextgenerator.me/privacy`

The privacy page matches the actual GA4, Cloudflare, localStorage, Clipboard API, and planned AdSense behavior. It uses `noindex,follow` because it is a legal page, not a search landing page. The services page is indexable because it now includes substantive ownership, editorial, correction, and funding information in addition to the tool features and limits.

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
- Added four original guides covering plain text restoration, accessibility, compatibility testing, and Unicode character counting.
- Added the advertising, cookie, identifier, consent, and opt-out disclosures required before enabling AdSense.
- Added automated minimum-depth, article metadata, guide-index, privacy disclosure, and About-page checks.

## AdSense preparation

The source is ready for an AdSense publisher ID and account-specific verification code. Do not add a placeholder publisher ID.

After the owner adds the site in AdSense:

1. Add the exact verification code or meta tag supplied by AdSense.
2. Add the exact publisher line to `/ads.txt`.
3. Configure a Google-certified European regulations consent message in AdSense Privacy and messaging.
4. Deploy and verify the code, consent message, and `/ads.txt` on the live domain.
5. Run the full AdSense readiness audit again before requesting review.

## Post-deploy checks

Run these checks against the live domain before using Search Console:

1. Confirm `/` and all sitemap URLs return 200.
2. Confirm a random missing URL returns 404 and shows the custom not-found page.
3. Confirm `/assets/og-image.png` returns `image/png`, not homepage HTML.
4. Confirm each `.html` form redirects to the matching extensionless URL.
5. Confirm the merged Unicode article redirects in one hop to `/blog/unicode-text-guide`.
6. Run `npm run check` locally one more time against the deployed source.

## Google Search Console steps

1. Submit `https://boldtextgenerator.me/sitemap.xml` again.
2. Inspect the homepage and the new guide URLs with URL Inspection.
3. Test each live URL, then request indexing for the canonical pages only.
4. Do not request indexing for redirect URLs, `/privacy`, or the 404 page.
5. If Search Console has a soft 404 issue group, start validation only after the live random-URL test returns a real 404.
6. Review Page indexing and Performance after Google recrawls the site. Use real impressions and queries to decide the next content update.

## Important expectation

This rebuild removes technical conflicts and improves content quality, but it cannot guarantee a ranking position. The supplied keyword research still indicates meaningful competition and a separate need for relevant links and brand mentions.
