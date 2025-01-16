
export type UserItem = {
    __v?: number;
    _id?: string;
    created_at?: string;
    deleted_at?: string;
    email?: string;
    firstname?: string;
    is_deleted?: boolean;
    password_hash?: string;
    phone?: string;
    updated_at?: string;
    username?: string;
    followers: any[];
    following: any[];
    biography: string;
}