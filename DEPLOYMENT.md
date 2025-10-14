# Deploy to www.sketchandscript.pl

Quick guide to deploy your portfolio to GitHub Pages with custom domain.

## Prerequisites

- GitHub repo: https://github.com/fredziarz/sketch_and_script
- Domain: sketchandscript.pl (purchased)
- Access to domain DNS settings

## Quick Deploy (20 minutes + DNS wait)

### 1. Prepare Project

**Option A: Automated**
```bash
cd ~/Documents/sketchAndScript
./prepare-deployment.sh
```

**Option B: Manual**
```bash
cd ~/Documents/sketchAndScript
mv starter-template/* .
mv starter-template/.* . 2>/dev/null || true
rmdir starter-template
```

> **Why?** GitHub Pages requires website files at repository root, not in subdirectory.

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial deployment"
git remote add origin https://github.com/fredziarz/sketch_and_script.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to: https://github.com/fredziarz/sketch_and_script/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)
5. **Save**

Wait 2-3 minutes, then visit: `https://fredziarz.github.io/sketch_and_script`

### 4. Configure DNS

Log in to your domain registrar and add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | fredziarz.github.io | 3600 |

**Common registrars:**
- **home.pl:** My Services → Domains → DNS Management
- **OVH:** Web Cloud → Domains → DNS Zone
- **Cloudflare:** DNS Management
- **nazwa.pl:** Domains → DNS

### 5. Add Custom Domain

1. Back to: https://github.com/fredziarz/sketch_and_script/settings/pages
2. **Custom domain:** `www.sketchandscript.pl`
3. **Save**
4. Wait for DNS check to pass (green checkmark) - takes 1-24 hours
5. **Enforce HTTPS:** ✓ (enable only after DNS check passes)

### 6. Verify

Check DNS propagation: https://www.whatsmydns.net

Once DNS propagates:
- Visit: https://www.sketchandscript.pl
- Check HTTPS works (padlock icon)
- Test all pages load correctly

## Updating Your Site

After initial deployment:

```bash
cd ~/Documents/sketchAndScript
# Make your changes
git add .
git commit -m "Update content"
git push
# Wait 2-3 minutes - done!
```

## Test Locally

Before deploying changes:
```bash
cd ~/Documents/sketchAndScript
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Troubleshooting

**"DNS check unsuccessful"**
- Wait longer (can take up to 24 hours)
- Verify DNS records at registrar
- Check progress: https://www.whatsmydns.net

**"Site shows 404"**
- Verify files are at root: `ls index.html`
- Check GitHub Pages is enabled
- Wait 2-3 minutes after pushing

**"Images not loading"**
- Ensure images are committed: `git add images/ && git commit -m "Add images" && git push`

**"HTTPS not working"**
- Wait for DNS to fully propagate first
- Then enable "Enforce HTTPS" in GitHub settings

**"Changes not showing"**
- Wait 2-3 minutes
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

## Project Structure

```
sketch_and_script/          (GitHub repo)
├── index.html             (at root - required!)
├── architecture.html
├── coding.html
├── CNAME                  (contains: www.sketchandscript.pl)
├── robots.txt
├── sitemap.xml
├── css/
├── js/
├── images/
├── projects/
└── docs/
```

## Important Notes

- **Repository must be public** (free GitHub Pages requirement)
- **Files must be at root** (not in subdirectory)
- **CNAME file is critical** (already created with your domain)
- **DNS takes time** (1-24 hours, usually 1-4 hours)
- **Enable HTTPS last** (only after DNS works)

## Quick Reference

| URL | Purpose |
|-----|---------|
| https://www.sketchandscript.pl | Your live site (after DNS) |
| https://fredziarz.github.io/sketch_and_script | Temporary GitHub URL |
| https://github.com/fredziarz/sketch_and_script/settings/pages | GitHub Pages settings |
| https://www.whatsmydns.net | Check DNS propagation |

**Timeline:** ~20 min active work + 1-24 hrs DNS wait (passive)

---

**Need help?** Check GitHub Pages docs: https://docs.github.com/en/pages

