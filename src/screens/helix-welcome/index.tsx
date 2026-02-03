import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, Image } from 'react-native';
import * as IMG from 'assets/images';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { navigate } from 'navigation/navigation-ref';
import styles from './styles';

const HelixWelcomeScreen = () => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('Login');
  //   }, 1500);
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('Login');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const [color, setColor] = useState("#121679");

    useEffect(() => {
    const timer = setTimeout(() => {
      setColor("#3A3E90");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.top}>
        <Text style={styles.title}>Welcome to Helix Donor</Text>
      </View>
      <View style={styles.middle}>
        <View style={[styles.logoBlock, { backgroundColor: color }]}>
          {/* <Image
            source={IMG.HelixLogoSplash}
            resizeMode="contain"
            style={styles.helixLogo}
          /> */}
          <IMG.HelixLogoSplashSvg width={mvs(259)} height={mvs(64)}/>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.tagline}>Dont just date, procreate</Text>
      </View>
    </View>
  );
};

export default HelixWelcomeScreen;


