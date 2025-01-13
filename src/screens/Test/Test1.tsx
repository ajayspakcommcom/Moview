import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from '@react-native-community/blur';




type Props = {

};

const Test1: React.FC<Props> = () => {

  return (
<View style={styles.container}>
      {/* Add a background image or color */}
      <ImageBackground
        source={{ uri: 'https://img.freepik.com/free-photo/nature-beauty-colors-meadow-daisy-blossoms-generated-by-ai_188544-10116.jpg' }} // You can use an image or leave it as solid color
        style={styles.imageBackground}
      >        
        <BlurView
          style={styles.blurContainer}
          blurType="dark" 
          blurAmount={20} 
        >
          <View style={styles.innerContainer}>
            <Text style={styles.text}>This view has a blurred background with a blue tint</Text>
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
  },
  innerContainer: {        
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default Test1;
