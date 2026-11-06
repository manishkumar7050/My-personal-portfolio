# Portfolio Interview Guide

**Be honest about how you built this.** This portfolio was improved with AI assistance. If asked, say so, and then show that you understand the code (read `CODE_EXPLANATION.md` until you can explain every function). Never claim you wrote something you cannot explain.

## 1. 30-second introduction
"Hi, I'm Manish Kumar, a second-year B.Tech CSE student specializing in AI at Rungta International Skills University. I know Java and C fundamentals, I build websites with HTML, CSS, and JavaScript, and I'm learning AI/ML. I'm working on projects like TrustLens AI and took part in HackBIOS 2026 with CivicPulse AI. I'm looking for an internship to improve my practical skills."

## 2. One-minute explanation of the website
"It's a single-page portfolio in plain HTML, CSS, and JavaScript. It has About, Skills, Projects, Certifications, and Contact sections. It's responsive, has a light and dark theme that remembers the choice, and a mobile menu. Project links come from one settings object, so a link only shows if it really exists."

## 3. Why HTML, CSS, JavaScript?
I wanted something simple I fully understand, with no framework or build tools. For a portfolio, plain files are fast and easy to host.
*Hinglish:* Portfolio chhota hai, isliye framework ki zaroorat nahi thi. Plain code se mujhe samajhna aur explain karna easy hai.

## 4. Structure
`index.html` (content), `css/style.css` (design), `js/script.js` (behavior), `images/`. Separate files keep things organized.

## 5. Responsive design
CSS Grid and Flexbox plus media queries at 900px, 760px, and 480px. Two columns become one, the menu becomes a button, and buttons become full width.

## 6. Theme toggle
Colors are CSS variables. JavaScript sets `data-theme` on `<html>`; CSS has a different set of variables for `light`. The choice is saved in `localStorage`.

## 7. Links and contact
Links are in `SITE_LINKS`. Empty ones stay hidden. The contact form has no backend, so it opens the visitor's email app with a ready-made `mailto:` message instead of pretending to send. There are also email, LinkedIn, and GitHub links.

## 8. What I learned
How to structure a page semantically, use CSS variables, make a layout responsive, and handle accessibility (focus styles, labels, keyboard menu).

## 9. Challenges
Only mention real ones. Examples you can honestly discuss if true for you: making the mobile menu work, or the light theme contrast. If none, say "the biggest challenge was understanding how it all connects."

## 10. What I'd improve next
Add real project screenshots and GitHub links, add a resume, deploy it, and build a working demo of TrustLens AI.

## Technical questions (15)

1. **What is semantic HTML?** Using tags like `<header>`, `<main>`, `<section>` that describe meaning, which helps accessibility and SEO. *Hinglish:* Tags ka naam hi batata hai content kya hai. (`index.html`)
2. **How does a menu link scroll to a section?** `href="#about"` matches `id="about"`. *Hinglish:* href ka # wala naam section ke id se match hota hai.
3. **What are CSS variables?** Values like `--accent` defined once and reused with `var(--accent)`. *Hinglish:* Ek jagah color badlo, poori site me badal jaata hai. (`:root` in `style.css`)
4. **How does the theme toggle work?** JS changes `data-theme`; CSS `[data-theme="light"]` overrides variables. (`toggleTheme`)
5. **What is `localStorage`?** Small browser storage that stays after refresh. Used to save the theme. *Hinglish:* Browser me chhota saved data.
6. **Why `try/catch` around localStorage?** Some browsers block storage; the site should still work.
7. **How does the mobile menu work?** `toggleMenu()` toggles class `open`; CSS shows the menu when `.open` exists. (`script.js`)
8. **What is `aria-expanded`?** Tells screen readers if the menu is open. Updated in `toggleMenu()`.
9. **Grid vs Flexbox?** Grid for 2D layouts (project cards), Flexbox for one row/column (navbar). *Hinglish:* Grid rows+columns, Flex ek direction.
10. **What is a media query?** CSS that applies only at certain screen sizes, e.g. `@media (max-width: 760px)`.
11. **What does `data-link` do?** Custom attribute JS reads via `element.dataset.link` to find the right URL in `SITE_LINKS`.
12. **Why the `hidden` attribute?** Hides elements with no link, so there are no broken buttons. CSS rule `[hidden]{display:none!important}` makes sure it wins.
13. **What does `IntersectionObserver` do here?** Detects which section is on screen to highlight the nav link. (`highlightActiveLink`)
14. **Why `alt` text and focus styles?** Accessibility: screen readers and keyboard users. (`:focus-visible`)
15. **How do you handle reduced motion?** `@media (prefers-reduced-motion: reduce)` turns off smooth scrolling and transitions.
16. **How does the contact form work?** It validates the fields in JavaScript, then opens the visitor's email app with a pre-filled `mailto:` message. There is no backend, so nothing is sent until they press Send in their email app. Later I could use a service like Formspree or a small server.
17. **How would you deploy it?** Push to GitHub and enable GitHub Pages, or drag the folder to Netlify.
18. **Explain TrustLens AI.** It looks for evidence of suspicious review patterns (duplicates, similar wording, timestamps) and explains findings instead of declaring reviews fake. Only talk about features you have actually finished.
19. **What was your role in CivicPulse AI?** Answer with your real contribution as part of team NexVanta.
