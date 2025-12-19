import * as IMG from 'assets/images';
import React from 'react';
import {View, Image, StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import RootStackParamList from 'types/navigation-types/root-stack';
import styles from './styles';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {PrimaryButton} from 'components/atoms/buttons';
import {navigate} from 'navigation/navigation-ref';

export type AuthValidationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AuthValidation'
>;

const AuthValidationScreen: React.FC<AuthValidationScreenProps> = props => {
  const {route} = props;
  const {title, message, from} = route?.params || {};

  const handlePrimaryAction = () => {
    if (from === 'otp') {
      navigate('AuthenticationCode');
    } else {
      navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle="dark-content"
        translucent={false}
      />
      <View style={styles.logoContainer}>
        {IMG?.parcelLogo && (
          <Image
            source={IMG.parcelLogo}
            resizeMode="contain"
            style={{width: mvs(120), height: mvs(140)}}
          />
        )}
      </View>
      <View style={styles.content}>
        <Bold
          label={title || 'Something went wrong'}
          fontSize={mvs(22)}
          color={colors.grey}
          style={styles.title}
        />
        <Regular
          label={
            message ||
            'Please check your details and try again. If the problem continues, contact support.'
          }
          fontSize={mvs(14)}
          color={colors.subText}
          style={styles.message}
        />
        <PrimaryButton
          title={'Try again'}
          onPress={handlePrimaryAction}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default AuthValidationScreen;


