import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { increment, decrement, incrementByAmount } from '../../store/slices/counterSlice';
import { Text, Button } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text style={{ color: Colors.whiteColor }}>Count: {count}</Text>
      <Button onPress={() => dispatch(increment())}>Increment</Button>
      <Button onPress={() => dispatch(decrement())}>Decrement</Button>
      <Button onPress={() => dispatch(incrementByAmount(5))}>Increment by 5</Button>
    </View>
  );
};

export default Counter;
