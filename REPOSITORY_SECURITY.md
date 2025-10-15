# Repository Security Guide

Complete guide to securing your GitHub repository and preventing unauthorized changes.

---

## 🔒 Current Security Status

**Repository:** github.com/fredziarz/sketch_and_script
**Owner:** fredziarz (Michał Wicherek)
**Visibility:** Public (required for GitHub Pages)
**Authentication:** SSH (secure) ✅

---

## ✅ Default Protections (Already Active)

Your repository is secure by default:

✅ **Owner-only write access** - Only you can push commits
✅ **SSH authentication** - Secure key-based access
✅ **Public = read-only** - Others can view but not modify
✅ **No collaborators** - Nobody else has permissions
✅ **GitHub Pages enabled** - Site is public, code is protected

**Important:** Public repository ≠ Anyone can edit. Only viewing is public!

---

## 🛡️ Recommended Security Enhancements

### 1. Enable Two-Factor Authentication (2FA)

**Priority:** HIGH - Do this first!

**Steps:**
1. Go to: https://github.com/settings/security
2. Click: **"Enable two-factor authentication"**
3. Choose method:
   - **Authenticator app** (Google Authenticator, Authy) - Recommended
   - **SMS** - Fallback option
4. Scan QR code with authenticator app
5. Enter 6-digit code to verify
6. **Save recovery codes** - Store securely offline
7. Done! ✅

**Why?** Even if someone steals your password, they can't access your account without the 2FA code.

