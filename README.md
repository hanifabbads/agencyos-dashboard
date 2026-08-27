# AgencyOS

> **The all-in-one operations workspace and high-converting landing page template for modern creative agencies, development studios, and digital consultancies.**

AgencyOS brings project management, client deliverables, team capacity, deadline tracking, and financial analytics into one unified, calm, and beautifully engineered workspace. Built with React 18, Vite 6, Vanilla CSS design tokens, and modular service abstractions.

---

## Features

- 🚀 **Conversion-Ready Landing Page**: High-impact hero section, live interactive feature showcase tabs, before/after theme comparison slider, benefits grid, testimonials, pricing plans, and sticky navigation.
- 📊 **Executive Operations Dashboard**: Real-time KPI summaries, pure SVG curved revenue trend charts with month hover tooltips, category mix donut distribution chart, active project list, upcoming deadline monitors, and recent activity log.
- 📁 **Projects Hub**: Sortable, searchable table supporting 300+ engagements across 6 agency categories, custom status pill counters with dynamic counts, live search filter, and instant pagination controls.
- 🎯 **Deep Project Workspace**: Dedicated details view with phase progress tracking (Design, Development, Testing), interactive task management table, milestone timelines, and activity audit trails.
- 👥 **Team Workload & Capacity Roster**: Live capacity indicators, task threshold limits, active engagement counters, and direct contact actions for Project Managers and specialists.
- ⏰ **Deadlines & Risk Alerts**: Real-time due date countdowns (`d Overdue`, `Due Today`, `d Left`), priority severity filters, and outstanding invoice payment trackers.
- 🎨 **Dark & Light Modes**: Seamless, flicker-free theme switching powered by a comprehensive CSS custom properties token system with persistent user preference.
- 🔍 **Live Search Popover**: Keyboard-accessible global search modal (`ArrowUp`, `ArrowDown`, `Enter`, `Esc`) with real-time matching across projects, clients, team members, and deadlines.
- 📱 **100% Fluid Responsive Layout**: Clean multi-column grids on large desktop (1440px+), balanced desktop (1280px), optimized tablet with drawer menus (834px), and mobile touch-friendly views (402px).
- 🔒 **Zero-Config Standalone Demo Mode**: Runs locally right out of the box with zero external dependencies, database setups, or API keys required.

---

# Quick Start

Get AgencyOS running on your machine in under 2 minutes.

## Requirements

Before installing AgencyOS, ensure your development machine meets the following requirements:

- **Node.js**: `v18.0.0` or higher (`v20.x` or `v22.x` LTS recommended).
- **Package Manager**: `npm` (`v9.0.0` or higher), `yarn`, or `pnpm`.
- **Operating System**: macOS, Windows (WSL / PowerShell), or Linux.
- **Web Browser**: Any modern browser (Google Chrome, Safari, Firefox, Microsoft Edge, Brave).

To verify your Node.js and npm installations, open your terminal and run:

```bash
node -v
npm -v
```

