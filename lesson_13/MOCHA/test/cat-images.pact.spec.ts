import { ImageDTO } from 'src/models/images.dto';
import { CatService } from '../src/cat-service';
import { MatchersV3, PactV3, Verifier } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as path from 'path';

describe('Cat Images API Pact Test', () => {
    let catService: CatService;
    const apiKey = 'live_Gi3LNdjavvAwzZaAB7wxVuvog1DEyVB1p7t2C64vfxkOPEvtc3GeNVEf1pmGB5qT';

    const provider = new PactV3({
        consumer: 'cats-consumer',
        provider: 'cats-provider'
    });

    // Note: categories is not required in the contract because the provider
    // may omit it. Keep only the stable fields in the pact expectation.
    const expectedResponse = [
        {
            'breeds': [],
            'id': 'MTUzMTgxMw',
            'url': 'https://cdn2.thecatapi.com/images/MTUzMTgxMw.jpg',
            'width': 2448,
            'height': 3264
        }
    ] as unknown as ImageDTO[];

    const expectedBody = MatchersV3.like(expectedResponse);

    describe('consumer test', () => {
        it('create contract', () => {
            provider
                .given('cat images exist')
                .uponReceiving('a request for cat images')
                .withRequest({
                    method: 'GET',
                    path: '/images/search',
                    headers: {
                        'x-api-key': apiKey,
                        accept : '*/*'
                    }
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: expectedBody
                });
            return provider.executeTest(async (mockServer) => {
                catService = new CatService(mockServer.url);
                const catImages = await catService.getCatImages();
                // Only assert stable fields required by the contract.
                expect(catImages[0]).to.contain.keys(['id', 'url', 'breeds', 'width', 'height']);
                expect(catImages[0].id).to.be.a('string');
                expect(catImages[0].url).to.be.a('string');
                expect(catImages[0].breeds).to.be.an('array');
                expect(catImages[0].width).to.be.a('number');
                expect(catImages[0].height).to.be.a('number');
            });
        });
    });

    describe('provider test', () => {
        it('verify contract', () => {
            return new Verifier({
                providerBaseUrl: 'https://api.thecatapi.com/v1',
                pactUrls: [path.resolve(process.cwd(), 'pacts', 'cats-consumer-cats-provider.json')]
            })
                .verifyProvider()
                .then(() => {
                    console.log('Pact verification complete');
                });
        });
    });
});