**Recovery codes:** Print and store in safe place (you'll need these if you lose your phone)

---

### 2. Branch Protection Rules

**Priority:** MEDIUM - Prevents accidental damage

**Steps:**
1. Go to: https://github.com/fredziarz/sketch_and_script/settings/branches
2. Click: **"Add branch protection rule"**
3. Branch name pattern: `main`
4. Configure settings:

**Recommended settings:**
```
☑ Require a pull request before merging
  ☐ Require approvals (optional - useful if you add collaborators)

☐ Require status checks to pass before merging
  (No CI/CD setup yet, skip this)

☐ Require conversation resolution before merging
  (Optional)

☑ Require signed commits
  (Verifies commits are from you)

☑ Require linear history
  (Cleaner git history, prevents messy merges)

☐ Do not allow bypassing the above settings
  (Check this if you want strict enforcement)

☐ Allow force pushes
  (Leave unchecked - prevents accidental history rewrites)

☐ Allow deletions
  (Leave unchecked - prevents accidental branch deletion)
```

**Note:** Some settings may require a paid GitHub plan. Free tier allows basic protection.

---

### 3. Review SSH Keys

**Priority:** MEDIUM - Ensure only your devices have access

**Steps:**
1. Go to: https://github.com/settings/keys
2. Review all listed SSH keys
3. For each key:
   - ✅ Recognize the device? Keep it
   - ❌ Don't recognize it? Delete it immediately
4. Best practice: One key per device with descriptive names
   - Example: "Laptop-Ubuntu-2025", "Desktop-Work", "MacBook-Home"

**Add new SSH key:**
```bash
# On your computer, generate new key
ssh-keygen -t ed25519 -C "michalwicherek@gmail.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/ssh/new
```

**Security tips:**
- ❌ Never share your private key (`id_ed25519`)
- ✅ Only share public key (`id_ed25519.pub`)
- ✅ Use strong passphrase for SSH key
- ✅ Keep private key on your devices only

---

### 4. Repository Access Control

**Priority:** HIGH - Regular audits

**Check collaborators:**
1. Go to: https://github.com/fredziarz/sketch_and_script/settings/access
2. Under "Who has access":
   - Should show: **Only you (fredziarz)**
   - If anyone else is listed: Click "Remove" immediately

**Manage access levels:**
- **Admin** - Full control (only you)
- **Write** - Can push code (nobody)
- **Read** - Can view only (public)

**Never add collaborators** unless you absolutely trust them and need their help.

---

### 5. Security Alerts & Scanning

**Priority:** MEDIUM - Automatic monitoring

**Enable security features:**
1. Go to: https://github.com/fredziarz/sketch_and_script/settings/security_analysis
2. Enable these:
   - ☑ **Dependabot alerts** - Notifies of vulnerable dependencies
   - ☑ **Dependabot security updates** - Auto-updates vulnerable packages
   - ☑ **Secret scanning** - Detects leaked credentials

**Note:** Your site uses vanilla HTML/CSS/JS (no dependencies), so Dependabot won't find much. Still good to enable for future.

---

## 🚫 What You Should NEVER Commit

### Critical Secrets

❌ **Private keys** (SSH, GPG, API keys for paid services)
❌ **Passwords** (database, admin, email)
❌ **Database credentials** (connection strings, usernames)
❌ **OAuth tokens** (GitHub personal access tokens)
❌ **Encryption keys** (SSL private keys, JWT secrets)
❌ **Environment variables** with sensitive data

### Exception: Public API Keys

✅ **Web3Forms access key** - Designed to be public, only sends to your verified email
✅ **Google Analytics ID** - Public tracking code
✅ **Formspree endpoint** (if you used it) - Public form endpoint

**Your current setup is safe!** ✅

---

## 🔐 Additional Security Measures

### 1. Signed Commits (Advanced)

Verify that commits are actually from you:

**Setup GPG signing:**
```bash
# Generate GPG key
gpg --full-generate-key
# Choose: RSA and RSA, 4096 bits, 0 (no expiration)
# Enter: Your name and email

# List keys
gpg --list-secret-keys --keyid-format=long

# Copy your key ID (after sec rsa4096/)
# Configure git
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true

# Export public key
gpg --armor --export YOUR_KEY_ID

# Add to GitHub: https://github.com/settings/gpg/new
```

**Benefits:**
- ✅ Commits show "Verified" badge on GitHub
- ✅ Proves commits are from you
- ✅ Prevents impersonation

---

### 2. Disable Forking (Optional)

Prevent others from creating copies:

**Steps:**
1. Go to: https://github.com/fredziarz/sketch_and_script/settings
2. Scroll to: **"Features"**
3. Uncheck: ☐ **"Allow forking"**

**Considerations:**
- **Disable if:** You want complete control over copies
- **Keep enabled if:** You want to allow learning from your code
- **Current setting:** Probably enabled (default)

**Recommendation:** Keep enabled for portfolio visibility, disable if you add proprietary code.

---

### 3. Private Repository (Not Recommended for You)

**Option:** Make repository private

**How:**
1. Go to: https://github.com/fredziarz/sketch_and_script/settings
2. Scroll to: **"Danger Zone"**
3. Click: **"Change repository visibility"**
4. Select: **Private**

**⚠️ WARNING:** This will **break GitHub Pages** on the free tier!
- GitHub Pages requires public repository (free plan)
- Private repos need GitHub Pro ($4/month) for Pages

**Your situation:** Keep public for free hosting ✅

---

## 📋 Security Checklist

### Initial Setup (Do Once)
- [ ] Enable 2FA on GitHub account
- [ ] Review and clean up SSH keys
- [ ] Verify repository access (only you)
- [ ] Enable Dependabot alerts
- [ ] Enable secret scanning
- [ ] Set up branch protection for main
- [ ] (Optional) Configure GPG signing

### Monthly Audit
- [ ] Review repository collaborators
- [ ] Check SSH keys are still yours
- [ ] Review recent commits
- [ ] Check for security alerts
- [ ] Verify 2FA is still enabled
- [ ] Update GitHub password (every 3-6 months)

### After Suspicious Activity
- [ ] Change GitHub password immediately
- [ ] Revoke all SSH keys
- [ ] Generate new SSH keys
- [ ] Review all commits
- [ ] Check repository settings
- [ ] Enable 2FA if not already
- [ ] Contact GitHub support if needed

---

## 🚨 What to Do If Compromised

### Signs of compromise:
- Commits you didn't make
- SSH keys you don't recognize
- Collaborators you didn't add
- Repository settings changed
- Unusual activity emails from GitHub

### Immediate actions:
1. **Change password:** https://github.com/settings/security
2. **Revoke all SSH keys:** https://github.com/settings/keys
3. **Remove unknown collaborators:** https://github.com/fredziarz/sketch_and_script/settings/access
4. **Enable 2FA:** https://github.com/settings/security
5. **Review commit history:** Look for unauthorized changes
6. **Revert bad commits:** `git revert <commit-hash>`
7. **Contact GitHub Support:** https://support.github.com/

### Report suspicious activity:
- Email: support@github.com
- Report: https://github.com/contact

---

## 🔍 Monitoring Your Repository

### Enable Email Notifications

**Get notified about:**
- New commits
- Failed authentication attempts
- Added collaborators
- Changed settings
- Security alerts

**Configure:**
1. Go to: https://github.com/settings/notifications
2. Enable:
   - ☑ Email notifications for repository activity
   - ☑ Security alerts
   - ☑ Failed login attempts

### Watch Repository Activity

**View activity:**
1. Repository insights: https://github.com/fredziarz/sketch_and_script/pulse
2. Recent commits: https://github.com/fredziarz/sketch_and_script/commits/main
3. Network graph: https://github.com/fredziarz/sketch_and_script/network

---

## 🎯 Your Specific Setup

### Current Configuration

**Repository:** sketch_and_script
**Owner:** fredziarz
**Type:** Public
**Purpose:** Portfolio website (GitHub Pages)

**Authentication:**
- Method: SSH
- User: Michał Wicherek
- Email: michal.wicherek@tails.com
- Keys: Review at https://github.com/settings/keys

**Services with access:**
- Web3Forms: ae12a595-8257-41ef-98ce-29746a0dedd3 (public, safe)
- Google Analytics: G-R9ZNFG075D (public, safe)

**Security status:**
- SSH: ✅ Secure
- Collaborators: ✅ None (only you)
- 2FA: ⏳ Enable ASAP
- Branch protection: ⏳ Recommended
- Secret scanning: ⏳ Enable

---

## 📚 Best Practices

### Git Security

1. **Always use SSH, not HTTPS**
   ```bash
   # Good (SSH)
   git@github.com:fredziarz/sketch_and_script.git
   
   # Avoid (HTTPS - requires password/token)
   https://github.com/fredziarz/sketch_and_script.git
   ```

2. **Use meaningful commit messages**
   ```bash
   # Good
   git commit -m "Add contact form with Web3Forms integration"
   
   # Bad
   git commit -m "update"
   ```

3. **Never force push to main**
   ```bash
   # Dangerous - rewrites history
   git push --force origin main
   
   # Safe
   git push origin main
   ```

4. **Review before pushing**
   ```bash
   git status      # See what's changed
   git diff        # Review changes
   git add .       # Stage files
   git commit -m   # Commit with message
   git push        # Push to GitHub
   ```

### Account Security

1. **Strong password**
   - 16+ characters
   - Mix of letters, numbers, symbols
   - Unique to GitHub (don't reuse)
   - Use password manager (LastPass, 1Password, Bitwarden)

2. **Email security**
   - Enable 2FA on email (michalwicherek@gmail.com)
   - Don't share email password
   - Monitor for suspicious emails

3. **Device security**
   - Keep SSH keys on encrypted drives
   - Lock your computer when away
   - Use antivirus/antimalware
   - Keep OS and software updated

---

## 🆘 Quick Reference

### Important URLs

| Purpose | URL |
|---------|-----|
| Repository settings | https://github.com/fredziarz/sketch_and_script/settings |
| Access control | https://github.com/fredziarz/sketch_and_script/settings/access |
| Branch protection | https://github.com/fredziarz/sketch_and_script/settings/branches |
| Security settings | https://github.com/settings/security |
| SSH keys | https://github.com/settings/keys |
| 2FA setup | https://github.com/settings/security |
| Notifications | https://github.com/settings/notifications |
| Security alerts | https://github.com/fredziarz/sketch_and_script/security |

### Emergency Contacts

| Service | Contact |
|---------|---------|
| GitHub Support | support@github.com |
| Report abuse | https://github.com/contact/report-abuse |
| Security issue | security@github.com |

---

## ✅ Action Items

### Do Immediately (Priority 1)
1. **Enable 2FA:** https://github.com/settings/security
2. **Review SSH keys:** https://github.com/settings/keys
3. **Check collaborators:** https://github.com/fredziarz/sketch_and_script/settings/access

### Do This Week (Priority 2)
4. **Enable security scanning:** https://github.com/fredziarz/sketch_and_script/settings/security_analysis
5. **Set up branch protection:** https://github.com/fredziarz/sketch_and_script/settings/branches
6. **Configure notifications:** https://github.com/settings/notifications

### Do This Month (Priority 3)
7. **(Optional) Set up GPG signing:** For verified commits
8. **Review repository settings:** General audit
9. **Update password:** If older than 6 months

---

## 📖 Further Reading

- **GitHub Security Best Practices:** https://docs.github.com/en/code-security
- **Securing your account:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure
- **About 2FA:** https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa
- **Managing SSH keys:** https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

**Last Updated:** October 15, 2025
**Next Review:** Monthly (15th of each month)

---

**Your repository is secure! Follow the Priority 1 action items to enhance security even further.** 🔒

