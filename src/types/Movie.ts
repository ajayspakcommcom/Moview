// import { ImageSourcePropType } from 'react-native';

// export type MovieItem = {
//     id: string;
//     title: string;
//     image: ImageSourcePropType;
//     videoUrl: string;
// };


type CastMember = {
    _id: string;
    actor: string;
    role: string;
};

export type MovieItem = {
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
    __v: number;
};