# Summer Scott Portfolio

## Preview

Open `index.html` in your browser, or run a local server from this folder.

## Push to GitHub

### Option A — GitHub website + Terminal (no extra installs)

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `summer-portfolio-website` (display name: **Summer Portfolio Website**)
3. Choose **Public**, leave “Add a README” **unchecked**, click **Create repository**
4. In Terminal, run (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd ~/Desktop/summer-scott-portfolio
git remote add origin https://github.com/YOUR_USERNAME/summer-portfolio-website.git
git branch -M main
git push -u origin main
```

5. When asked to sign in, use your GitHub username and a **Personal Access Token** as the password (not your GitHub password). Create one at [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new token (classic)** → enable the `repo` scope.

### Option B — GitHub CLI without Homebrew

```bash
cd /tmp
curl -sL https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_macOS_arm64.zip -o gh.zip
unzip -qo gh.zip
sudo mv gh_2.63.2_macOS_arm64/bin/gh /usr/local/bin/gh
gh auth login
cd ~/Desktop/summer-scott-portfolio
./scripts/push-to-github.sh
```

(On an Intel Mac, use `macOS_amd64` instead of `macOS_arm64` in the download URL.)

## Upload your work

See **`assets/projects/graphic-design/UPLOAD-GUIDE.md`** for the full list of folders and filenames.

Each graphic design project has its own folder under `assets/projects/graphic-design/`. Name files `01.jpg`, `02.jpg`, etc. (Augmented Poster also needs `video.mp4` first.)

Profile photo: `assets/profile.jpg`

## Edit content

Project titles, dates, descriptions, and media counts: `js/data.js`
