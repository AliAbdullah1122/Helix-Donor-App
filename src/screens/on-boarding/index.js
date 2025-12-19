// import OnboardingWalkThrough from 'components/molecules/onboarding-walk-through';
// import {colors} from 'config/colors';
// import {ONBOARDING_LIST} from 'config/constants';
// import React, {useRef, useState} from 'react';
// import { Image, StatusBar, View} from 'react-native';
// import Swiper from 'react-native-swiper';
// import styles from './styles';
// import {navigate} from 'navigation/navigation-ref';
// import { UTILS } from 'utils';
// import { PrimaryButton } from 'components/atoms/buttons';
// import Bold from 'typography/bold-text';
// import { mvs } from 'config/metrices';
// import Regular from 'typography/regular-text';
// import Medium from 'typography/medium-text';

// const Onboarding = ({navigation}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex === ONBOARDING_LIST.length - 1) {
//       navigation.navigate('Auth');
//     }
//   };

//   const handleSkip = () => {
//     navigation.navigate('Auth');
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      
//       {/* Top View - Skip Button and Image */}
//       <View style={styles.topView}>
//         <View style={styles.skipContainer}>
//           <PrimaryButton
//             title="Skip"
//             onPress={handleSkip}
//             containerStyle={styles.skipButton}
//             textStyle={styles.skipText}
//           />
//         </View>

//         <Swiper
//           loop={false}
//           index={currentIndex}
//           onIndexChanged={setCurrentIndex}
//           showsPagination={false} // Remove dots from top swiper
//           showsButtons={false}
//           scrollEnabled={false}>
//           {ONBOARDING_LIST.map((item, index) => (
//             <View key={index} style={styles.slide}>
//               <Image
              
//               source={item.image}
//                style={styles.image} resizeMode="contain" />
//             </View>
//           ))}
//         </Swiper>
//       </View>

//       {/* Bottom View - Dots, Title, Description and Button */}
//       <View style={styles.bottomView}>
//           <View style={styles.customPagination}>
//           {ONBOARDING_LIST.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.dot,
//                 index === currentIndex ? styles.activeDot : styles.inactiveDot,
//               ]}
//             />
//           ))}
//         </View>
//         <Swiper
//           loop={false}
//           index={currentIndex}
//           onIndexChanged={setCurrentIndex}
//           showsPagination={false} // Remove built-in dots
//           showsButtons={false}
//           scrollEnabled={false}>
//           {ONBOARDING_LIST.map((item, index) => (
//             <View key={index} style={styles.contentSlide}>
//               <Medium
//                 label={item.title}
//                 fontSize={mvs(24)}
//                 color={colors.black}
//                 style={styles.title}
//               />
//               <Regular
//                 label={item.desc}
//                 fontSize={mvs(15)}
//                 color={colors.text}
//                 style={styles.description}
//                 numberOfLines={3}
//               />
//             </View>
//           ))}
//         </Swiper>

//         {/* Custom Pagination Dots - Only one set */}
//      <View style={{marginBottom:mvs(40)}}>
//         <PrimaryButton
//           title={currentIndex === ONBOARDING_LIST.length - 1 ? 'Get Started' : 'Next'}
//           onPress={() => {
//             if (currentIndex < ONBOARDING_LIST.length - 1) {
//               setCurrentIndex(currentIndex + 1);
//             } else {
//               navigation.navigate('Auth');
//             }
//           }}
//           containerStyle={styles.nextButton}
//         />
//         </View>
//          <View style={{
//           marginBottom:mvs(-25),
//         width:mvs(148),
//         height:mvs(5),
//         borderRadius:mvs(100),
//         backgroundColor:"#111827",
//         alignSelf:"center"
//       }}>

//       </View>

//       </View>
//     </View>
//   );
// };

// export default Onboarding;

import React, {useState} from 'react';
import {View, Image, StatusBar} from 'react-native';
import Swiper from 'react-native-swiper';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {ONBOARDING_LIST} from 'config/constants';
import {PrimaryButton} from 'components/atoms/buttons';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_LIST.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('GetStarted');
    }
  };

  const handleSkip = () => {
    navigation.navigate('GetStarted');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <Swiper
        loop={false}
        index={currentIndex}
        onIndexChanged={setCurrentIndex}
        showsPagination={false}
        showsButtons={false}>
        {ONBOARDING_LIST.map((item, index) => (
          <View key={index} style={{flex: 1, backgroundColor: colors.white}}>
            {/* Top Section - Image + Skip */}
            <View style={styles.topView}>
              <View style={styles.skipContainer}>
                <PrimaryButton
                  title="Skip"
                  onPress={handleSkip}
                  containerStyle={styles.skipButton}
                  textStyle={styles.skipText}
                />
              </View>

              <View style={styles.slide}>
                <Image
                  source={item.image}
                  // style={styles.image}
                  style={[
    styles.image,
    index === 0 && {width: mvs(400), height: mvs(355)}, // first slide
    index === 1 && {width: mvs(300), height: mvs(300)}, // second slide
    index === 2 && {width: mvs(410), height: mvs(205)}, // third slide
  ]}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Bottom Section - Text + Pagination + Button */}
            <View style={styles.bottomView}>
              {/* Custom Pagination */}
              <View style={styles.customPagination}>
                {ONBOARDING_LIST.map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[
                      styles.dot,
                      dotIndex === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>

              {/* Title and Description */}
              <View style={styles.contentSlide}>
                <Medium
                  label={item.title}
                  fontSize={mvs(24)}
                  color={colors.black}
                  style={styles.title}
                />
                <Regular
                  label={item.desc}
                  fontSize={mvs(15)}
                  color={colors.text}
                  style={styles.description}
                  numberOfLines={3}
                />
              </View>

              {/* Button */}
              <View style={{marginTop: mvs(60)}}>
                <PrimaryButton
                  title={
                    index === ONBOARDING_LIST.length - 1
                      ? 'Next'
                      : 'Next'
                  }
                  onPress={handleNext}
                  containerStyle={styles.nextButton}
                />
              </View>

              {/* Bottom Bar Indicator */}
              <View
                style={{
                  // marginBottom: mvs(-16),
                  // marginBottom:mvs(0),
                  marginTop:mvs(65),
                  width: mvs(148),
                  height: mvs(5),
                  borderRadius: mvs(100),
                  backgroundColor: '#111827',
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Onboarding;
