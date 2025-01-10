interface User {
    _id: string;
    firstname: string;
}

interface Movie {
    _id?: string;
    genre?: string;
    poster_url?: string;
    release_date?: string;
    title?: string;
}

interface Show {
    _id?: string;
    genre?: string;
    poster_url?: string;
    release_date?: string;
    title?: string;
}

export interface Review {    
    __v: number;
    _id: string;
    created_at: string;
    is_deleted: boolean;
    movie?: Movie;
    show?: Show;
    isMovie?: boolean;
    isShow?: boolean;
    rating: number;
    review_text: string;
    user: User;
}
