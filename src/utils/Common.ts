import { MovieItem } from "../types/Movie";

export const findMovieById = (data: Partial<MovieItem>[], id: string): Partial<MovieItem> | undefined => {
    return data.find(item => item.id === id);
};