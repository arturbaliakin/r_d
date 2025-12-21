import { test, expect } from '@playwright/test';
import { LunPage } from '../src/pages/lun.page';


test.describe('Filter the houses list', () => {
    test('shold filter all projects with chosen parameters', async ({page}) => {
        const lunPage = new LunPage(page);
        await lunPage.goto();
        await lunPage.ChooseNewHouse();

        await expect(page).toHaveTitle('ЖК Atmosfera Premium, Софіївська Борщагівка: новини, інформація про будівництво');
    });

    test('should find specific builder', async ({page}) => {
        const lunPage = new LunPage(page);
        await lunPage.goto();
        await lunPage.SearchBuiler();

        await expect(page).toHaveTitle('Мої ЛУН Новобудови');
    });
});

