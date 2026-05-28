# Devgna Vyas — Online Programming & Exam Prep Landing Page

A premium, highly optimized, accessible, and fast single-page tutoring landing website built with modern vanilla web technologies (HTML5, CSS3, and ES modules) and managed with Vite. Deployable directly to **GitHub Pages Free tier**.

---

## Features

- **High-Converting UX**: Compelling hero header, repeated actions, clean structures, trust indicators, and a floating interactive WhatsApp button.
- **Modern Styling System**: Sleek aesthetics with customized Google Fonts (Space Grotesk & Inter), rich custom shadows, CSS-variables, mobile-first design, fluid `clamp()` font scaling, and responsive grids.
- **Modular JavaScript**: Built with standard ES modules for easy maintenance—covering sticky navigation, dynamic active highlighting, smooth anchors, and fade-in animations.
- **Formspree Dynamic Contact Form**: Clean form validation with instant inline errors and dynamic AJAX loading screens.
- **GitHub Pages Deployment Workflow**: Full-featured CI/CD deployment with GitHub Actions.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18+)
- npm (installed automatically with Node)

### Installation
1. Install development dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Build the production-ready static assets:
   ```bash
   npm run build
   ```

4. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Static Alternative
If you prefer not to use Node.js or `npm`, you can open and run this project natively as a static project:
- Open `index.html` directly in any web browser.

---

## Folder Structure

```txt
c:/Users/Dev/Documents/tutoring/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
│   ├── images/
│   │   ├── hero-code-illustration.svg
│   │   ├── og-image.webp
│   │   └── favicon.svg
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── responsive.css
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── navigation.js
│       ├── animations.js
│       ├── form.js
│       └── pricing-toggle.js
```

---

## Customization Guide

Before launching the site live, make sure to customize the following variables:

### 1. Formspree Endpoint Customization
1. Sign up for a free account at [Formspree](https://formspree.io/).
2. Create a new form targeting `vyasdevgna@gmail.com`.
3. Copy your unique Formspree form ID (e.g., `xpzoqvrd`).
4. Open `index.html` and search for:
   ```html
   action="https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID"
   ```
5. Replace `REPLACE_WITH_FORMSPREE_ID` with your actual form ID.

### 2. WhatsApp Floating Button Customization
To configure or change the default WhatsApp pre-filled text or phone number:
1. Locate the floating WhatsApp button in `index.html`:
   ```html
   href="https://wa.me/919510292044?text=Hi%20Devgna!%20I%20am%20interested%20in%20your%20online%20classes."
   ```
2. Update the phone number (`919510292044` with your country code) and the URL-encoded query text if desired.

### 3. Replace Placeholder Testimonials
Find the CSS/HTML testimonials section marked with:
```html
<!-- TESTIMONIALS: Replace placeholder cards with real student feedback -->
```
Swap out the placeholder cards with actual positive student reviews as you acquire them.

### 4. Open Graph Image (Social Preview)
Generate or upload your brand banner, rename it to `og-image.webp`, and save it under `assets/images/` to override the default social thumbnail preview.

---

## Deployment to GitHub Pages

### Option A: GitHub Actions Pipeline (Recommended)
1. Push this project code directly to your GitHub repository named `Tutoring` on the `main` branch.
2. In your repository on GitHub, go to **Settings > Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The workflow in `.github/workflows/deploy.yml` will automatically compile and host the production build in a few minutes!

### Option B: Local Static Hosting
1. Build the production build locally:
   ```bash
   npm run build
   ```
2. Manually deploy or drag-and-drop the generated `dist/` directory contents directly to any static web hosting server or commit the `dist` contents to a deployment branch (e.g., `gh-pages`).
