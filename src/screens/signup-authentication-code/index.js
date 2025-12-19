import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import { mvs } from 'config/metrices';
import { Formik } from 'formik';
import { useAppDispatch } from 'hooks/use-store';
import { navigate,goBack } from 'navigation/navigation-ref';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Alert,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview/index';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import styles from './styles';
import { colors } from 'config/colors';
import {
  ForgotPasswordAnimation,
} from 'assets/icons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { forgotPassword, onForgot, verifyOtp } from 'services/api/auth-api-actions';
import * as Yup from 'yup';
import { ForgotPasswordSchema } from 'validations';
import ResendOtpModal from 'components/molecules/modals/ResendOtp-modal';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { OtpInput } from 'components/atoms/otp-input';
import { Loader } from 'components/atoms/loader';
import fonts from 'assets/fonts';
import Icon from 'react-native-vector-icons/Feather';

const SignUpAuthenticationCodeScreen = props => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [value, setValue] = useState('');

  // Custom keyboard data matching your image layout
  const keyboardKeys = [
    [
      { number: '1', letters: '' },
      { number: '2', letters: 'ABC' },
      { number: '3', letters: 'DEF' }
    ],
    [
      { number: '4', letters: 'GHI' },
      { number: '5', letters: 'JKL' },
      { number: '6', letters: 'MNO' }
    ],
    [
      { number: '7', letters: 'PQRS' },
      { number: '8', letters: 'TUV' },
      { number: '9', letters: 'WXYZ' }
    ],
    [
      { number: '', letters: '' ,isEmpty:true},
      { number: '0', letters: '' },
      { number: '⌫', letters: '', isBackspace: true }
    ]
  ];

  const handleKeyPress = (key) => {
    if (key.isBackspace) {
      // Handle backspace
      setValue(prev => prev.slice(0, -1));
    } else if (key.number && value.length < 5) {
      // Handle number input (limit to 5 digits)
      setValue(prev => prev + key.number);
    }
  };

  const onPress = () => { }

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Reset timer when modal opens or OTP is resent
  useEffect(() => {
    setTimeLeft(59);
    setCanResend(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={mvs(30)} color={colors.black} />
        </TouchableOpacity>
        
      </View>
      {/* <Header1x2x style={{ backgroundColor: colors.white }} back /> */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <View style={{paddingHorizontal: mvs(20)}}>

        <Medium
          label={'Authentication Code'}
          color={colors.grey}
          fontSize={mvs(24)}
          style={styles.forgottext}
        />
        <View style={{ marginVertical: mvs(10) }}>
          <Text numberOfLines={3} style={{ letterSpacing: 0.2, fontWeight: '400', fontSize: mvs(16), fontFamily: fonts.regular }} color={colors.black}>
            Enter the 5-digit code we just texted to your email. {' '}
            <Text style={{ fontWeight: 'bold', color: colors.subteXTcOLOR }}>Name@gmail.com</Text>
          </Text>
        </View>

        {/* OTP Input using your existing component */}
        <View style={styles.otpContainer}>
          <OtpInput value={value} setValue={setValue} />
        </View>

        {/* Resend OTP button */}
        <TouchableOpacity
          style={{
            paddingHorizontal: mvs(20),
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: mvs(10),
          }}
          onPress={async () => {
            setTimeLeft(30);
            setCanResend(false);
          }}
          disabled={!canResend}>
          <Regular
            fontSize={mvs(18)}
            style={{
              textDecorationLine: 'underline',
              color: canResend ? colors.primary : colors.lightGray,
            }}>
            Resend OTP
          </Regular>
        </TouchableOpacity>

        <View style={{ marginVertical: mvs(20), alignSelf: 'center' }}>
          <Text numberOfLines={3} style={{ letterSpacing: 0.2, fontWeight: '500', fontSize: mvs(16), fontFamily: fonts.medium }} color={colors.subText}>
            Resend code in {''}
            <Text style={{ fontWeight: 'bold', color: colors.grey, letterSpacing: 0.2, fontWeight: '500', fontSize: mvs(16) }}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</Text>
          </Text>
        </View>
        <PrimaryButton
          containerStyle={{
            borderRadius: mvs(50),
            marginTop: mvs(5),
            marginBottom: mvs(20),
          }}
          loading={loading}
          onPress={() => {
            // Handle continue button press
            // if (value.length === 5) {
              navigate('DriverRegistrationPart1Screen');
              // Proceed with OTP verification
              console.log('OTP entered:', value);
              // Add your OTP verification logic here
            // } else {
            //   Alert.alert('Incomplete Code', 'Please enter all 5 digits');
            // }
          }}
          title={'Continue'}
        />
        </View>

        {/* Custom Numeric Keyboard */}
        <View style={styles.keyboardContainer}>
          {keyboardKeys.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyboardRow}>
              {row.map((key, keyIndex) => (
                <TouchableOpacity
                  key={keyIndex}
                  style={[
                    styles.keyButton,
                    key.number === '' && styles.emptyKey,
                    {
                      backgroundColor: key.isBackspace || key.number === '' ? colors.background : colors.white,
                      borderWidth: key.isBackspace ? 1 : 0,
                    }
                  ]}
                  onPress={() => handleKeyPress(key)}
                  disabled={key.number === ''}
                >
                  {key.number !== '' && (
                    <>
                      <Text style={styles.keyNumber}>
                        {key.number === '⌫' ? '⌫' : key.number}
                      </Text>
                      {key.letters !== '' && (
                        <Text style={styles.keyLetters}>
                          {key.letters}
                        </Text>
                      )}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>


      </View>
      </ScrollView>
    </View>
  );
};

export default SignUpAuthenticationCodeScreen;