# Mahdi Nawaz - Portfolio

A static, responsive portfolio website (HTML, CSS and JavaScript only, no build step).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content and structure |
| `style.css` | Steel theme, layout, dark and light colours |
| `script.js` | Mobile menu, theme toggle, scroll animations |
| `assets/` | Project chart images |

## Before you publish: replace these placeholders

Open `index.html` and search for:

- `YOUR-USERNAME` - your GitHub username (appears in the project button and the contact buttons)
- `YOUR-LINKEDIN` - your LinkedIn profile name
- `your-email@example.com` - the email address you want shown publicly

## Run locally

Double-click `index.html`, or from this folder run:

```
python -m http.server 8000
```

then open http://localhost:8000.

## Publish on GitHub Pages

1. Create a new public repository on GitHub, for example `portfolio` (or `YOUR-USERNAME.github.io` for a root address).
2. Upload all files in this folder (`index.html`, `style.css`, `script.js`, `README.md` and the `assets` folder).
3. Open the repository, go to Settings, then Pages.
4. Under Build and deployment, choose Deploy from a branch, select `main` and `/ (root)`, and save.
5. After a minute the site is live at `https://YOUR-USERNAME.github.io/portfolio/`.

## Customise

- Add another project by copying the `<article class="project">` block in `index.html`.
- Change colours in the `:root` block at the top of `style.css`.
