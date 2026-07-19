# Swagatika Sahoo — Academic Portfolio Website

A professional, modern, multi-page single-document academic portfolio website for **Swagatika Sahoo**, Assistant Professor at IIIT Dharwad. Built with a clean, hand-crafted UI, day/night theme switching, smooth page transitions, and a fully responsive layout.

> A polished, premium portfolio site that reflects the academic excellence of a researcher in Blockchain, Machine Learning, and IoT Security.

---

## ✨ Features

- 🎨 **Premium UI** — Refined typography (Inter + Source Serif), glassmorphism header, animated conic-gradient profile ring, gradient text accents
- 🌗 **Day / Night Mode** — Pure black dark theme with smooth 0.5s color transitions, persistent localStorage preference, system-preference auto-detect, and a keyboard shortcut (`T`) to toggle
- 🗂️ **Multi-Page Routing** — SPA-style single-document architecture with URL hash routing, browser back/forward support, and smooth page transitions
- 📱 **Fully Responsive** — Looks great on phones, tablets, and desktops with a mobile-friendly hamburger menu
- ⚡ **Performance** — Throttled scroll handlers, IntersectionObserver-based reveal animations, no jQuery, no build step required
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard-navigable, `prefers-reduced-motion` support
- 🎭 **Animations** — Reveal-on-scroll, animated stat counters, parallax hero photo, page-in fade, button shine effects
- 📰 **Scrolling Flash News Ticker** — Bright red banner that scrolls left-to-right (pauses on hover) — just like news channels
- 🔄 **Rotating Flash Cards** — 5 colorful cards that auto-rotate every 5 seconds with clickable navigation dots
- 💬 **Daily Quote of the Day** — Inspirational quote that changes every day based on the day of the year, with date display
- 🎥 **Video Gallery** — Featured video + grid of talk recordings, supports YouTube embeds AND local MP4 files
- 📷 **Conference Photo Placeholders** — A gallery section on the publications page ready for the professor's real photos

---

## 📄 Pages

| Page | URL | Contents |
|------|-----|----------|
| **Home** | `#home` | Hero, animated stats, Rotating Flash Cards, Recent Highlights list |
| **About** | `#about` | Biography, Research Interests, Detailed Graduation Timeline, Professional Experience |
| **Research** | `#research` | Research focus, Research Areas in Depth, Current Projects, Past Projects, Future Vision |
| **Teaching** | `#teaching` | Teaching grid (Blockchain & DS, ML & Security, DSA, DBMS) |
| **Publications** | `#publications` | Conference photo gallery, Journal articles, Book chapters, Conference proceedings with DOI/PDF links |
| **Videos** | `#videos` | Featured talk + grid of YouTube embeds and local video placeholders with play modal |
| **Awards** | `#awards` | Awards & Honours (Best Paper Awards, GATE, UGC NET) |

---

## 🎬 Videos Page

The Videos page supports two kinds of placeholders out of the box:

1. **YouTube embeds** — replace the `data-video-id` attribute in `index.html` with any real YouTube video ID. The modal will load `youtube.com/embed/<id>`.
2. **Local MP4 files** — drop `.mp4` files into `static/videos/` and update the `data-video-src` attribute. The modal will play them in an HTML5 `<video>` player.

Clicking any video thumbnail opens a full-screen modal with the player. The modal closes on backdrop click, X button, or `Esc` key.

---

## 🎨 Theme

### Light Mode
- Soft blue + gold academic palette
- White surfaces, light grey borders
- `#f6f8fc` background

### Dark Mode (Pure Black)
- **True black** (`#000000`) background
- Surface tiers: `#0a0a0a`, `#111111`
- Monochrome white accent — zero color noise
- Subtle white-tinted background orbs for depth
- Black-bordered cards with crisp white text

---

## 🚀 Getting Started

This is a **static website** — no build tools, no dependencies, no server required.

### Option 1: Open directly
Simply double-click `index.html` to open it in your browser.

### Option 2: Local server (recommended)
For the best experience, serve the files using a local HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (with npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open <http://localhost:8000> in your browser.

---

## 📁 Project Structure

```
.
├── index.html          # Main HTML — all pages, semantic markup
├── css/
│   └── style.css       # Complete stylesheet with day/night tokens
├── js/
│   └── main.js         # Theme, routing, animations, mobile menu
├── static/
│   └── img/
│       └── profpic.jpeg   # Profile photo
├── README.md           # ← you are here
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, no framework
- **CSS3** — Custom properties (design tokens), Grid, Flexbox, animations, backdrop-filter
- **Vanilla JavaScript** — No libraries or frameworks, ES5-compatible
- **Google Fonts** — Inter (UI), Source Serif 4 (headings)

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Toggle day / night mode (works anywhere on the page) |
| `Esc` | Close mobile navigation menu |
| `Tab` | Navigate through interactive elements |

---

## 🎯 Customization Guide

### Change colors / theme
Edit the CSS custom properties at the top of `css/style.css`:

```css
:root,
[data-theme="light"] {
    --accent: #2563eb;     /* primary accent */
    --gold:   #b8941f;     /* gold accent */
    --bg:     #f6f8fc;     /* page background */
    /* ... */
}

[data-theme="dark"] {
    --accent: #ffffff;     /* white accent in dark mode */
    --bg:     #000000;     /* pure black background */
    /* ... */
}
```

### Update content
All content lives in `index.html`. Each page is wrapped in a `<div class="page" data-page="...">` block. Edit the relevant page block to update its content.

### Add a new page
1. Add a new `<div class="page" data-page="newid">` block in `index.html`
2. Add a corresponding `<li><a href="#newid" data-page-link="newid">New Page</a></li>` in the nav
3. (Optional) Add a custom title in `js/main.js` → `showPage()` function

### Update the profile photo
Replace `static/img/profpic.jpeg` with your own image (square aspect ratio recommended, ≥400×400px).

### Update social / external links
Search `index.html` for `href="https://...` to update:
- Google Scholar
- GitHub
- LinkedIn
- Email
- Phone number
- DOI links for publications
- PDF links for the CV and project repos

---

## 🌍 Browser Support

- ✅ Chrome / Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome for Android

Backdrop-filter is used for the glassmorphism header — degrades gracefully on older browsers.

---

## 📜 Credits

Designed and developed as a clean, hand-coded academic portfolio. No templates, no frameworks, no boilerplate — every line of CSS and JavaScript was written for this project.

---

## 📝 License

This project is for the personal academic portfolio of Swagatika Sahoo. Feel free to use the structure and code as inspiration for your own portfolio, but please don't reproduce the personal content verbatim.

---

**Made with care for Dr. Swagatika Sahoo's academic presence on the web.**
