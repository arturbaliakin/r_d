export class ApiObject {
    public id?: number;
    public body?: string;
    public postId?: number;
    public likes?: number;
    public user?: ApiObjectUserData;

    public constructor(row: Record<string, unknown>) {
        this.id = row['id'] as number;
        this.body = row['body'] as string;
        this.postId = row['postId'] as number;
        this.likes = row['likes'] as number;
        this.user = new ApiObjectUserData (row['user'] as Record<string, unknown>);
    }
}

class ApiObjectUserData {
    public id?: number;
    public username?: string;
    public fullName?: string;

    public constructor(row: Record<string, unknown>) {
        this.id = row['id'] as number;
        this.username = row['username'] as string;
        this.fullName = row['fullName'] as string;
    }
}
