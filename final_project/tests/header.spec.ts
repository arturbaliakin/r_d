import { test, expect } from '@playwright/test';
import { HeaderComponent } from '../src/components/header.component';

test.describe('Header - basic flows', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to base and perform login via header component before each test
        await page.goto('https://new.fophelp.pro');
        const header = new HeaderComponent(page);
        await header.login();

        await page.waitForTimeout(1500);
    });

    test('Redirect to all taxes', async ({ page }) => {
        const header = new HeaderComponent(page);
        await header.openAllTaxes();
        await expect(page).toHaveURL(/\/taxes\/all$/);
    });

    test('Redirect to pending taxes', async ({ page }) => {
        const header = new HeaderComponent(page);
        await header.openPendingTaxes();
        await expect(page).toHaveURL(/\/taxes\/pending$/);
    });

    test('Redirect to paid taxes', async ({ page }) => {
        const header = new HeaderComponent(page);
        await header.openPaidTaxes();
        await expect(page).toHaveURL(/\/taxes\/paid$/);
    });
});
