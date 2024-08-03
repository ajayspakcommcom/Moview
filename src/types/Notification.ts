

export type Notification = {
    __v: number;
    _id: string;
    created_at: string; // ISO date string
    expires_at: string; // ISO date string
    is_deleted: boolean;
    message: string;
    seen: boolean;
    title: string;
    type: string;
    user_id: string;
};