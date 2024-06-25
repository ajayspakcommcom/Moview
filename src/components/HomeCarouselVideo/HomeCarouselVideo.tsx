import * as React from 'react';
import Video, { VideoRef, OnLoadData } from 'react-native-video';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import Colors from '../../styles/Colors';


interface HomeCarouselVideoProps {
    title: string;
    content: string;
    backgroundColor?: string;
}

const HomeCarouselVideo: React.FC<HomeCarouselVideoProps> = ({ title, content, backgroundColor = 'lightblue' }) => {

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
        <>
            <Video
                source={{ uri: 'https://videos.pexels.com/video-files/4440931/4440931-hd_1920_1080_25fps.mp4' }}
                controls={false}
                paused={!isPlaying}
                resizeMode="contain"
                repeat={true}
                ref={videoRef}
                onBuffer={onBuffer}
                onError={onError}
                onLoad={onLoad}
                style={styles.backgroundVideo}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={togglePlay} style={styles.actionButton}>
                <Icon name={'play'} size={45} color={Colors.playPauseButtonColor} style={styles.icon} />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        width: '100%',
        height: 300
    },

    actionButton: {
        borderWidth: 5,
        borderColor: Colors.playPauseButtonColor,
        borderRadius: 50,
        width: 100,
        height: 100,
        top: '0%',
        left: '0%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    icon: {
        alignSelf: 'center',
        position: 'absolute',
        width: 100,
        height: 100,
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    }
});

export default HomeCarouselVideo;