//{
//      "id": 1,
//      "body": "This is some awesome thinking!",
//      "postId": 242,
//      "likes": 3,
//      "user": {
//        "id": 105,
//        "username": "emmac",
//        "fullName": "Emma Wilson"
//      }
//    }

export interface ApiObjectDto {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: ApiObjectUserDto | null;
}

interface ApiObjectUserDto {
    id: number;
    username: string;
    fullName: string
}