> **Note**: If you do not have Node.js installed, download the official installer from [nodejs.org](https://nodejs.org/).

---

## Installation

1. **Extract the ZIP package**: Uncompress the downloaded `AgencyOS.zip` file into your desired project directory.
2. **Open Terminal**: Navigate to the root directory of the extracted project:

```bash
cd AgencyOS
```

3. **Install Dependencies**: Run the install command to download all required packages:

```bash
npm install
```

*(Alternatively, you can run `yarn install` or `pnpm install`)*.

---

## Running Locally

To start the Vite development server with hot module reloading (HMR):

```bash
npm run dev
```

The terminal will display the local development server URL:

```text
  VITE v6.0.7  ready in 240 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your web browser and navigate to **`http://localhost:3000`** *(or the port indicated in your terminal)*.

---

## Demo Mode

By default, AgencyOS launches in **Demo Mode**. 

- **No backend or cloud accounts needed**: You do not need to configure Firebase, Supabase, or any database to explore, evaluate, or develop the template.
- **Client-Side Persistence**: Profile updates, new project creations, and settings edits automatically persist across page reloads using browser `localStorage`.
- **Instant Authentication**: Click **"Sign In"** or **"Register"** with any credentials, or click **"Continue with Google"** / **"Continue with Apple"** to immediately access the dashboard as an Agency Owner.

---

# Authentication

AgencyOS features a decoupled authentication architecture located in [`src/services/auth.service.js`](./src/services/auth.service.js). You can switch between authentication modes via the `VITE_AUTH_PROVIDER` environment variable:

### 1. Standalone Demo Mode (Default)
- Configured via: `VITE_AUTH_PROVIDER="demo"` (or when no environment variables are set).
- Handles login, signup, Google/Apple mock sign-in, profile settings, and logout entirely client-side.
- Zero external credentials, accounts, or database setup required.

### 2. Google Firebase Mode
- Configured via: `VITE_AUTH_PROVIDER="firebase"`.
- Uses the official Firebase Web SDK (`firebase/auth`) for production authentication.
- **Strict OAuth Flow**: Google and Apple buttons trigger real Firebase OAuth popup authentication without silent fallbacks. If authentication is cancelled or misconfigured, clear user-friendly errors are displayed on the login screen.

#### Setting up your Firebase Project:
1. Create a project at the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Authentication** → **Sign-in method**.
3. Enable **Email/Password**.
4. Enable **Google** provider and configure your project support email.
5. *(Optional)* Enable **Apple** provider:
   > **Note on Apple Sign-In**: Apple OAuth requires an active Apple Developer Program membership. You must configure your **Services ID**, **Apple Team ID**, **Key ID**, and private key in the Firebase Console under the Apple provider settings.
6. Under **Project Settings** → **General** → **Your apps**, create a Web App and copy your config values into `.env`:
   ```bash
   VITE_AUTH_PROVIDER="firebase"
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```
7. Start your local server (`npm run dev`). Authentication will now run through your live Firebase project.

### 3. Supabase / Custom REST Authentication
- Configured via: `VITE_AUTH_PROVIDER="supabase"`.
- Plug your API endpoints or `@supabase/supabase-js` client directly into [`src/services/auth.service.js`](./src/services/auth.service.js). See [**CUSTOMIZATION.md**](./CUSTOMIZATION.md) for database schemas and integration guides.

---

# Environment Variables

AgencyOS uses Vite environment variables prefixed with `VITE_`.

A template file is provided at [`.env.example`](./.env.example). To customize environment variables:

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Open `.env` and fill in your desired parameters:

```bash
# Application Identity
VITE_APP_NAME="AgencyOS"

# Authentication Provider: "demo" | "firebase" | "supabase"
VITE_AUTH_PROVIDER="demo"

# ------------------------------------------------------------------------------
# Firebase Settings (Required only if VITE_AUTH_PROVIDER="firebase")
# ------------------------------------------------------------------------------
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""

# ------------------------------------------------------------------------------
# Supabase Settings (Required only if VITE_AUTH_PROVIDER="supabase")
# ------------------------------------------------------------------------------
VITE_SUPABASE_URL=""
VITE_SUPABASE_ANON_KEY=""

# ------------------------------------------------------------------------------
# Custom REST / GraphQL Backend URL (Optional)
# ------------------------------------------------------------------------------
VITE_API_BASE_URL=""
```

> **Security Warning**: Never commit your `.env` or `.env.local` files containing real production credentials to public Git repositories. `.gitignore` is already pre-configured to exclude them.

---

# Customization

AgencyOS is architected for rapid, painless rebranding and customization:

### 1. Rebranding in 5 Minutes
Open [`src/config/branding.config.js`](./src/config/branding.config.js) to customize your brand identity:

```javascript
export const brandingConfig = {
  brandName: 'YourAgency',
  tagline: 'Run your creative agency without the chaos',
  logo: {
    src: logoImg, // Or replace src/assets/agencyos-logo.png
    alt: 'YourAgency Logo',
    borderRadius: '8px',
  },
  company: {
    name: 'YourAgency Inc.',
    copyright: '© 2026 YourAgency. All rights reserved.',
    supportEmail: 'support@youragency.com',
  },
  // Customize links, landing headlines, and testimonials...
};
```

### 2. Application & Currency Configuration
Open [`src/config/app.config.js`](./src/config/app.config.js) to adjust global defaults, pagination limits, and currency formatting:

```javascript
export const appConfig = {
  name: 'AgencyOS',
  authProvider: import.meta.env.VITE_AUTH_PROVIDER || 'demo',
  locale: {
    currencyCode: 'USD',
    currencySymbol: '$',
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  pagination: {
    projectsPerPage: 30,
  },
};
```

### 3. Replacing Demo Data
All sample datasets are cleanly separated in [`src/data/demo/`](./src/data/demo/):
- **Projects**: [`src/data/demo/projects.data.js`](./src/data/demo/projects.data.js)
- **Team**: [`src/data/demo/team.data.js`](./src/data/demo/team.data.js)
- **Finances & Invoices**: [`src/data/demo/finance.data.js`](./src/data/demo/finance.data.js)
- **Deadlines & Alerts**: [`src/data/demo/deadlines.data.js`](./src/data/demo/deadlines.data.js)

For complete customization instructions, see [**CUSTOMIZATION.md**](./CUSTOMIZATION.md).

---

# Project Structure

```text
AgencyOS/
├── public/                     # Static assets served at root (logos, preview images)
│   ├── agencyos-logo.png       # Default favicon and logo asset
│   ├── compare-modes.png       # Landing page interactive compare preview
│   ├── dashboard-dark.png      # Dark mode hero graphic
│   └── hero-dashboard.png      # Light mode hero graphic
├── src/
│   ├── assets/                 # Bundled visual assets
│   ├── config/                 # ⚙️ CENTRAL APP CONFIGURATION
│   │   ├── app.config.js       # Global settings, currency, feature flags
│   │   ├── branding.config.js  # Brand names, logos, slogans, footer copy
│   │   └── navigation.config.js# Sidebar routes, route hashes, page titles
│   ├── data/
│   │   └── demo/               # 📊 CENTRALIZED DEMO DATA
│   │       ├── deadlines.data.js# Deadlines list, countdown helper
│   │       ├── finance.data.js # Revenue curves, category mix, invoices
│   │       ├── index.js        # Re-export of all demo data
│   │       ├── notifications.data.js # In-app notification feed
│   │       ├── projects.data.js# 30 initial projects + 300 project generator
│   │       ├── tasks.data.js   # Project detail tasks
│   │       └── team.data.js    # PMs, specialists, capacity limits
│   ├── features/               # 🧩 MODULAR SCREEN COMPONENTS
│   │   ├── auth/               # SignInPage.jsx, SignUpPage.jsx
│   │   ├── dashboard/          # DashboardPage.jsx, SettingsModal.jsx
│   │   ├── deadlines/          # DeadlinesPage.jsx
│   │   ├── landing/            # LandingPage.jsx, LandingPage.css
│   │   ├── projects/           # ProjectsPage.jsx, ProjectDetailsPage.jsx, NewProjectModal.jsx
│   │   └── team/               # TeamPage.jsx
│   ├── services/               # 🔌 BACKEND & API ADAPTERS
│   │   ├── analytics.service.js# Financial analytics queries
│   │   ├── auth.service.js     # Unified auth service (Demo / Firebase / Supabase)
│   │   ├── firebase.js         # Safe Firebase initialization
│   │   ├── projects.service.js # Projects CRUD & KPI calculators
│   │   └── team.service.js     # Team members and workload queries
│   ├── styles/                 # 🎨 DESIGN SYSTEM & TOKENS
│   │   └── tokens.css          # Semantic CSS custom properties
│   ├── App.jsx                 # Top-level router & URL hash synchronization
│   ├── firebase.js             # Legacy re-export for backwards compatibility
│   ├── index.css               # Global stylesheets, responsive layouts, dark mode
│   └── main.jsx                # React 18 DOM mount point
├── .env.example                # Documented environment variables template
├── .gitignore                  # Git ignore rules for node_modules, build, and secrets
├── CUSTOMIZATION.md            # In-depth developer customization manual
├── index.html                  # HTML5 entry with SEO, favicon, and typography
├── package.json                # Project dependencies and build scripts
├── package-lock.json           # Deterministic dependency lockfile
├── README.md                   # Main product documentation
├── vercel.json                 # Single-Page Application rewrites for Vercel
└── vite.config.js              # Vite 6 build configuration & server alias
```

---

# Production Build

To create an optimized production bundle:

```bash
npm run build
```

This compiles your application into the `dist/` directory with:
- Minified JavaScript and CSS
- Content-hashed filenames for immutable browser caching
- Tree-shaken modules for maximum performance

---

# Preview Production Build

To preview the generated production build locally before deploying:

```bash
npm run preview
```

This starts a lightweight static server serving the contents of `dist/` at `http://localhost:4173` *(or the port displayed in terminal)*.

---

# Deployment to Vercel

AgencyOS is pre-configured for seamless, 1-click deployment on [Vercel](https://vercel.com).

### Step-by-Step Deployment:

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AgencyOS"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **"Add New..."** → **"Project"**.
   - Select your AgencyOS repository and click **"Import"**.

3. **Configure Build Settings**:
   - **Framework Preset**: `Vite` *(detected automatically)*.
   - **Build Command**: `npm run build` *(default)*.
   - **Output Directory**: `dist` *(default)*.
   - **Environment Variables**: Add any custom variables if using Firebase or Supabase.

4. **Click Deploy**:
   - Vercel will build and deploy your project in ~30 seconds.
   - The included [`vercel.json`](./vercel.json) handles single-page routing rewrites so direct navigation and refreshes on routes like `/#/projects` or `/#/team` will never throw 404 errors.

---

# Testing Checklist

Before deploying your customized version to production, verify:

- [ ] **Dependencies**: `npm install` runs cleanly without errors.
- [ ] **Development Server**: `npm run dev` starts and loads `http://localhost:3000`.
- [ ] **Landing Page**: All CTAs, interactive tabs, theme slider, and links work smoothly.
- [ ] **Authentication**: Sign in, register, and demo buttons successfully navigate to the dashboard.
- [ ] **Dashboard Views**: Projects, Project Details, Team, and Deadlines load and display data.
- [ ] **Search Popover**: Header search filters projects, clients, team members, and deadlines.
- [ ] **Theme Switching**: Dark mode and Light mode toggle cleanly across all pages and modals.
- [ ] **Responsive Design**: Viewport scales correctly on desktop (1440px), tablet (834px), and mobile (402px).
- [ ] **Production Build**: `npm run build` completes successfully.
- [ ] **Production Preview**: `npm run preview` functions identically to dev mode.

---

# Troubleshooting

### 1. `command not found: node` or `command not found: npm`
- **Cause**: Node.js is not installed or not added to your system's `PATH`.
- **Solution**: Download and install Node.js (LTS version) from [nodejs.org](https://nodejs.org/). After installing, close and reopen your terminal.

### 2. `Port 3000 is already in use`
- **Cause**: Another application or previous dev server is occupying port 3000.
- **Solution**: Vite will automatically offer to use the next available port (e.g., `3001` or `5173`). Alternatively, specify a custom port:
  ```bash
  npm run dev -- --port 4000
  ```

### 3. `npm install` fails or hangs
- **Cause**: Corrupted local npm cache or network interruption.
- **Solution**: Clear npm cache and retry clean installation:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

### 4. `EACCES: permission denied` on Vite bin
- **Cause**: Incorrect file permissions on Unix/macOS environments.
- **Solution**: Fix executable permissions for node binaries:
  ```bash
  chmod +x node_modules/.bin/vite
  ```

### 5. Blank White Screen in Browser
- **Cause**: JavaScript runtime error or corrupted browser storage cache.
- **Solution**: Open your browser's Developer Tools (`F12` or `Cmd + Option + I`), check the **Console** tab, and clear `localStorage` via **Application** → **Local Storage** → **Clear**.

---

# Additional Documentation

- [**CUSTOMIZATION.md**](./CUSTOMIZATION.md): Detailed instructions on connecting Supabase/PostgreSQL, plugging in custom REST APIs, customizing design tokens, and adding new sidebar pages.
- [**supabase/schema.sql**](./supabase/schema.sql): Ready-to-paste PostgreSQL schema for Supabase integration.

---

# Updating AgencyOS

When new updates or patches are released:
1. Back up your modified `src/config/branding.config.js` and `.env` files.
2. Extract the updated template package.
3. Re-apply your custom branding, demo data, or API service implementations.
4. Run `npm install` and `npm run build` to verify compatibility.

---

# License

This template is licensed for personal and commercial use. You may customize, rebrand, and deploy it for unlimited personal or client projects. Direct resale or redistribution of the template source code as a competing product is strictly prohibited.

---

# Support

If you have questions, encounter difficulties, or need guidance:
- Check the [Troubleshooting](#troubleshooting) section above.
- Review [CUSTOMIZATION.md](./CUSTOMIZATION.md) for technical deep-dives.
- Contact template support via your purchase platform messaging channel.
