import { ImageSourcePropType } from 'react-native';

export type MovieItem = {
    id: string;
    title: string;
    image: ImageSourcePropType;
    videoUrl: string;
};