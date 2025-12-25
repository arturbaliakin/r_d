import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    public constructor(private readonly page: Page) {}

    private get loginButton(): Locator {
        return this.page.locator('[class = "nav-button signin-button"]');
    }

    private get taxesTab(): Locator {
        return this.page.locator('.nav-item:nth-child(3)');
    }

    private get dropdown(): Locator {
        return this.page.locator('.dropdown-menu open');
    }

    private get allTaxes(): Locator {
        return this.page.locator('a[href="/taxes/all"]');
    }

    private get pendingTaxes(): Locator {
        return this.page.locator('a[href="/taxes/pending"]');
    }

    private get paidTaxes(): Locator {
        return this.page.locator('a[href="/taxes/paid"]');
    }

    public async hoverTaxes(): Promise<void> {
        await this.taxesTab.hover();
        await this.page.waitForTimeout(1000);
    }

    public async openAllTaxes(): Promise<void> {
        await this.hoverTaxes();
        await this.allTaxes.click();
    }

    public async openPendingTaxes(): Promise<void> {
        await this.hoverTaxes();
        await this.pendingTaxes.click();
    }

    public async openPaidTaxes(): Promise<void> {
        await this.hoverTaxes();
        await this.paidTaxes.click();
    }

    public async login(): Promise<void> {
        await this.loginButton.click();
        await this.page.fill('#login-email', 'arthurbalyakin@gmail.com');
        await this.page.fill('#login-password', 'Gs2PvYcK7H38Nh2!');
        await this.page.locator('[type="submit"]').click();
    }

    private expandableMenu(menuName: string): Locator {
        return this.page.locator('.nav-item', {
            has: this.page.getByRole('button', { name: menuName })
        });
    }

    private expandableMenuItem(menuName: string, itemName: string): Locator {
        return this.expandableMenu(menuName).locator('.dropdown-item', { hasText: itemName });
    }

    public async openExpandableMenuItem(menuName: string, itemName: string): Promise<void> {
        const menu = this.expandableMenu(menuName);

        await menu.hover();
        await this.expandableMenuItem(menuName, itemName).click();
    }
}
