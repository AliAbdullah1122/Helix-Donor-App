import React, {useEffect} from 'react';
import {View, StatusBar, Text, Image} from 'react-native';
import * as IMG from 'assets/images';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import styles from './styles';

const HelixWelcomeScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('Login');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.top}>
        <Text style={styles.title}>Welcome to Helix Donor</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.logoBlock}>
          <Image
            source={IMG.helixLogo}
            resizeMode="contain"
            style={styles.helixLogo}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.tagline}>Dont just date, procreate</Text>
      </View>
    </View>
  );
};

export default HelixWelcomeScreen;


