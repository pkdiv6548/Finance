# Finance — Personal Finance Manager

A lightweight, India-friendly personal finance web app built with HTML, CSS and vanilla JavaScript. No framework, build step, API key, or paid service is required.

## Pages
- **Overview** — balance, monthly income/expenses, savings rate, category spend, budget and goal snapshots.
- **Transactions** — add, edit, delete, search, filter, import CSV and export CSV.
- **Budgets** — set monthly category limits and compare them with current-month spending.
- **Savings goals** — set a target and add savings progress.
- **Bills & payments** — keep a due-date list and mark bills paid.
- **Reports** — income/expense comparison, category totals, CSV and full JSON backup.
- **Settings** — workspace preferences, opening balance, backup restore and demo reset.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser. For the best local testing experience, you can also run a static server:
   - Python: `python -m http.server 8000`
   - Then open `http://localhost:8000`.
3. Use **Settings → Download backup** to keep a copy of your data.

## Data and privacy
- Records are stored in the current browser's `localStorage` under `finance-data-v1`.
- Data is not encrypted, does not sync across devices, and is not automatically backed up. Anyone with access to the same browser profile may be able to access it.
- The first run includes clearly illustrative sample records. Use Settings → Reset demo data to restore them.
- This project does **not** connect to banks, UPI apps, or payment providers. It does not send reminders, transfer money, or provide regulated financial advice.
- Never enter bank passwords, UPI PINs, OTPs, full card numbers, or CVVs.

## CSV import format
Use a header row with these columns: `title,amount,type,category,date,method,note`. The `type` value must be `income` or `expense`; dates should use `YYYY-MM-DD`. Import validates rows and skips rows with missing titles, invalid amounts, or invalid transaction types. Exported CSVs use the same format.

## Deployment
This is a static site and can be hosted on GitHub Pages or any static hosting service. Enable Pages in the repository settings and choose the `main` branch and root folder if you want a live URL. Hosting does not sync localStorage data between visitors or devices.

## Current limitations
No user accounts, cloud sync, bank integration, recurring automatic billing, multi-currency support, or server-side storage. Charts are lightweight CSS visuals; reporting is based only on transactions recorded in this browser.


## Expanded workspace modules (frontend demo)

The navigation now includes Accounts, Recurring Items, Subscriptions, Debt Manager, Investments, Assets & Liabilities, Invoices & Freelance, Spending Watchlists, Automation Rules, Categories & Tags, Refunds & Reimbursements, Reconciliation, Household Finance, and Notifications. These modules support local create/edit/delete, search, and CSV export where shown. Data is saved in browser storage only.

## Important implementation boundary

These are frontend planning and record-keeping tools, not live financial integrations. Automation rules are not a background job, watchlists do not send alerts, bills do not initiate payments, investments do not fetch market prices, household entries do not create separate user permissions, and reconciliation requires manual balances. Bank connections, authentication, secure cloud sync, encryption-at-rest, server-side storage, real notification delivery, tax filing and payment initiation require a secure backend and/or authorized providers and are not implemented in this static release.

## Expanded modules and local workflows

Dedicated pages now cover Accounts, Recurring Items, Subscriptions, Debt Manager, Investments, Assets & Liabilities, Invoices, Watchlists, Automation Rules, Categories, Refunds, Reconciliation, Household Finance, Notifications, Cash-flow Forecasts, Financial Calendar, Net Worth, Insights, Calculators, Tax Worksheet, Assistant, Data Export, Profile, Privacy and Help.

- Local records can be added, edited, deleted, searched and exported where supported.
- Custom categories can be used in transaction entry. Enabled rules can automatically assign a category when a new or edited transaction description matches the configured text.
- Recurring schedules can create a local transaction for a due occurrence. This never initiates a payment.
- Watchlists show threshold status when opened. They do not send background or remote alerts.
- Theme and a partial English/Hindi interface preference are stored locally.
- A PWA manifest, app icon, install prompt and service worker provide install/offline support when the browser supports it and the static site has loaded successfully online.

## Current limitations

This is still a frontend-only demo. It does not implement authentication, secure cloud sync, encrypted financial storage, bank/broker connections, real payment initiation, email/SMS/push delivery, live investment prices, tax filing, or a complete verified tax-liability calculator. The Hindi translation covers common navigation and interface labels, not every sentence on every page. The tax page is a taxable-income worksheet, not tax advice. Forecasts and insights are estimates based on locally entered records.

## Quick verification checklist

1. Open every page from the sidebar and confirm the page title/content loads.
2. Add/edit/delete a sample transaction and confirm dashboard/report values change.
3. Add a custom category and a matching automation rule; save a matching transaction and verify the category assignment.
4. Add a due recurring item and use “Create due transactions” once; confirm it creates a local transaction and advances the next date.
5. Export JSON and CSV, then restore only after downloading a backup.
6. Test dark theme, Hindi toggle, mobile navigation, install prompt, and offline fallback in a browser over HTTPS.
