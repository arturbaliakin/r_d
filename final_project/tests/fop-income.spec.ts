import { test, expect } from '@playwright/test';
import { IncomesPage } from '../src/pages/fop-income.page';
import { HeaderComponent } from '../src/components/header.component';

test.describe('IncomesPage - basic flows', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to base and perform login via header component before each test
        await page.goto('https://new.fophelp.pro');
        const header = new HeaderComponent(page);
        await header.login();

        await page.waitForTimeout(1500);
    });

    test('Add income', async ({ page }) => {
        await page.goto('https://new.fophelp.pro/incomes');
        const incomes = new IncomesPage(page);
        await incomes.addIncome();
        const modal = page.getByRole('heading', { name: 'Додати прибуток' });

        await expect(modal).toBeVisible();
    });

    test('Add ammount to field', async ({ page }) => {
        await page.goto('https://new.fophelp.pro/incomes');
        const incomes = new IncomesPage(page);
        await incomes.addIncome();
        await incomes.addAmountValue('1000');

        await expect(page.locator('#amount')).toHaveValue('1000');
    });

    test('Set correct date', async ({ page }) => {
        await page.goto('https://new.fophelp.pro/incomes');
        const incomes = new IncomesPage(page);
        await incomes.addIncome();
        await incomes.setDate(new Date(2001, 11, 11));

        await expect(page.locator('#date')).toHaveValue('2001-11-11');
    });

    test('Choose Currency selects', async ({ page }) => {
        await page.goto('https://new.fophelp.pro/incomes');
        const incomes = new IncomesPage(page);
        await incomes.addIncome();
        await incomes.chooseCurrency('EUR');

        await expect(page.locator('#currency')).toHaveValue('EUR');
    });

    test('Add new income', async ({ page }) => {
        await page.goto('https://new.fophelp.pro/incomes');
        const incomes = new IncomesPage(page);
        await incomes.addIncome();
        await incomes.addAmountValue('1000');
        await incomes.setDate(new Date(2025, 11, 12));
        await incomes.chooseCurrency('EUR');
        await incomes.addCommentValue('December income');
        await incomes.submitIncome();
        // Expect a success toast to appear after successful submit
        await expect(page.locator('.toast.toast-success')).toBeVisible({ timeout: 5000 });
    });
});
