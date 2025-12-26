import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import { mvs } from 'config/metrices';
import { Formik } from 'formik';
import { useAppDispatch } from 'hooks/use-store'; // Assuming you still need this for potential state updates
import { navigate,goBack } from 'navigation/navigation-ref';
import React from 'react';
import {
  View,
  Image,
  Alert,
  StatusBar,
  TouchableOpacity, // Import Alert for user feedback
} from 'react-native';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview/index';
import i18n from 'translation'; // Assuming you use i18n for localization
import Bold from 'typography/bold-text';
// import { forgotPasswordValidation } from 'validations'; // We will define this inline with Yup
import styles from './styles';
import { colors } from 'config/colors';
import {
  ForgotPasswordAnimation,
} from 'assets/icons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { forgotPassword, onForgot, verifyOtp } from 'services/api/auth-api-actions'; // Ensure this path is correct
import * as Yup from 'yup'; // Import Yup for validation
import { ForgotPasswordSchema } from 'validations';
import ResendOtpModal from 'components/molecules/modals/ResendOtp-modal';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/Feather';

const ForgotPasswordScreen = props => {
  const [otpModalVisible, setOtpModalVisible] = React.useState(false); // If you plan to show an OTP modal after
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch(); // Assuming you might use dispatch for global state
  const [verifyLoading, setVerifyLoading] = React.useState(false); // For OTP verification button
  const [otpValue, setOtpValue] = React.useState(''); // State for OTP input in modal



  const initialValues = {
    email: '',
  };

  const handleFormSubmit = async values => {
        try {
          setLoading(true);
          const apiBody = {
            email: values.email,
          };
          console.log('Forgot Password API Body:', apiBody);
          const response = await forgotPassword(apiBody);
          console.log('Forgot Password API res:', response);
          if (response?.success) { 
                      Alert.alert('Success', response?.message);
            // setOtpModalVisible(true); 
              navigate("AuthenticationCode",{email:values.email});
          }
        } catch (error) {
          // Alert.alert('Error', response?.message || 'Failed to send password reset instructions. Please try again.',);
        } finally {
          setLoading(false); 
        }
  };

  //  const FullverifyOtp = async () => {
  //    try {
  //      setLoading(true);
  //      const payload = {
  //        otp: parseInt(otpValue), 
  //        reset: true, 
  //       };
  //       console.log("payload", payload)
  //       const res = await verifyOtp(payload);
  //         if (res?.success) {
  //           setOtpModalVisible(false);
  //           navigate("ResetPassword");
  //         }
  //       } catch (error) {
  //         Alert.alert('Error', 'An error occurred while verifying OTP');
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {/* <Header1x2x style={{ backgroundColor: colors.white }} back /> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={mvs(30)} color={colors.black} />
        </TouchableOpacity>
        
      </View>
      <View style={styles.contentContainerStyle}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboradscrollcontent}>
          <View style={styles.contentContainerStyleNew}>
            <Formik
              initialValues={initialValues}
              validationSchema={ForgotPasswordSchema}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                errors,
              }) => (
                <>
                  <Medium
                    label={'Forgot Password'}
                    color={colors.grey}
                    fontSize={mvs(24)}
                    style={styles.forgottext}
                  />
                  <Regular
                    label={'Input your email a verification code will be sent to this email.'}
                    color={colors.subText}
                    fontSize={mvs(16)}
                    style={styles.forgottext}
                    numberOfLines={3}
                  />
                  <PrimaryInput
                  isEmailInput
                    keyboardType={'email-address'}
                    error={touched?.email ? errors.email : ''}
                    placeholder={'Email Address'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    containerStyle={styles.input}
                  />

                  <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(50),
                      marginTop: mvs(5),
                    }}
                    loading={loading}
                    onPress={handleSubmit}
                    title={'Continue'}
                  />
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidScrollview>
      </View>

    </View>
  );
};
export default ForgotPasswordScreen;