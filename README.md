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
