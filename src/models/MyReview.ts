interface Show {
    _id: string;
    title: string;
    release_date: string;
    genre: string;
    poster_url: string;
}


interface Movie {
    _id: string;
    title: string;
    release_date: string;
    genre: string;
    poster_url: string;
}


export interface ShowReviewResponse {
    _id: string;
    show: Show;
    user: string;
    rating: number;
    review_text: string;
    is_deleted: boolean;
    created_at: string;
    __v: number;
    isShow: boolean;
}


export interface MovieReviewResponse {
    _id: string;
    movie: Movie;
    user: string;
    rating: number;
    review_text: string;
    is_deleted: boolean;
    created_at: string;
    __v: number;
    isMovie: boolean;
}