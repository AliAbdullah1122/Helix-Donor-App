import fonts from 'assets/fonts';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import RangeSlider from 'rn-range-slider';

const AgeRangeSlider = ({ min = 22, max = 30, low: propLow, high: propHigh, onChange }) => {
  const [low, setLow] = useState(propLow || min);
  const [high, setHigh] = useState(propHigh || max);
  const [sliderWidth, setSliderWidth] = useState(0);
  const lowPos = useRef(new Animated.Value(0)).current;
  const highPos = useRef(new Animated.Value(0)).current;

  const Thumb = () => <View style={styles.thumb} />;
  const Rail = () => <View style={styles.rail} />;
  const RailSelected = () => <View style={styles.railSelected} />;

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  const handleValueChange = useCallback((l, h) => {
    setLow(l);
    setHigh(h);
    
    if (sliderWidth > 0) {
      // Calculate positions based on value
      const range = max - min;
      const lowPercentage = (l - min) / range;
      const highPercentage = (h - min) / range;
      
      // Calculate positions in pixels
      const lowPixel = lowPercentage * (sliderWidth - 60); // Account for thumb radius
      const highPixel = highPercentage * (sliderWidth - 40);
      
      lowPos.setValue(lowPixel);
      highPos.setValue(highPixel);
    }
    
    if (onChange) onChange(l, h);
  }, [sliderWidth, min, max, onChange, lowPos, highPos]);

  return (
    <View style={styles.container}>
      <View 
        style={styles.sliderContainer}
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
      >
        {/* Low value label */}
        <Animated.View 
          style={[
            styles.labelWrapper,
            {
              transform: [{ translateX: lowPos }]
            }
          ]}
        >
          <View style={styles.labelBubble}>
            <Text style={styles.labelText}>{low}</Text>
          </View>
        </Animated.View>
        
        {/* High value label */}
        <Animated.View 
          style={[
            styles.labelWrapper,
            {
              transform: [{ translateX: highPos }]
            }
          ]}
        >
          <View style={styles.labelBubble}>
            <Text style={styles.labelText}>{high}</Text>
          </View>
        </Animated.View>
        
        {/* Slider */}
        <View style={styles.slider}>
          <RangeSlider
            min={min}
            max={max}
            step={1}
            low={low}
            high={high}
            floatingLabel={false}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            onValueChanged={handleValueChange}
            disableRange={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // marginTop: 50,
  },
  sliderContainer: {
    position: 'relative',
    height: mvs(65),
  },
  slider: {
    position: 'absolute',
    top: mvs(30),
    left: 0,
    right: 0,
  },
  labelWrapper: {
    position: 'absolute',
    top: 0,
    width: mvs(40),
    alignItems: 'center',
  },
  labelBubble: {
    // backgroundColor: '#3F46A5',
    borderRadius: mvs(12),
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    marginTop:mvs(8),
    minWidth: mvs(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: colors.primary,
    fontSize: mvs(12),
    fontWeight: '400',
    fontFamily: fonts.regular,
  },
  thumb: {
    width: mvs(20),
    height: mvs(20),
    borderRadius: mvs(11),
    backgroundColor: colors.primary,
    // borderWidth: 2,
    // borderColor: 'white',
  },
  rail: {
    flex: 1,
    height: mvs(6),
    borderRadius: mvs(4),
    backgroundColor: '#D9D9D9',
    margin: mvs(-10),
  },
  railSelected: {
    height: mvs(6),
    backgroundColor: colors.primary,
    borderRadius: mvs(4),
  },
});

export default AgeRangeSlider;