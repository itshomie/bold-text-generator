# Logo and Favicon Assets

## Current Logo Design
The Bold Text Generator logo uses:
- **Colors**: Linear gradient from #0066FF to #00D4FF
- **Shape**: Rounded rectangle background
- **Content**: Bold white "B" letter centered
- **Design**: Matches the header logo in the website

## Files
- `logo.svg` - Main logo file (512x512)
- `favicon.svg` - Browser favicon (32x32)
- `favicon-generator.html` - Tool to generate PNG versions

## Generate PNG Favicons
1. Open `favicon-generator.html` in your browser
2. Click "Download" for each size needed:
   - `favicon-16x16.png` - Browser tabs
   - `favicon-32x32.png` - Browser bookmarks
   - `favicon-48x48.png` - Windows taskbar
   - `apple-touch-icon.png` (180x180) - iOS devices
   - `android-chrome-192x192.png` - Android devices
   - `android-chrome-512x512.png` - PWA splash screen
   - `og-image.png` (1200x630) - Social media preview

3. Save all files to this `/assets/` directory

## Convert to ICO
Use an online tool like [favicon.io](https://favicon.io/favicon-converter/) to convert the 16x16 and 32x32 PNGs into a single `favicon.ico` file.

## Current Status
✅ SVG favicons are working and displayed
⏳ PNG versions need to be generated using the tool
⏳ ICO file needs to be created from PNGs