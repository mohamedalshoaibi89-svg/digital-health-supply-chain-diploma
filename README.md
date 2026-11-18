# Digital Health Supply Chain Diploma — GitHub Pages website

A bilingual (English/Arabic), responsive training invitation website for the Unified Procurement Authority.

## Included features
- Responsive modern blue-and-white design
- English/Arabic language toggle
- Program overview and learning objectives
- Expandable proposed agenda
- Trainer profile placeholder
- Countdown to 1 December 2026
- Event details and venue placeholder
- Add-to-calendar `.ics` download
- Native share / copy-link functionality
- Google Forms registration hook
- Google Maps link hook (activated after the venue is confirmed)

## Before publishing: customize these values

Open `script.js` and edit the `CONFIG` object at the top:

```js
const CONFIG = {
  registrationUrl: "PASTE_YOUR_GOOGLE_FORM_LINK_HERE",
  venueAddress: "PASTE_CONFIRMED_VENUE_ADDRESS_HERE",
  trainerName: "TRAINER NAME AND TITLE",
  trainerBio: "TRAINER BIO / CREDENTIALS"
};
```

Leave any value blank if it is not yet available.

### Important details to confirm
1. The event start time is currently a placeholder of 09:00 local time, with an 8-hour calendar duration. Update it in `script.js` when the organizer confirms the schedule.
2. The agenda is a proposed outline, not an officially confirmed timetable. Confirm the modules and sequence with the organizer.
3. Trainer details and venue are intentionally shown as “to be announced” until supplied.
4. Add the actual Google Forms URL to `CONFIG.registrationUrl` to activate registration.
5. Add the confirmed venue address to `CONFIG.venueAddress` to enable a Google Maps link.

## Publish on GitHub Pages
1. Sign in at https://github.com.
2. Create a **Public** repository named `digital-health-supply-chain-diploma`.
3. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/(root)`, then click **Save**.
7. Wait a few minutes. Your site should appear at:

   `https://YOUR-USERNAME.github.io/digital-health-supply-chain-diploma/`

## Preview locally
Open `index.html` in a modern browser. For best results, use a local development server (for example, VS Code Live Server).
