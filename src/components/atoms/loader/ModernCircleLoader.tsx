import React from 'react';
import { View, StyleSheet, Animated, ColorValue } from 'react-native';

interface DotWaveLoaderProps {
  size?: number | "small" | "large" | undefined;
  color?: ColorValue | undefined;
}

const DotWaveLoader: React.FC<DotWaveLoaderProps> = (props) => {
  const { size = 'small', color = '#6366f1' } = props;
  const dotCount = 5;

  // Map size to appropriate dot sizes
  const getDotSize = () => {
    if (size === 'small') return 8;
    if (size === 'large') return 16;
    return typeof size === 'number' ? Math.max(6, size / 5) : 12; // Scale dot size based on overall size
  };

  const getDotSpacing = () => {
    if (size === 'small') return 2;
    if (size === 'large') return 6;
    return typeof size === 'number' ? Math.max(2, size / 15) : 4;
  };

  const dotSize = getDotSize();
  const dotSpacing = getDotSpacing();

  const animations = Array.from({ length: dotCount }, () => 
    new Animated.Value(0)
  );

  React.useEffect(() => {
    const animateDots = animations.map((anim, index) => 
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 150),
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animateDots.forEach(anim => anim.start());

    return () => animateDots.forEach(anim => anim.stop());
  }, [animations]);

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {animations.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
                marginHorizontal: dotSpacing,
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ],
                opacity: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 50,
  },
});

export default DotWaveLoader;