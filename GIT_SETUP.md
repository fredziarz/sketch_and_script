# Git Setup & Push Guide

Your project is ready to push to GitHub!

## Current Status ✅

- ✅ Git initialized
- ✅ Files at root level (correct for GitHub Pages)
- ✅ Remote configured: https://github.com/fredziarz/sketch_and_script.git
- ✅ CNAME file present with: www.sketchandscript.pl
- ✅ All files committed

## Project Structure (Correct!)

```
sketch_and_script/
├── index.html              ← Root level (required!)
├── architecture.html
├── coding.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── css/
├── js/
├── images/
├── projects/
├── docs/
├── templates/
├── README.md
├── DEPLOYMENT.md
├── .gitignore
└── prepare-deployment.sh
```

## Push to GitHub

### Fix 403 Error (Authentication Required)

GitHub no longer accepts passwords. Choose one option:

#### Option 1: SSH (Recommended)

```bash
# 1. Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "michalwicherek@gmail.com"
# Press Enter to accept defaults

# 2. Copy your public key
cat ~/.ssh/id_ed25519.pub
# Copy the entire output

# 3. Add to GitHub
# Go to: https://github.com/settings/ssh/new
# Paste your key, give it a title, click "Add SSH key"

# 4. Change remote to SSH
git remote set-url origin git@github.com:fredziarz/sketch_and_script.git

# 5. Push
git push -u origin main
```

#### Option 2: Personal Access Token

```bash
# 1. Create token
# Go to: https://github.com/settings/tokens
# Click "Generate new token (classic)"
# Select: repo (all checkboxes)
# Click "Generate token"
# COPY THE TOKEN NOW (you won't see it again!)

# 2. Push using token
git push -u origin main
# Username: fredziarz
# Password: [paste your token here]

# 3. Save credentials (optional)
git config --global credential.helper store
# Next push will be saved
```

#### Option 3: GitHub CLI (Easiest)

```bash
# Install GitHub CLI
sudo apt install gh

# Authenticate
gh auth login
# Follow the prompts

# Push
git push -u origin main
```

## Verify Push

After successful push:

```bash
# Check remote status
git remote -v

# View commits
git log --oneline

# Check GitHub
# Visit: https://github.com/fredziarz/sketch_and_script
```

## Next: Enable GitHub Pages

Once pushed successfully:

1. Go to: https://github.com/fredziarz/sketch_and_script/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)
5. **Save**
6. Wait 2-3 minutes
7. Visit: https://fredziarz.github.io/sketch_and_script

Then follow `DEPLOYMENT.md` for custom domain setup.

## Future Updates

After initial push, updates are simple:

```bash
# Make changes
git add .
git commit -m "Your update message"
git push

# That's it! Live in 2-3 minutes
```

## Troubleshooting

**"Permission denied (publickey)"**
- You chose SSH but key isn't added to GitHub
- Follow Option 1 steps above

**"Authentication failed"**
- Token expired or wrong
- Generate new token (Option 2)

**"Repository not found"**
- Check repo name: sketch_and_script (with underscore)
- Verify: https://github.com/fredziarz/sketch_and_script exists

**"Push rejected"**
```bash
# Pull first
git pull origin main --rebase
git push origin main
```

---

**Your structure is perfect! Just need to authenticate and push.** 🚀

