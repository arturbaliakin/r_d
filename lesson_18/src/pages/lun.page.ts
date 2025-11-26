import { Locator, Page } from '@playwright/test';

export class LunPage {
    private readonly _url = 'https://lun.ua/';

    private get AllProjects(): Locator {
        return this.page.locator('img[data-src="/img/home/buildings.png"]');
    }

    private get ChooseHouse(): Locator {
        return this.page.locator(
            'div[class="Card Card-x2"] a[href="https://lun.ua/uk/new/kyiv/sofiivska-borshchahivka-atmosfera-premium"]'
        );
    }

    private get ShowNews(): Locator {
        return this.page.locator('a[data-tab="updates"]');
    }

    private get GetByText(): Locator {
        return this.page.locator('div.Tabs-module_content__bY-7P.Navigation-module_tabContent__h80sy', {
            hasText: 'Мій ЛУН'
        });
    }

    private get Subscribe(): Locator {
        return this.page.locator('button[data-event-action="subscription"]');
    }

    public constructor(private readonly page: Page) {}

    public async goto(): Promise<void> {
        await this.page.goto('https://lun.ua/');
    }

    public async ChooseNewHouse(): Promise<void> {
        await this.AllProjects.click();
        await this.ChooseHouse.click();
        await this.ShowNews.click();
    }

    public async SearchBuiler(): Promise<void> {
        await this.GetByText.click();
        await this.page.fill('input[id="email"]', 'r_d@gmail.com');
        await this.Subscribe.click();
    }
}
