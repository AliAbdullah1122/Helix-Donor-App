import fonts from 'assets/fonts';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import RangeSlider from 'rn-range-slider';

// Function to convert inches to feet and inches format
const formatHeight = (inches) => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

const HeightRangeSlider = ({ min = 60, max = 78, low: propLow, high: propHigh, onChange ,color}) => {
  // Default values: 5'0" (60 inches) to 5'6" (66 inches) as initial range
  const initialSpacing = 6; // 6 inches spacing initially
  const defaultLow = propLow || min; // 5'0"
  const defaultHigh = propHigh || Math.min(max, min + initialSpacing); // 5'6"
  
  const [low, setLow] = useState(defaultLow);
  const [high, setHigh] = useState(defaultHigh);
  const [sliderWidth, setSliderWidth] = useState(0);
  const lowPos = useRef(new Animated.Value(0)).current;
  const highPos = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);

  const Thumb = () => <View style={[styles.thumb, {backgroundColor:color}]} />;
  const Rail = () => <View style={styles.rail} />;
  const RailSelected = () => <View style={[styles.railSelected, {backgroundColor:color}]} />;
console.log(color);
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
    const availableWidth = sliderWidth - (thumbRadius * 2);
    const lowPixel = (lowPercentage * availableWidth) + thumbRadius - mvs(18);
    const highPixel = (highPercentage * availableWidth) + thumbRadius - mvs(18);
    
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
            <Text style={[styles.labelText,{color:color}]}>{formatHeight(low)}</Text>
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
            <Text style={[styles.labelText,{color:color}]}>{formatHeight(high)}</Text>
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
    justifyContent: 'center',
  },
  slider: {
    position: 'absolute',
    top: mvs(35),
    left: mvs(10),
    right: mvs(10),
  },
  labelWrapper: {
    position: 'absolute',
    top: mvs(10),
    width: mvs(50),
    alignItems: 'center',
  },
  labelBubble: {
    borderRadius: mvs(8),
    marginTop: mvs(4),
    minWidth: mvs(35),
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
    margin: mvs(-20),
  },
  railSelected: {
    height: mvs(6),
    backgroundColor: colors.primary,
    borderRadius: mvs(4),
  },
});

export default HeightRangeSlider;