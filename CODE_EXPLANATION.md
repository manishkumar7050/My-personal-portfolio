# Code Explanation (beginner friendly)

## 1. What each file does
| File | Job |
|---|---|
| `index.html` | The content and structure of the page |
| `css/style.css` | Colors, spacing, layout, light/dark theme, mobile design |
| `js/script.js` | Theme toggle, mobile menu, active nav link, link settings, footer year |
| `images/my-pic.jpg` | Your portrait |

## 2. How HTML creates the structure
HTML uses tags to describe what content is. We use meaningful ("semantic") tags:
- `<header>` and `<nav>`: top bar and menu
- `<main>`: the main content
- `<section>`: one block of the page (About, Skills, ...). Each has an `id` so the menu can jump to it: `<section id="about">`.
- `<article>`: one project card
- `<footer>`: bottom of the page

A menu link like `<a href="#about">` scrolls to the element with `id="about"`.

## 3. How CSS controls the design
CSS selects elements and styles them: `.button { padding: 12px 22px; }` styles everything with `class="button"`.
The file is split into numbered parts (variables, base, navigation, hero, ...) so you can find things easily.

## 4. How JavaScript adds interactivity
JavaScript finds elements (`document.getElementById("themeToggle")`), listens for events (`addEventListener("click", ...)`), and changes the page.

## 5. Theme toggle
- `loadTheme()` runs when the page opens. It reads the saved choice from `localStorage`, or uses the device preference, and sets `data-theme` on the `<html>` tag.
- `toggleTheme()` runs when you click the theme button (`#themeToggle`). It switches between "dark" and "light", saves it, and calls `updateThemeButton()`.
- `updateThemeButton()` changes the icon and the `aria-label` (what screen readers say).
- In CSS, `[data-theme="light"] { ... }` replaces the color variables, so the whole page changes.

## 6. Mobile navigation
- On small screens CSS hides `.navlinks` and shows the ☰ button.
- `toggleMenu()` runs on click of `#menuToggle`. It adds or removes the class `open` on `#navlinks`; CSS `.navlinks.open { display: flex; }` shows it. It also updates `aria-expanded`.
- `closeMenu()` runs when you click a menu link or press Escape.

## 7. Project cards and links
Each project is an `<article class="project">` with: category + status label, title, short text, optional list, and links.
A link looks like this:
```html
<a data-link="trustlensRepo" href="#" hidden>Source Code</a>
```
`hidden` keeps it invisible until you set `trustlensRepo` in `SITE_LINKS`.

### `applyLinks()`
- **Purpose:** show only the links you have really set.
- **Runs:** once, when the page loads.
- **Changes:** the `href` and `hidden` attribute of every element with `data-link`.
- **Uses:** the `SITE_LINKS` object. For email it adds `mailto:`.

### `showContactReminder()`
Shows the yellow reminder (`#contactEmpty`) only when email, LinkedIn, and GitHub are all empty.

### `highlightActiveLink()`
- **Purpose:** underline the menu link of the section you are reading.
- **Runs:** once on load; the browser then calls it back when you scroll.
- **Changes:** adds class `active` and `aria-current` to the matching `.navlinks a`.
- **How:** `IntersectionObserver` watches each `<section id=...>` and reports when it is in the middle of the screen.

### `handleContactForm(event)`
- **Purpose:** check the contact form and open the visitor's email app with the message ready.
- **Runs:** when the visitor presses "Send Message" (the form's `submit` event).
- **Changes:** shows an error or success text in `#formStatus`, marks a bad field with `aria-invalid`, and sets `window.location.href` to a `mailto:` link.
- **Uses:** the fields `#cfName`, `#cfEmail`, `#cfMessage` and `SITE_LINKS.email`.
- **Important:** there is no server. Nothing is delivered until the visitor presses Send in their own email app.
- `event.preventDefault()` stops the page from reloading; `encodeURIComponent()` makes spaces and symbols safe inside the link.

### `setFooterYear()`
Writes the current year into `<span id="year">`.

## 8. How the responsive layout works
- Layouts use CSS Grid (`grid-template-columns`) and Flexbox.
- `@media (max-width: 900px)` turns two-column layouts into one column.
- `@media (max-width: 760px)` switches to the mobile menu.
- `@media (max-width: 480px)` makes buttons full width.
- Images use `max-width: 100%` so they never overflow.

## 9. Important CSS variables
Defined at the top of `style.css`:
`--bg` page background, `--surface` card background, `--text` main text, `--muted` softer text, `--line` borders, `--accent` green highlight, `--warn` yellow placeholder color.
Use them like `color: var(--accent);`.

## 10. Update personal information
Text is in `index.html`. Links are in `SITE_LINKS` in `js/script.js`.

## 11. Add another project
Copy a whole `<article class="project">...</article>`, paste it after the last one, change the text, and for links use a new name, e.g. `data-link="myAppRepo"`, then add `myAppRepo: ""` to `SITE_LINKS`.

## 12. Change colors and fonts
- Colors: edit the variables in `:root` (dark) and `[data-theme="light"]`.
- Font: change the Google Fonts `<link>` in `index.html` and the `font-family` in `body`.

## 13. Fixing common problems
- **Image missing:** check the path in `src` matches the real file name exactly (capital letters and spaces matter).
- **Link not showing:** make sure the value in `SITE_LINKS` is not empty and the element has the same `data-link` name.
- **Link opens the wrong page:** GitHub/LinkedIn links must start with `https://`.
- **Changes not visible:** hard-refresh the browser (Ctrl+Shift+R).
