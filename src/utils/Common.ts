import { MovieItem } from "../types/Movie";

export const findMovieById = (data: Partial<MovieItem>[], id: string): Partial<MovieItem> | undefined => {
    return data.find(item => item.id === id);
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