# Google Search Console Setup Guide

## Overview

Google Search Console helps you:
- Monitor how Google indexes your site
- Submit sitemaps for faster crawling
- See search performance (clicks, impressions, rankings)
- Identify and fix indexing issues
- Request re-indexing of updated pages

---

## Setup Steps

### 1. Create Property

**Go to:** https://search.google.com/search-console

**Choose one:**

**Option A: Domain Property (Recommended)**
- Property: `sketchandscript.pl`
- Covers: www, http, https, all subdomains
- Verification: DNS TXT record

**Option B: URL Prefix Property**
- Property: `https://www.sketchandscript.pl`
- Covers: Only exact URL
- Verification: HTML tag, file, or DNS

---

### 2. Verify Ownership

#### Method 1: HTML Meta Tag (Easiest)

Google will provide a tag like:
```html
<meta name="google-site-verification" content="ABC123XYZ..." />
```

**Add to:** `<head>` section of index.html, architecture.html, coding.html

**Already prepared for:** Just need your verification code!

#### Method 2: HTML File Upload

1. Download verification file from Google (e.g., `google1234567890abcdef.html`)
2. Upload to website root
3. Accessible at: `https://www.sketchandscript.pl/google1234567890abcdef.html`
4. Click "Verify" in Search Console

#### Method 3: DNS TXT Record

At your DNS provider (cyber_folks):

```
Type: TXT
Host: @ (or sketchandscript.pl)
Value: google-site-verification=ABC123XYZ...
TTL: 3600
```

---

### 3. Submit Sitemap

Once verified:

1. Go to: **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click: **Submit**

**Your sitemap URL:** `https://www.sketchandscript.pl/sitemap.xml`

**Sitemap includes:**
- Homepage (/)
- Architecture page (/architecture.html)
- Coding page (/coding.html)
- 11 project pages (/projects/*.html)

---

### 4. Request Indexing

For faster indexing of important pages:

1. Go to: **URL Inspection** (top search bar)
2. Enter URL: `https://www.sketchandscript.pl`
3. Click: **Request Indexing**

**Repeat for:**
- `https://www.sketchandscript.pl/architecture.html`
- `https://www.sketchandscript.pl/coding.html`

---

## Post-Setup Actions

### Week 1: Initial Setup
- [x] Verify ownership
- [ ] Submit sitemap
- [ ] Request indexing for main pages
- [ ] Check "Coverage" report

### Week 2-4: Monitor
- [ ] Check "Coverage" for errors
- [ ] Review "Performance" (when data arrives)
- [ ] Fix any crawl errors
- [ ] Verify mobile usability

### Monthly: Maintenance
- [ ] Check search performance
- [ ] Review indexed pages
- [ ] Update sitemap if content changes
- [ ] Monitor Core Web Vitals

---

## Understanding Reports

### Coverage Report
Shows which pages Google has indexed:
- **Valid:** Successfully indexed ✅
- **Excluded:** Not indexed (check why)
- **Error:** Problems preventing indexing
- **Valid with warnings:** Indexed but has issues

### Performance Report
After ~2 weeks of indexing:
- **Total clicks:** People who clicked your link
- **Total impressions:** Times shown in search
- **Average CTR:** Click-through rate
- **Average position:** Where you rank

### URL Inspection
Check individual page status:
- Indexing status
- Mobile usability
- Structured data
- Request re-indexing

---

## Common Issues & Solutions

### "Page not indexed"
**Cause:** Google hasn't discovered it yet
**Solution:** Submit URL for indexing, check sitemap

### "Crawled but not indexed"
**Cause:** Low quality or duplicate content
**Solution:** Improve content, check meta descriptions

### "Sitemap not found"
**Cause:** Wrong URL or file location
**Solution:** Verify `sitemap.xml` is in root directory

### "DNS resolution error"
**Cause:** DNS not fully propagated
**Solution:** Wait 24-48 hours, try again

---

## Timeline Expectations

| Action | Time |
|--------|------|
| **Verification** | Immediate |
| **Sitemap submission** | Immediate |
| **First crawl** | 1-3 days |
| **First indexing** | 3-7 days |
| **Performance data** | 2-4 weeks |
| **Full indexing** | 2-8 weeks |

---

## Optimization Tips

### 1. Fix Coverage Issues
- Check for crawl errors
- Ensure all important pages in sitemap
- Fix broken links

### 2. Improve Performance
- Optimize page titles (50-60 chars)
- Write compelling meta descriptions (150-160 chars)
- Use proper heading hierarchy (H1, H2, H3)

### 3. Mobile Usability
- Check mobile-friendly test
- Fix any mobile issues
- Ensure tap targets are 44x44px minimum

### 4. Page Experience
- Monitor Core Web Vitals
- Improve loading speed
- Ensure HTTPS is working

---

## Your Current Setup

**Domain:** sketchandscript.pl
**Primary URL:** https://www.sketchandscript.pl
**Sitemap:** https://www.sketchandscript.pl/sitemap.xml
**Robots.txt:** https://www.sketchandscript.pl/robots.txt

**Pages to index:**
- Homepage (/)
- Architecture portfolio (/architecture.html)
- QA & Coding portfolio (/coding.html)
- 11 project detail pages

**Meta descriptions:** ✅ Optimized (150-160 chars)
**Meta keywords:** ✅ Added
**Sitemap:** ✅ Ready
**Robots.txt:** ✅ Configured
**HTTPS:** ⏳ Enable after DNS propagation

---

## Quick Start Checklist

- [ ] 1. Go to https://search.google.com/search-console
- [ ] 2. Add property: `sketchandscript.pl` (Domain) or `https://www.sketchandscript.pl` (URL prefix)
- [ ] 3. Choose verification method (HTML tag recommended)
- [ ] 4. Get verification code from Google
- [ ] 5. Add verification code (meta tag to HTML or TXT to DNS)
- [ ] 6. Click "Verify" in Search Console
- [ ] 7. Submit sitemap: `sitemap.xml`
- [ ] 8. Request indexing for main pages
- [ ] 9. Wait 24-48 hours for first crawl
- [ ] 10. Monitor Coverage and Performance reports

---

## Need Help?

**Google Search Console Help:** https://support.google.com/webmasters
**Your sitemap:** https://www.sketchandscript.pl/sitemap.xml
**Contact:** michalwicherek@gmail.com

---

## Next Steps

1. **Complete verification** using one of the methods above
2. **Get your verification code** from Google Search Console
3. **Send me the code** and I'll add it to your site
4. **Submit sitemap** once verified
5. **Request indexing** for main pages

---

**Ready to verify? Get your Google verification code and send it here!** 🔍

