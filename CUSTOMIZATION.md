# AgencyOS — Developer Customization Guide

This guide explains how to customize, extend, and connect your own backend to AgencyOS.

---

## 1. Replacing Demo Data with Real Data

All default template data is organized cleanly inside `src/data/demo/`:

| File | Contains |
| :--- | :--- |
| [`src/data/demo/projects.data.js`](./src/data/demo/projects.data.js) | Initial projects array, category lists, client options, and PM assignments. |
| [`src/data/demo/team.data.js`](./src/data/demo/team.data.js) | Project managers, team members, capacity limits, and avatar styles. |
| [`src/data/demo/finance.data.js`](./src/data/demo/finance.data.js) | Monthly revenue series, category distribution, and outstanding invoices. |
| [`src/data/demo/deadlines.data.js`](./src/data/demo/deadlines.data.js) | Upcoming milestones, danger alerts, and due date calculators. |
| [`src/data/demo/tasks.data.js`](./src/data/demo/tasks.data.js) | Default task stages, assignees, and priorities for the project details view. |

### How to use your own projects array:
Open [`src/data/demo/projects.data.js`](./src/data/demo/projects.data.js) and update `initialProjectsData`:
```javascript
export const initialProjectsData = [
  {
    id: 1,
    name: 'Brand Redesign & Design System',
    client: 'Acme International',
    category: 'Branding',
    status: 'Active',
    statusColor: '#0C61CF',
    statusBg: '#EFF6FF',
    pmInitials: 'JD',
    pmName: 'Jane Doe',
    pmGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    deadline: '15 December 2026',
    budget: '$45,000',
  },
  // Add your projects here...
];
```

---

## 2. Changing Colors and Design Tokens

Design variables are defined in [`src/styles/tokens.css`](./src/styles/tokens.css).

To change the primary brand color from AgencyOS Blue (`#0C61CF`) to your custom color:
```css
:root {
  /* Change primary brand colors */
  --color-primary-600: #7C3AED; /* e.g. Purple */
  --brand-primary: #7C3AED;
  --button-primary-bg: #7C3AED;
}
```

Both Light and Dark mode themes automatically inherit these tokens.

---

## 3. Connecting a Custom Database or REST API

AgencyOS uses a service layer located in `src/services/`. All API calls are decoupled from React components.

### Connecting your REST API to Projects:
Open [`src/services/projects.service.js`](./src/services/projects.service.js) and replace the local storage functions with your `fetch` or `axios` calls:

```javascript
// Example async project fetcher
export async function getProjects() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}
```

---

## 4. Connecting Supabase

AgencyOS includes a production-ready SQL database schema at [`supabase/schema.sql`](./supabase/schema.sql).

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and paste the contents of `supabase/schema.sql`.
3. Set `VITE_AUTH_PROVIDER="supabase"` in your `.env` file:
```bash
VITE_AUTH_PROVIDER="supabase"
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```
4. Install the `@supabase/supabase-js` client if you wish to use the official SDK:
```bash
npm install @supabase/supabase-js
```

---

## 5. Adding a New Navigation View / Page

To add a new screen (e.g. "Invoices"):

1. **Create the component**: Create `src/features/invoices/InvoicesPage.jsx`.
2. **Register the route**: Open [`src/config/navigation.config.js`](./src/config/navigation.config.js) and add your item:
```javascript
export const navItems = [
  // ... existing items
  {
    key: 'invoices',
    label: 'Invoices',
    icon: 'IconWallet',
    hash: '#/invoices',
  },
];
```
3. **Render in Dashboard**: Open [`src/features/dashboard/DashboardPage.jsx`](./src/features/dashboard/DashboardPage.jsx) and add the conditional render:
```jsx
{activeNav === 'invoices' && <InvoicesPage />}
```

---

## 6. Currency & Number Formatting

Default currency formatting uses Indonesian Rupiah (`Rp`), but can easily be configured for USD, EUR, GBP, etc.

Edit `formatCurrency` in [`src/data/demo/finance.data.js`](./src/data/demo/finance.data.js) or change `appConfig.currency` in [`src/config/app.config.js`](./src/config/app.config.js):

```javascript
export const appConfig = {
  currency: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
  },
};
```

---

## 7. Need Assistance?

If you have questions or encounter any issues customizing AgencyOS, check the official documentation or reach out via your template purchase support channel.
