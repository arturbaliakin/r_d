import { ImageDTO } from './models/images.dto';

export class CatService {
    private readonly apiKey: string = 'live_Gi3LNdjavvAwzZaAB7wxVuvog1DEyVB1p7t2C64vfxkOPEvtc3GeNVEf1pmGB5qT';
    public constructor (private baseUrl: string) {}

    public async getCatImages (): Promise<ImageDTO[]> {
        const response = await fetch(`${this.baseUrl}/images/search`, {headers: {'x-api-key': this.apiKey}});
        const responseJson = (await response).json();

        return responseJson;
    }
}
