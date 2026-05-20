# Durande.com

UK-based software studio website — built with **React 18**, **Vite**, **Tailwind CSS** and **lucide-react**.

---

## Quick start (local development)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The site runs at `http://localhost:5173`.

To produce a production build:

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## Deploy to Vercel

There are two ways. **Method 1 is recommended** — you get automatic deployments on every push.

### Method 1 — GitHub + Vercel Dashboard (recommended)

1. **Create a new GitHub repo** at https://github.com/new (any name, e.g. `durande-website`).
2. **Push this project** to the new repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/durande-website.git
   git push -u origin main
   ```
3. Go to **https://vercel.com/new** and sign in with GitHub.
4. Click **Import** next to your `durande-website` repo.
5. Vercel auto-detects **Vite** as the framework — no config needed.
6. Click **Deploy**. Done — you'll get a `*.vercel.app` URL within ~60 seconds.
7. (Optional) Add the custom domain `durande.com` from the project's **Settings → Domains** tab. Vercel will give you DNS records to add at your registrar.

Every future `git push` to `main` will automatically redeploy.

### Method 2 — Vercel CLI (one-off deploy)

```bash
# Install the CLI once
npm install -g vercel

# From the project folder
vercel

# Follow the prompts — accept the defaults
# (project name, scope, link to existing? No, etc.)

# To deploy to production
vercel --prod
```

---

## Custom domain (durande.com)

After deploying, in the Vercel dashboard:

1. Open your project → **Settings → Domains**
2. Add `durande.com` and `www.durande.com`
3. Vercel shows the DNS records you need to add at your domain registrar (typically an `A` record `76.76.21.21` and a `CNAME` for `www` → `cname.vercel-dns.com`)
4. SSL certificates are issued automatically once DNS propagates (usually <30 minutes)

---

## Project structure

```
durande-website/
├── index.html                  # Root HTML (SEO meta tags)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                 # Pins Vercel build settings (optional)
├── public/
│   └── favicon.svg             # Brand favicon
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component
    ├── index.css               # Tailwind directives + globals
    └── components/
        └── DurandeWebsite.jsx  # ⭐ All site sections
```

**Everything visual lives in `src/components/DurandeWebsite.jsx`.** Data arrays
(services, pricing, industries, solutions, process steps) sit at the top of
that file — edit them there and the site updates everywhere they're rendered.

---

## Editing content

Open `src/components/DurandeWebsite.jsx`. Near the top of the `DurandeWebsite`
function you'll find:

- `services` — the 8 service cards
- `whyUs` — the "Why Durande" grid
- `steps` — the 4 process steps
- `industries` — industry pill tags
- `solutions` — featured solution cards (JSX-style names)
- `pricing` — the 4 pricing plans (set `featured: true` to highlight one)
- `stack` — items in the scrolling tech-stack marquee

Contact details (email, phone, address) are in the **Contact** section's
JSX — search for `hello@durande.com` to find them.

---

## Tech notes

- **Fonts** load from Google Fonts at runtime (Geist, Geist Mono, Instrument Serif). No build step needed.
- **No external state management** — just React `useState` + a small `IntersectionObserver` hook for scroll reveals.
- **No backend** — the contact form currently logs to local state. To send real emails, plug in [Resend](https://resend.com), [Formspree](https://formspree.io) or a Vercel serverless function in `api/contact.js`.
- **Tailwind v3** — using core utilities only, no custom plugins, so it works anywhere.

---

© 2026 Durande.com
