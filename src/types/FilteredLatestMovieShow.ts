

type CastMember = {
    _id: string;
    actor: string;
    role: string;
};

export type FilteredLatestMovieShow = {
    _id: string;
    title: string;
    description: string;
    release_date: string; // Alternatively, you can use Date if you will parse it to Date object.
    genre: string;
    director: string;
    rating: number;
    cast: CastMember[];
    poster_url: string;
    is_deleted: boolean;
    isMovie: boolean;
    isShow: boolean;
    __v: number;
};

