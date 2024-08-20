interface User {
    _id: string;
    firstname: string;
}

export interface ShowReview {
    __v: number;
    _id: string;
    created_at: string;
    is_deleted: boolean;
    movie: any;
    rating: number;
    review_text: string;
    user: User;
}