import { expect } from 'chai';

const BASE_URL = process.env.BASE_URL || 'https://api.thecatapi.com/v1';
const API_KEY = process.env.CAT_API_KEY || 'live_Gi3LNdjavvAwzZaAB7wxVuvog1DEyVB1p7t2C64vfxkOPEvtc3GeNVEf1pmGB5qT';

describe('Integration: Images / Votes / Favourites', function (this: Mocha.Context) {
    this.timeout(120000);

    let imageId: string;
    let imageUrl: string;
    let voteId: number | null = null;
    let favouriteId: number | null = null;
    const testSubId = 'integration_test_' + Date.now();

    describe('Images Module', function (this: Mocha.Context) {
        it('GET /images/search - should fetch an image and store id and url', async function (this: Mocha.Context) {
            const res = await fetch(`${BASE_URL}/images/search`, {
                headers: { 'x-api-key': API_KEY, accept: '*/*' }
            });

            expect(res.ok).to.be.true;
            const body = await res.json();
            expect(body).to.be.an('array');
            expect(body.length).to.be.greaterThan(0);

            const first = body[0];
            expect(first).to.contain.keys(['id', 'url', 'breeds', 'width', 'height']);
            expect(first.id).to.be.a('string');
            expect(first.url).to.be.a('string');

            imageId = first.id;
            imageUrl = first.url;

            console.log(`Image fetched: id=${imageId}, url=${imageUrl}`);
        });
    });

    describe('Votes Module', function (this: Mocha.Context) {
        it('POST /votes - should create a vote for the image', async function (this: Mocha.Context) {
            if (!imageId) this.skip();

            const payload = {
                image_id: imageId,
                sub_id: testSubId,
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

            if (Object.prototype.hasOwnProperty.call(body, 'id')) {
                voteId = body.id;
                console.log(`Vote created: id=${voteId}`);
            }
        });

        it('GET /votes - should verify vote image_id matches stored imageId', async function (this: Mocha.Context) {
            if (!voteId || !imageId) this.skip();

            const res = await fetch(`${BASE_URL}/votes`, {
                headers: { 'x-api-key': API_KEY }
            });
            expect(res.ok).to.be.true;
            const votes = await res.json();
            expect(votes).to.be.an('array');

            const vote = votes.find((v: unknown) => {
                const voteObj = v as Record<string, unknown>;
                return voteObj.id === voteId;
            });
            expect(vote).to.exist;
            expect(vote.image_id).to.equal(imageId);
            expect(vote.sub_id).to.equal(testSubId);

            console.log(`Vote verification: image_id=${vote.image_id} matches original, sub_id=${vote.sub_id} matches`);
        });
    });

    describe('Favourites Module', function (this: Mocha.Context) {
        it('POST /favourites - should create a favourite for the image', async function (this: Mocha.Context) {
            if (!imageId) this.skip();

            const payload = {
                image_id: imageId,
                sub_id: testSubId
            };

            const res = await fetch(`${BASE_URL}/favourites`, {
                method: 'POST',
                headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            expect(res.status).to.be.oneOf([200, 201]);
            const body = await res.json();
            expect(body).to.be.an('object');

            if (Object.prototype.hasOwnProperty.call(body, 'id')) {
                favouriteId = body.id;
                console.log(`Favourite created: id=${favouriteId}`);
            }
        });

        it('GET /favourites - should verify favourite image_id and sub_id match', async function (this: Mocha.Context) {
            if (!favouriteId || !imageId) this.skip();

            const res = await fetch(`${BASE_URL}/favourites`, {
                headers: { 'x-api-key': API_KEY }
            });
            expect(res.ok).to.be.true;
            const favourites = await res.json();
            expect(favourites).to.be.an('array');

            const favourite = favourites.find((f: unknown) => {
                const favObj = f as Record<string, unknown>;
                return favObj.id === favouriteId;
            });
            expect(favourite).to.exist;
            const favObj = favourite as Record<string, unknown>;
            expect(favObj.image_id).to.equal(imageId);
            expect(favObj.sub_id).to.equal(testSubId);

            console.log(`Favourite verification: image_id=${favObj.image_id} matches original, sub_id=${favObj.sub_id} matches`);
        });

        it('GET /favourites - should verify nested image data matches original image', async function (this: Mocha.Context) {
            if (!favouriteId || !imageId || !imageUrl) this.skip();

            const res = await fetch(`${BASE_URL}/favourites`, {
                headers: { 'x-api-key': API_KEY }
            });
            expect(res.ok).to.be.true;
            const favourites = await res.json();

            const favourite = favourites.find((f: unknown) => {
                const favObj = f as Record<string, unknown>;
                return favObj.id === favouriteId;
            });
            expect(favourite).to.exist;
            const favFinal = favourite as Record<string, unknown>;
            expect(favFinal.image).to.exist;
            expect(favFinal.image).to.be.an('object');

            const imageNested = favFinal.image as Record<string, unknown>;
            expect(imageNested.id).to.equal(imageId, 'nested image.id should match original imageId');
            expect(imageNested.url).to.equal(imageUrl, 'nested image.url should match original imageUrl');

            console.log(`INTEGRATION CHECK PASSED: nested image.id=${imageNested.id} matches imageId=${imageId}`);
            console.log(`INTEGRATION CHECK PASSED: nested image.url=${imageNested.url} matches imageUrl=${imageUrl}`);
        });
    });
});
