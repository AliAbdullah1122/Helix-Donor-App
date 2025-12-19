import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as IMG from 'assets/images';
import Medium from 'typography/medium-text';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';

const SwipeStartPickupLocationButton = ({
  title = 'Start Delivery Location',
  acceptedTitle = 'Start Delivery Location',
  onAccept,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [accepted, setAccepted] = useState(false);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 100) {
      setAccepted(true);
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePress = () => {
    if (accepted) {
      onAccept?.(); // Trigger onPress after acceptance
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onEnded={handleGestureEnd}
        enabled={!accepted} // Only allow swipe when not accepted
      >
        <Animated.View
          style={[
            styles.acceptBtnContainer,
            accepted && {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.fullPressArea}
            onPress={handlePress}
            disabled={!accepted} // Enable press only after swipe
          >
            {!accepted ? (
              <Animated.Image
                source={IMG.accepticon}
                resizeMode="contain"
                style={[styles.arrowIcon, { transform: [{ translateX }] }]}
              />
            ) : (
              <View style={styles.arrowDoubleContainer}>
                <IMG.Arrowdouble width={mvs(25)} height={mvs(22)} />
              </View>
            )}

            <Medium
              label={accepted ? acceptedTitle : title}
              color={accepted ? colors.white : colors.primary}
              fontSize={mvs(16)}
              style={styles.textCenter}
            />
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default SwipeStartPickupLocationButton;

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
  fullPressArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    height: mvs(49),
    width: mvs(49),
    position: 'absolute',
    left: mvs(5),
  },
  arrowDoubleContainer: {
    position: 'absolute',
    right: mvs(15),
  },
  textCenter: {
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
  },
});
