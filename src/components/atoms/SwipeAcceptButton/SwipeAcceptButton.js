import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as IMG from 'assets/images';
import Medium from 'typography/medium-text';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';

const SwipeAcceptButton = ({ onAccept }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [accepted, setAccepted] = useState(false);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const progressWidth = translateX.interpolate({
    inputRange: [0, 120],
    outputRange: [0, mvs(300)], // matches button width
    extrapolate: 'clamp',
  });

  const handleGestureEnd = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 100) {
      setAccepted(true);
      onAccept?.();
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onEnded={handleGestureEnd}
        enabled={!accepted}
      >
        <Animated.View
          style={[
            styles.acceptBtnContainer,
            accepted && { backgroundColor: colors.primary, borderColor: colors.primary },
          ]}
        >

          {/* 🔥 SWIPE SHADED PROGRESS BACKGROUND */}
          {!accepted && (
            <Animated.View
              style={[
                styles.progressShade,
                { width: progressWidth }
              ]}
            />
          )}

          {/* Arrow icon */}
          {!accepted && (
            <Animated.Image
              source={IMG.accepticon}
              resizeMode="contain"
              style={[
                styles.arrowIcon,
                { transform: [{ translateX }] },
              ]}
            />
          )}

          <Medium
            label={accepted ? 'Accepted' : 'Accept Delivery'}
            color={accepted ? colors.white : colors.primary}
            fontSize={mvs(16)}
            style={styles.textCenter}
          />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default SwipeAcceptButton;

const styles = StyleSheet.create({
  acceptBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: mvs(40),
    backgroundColor: colors.white,
    paddingVertical: mvs(14),
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
  },

  // 🔥 Shaded progress fill
  progressShade: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primary + '20', // light shade
    borderRadius: mvs(40),
  },

  arrowIcon: {
    height: mvs(49),
    width: mvs(49),
    marginLeft: mvs(5),
    position: 'absolute',
    left: mvs(5),
  },

  textCenter: {
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
  },
});
