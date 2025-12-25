import { expect, Locator, Page } from '@playwright/test';

export class IncomesPage {
    private readonly _url = 'https://new.fophelp.pro/incomes';

    public constructor(private readonly page: Page) {}

    private get firstIncome(): Locator {
        return this.page.locator('.add-first-income-btn');
    }

    private get income(): Locator {
        return this.page.locator('.add-button');
    }

    private get currencySelect(): Locator {
        return this.page.locator('#currency');
    }

    private get dateInput(): Locator {
        return this.page.locator('#date');
    }

    private get addAmount(): Locator {
        return this.page.locator('#amount');
    }

    private get addComment(): Locator {
        return this.page.locator('#comment');
    }

    private get resetButton(): Locator {
        return this.page.locator('div[class = modal-actions] button[type = button]');
    }

    private get submitButton(): Locator {
        return this.page.locator('[type =submit]');
    }

    public async addFirstIncome(): Promise<void> {
        const firstCount = await this.firstIncome.count();
        if (firstCount > 0) {
            await this.firstIncome.click();
            return;
        }

        const addCount = await this.income.count();
        if (addCount > 0) {
            await this.income.click();
        }
    }

    public async addIncome(): Promise<void> {
        await this.income.click();
    }

    public async addAmountValue(amount: string): Promise<void> {
        await this.addAmount.click();
        await this.addAmount.fill(amount);
        await this.page.keyboard.press('Tab');

        await expect(this.addAmount).toHaveValue(amount);
    }

    public async addCommentValue(comment: string): Promise<void> {
        await this.addComment.focus();
        await this.addComment.fill(comment);
    }

    public async chooseCurrency(currency: 'UAH' | 'USD' | 'EUR'): Promise<void> {
        await this.currencySelect.click();
        await this.currencySelect.selectOption(currency);
    }

    public async resetIncome(): Promise<void> {
        await this.resetButton.click();
    }

    public async submitIncome(): Promise<void> {
        await this.submitButton.click();
    }

    public async setDate(date: Date): Promise<void> {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = String(date.getFullYear()).padStart(4, '0');

        const digits = `${day}${month}${year}`;

        await this.dateInput.click();
        await this.dateInput.focus();
        await this.dateInput.type(digits);

        await this.page.keyboard.press('Tab');
    }
}
