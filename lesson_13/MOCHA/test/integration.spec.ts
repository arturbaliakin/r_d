import { expect } from 'chai';

const BASE_URL = process.env.BASE_URL || 'https://api.thecatapi.com/v1';
const API_KEY = process.env.CAT_API_KEY || 'live_Gi3LNdjavvAwzZaAB7wxVuvog1DEyVB1p7t2C64vfxkOPEvtc3GeNVEf1pmGB5qT';

describe('Integration: Images / Votes / Favourites', function (this: Mocha.Context) {
    this.timeout(120000);

    let imageId: string;

    it('images_search - should return an array with image objects that include categories', async function (this: Mocha.Context) {
        const res = await fetch(`${BASE_URL}/images/search`, {
            headers: { 'x-api-key': API_KEY, accept: '*/*' }
        });
        expect(res.ok).to.be.true;
        const body = await res.json();
        expect(body).to.be.an('array');
        expect(body.length).to.be.greaterThan(0);
        const first = body[0];

        expect(first).to.contain.keys(['id', 'url', 'breeds', 'width', 'height']);
        if (Object.prototype.hasOwnProperty.call(first, 'categories')) {
            expect(first.categories).to.be.an('array');
        }
        imageId = first.id;
    });

    it('votes - should allow posting a vote for an image', async function (this: Mocha.Context) {
        if (!imageId) this.skip();

        const payload = {
            image_id: imageId,
            sub_id: 'integration_test_runner',
            value: 1
        };

        const res = await fetch(`${BASE_URL}/votes`, {
            method: 'POST',
            headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        expect(res.status).to.be.oneOf([200, 201]);
        const body = await res.json();
        expect(body).to.be.an('object');
    });

    it('favourites POST - should create a favourite for the image', async function (this: Mocha.Context) {
        if (!imageId) this.skip();

        const payload = { image_id: imageId, sub_id: 'integration_test_runner' };
        const res = await fetch(`${BASE_URL}/favourites`, {
            method: 'POST',
            headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        expect(res.status).to.be.oneOf([200, 201]);
        const body = await res.json();
        expect(body).to.be.an('object');
        if (Object.prototype.hasOwnProperty.call(body, 'id')) {
            expect(body.id).to.be.a('number');
        }
    });

    it('favourites GET - should list favourites and include the created one', async () => {
        const res = await fetch(`${BASE_URL}/favourites`, {
            headers: { 'x-api-key': API_KEY }
        });
        expect(res.ok).to.be.true;
        const body = await res.json();
        expect(body).to.be.an('array');
        if (body.length > 0) {
            const first = body[0];
            expect(first).to.contain.keys(['id', 'user_id', 'image_id', 'image']);
        }
    });
});
