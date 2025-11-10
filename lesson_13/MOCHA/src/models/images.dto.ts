export interface CategoryDTO {
    id: number;
    name: string;
}

export interface BreedDTO {
    name?: string;
    [key: string]: unknown;
}

export interface ImageDTO {
    breeds: BreedDTO[];
    categories: CategoryDTO[];
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface ImageRefDTO {
    id: string;
    url: string;
}

export interface FavouriteDTO {
    id: number;
    user_id: string;
    image_id: string;
    sub_id?: string | null;
    created_at: string;
    image: ImageRefDTO;
}
