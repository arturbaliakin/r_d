import { test, expect } from '@playwright/test';
import { SideMenuComponent } from '../src/commponents/side-menu.component';

test.describe('SideMenuComponent', () => {

    let sideMenu: SideMenuComponent;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://lun.ua/');
        sideMenu = new SideMenuComponent(page.locator('[class="Button-module_icon__NRBaE Navigation-module_burgerButtonIcon__TOHqM"]'));
    });

    test('should verify all 7 single menu elements are present and clickable', async ({ page }) => {

        await page.locator('[class="Button-module_icon__NRBaE Navigation-module_burgerButtonIcon__TOHqM"]').click();
        await page.waitForTimeout(500);

        const singleMenuItems = page.locator('div[class="NavigationSidebar-module_links__v0Cgv"] a[data-event-action="navigation_menu"]');
        const count = await singleMenuItems.count();

        expect(count).toBe(7);

        for (let i = 0; i < count; i++) {
            const item = singleMenuItems.nth(i);
            await expect(item).toBeVisible();
            await expect(item).toBeEnabled();

            const text = await item.textContent();
            expect(text?.trim().length).toBeGreaterThan(0);
        }
    });

    test('should verify all other projects items are present and clickable', async ({ page }) => {
        await page.locator('[class="Button-module_icon__NRBaE Navigation-module_burgerButtonIcon__TOHqM"]').click();
        await page.waitForTimeout(500);

        const otherProjectsItems = page.locator(
            'div[class="NavigationSidebar-module_projects__sXOsT"] a[data-event-action="navigation_menu"]'
        );
        const count = await otherProjectsItems.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const item = otherProjectsItems.nth(i);
            await expect(item).toBeVisible();
            await expect(item).toBeEnabled();

            const text = await item.textContent();
            expect(text?.trim().length).toBeGreaterThan(0);
        }
    });
});
