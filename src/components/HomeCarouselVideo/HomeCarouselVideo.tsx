import * as React from 'react';
import Video, { VideoRef, OnLoadData } from 'react-native-video';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import Colors from '../../styles/Colors';


interface HomeCarouselVideoProps {
    title: string;
    content: string;
    backgroundColor?: string;
    videoUrl: string;
}

const HomeCarouselVideo: React.FC<HomeCarouselVideoProps> = ({ title, content, backgroundColor = 'lightblue', videoUrl }) => {

    const videoRef = React.useRef<VideoRef>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.resume()
            }
            setIsPlaying(!isPlaying);
        }
    };

    const onBuffer = (event: { isBuffering: boolean }) => {
        console.log('Buffering:', event.isBuffering);
    };

    const onError = (error: any) => {
        console.error('Video Error:', error);
    };

    const onLoad = (data: OnLoadData) => {
        console.log('Duration:', data.duration);
        console.log('Current Time:', data.currentTime);
    };

    return (
        <View style={styles.container}>
            <Video
                source={{ uri: videoUrl }}
                controls={false}
                paused={!isPlaying}
                resizeMode="cover"
                repeat={true}
                ref={videoRef}
                onBuffer={onBuffer}
                onError={onError}
                onLoad={onLoad}
                style={styles.backgroundVideo}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={togglePlay} style={styles.actionButtonWrapper}>
                <View>
                    <Icon name={!isPlaying ? 'play' : 'pause'} size={45} color={Colors.playPauseButtonColor} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        minHeight: 300,
        position: 'relative'
    },

    backgroundVideo: {
        width: '100%',
        minHeight: 200,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    },

    actionButtonWrapper: {
        borderWidth: 5,
        borderColor: Colors.playPauseButtonColor,
        borderRadius: 50,
        width: 100,
        height: 100,
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8
    }
});

export default HomeCarouselVideo;