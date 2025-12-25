import { expect } from '@playwright/test';
import { FetchApiService } from '../src/fetch-api.service';

const baseUrl = 'https://new.fophelp.pro';

describe('Income API Tests', () => {
    const apiService = new FetchApiService(baseUrl, {});

    describe('Add Income via API', () => {
        it('should create an income and return success message with ID', async () => {
            const payload = {
                Income: '100000',
                Date: '2023-12-25',
                Comment: 'lkhjg',
                Currency: 'EUR',
                Cash: false
            };

            // Build Cookie header from env if available (matches curl -b behavior)
            const cookieFromEnv =
                process.env.API_COOKIE ||
                (process.env.X_ACCESS_TOKEN
                    ? `X-Access-Token=${process.env.X_ACCESS_TOKEN}; X-Username=${process.env.X_USERNAME || ''}`
                    : '');

            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (cookieFromEnv) headers['Cookie'] = cookieFromEnv;

            const response = await apiService.post('/api/v2.0/incomes/add', payload, headers);

            // Accept either plain text or JSON responses
            const text = await response.text();
            // Log for debugging when running locally — remove in CI
            console.log('API /incomes/add status', response.status);
            console.log('API /incomes/add body:', text);

            // Expected sample response (from recorded run)
            const expected = 'Successfully created income ID: a9d8dd2a-74a2-4f63-bc36-e6192625361b';

            expect(response.status).toBe(200);
            expect(text).toContain('Successfully created income ID');
            // If the exact recorded ID is returned, assert it as well
            if (text.includes('a9d8dd2a-74a2-4f63-bc36-e6192625361b')) {
                expect(text).toContain(expected);
            }
        });
    });
});
