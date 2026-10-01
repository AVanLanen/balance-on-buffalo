# Balance on Buffalo

Public website: https://avanlanen.github.io/balance-on-buffalo/

This repository contains the complete static website in `docs/`: 165 content routes, responsive images, self-hosted fonts, and shared CSS and JavaScript. GitHub Pages publishes the `main` branch's `/docs` directory. No build service, package installation, or backend is required to publish changes.

## Editing

- Edit page content in `docs/<page>/index.html`; the homepage is `docs/index.html`.
- Shared styles and interactions are in `docs/site.css` and `docs/site.js`.
- Assets are in `docs/assets/`.
- Internal paths start with `/balance-on-buffalo/` for GitHub project Pages hosting.
- Commit and push to `main` to update the published website.

## Booking and calendars

Appointment links open the existing Mangomint booking service in an accessible side drawer. Calendars load the existing Acuity and Punchpass providers on request, with direct links as a fallback. The SoundSpace story opens in a drawer; massage and NovaPod details use native expandable sections. Testimonial pagination contains all 87 reviews.

The newsletter uses the existing Constant Contact form, as requested. Provider account settings, forms, prices, availability, and transactions remain controlled by their respective providers.

## Content and identity

The website preserves Balance on Buffalo's existing branding and supplied website content. Business imagery, text, and brand assets remain the property of their respective owners; this repository does not grant a license to reuse them.
