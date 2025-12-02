import { test, expect } from '@playwright/test';
import { HeaderComponent } from '../src/commponents/header.component';

test.describe('Header', () => {
    let header: HeaderComponent;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://lun.ua/');

        header = new HeaderComponent(page.locator('[class="Navigation-module_wrapper__R12HL"]'));
    });

    test('should click every header item', async ({ page }) => {
        await header.clickEveryHeaderItem(page);
        await expect(page).toHaveTitle('Мої ЛУН Новобудови');
    });

    test('should click location header item', async ({ page }) => {
        await header.clickLocationHeaderItem(page);

        // Verify dropdown appears
        const dropdown = page.locator('[class="Popup-module_enterDone__k-WQD NavigationCitySelect-module_popupTransitioned__WJcVl"]');
        await expect(dropdown).toBeVisible();
    });

    test('should click main logo header', async ({ page }) => {
        await header.clickMainLogoHeader(page);

        // Verify the logo is clickable and page navigates
        await expect(page).toHaveURL('https://lun.ua/');
    });
});
