import { Dimensions } from 'react-native';
  

export const renderImageListBasedOnScreen = () => {
    const { width } = Dimensions.get('window');

    if (Math.round(width) >= 600 && Math.round(width) < 900) {
        // Tablets or folding devices
        return 4 
      } else if (width >= 900) {
        // Large tablets or landscape mode
        return 6;
      } else {
        // Small devices
        return 2;
      }

}