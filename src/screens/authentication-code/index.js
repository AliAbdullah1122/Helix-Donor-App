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
import { forgotPassword, onForgot, resendOtp, verifyOtp } from 'services/api/auth-api-actions';
import * as Yup from 'yup';
import { ForgotPasswordSchema } from 'validations';
import ResendOtpModal from 'components/molecules/modals/ResendOtp-modal';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { OtpInput } from 'components/atoms/otp-input';
import { Loader } from 'components/atoms/loader';
import fonts from 'assets/fonts';
import Icon from 'react-native-vector-icons/Feather';

const AuthenticationCodeScreen = props => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [value, setValue] = useState('');
  const emailAddress  = props?.route?.params?.email;
    console.log('Email in OTP screen:', emailAddress);


  const handleResendOtp = async () => {
  try {
    setLoading(true);
    const body = {
      email: props?.route?.params?.email, // or your email state
    };

    const res = await onForgot(body); // <-- API call

    Alert.alert('Success', 'OTP resent to email.');

    // Reset timer
    setTimeLeft(30);
    setCanResend(false);
    
  } catch (error) {
    Alert.alert("Error", "Could not resend OTP");
  } finally {
    setLoading(false);
  }
};


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
    setTimeLeft(30);
    setCanResend(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={mvs(24)} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Medium
            label={'OTP Verification'}
            color={colors.grey}
            fontSize={mvs(16)}
            style={styles.forgottext}
          />
          <View style={styles.subtitleWrapper}>
            <Text style={styles.subtitleText}>
              We have sent the verification code to{' '}
            </Text>
            <Text style={styles.subtitleEmail}>
              {emailAddress || 'jessica@mail.com'}
            </Text>
          </View>

          <View style={styles.otpContainer}>
            <OtpInput value={value} setValue={setValue} />
          </View>

          <PrimaryButton
            containerStyle={styles.continueButton}
            loading={loading}
            onPress={async () => {
    if (value.length !== 4 && value.length !== 5) {
      Alert.alert('Invalid OTP', 'Please enter a valid code');
      return;
    }

    try {
      setLoading(true);

const res = await verifyOtp({
  email: props?.route?.params?.email,
  otp: value,
});

console.log('Verify OTP Response → ', res);

if (res?.success) {
  navigate('CreateNewPasswordScreen',{
      email: emailAddress, // or your email state
    });
} else {
  Alert.alert('Error', res?.Message || res?.message || 'OTP verification failed');
}


    } catch (e) {
      Alert.alert('Error', 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  }}
            title={'Continue'}
          />

          <View style={styles.resendRow}>
            <TouchableOpacity
              disabled={!canResend}
              onPress={async () => {
                try {
                  setResendLoading(true);
                  const res = await resendOtp({email: emailAddress});
                  console.log('Resend OTP Response: ', res);
                  if (res?.success) {
                    setTimeLeft(30);
                    setCanResend(false);
                  }
                } catch (e) {
                  Alert.alert('Error', 'Failed to resend OTP');
                } finally {
                  setResendLoading(false);
                }
              }}>
              <Text style={styles.resendText}>
                {canResend
                  ? resendLoading
                    ? 'Resending…'
                    : 'Resend'
                  : "Didn't get the OTP?"}
              </Text>
            </TouchableOpacity>
            <Text style={styles.timerText}>
              Request again in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={styles.backToLogin}>Back to login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthenticationCodeScreen;