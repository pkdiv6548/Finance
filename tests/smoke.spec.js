const { test, expect } = require('@playwright/test');

test.describe('Finance app browser smoke tests', () => {
  test('all separate pages load without browser errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [path, heading] of [
      ['index.html', 'Your money, at a glance'],
      ['transactions.html', 'Transactions'],
      ['budgets.html', 'Budget planner'],
      ['goals.html', 'Savings goals'],
      ['bills.html', 'Bills & payments'],
      ['reports.html', 'Money reports'],
      ['settings.html', 'Settings']
    ]) {
      await page.goto('http://127.0.0.1:4173/' + path);
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
      await expect(page.locator('#app-shell')).toHaveCount(0); // App is mounted in #app; this also guards against unexpected duplicate shells.
      await expect(page.locator('.app-shell')).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });

  test('can create and find a transaction', async ({ page }) => {
    await page.goto('http://127.0.0.1:4173/transactions.html');
    await page.getByRole('button', { name: /Add transaction/i }).first().click();
    await page.getByLabel('Description').fill('Browser test expense');
    await page.getByLabel('Amount (₹)').fill('1234');
    await page.getByLabel('Type').selectOption('expense');
    await page.getByLabel('Category').selectOption('Food');
    await page.getByLabel('Date').fill('2026-10-20');
    await page.getByRole('button', { name: 'Save transaction' }).click();
    await expect(page.getByText('Browser test expense')).toBeVisible();
    await page.getByPlaceholder('Search description or category').fill('Browser test expense');
    await expect(page.getByText('Browser test expense')).toBeVisible();
    await expect(page.getByText('1234', { exact: false }).first()).toBeVisible();
  });

  test('budget, savings goal, and bill forms save records', async ({ page }) => {
    await page.goto('http://127.0.0.1:4173/budgets.html');
    await page.locator('#budgetCat').selectOption({ label: 'Health' });
    await page.locator('#budgetLimit').fill('2500');
    await page.getByRole('button', { name: 'Save budget' }).click();
    await expect(page.getByText('Health', { exact: true }).first()).toBeVisible();

    await page.goto('http://127.0.0.1:4173/goals.html');
    await page.locator('#goalName').fill('Browser test goal');
    await page.locator('#goalTarget').fill('10000');
    await page.locator('#goalSaved').fill('500');
    await page.getByRole('button', { name: 'Create goal' }).click();
    await expect(page.getByText('Browser test goal')).toBeVisible();

    await page.goto('http://127.0.0.1:4173/bills.html');
    await page.locator('#billName').fill('Browser test bill');
    await page.locator('#billAmount').fill('750');
    await page.locator('#billDue').fill('2026-10-25');
    await page.getByRole('button', { name: 'Add bill' }).click();
    await expect(page.getByText('Browser test bill')).toBeVisible();
  });

  test('backup download control works and layout remains usable on mobile', async ({ page }) => {
    await page.goto('http://127.0.0.1:4173/settings.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download JSON' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('finance-backup.json');

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:4173/index.html');
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(page.locator('.sidebar.open')).toBeVisible();
  });
});
