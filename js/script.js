/* =========================================================
   Manish Kumar - Portfolio script
   Sections: 1. Settings  2. Links  3. Theme  4. Mobile menu
             5. Active nav link  6. Contact form  7. Footer year
   ========================================================= */

/* ---------- 1. SETTINGS: EDIT THIS PART ----------
   Fill in your real details between the quotes.
   Anything left as "" is simply not shown on the page,
   so there are no broken or fake buttons. */
const SITE_LINKS = {
  email: "manishcmc7050@gmail.com",                       // main email (the contact form sends here)
  emailAlt: "manish.kumar.mk2006.in@gmail.com",           // extra email, shown as text. Use "" to hide it
  github: "https://github.com/manishkumar7050",
  linkedin: "https://www.linkedin.com/in/manish-kumar-893762398",
  resume: "",           // example: "assets/resume.pdf" (put the PDF in an assets folder)

  trustlensRepo: "",    // project repository links (leave "" if none)
  trustlensDemo: "",
  civicpulseRepo: "",
  civicpulseDemo: "",
  portfolioRepo: "",
  calculatorRepo: ""
};

/* ---------- 2. LINKS ----------
   Runs once when the page loads.
   Looks for every element with a data-link="..." attribute in index.html.
   If a link is set above, it fills the href and shows the element.
   If not, the element stays hidden. */
function applyLinks() {
  const elements = document.querySelectorAll("[data-link]");

  elements.forEach(function (element) {
    const name = element.dataset.link;      // for data-link="github" this is "github"
    const value = SITE_LINKS[name];

    if (!value) {
      return;                               // no link set, so keep it hidden
    }

    // Email needs "mailto:" in front so it opens the mail app
    const isEmail = (name === "email" || name === "emailAlt");
    element.href = isEmail ? "mailto:" + value : value;
    element.hidden = false;

    // data-show-value means: also print the value as the link text (used for the extra email)
    if (element.hasAttribute("data-show-value")) {
      element.textContent = value;
    }
  });

  // The "Alternate email" line is shown only if emailAlt is set
  document.getElementById("altEmail").hidden = !SITE_LINKS.emailAlt;

  showContactReminder();
}

/* If none of email, LinkedIn, or GitHub is set, show a reminder in the
   contact section so the section is never silently empty. */
function showContactReminder() {
  const hasContact = SITE_LINKS.email || SITE_LINKS.linkedin || SITE_LINKS.github;
  document.getElementById("contactEmpty").hidden = Boolean(hasContact);
}

/* ---------- 3. THEME (light / dark) ---------- */
const root = document.documentElement;                 // the <html> tag
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

/* Runs on page load: use the saved theme, or the device preference. */
function loadTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("portfolio-theme");
  } catch (error) {
    // Some browsers block storage. The site still works without it.
  }

  if (saved === "light" || saved === "dark") {
    root.dataset.theme = saved;
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.dataset.theme = "light";
  }
  updateThemeButton();
}

/* Keeps the icon and the screen-reader label in sync with the theme. */
function updateThemeButton() {
  const isLight = root.dataset.theme === "light";
  themeIcon.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}

/* Runs when the theme button is clicked. */
function toggleTheme() {
  const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = newTheme;                       // CSS reacts to data-theme
  try {
    localStorage.setItem("portfolio-theme", newTheme);
  } catch (error) {
    // Ignore: the theme just won't be remembered.
  }
  updateThemeButton();
}

/* ---------- 4. MOBILE MENU ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navlinks");

/* Opens the menu if closed, closes it if open. */
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
}

/* Always closes the menu (used after clicking a link, or pressing Escape). */
function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

/* ---------- 5. ACTIVE NAV LINK ----------
   Highlights the nav link of the section currently on screen. */
function highlightActiveLink() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".navlinks a");

  // IntersectionObserver tells us when a section enters the middle of the screen.
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      links.forEach(function (link) {
        const matches = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("active", matches);
        if (matches) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ---------- 6. CONTACT FORM ----------
   There is no server. When the form is valid, we open the visitor's email app
   with the message already written (a "mailto:" link). The visitor presses Send there. */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

/* Shows a message under the form. type is "error" or "success". */
function showFormMessage(text, type) {
  formStatus.textContent = text;
  formStatus.className = "form-status " + type;
}

/* Marks one field as invalid, tells the user, and moves the cursor to it. */
function rejectField(field, text) {
  field.setAttribute("aria-invalid", "true");
  showFormMessage(text, "error");
  field.focus();
}

/* Runs when the form is submitted. */
function handleContactForm(event) {
  event.preventDefault();                       // stop the page from reloading

  const nameField = document.getElementById("cfName");
  const emailField = document.getElementById("cfEmail");
  const messageField = document.getElementById("cfMessage");

  // clear old error marks
  [nameField, emailField, messageField].forEach(function (field) {
    field.removeAttribute("aria-invalid");
  });

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  if (name === "") {
    rejectField(nameField, "Please enter your name.");
    return;
  }
  // Simple email check: something@something.something
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    rejectField(emailField, "Please enter a valid email address.");
    return;
  }
  if (message.length < 10) {
    rejectField(messageField, "Please write a message of at least 10 characters.");
    return;
  }
  if (!SITE_LINKS.email) {
    showFormMessage("The site owner has not set an email address yet.", "error");
    return;
  }

  const subject = "Portfolio message from " + name;
  const body = message + "\n\nName: " + name + "\nReply to: " + email;

  // encodeURIComponent makes spaces and symbols safe to put inside a link
  window.location.href = "mailto:" + SITE_LINKS.email +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  showFormMessage("Your email app should open now. Press Send there to deliver the message.", "success");
}

/* ---------- 7. FOOTER YEAR ---------- */
function setFooterYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

/* ---------- START EVERYTHING ---------- */
themeToggle.addEventListener("click", toggleTheme);
menuToggle.addEventListener("click", toggleMenu);
contactForm.addEventListener("submit", handleContactForm);

// Close the mobile menu after choosing a link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Pressing Escape closes the mobile menu
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});

loadTheme();
applyLinks();
highlightActiveLink();
setFooterYear();
