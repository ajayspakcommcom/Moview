interface User {
    _id: string;
    firstname: string;
}

export interface Review {
    __v: number;
    _id: string;
    created_at: string;
    is_deleted: boolean;
    movie: string;
    rating: number;
    review_text: string;
    user: User;
}