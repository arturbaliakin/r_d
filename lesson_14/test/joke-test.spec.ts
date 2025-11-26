import { FetchApiService } from '../src/fetch-api.service';

describe('Joke API Tests', () => {
    const baseUrl = 'https://official-joke-api.appspot.com';
    const apiService = new FetchApiService(baseUrl, {});

    describe('Get Random Joke - Status Code and Structure', () => {
        it('should return status 200 and have all required keys', async () => {
            const response = await apiService.get('/random_joke');
            
            expect(response.status).toBe(200);
            
            const jsonData = await response.json();
            expect(jsonData).toHaveProperty('type');
            expect(jsonData).toHaveProperty('setup');
            expect(jsonData).toHaveProperty('punchline');
            expect(jsonData).toHaveProperty('id');
        });
    });

    describe('Get Random Ten Jokes - Array and Count Validation', () => {
        it('should return 200 status with array of 10 jokes', async () => {
            const response = await apiService.get('/random_ten');
            
            expect(response.status).toBe(200);
            
            const jsonData = await response.json();
            expect(Array.isArray(jsonData)).toBe(true);
            expect(jsonData.length).toBe(10);
        });
    });

    describe('Get Random Jokes by Amount - Count Equals Request', () => {
        it('should return requested number of jokes', async () => {
            const requestedAmount = 200;
            const response = await apiService.get(`/jokes/random/${requestedAmount}`);
            
            expect(response.status).toBe(200);
            
            const jsonData = await response.json();
            expect(Array.isArray(jsonData)).toBe(true);
            expect(jsonData.length).toBe(requestedAmount);
        });
    });

    describe('Get Joke by ID - ID Matching Validation', () => {
        it('should return a joke with matching ID', async () => {
            const jokeId = 2;
            const response = await apiService.get(`/jokes/${jokeId}`);
            
            expect(response.status).toBe(200);
            
            const jsonData = await response.json();
            expect(jsonData.id).toBe(jokeId);
        });
    });

    describe('All Fields Have Correct Types - Data Type Validation', () => {
        it('should have correct data types for all fields in random joke', async () => {
            const response = await apiService.get('/random_joke');
            
            const jsonData = await response.json();
            
            expect(typeof jsonData.type).toBe('string');
            expect(typeof jsonData.setup).toBe('string');
            expect(typeof jsonData.punchline).toBe('string');
            expect(typeof jsonData.id).toBe('number');
        });
    });
});
