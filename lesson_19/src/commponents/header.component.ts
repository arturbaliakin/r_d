import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    private get singleHeaderItem(): Locator {
        return this.baseLocator.locator(
            'div[class="Tabs-module_root__5zt5O Navigation-module_tabs__iSNQ4"] [data-event-action="navigation_menu"]'
        );
    }

    private get locationHeaderItem(): Locator {
        return this.baseLocator.locator('[data-event-action="geo_search"]');
    }

    private get mainLogoHeader(): Locator {
        return this.baseLocator.locator('[data-event-action="navigation_top"] img');
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async clickEveryHeaderItem(page: Page): Promise<void> {
        for (let i = 0; i < 5; i++) {
            // Re-query the locator each iteration to get fresh elements
            const item = this.singleHeaderItem.nth(i);
            await item.waitFor({ state: 'visible' });
            await item.click();
            await page.waitForLoadState('load');
        }
    }

    public async clickLocationHeaderItem(page: Page): Promise<void> {
        await this.locationHeaderItem.waitFor({ state: 'visible' });
        await this.locationHeaderItem.click();
        await page.waitForLoadState('load');
    }

    public async clickMainLogoHeader(page: Page): Promise<void> {
        await this.mainLogoHeader.waitFor({ state: 'visible' });
        await this.mainLogoHeader.click();
        await page.waitForLoadState('load');
    }
}
