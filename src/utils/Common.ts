import { API_URL } from "../configure/config.android";
import { MovieItem } from "../types/Movie";
import { getData } from "./Storage";

export const findMovieById = (data: Partial<MovieItem>[], id: string): Partial<MovieItem> | undefined => {
    return data.find(item => item._id === id);
};

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    } else {
        // Find the last space within the maxLength
        const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
        if (lastSpaceIndex === -1) {
            return text.slice(0, maxLength); // No spaces found, truncate at maxLength
        } else {
            return text.slice(0, lastSpaceIndex) + '...'; // Truncate at the last space
        }
    }
}

export const getFirstAndSecondChar = (name: string): string => {
    const words = name.split(' ');
    if (words.length < 2) {
        return '';
    }
    const firstChar = words[0].charAt(0).toUpperCase() + '' + words[0].substring(1);
    const secondChar = words[1].charAt(0);
    return `${firstChar} ${secondChar.toUpperCase()}`;
};

export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};


export const fetchMovies = async (userToken: string, signal: AbortSignal) => {
    const url = `${API_URL}movie`;
    const token = userToken;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            signal: signal // Pass the signal to the fetch request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = await response.json();
        return movies;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {

            } else {
                console.error('Error fetching movies:', error);
            }
        } else {
            console.error('Unknown error', error);
        }
        throw error; // Re-throw the error to be handled by the caller if necessary
    }
};

export const fetchShows = async (userToken: string, signal: AbortSignal) => {
    const url = `${API_URL}show`;
    const token = userToken;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            signal: signal // Pass the signal to the fetch request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = await response.json();
        return movies;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {

            } else {
                console.error('Error fetching movies:', error);
            }
        } else {
            console.error('Unknown error', error);
        }
        throw error; // Re-throw the error to be handled by the caller if necessary
    }
};


export const formatDate = (date: Date, format: string): string => {
    // Helper function to add leading zeroes
    const addLeadingZero = (num: number): string => (num < 10 ? `0${num}` : num.toString());

    // Extracting parts of the date
    const day: string = addLeadingZero(date.getDate());
    const month: string = addLeadingZero(date.getMonth() + 1); // Months are zero-based
    const year: string = date.getFullYear().toString();

    // Replace placeholders in the format string
    return format.replace('DD', day).replace('MM', month).replace('YYYY', year);
}

export const extractUniqueMovieIds = (reviews: { movie: { _id: string; } }[]): string[] => {
    const movieIds: string[] = reviews.map(review => review.movie._id);
    return Array.from(new Set(movieIds));
};

export const hitSlops = (top: number = 0, bottom: number = 0, left: number = 0, right: number = 0): { top: number; bottom: number; left: number; right: number } => {
    return {
        top,
        bottom,
        left,
        right,
    };
};


export const fetchMoviesShowsByKeyword = async (userToken: string, signal: AbortSignal, title: string) => {
    
    const url = `${API_URL}latest/movie-show/search`;
    const token = userToken;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title            
            }),
            signal: signal // Pass the signal to the fetch request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {

            } else {
                console.error('Error fetching movies:', error);
            }
        } else {
            console.error('Unknown error', error);
        }
        throw error; // Re-throw the error to be handled by the caller if necessary
    }
};

export const fetchShowsByKewords = async (userToken: string, signal: AbortSignal, keyword: string) => {
    const url = `${API_URL}show/search`;
    const token = userToken;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyword            
            }),
            signal: signal // Pass the signal to the fetch request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {

            } else {
                console.error('Error fetching movies:', error);
            }
        } else {
            console.error('Unknown error', error);
        }
        throw error; // Re-throw the error to be handled by the caller if necessary
    }
};

export const getFirstThreeChars = (input: string): string | null => {
    // Validate the input is a non-empty string
    if (typeof input !== "string") {
        console.error("Invalid input: Expected a string.");
        return null;
    }
    if (input.length === 0) {
        console.error("Invalid input: String is empty.");
        return null;
    }
    
    // Return the first three characters or the entire string if it's shorter than three
    return input[0].toUpperCase() + input.slice(1, 3);
}
