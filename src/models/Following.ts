type User = {
    _id: string;
    firstname: string;
    username: string;
    email: string;
    phone: string;
    password_hash: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    __v: number;
};

export type FollowingType = {
    _id: string;
    userId: string;
    // followerId: User;
    followingId: User;
    createdAt: string;
    isFollowing: boolean;
    __v: number;
};