export interface Review {
    id: string;
    name: string;
    rating: number;
    award: string;
    description: string;
}

export interface Cast {
    _id: string;
    actor: string;
    role: string;
}