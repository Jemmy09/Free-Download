# ⬇ FreeDownload — Software Installer Hub

A professional, dark-themed software discovery and download platform. Browse, search, and download 16+ verified apps with one click — no sign-up required.

🌐 **Live Site:** [jemmy09.github.io/Free-Download](https://jemmy09.github.io/Free-Download)

---

## 📁 Project Files

| File | Description |
|---|---|
| `index.html` | Main public website |
| `style.css` | Global styles (dark theme) |
| `script.js` | App data, search, download logic |
| `admin.html` | Admin panel (restricted) |
| `admin.css` | Admin panel styles |
| `admin.js` | Admin panel logic |
| `privacy-policy.html` | Privacy Policy page |
| `user-agreement.html` | User Agreement page |

---

## ✨ Features

- 🔍 Live search with dropdown results
- 📦 16+ real apps with official logos & verified download links
- 🗂️ Category filtering
- ⬇ Direct download from official publisher servers
- 🔐 Admin panel — add, edit, delete apps (login required)
- 📱 Fully responsive — mobile & desktop
- 🛡️ XSS & code injection protected

---

## 🔐 Admin Panel

The admin panel is **not publicly linked**. Access it directly at `admin.html`.

- Default username: `admin`
- Default password: `admin123`

> Change credentials in `admin.js` before deploying to production.

---

## 🚀 How to Update & Push to GitHub

After making any changes to your files, run:

```bash
git add .
git commit -m "describe your change here"
git push
```

### Common update examples

```bash
# After editing any file
git add .
git commit -m "Update app list"
git push

# After adding a new page
git add .
git commit -m "Add new page"
git push

# Quick one-liner (add + commit + push)
git add . && git commit -m "Update" && git push
```

---

## 🌍 Enable GitHub Pages (Free Hosting)

1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → **/ (root)** → **Save**
4. Site will be live at: `https://jemmy09.github.io/Free-Download/`

---

## 📄 Legal

- [Privacy Policy](privacy-policy.html)
- [User Agreement](user-agreement.html)

---

© 2026 FreeDownload. All rights reserved.
