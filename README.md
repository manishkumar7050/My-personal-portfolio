# Manish Kumar - Portfolio Website

A simple, responsive student portfolio built with plain **HTML, CSS, and JavaScript** (no frameworks, no build step).

## Technologies
- HTML5 (semantic tags)
- CSS3 (variables, Grid, Flexbox, media queries)
- Vanilla JavaScript
- One Google Font (Manrope)

## Main features
- Light and dark theme that remembers your choice
- Mobile menu (works with keyboard, closes with Escape)
- Active link highlighting in the navigation
- Projects with honest status labels
- Links and contact details controlled from one settings object
- Responsive from small phones to large monitors

## Folder structure
```
manish-portfolio/
  index.html          page content
  css/style.css       design
  js/script.js        interactivity + your links (SITE_LINKS)
  images/my-pic.jpg  portrait
  README.md
  CODE_EXPLANATION.md
  PORTFOLIO_INTERVIEW_GUIDE.md
```

## Run locally
Double-click `index.html`. That is all. (Optional: in VS Code, use the "Live Server" extension.)

## Update your personal information
1. **Links (email, GitHub, LinkedIn, resume, repos):** open `js/script.js` and fill the values in `SITE_LINKS`. Empty values are hidden automatically.
2. **Text:** edit `index.html`. Search for `[` to find yellow placeholders such as `[Add your contribution]`.
3. **Certifications:** keep only the ones you can prove (see the VERIFY comment in `index.html`).

## Replace the portrait
Put your new image in `images/`, then change `src="images/my-pic.jpg"` in `index.html`. Keep the width/height attributes matching the new image size. Use a portrait photo (about 3:4).

## Add a resume
1. Create a folder `assets/` and put `resume.pdf` inside.
2. In `js/script.js` set `resume: "assets/resume.pdf"`.
The "Download Resume" button appears automatically.

## Add a project
Copy one `<article class="project">...</article>` block in `index.html`, paste it inside `<div class="projects">`, and edit the text. See `CODE_EXPLANATION.md`.

## Deploy (free static hosting)
**GitHub Pages:** create a repository, upload these files, then Settings > Pages > Deploy from branch `main` / root.
**Netlify / Vercel:** drag and drop the project folder, or connect the repository. No build command is needed.
After deploying, add your site URL as the `og:image` meta tag (see the TODO in `index.html`).

This site is **not deployed yet**. Add the live link here once it is.

## Contact form
The form checks the name, email, and message, then opens the visitor's email app with a pre-filled `mailto:` message to the email in `SITE_LINKS.email`. There is no server, so nothing is delivered until the visitor presses Send in their email app. To send messages directly from the site later, use a form service (for example Formspree) or write a small backend.
