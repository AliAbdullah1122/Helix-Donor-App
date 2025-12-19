import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import Bold from 'typography/bold-text';
import styles from './styles';
import {colors} from 'config/colors';

const GetStartedScreen = props => {
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const dimensionChangeHandler = Dimensions.addEventListener(
      'change',
      ({window}) => {
        setScreenDimensions(window);
        setIsLandscape(window.width > window.height);
      },
    );

    // Navigate to gender identity screen after 3 seconds
    const timer = setTimeout(() => {
      navigate('GenderIdentityScreen');
    }, 1000);

    // Cleanup
    return () => {
      dimensionChangeHandler?.remove();
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={colors.primary} barStyle="dark-content" /> */}
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContainer,
          isLandscape && styles.landscapeScrollContainer
        ]}
        showsVerticalScrollIndicator={false}
      >
       

        <View style={[
          styles.middleSection,
          isLandscape && styles.landscapeMiddleSection
        ]}>
          <Image 
            source={IMG.GetStarted} 
            style={[
              styles.imgStyle,
              isLandscape && styles.landscapeImgStyle
            ]} 
          />
        </View>

       
      </ScrollView>
    </View>
  );
};

export default GetStartedScreen;