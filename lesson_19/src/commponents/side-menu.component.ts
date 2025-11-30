import { Locator } from '@playwright/test';


export class SideMenuComponent {
    private get OpenSideMenu(): Locator {
        return this.baseLocator.locator('[class="Button-module_icon__NRBaE Navigation-module_burgerButtonIcon__TOHqM"]');
    }

    private get SingleMenu(): Locator {
        return this.baseLocator.locator('div[class="NavigationSidebar-module_links__v0Cgv"] a[data-event-action="navigation_menu"]');
    }

    private getSingleMenuItem(): Locator {
        return this.baseLocator.locator('//div[contains(@class, "NavigationSidebar-module_links")]//a[@data-event-action="navigation_menu"]');
    }

    private get OtherProjects(): Locator {
        return this.baseLocator.locator('div[class="NavigationSidebar-module_projects__sXOsT"] a[data-event-action="navigation_menu"]');
    }

    private getOtherProjectsItem(): Locator {
        return this.baseLocator.locator('//div[contains(@class, "NavigationSidebar-module_projects")]//a[@data-event-action="navigation_menu"]');
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getMenuItems(): Promise<string[]> {
        const menuItems : string[] = [];
        const singleMenuItem = await this.SingleMenu.all();
        for (const item of singleMenuItem) {
            menuItems.push((await item.textContent() as string));
        }

        const otherProjectsItem = await this.OtherProjects.all();
        for (const item of otherProjectsItem) {
            menuItems.push((await item.textContent() as string));
        }

        return menuItems;
    }

    public async clickSingleMenuItem(): Promise<void> {
        const menuItems = await this.SingleMenu.all();

        if (menuItems.length !== 7) {
            throw new Error(`Expected 7 menu items, but found ${menuItems.length}`);
        }

        for (const item of menuItems) {
            await item.click();
        }
    }

    public async clickOtherProjectsItem(): Promise<void> {
        const projectItems = await this.OtherProjects.all();

        if (projectItems.length === 0) {
            throw new Error('No other projects items found');
        }

        for (const item of projectItems) {
            await item.click();
        }
    }
}
