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



