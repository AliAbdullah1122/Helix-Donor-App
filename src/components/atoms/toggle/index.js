import { mvs } from 'config/metrices';
import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from 'react-native';

const WIDTH = mvs(50);
const HEIGHT = mvs(28);
const PADDING = 2;
const CIRCLE_SIZE = HEIGHT - PADDING * 2;

const ExactToggle = ({
  isOn = false,
  onToggle = () => {},
  onColor = '#4CAF50',
  offColor = '#D9D9D9',
  circleColor = '#FFFFFF',
}) => {
  const translateX = useRef(
    new Animated.Value(isOn ? WIDTH - CIRCLE_SIZE - PADDING * 2 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOn ? WIDTH - CIRCLE_SIZE - PADDING * 2 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [isOn]);

  const handlePress = () => {
    onToggle(!isOn);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View
        style={[
          styles.track,
          { backgroundColor: isOn ? onColor : offColor },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: circleColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ExactToggle;

const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: mvs(24),
    padding: PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});
