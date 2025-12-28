import fonts from 'assets/fonts';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import RangeSlider from 'rn-range-slider';

const WeightRangeSlider = ({ min = 150, max = 175, low: propLow, high: propHigh, onChange }) => {
  const [low, setLow] = useState(propLow || min);
  const [high, setHigh] = useState(propHigh || max);
  const [sliderWidth, setSliderWidth] = useState(0);
  const lowPos = useRef(new Animated.Value(0)).current;
  const highPos = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);

  const Thumb = () => <View style={styles.thumb} />;
  const Rail = () => <View style={styles.rail} />;
  const RailSelected = () => <View style={styles.railSelected} />;

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  // Update label positions when slider width changes
  useEffect(() => {
    if (sliderWidth > 0) {
      updateLabelPositions(low, high);
    }
  }, [sliderWidth]);

  const updateLabelPositions = (l, h) => {
    if (sliderWidth === 0) return;
    
    const range = max - min;
    const thumbRadius = mvs(10); // Half of thumb width
    
    // Calculate positions (0% to 100%)
    const lowPercentage = (l - min) / range;
    const highPercentage = (h - min) / range;
    
    // Convert to pixel positions, accounting for thumb center
    // Available width is sliderWidth minus thumb width on both ends
    const availableWidth = sliderWidth - (thumbRadius * 2);
    const lowPixel = (lowPercentage * availableWidth) + thumbRadius - mvs(25); // Center adjustment
    const highPixel = (highPercentage * availableWidth) + thumbRadius - mvs(25);
    
    lowPos.setValue(lowPixel);
    highPos.setValue(highPixel);
  };

  const handleValueChange = useCallback((l, h) => {
    setLow(l);
    setHigh(h);
    updateLabelPositions(l, h);
    
    if (onChange) onChange(l, h);
  }, [sliderWidth, min, max, onChange]);

  return (
    <View style={styles.container}>
      <View 
        style={styles.sliderContainer}
        onLayout={(e) => {
          const { width } = e.nativeEvent.layout;
          setSliderWidth(width);
        }}
      >
        {/* Slider */}
        <View style={styles.slider}>
          <RangeSlider
            ref={sliderRef}
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
        
        {/* Low value label - positioned above thumb */}
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
        
        {/* High value label - positioned above thumb */}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // No padding needed as parent handles it
    // backgroundColor:'red'
  },
  sliderContainer: {
    position: 'relative',
    height: mvs(70),
    // justifyContent: 'center',
    // width: '100%',
  },
  slider: {
    position: 'absolute',
    top: mvs(35),
    left: mvs(0), // Add small padding for thumb visibility
    right: mvs(0),
  },
  labelWrapper: {
    position: 'absolute',
    top: mvs(10), // Position above the slider
    width: mvs(50),
    alignItems: 'center',
  },
  labelBubble: {
    borderRadius: mvs(8),
    marginTop: mvs(4),
    minWidth: mvs(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: colors.primary,
    fontSize: mvs(12),
    fontWeight: '500',
    fontFamily: fonts.regular,
  },
  thumb: {
    width: mvs(20),
    height: mvs(20),
    borderRadius: mvs(10),
    backgroundColor: colors.primary,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.5,
  },
  rail: {
    flex: 1,
    height: mvs(6),
    borderRadius: mvs(4),
    backgroundColor: '#D9D9D9',
    // width: '100%',
    margin: mvs(-10),
  },
  railSelected: {
    height: mvs(6),
    backgroundColor: colors.primary,
    borderRadius: mvs(4),
  },
});

export default WeightRangeSlider;