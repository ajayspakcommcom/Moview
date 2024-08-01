import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';


interface ListProps {

}

const TestComp: React.FC<ListProps> = () => {

    const translateX = React.useRef(new Animated.Value(0)).current;
    const translateY = React.useRef(new Animated.Value(0)).current;

    // Event handler for pan gesture
    const onGestureEvent = Animated.event<PanGestureHandlerGestureEvent>(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                }
            }
        ],
        { useNativeDriver: true }
    );

    // Event handler for pan gesture state change
    const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === 4) {
            // When the gesture ends, reset translation values
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <>
            <GestureHandlerRootView style={styles.container}>
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View style={[styles.box, { transform: [{ translateX }, { translateY }] }]} />
                </PanGestureHandler>
            </GestureHandlerRootView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
});

export default React.memo(TestComp);
