import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import { mvs } from 'config/metrices';
import { Formik } from 'formik';
import { useAppDispatch } from 'hooks/use-store'; // Assuming you still need this for potential state updates
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import {
  View,
  Image,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
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

const ResetPasswordScreen = props => {
  const [otpModalVisible, setOtpModalVisible] = React.useState(false); // If you plan to show an OTP modal after
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch(); // Assuming you might use dispatch for global state
  const [verifyLoading, setVerifyLoading] = React.useState(false); // For OTP verification button
  const [otpValue, setOtpValue] = React.useState(''); // State for OTP input in modal



  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleFormSubmit = async values => {
    //     try {
    //       setLoading(true);
    //       const apiBody = {
    //         email: values.email,
    //       };
    //       console.log('Forgot Password API Body:', apiBody);
    //       const response = await forgotPassword(apiBody);
    //       if (response.success) { 
    //         setOtpModalVisible(true); 
    navigate("Login");
    //       }
    //     } catch (error) {
    //       // Alert.alert('Error', response?.message || 'Failed to send password reset instructions. Please try again.',);
    //     } finally {
    //       setLoading(false); 
    //     }
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
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header1x2x title="Change Password" back />
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
                  <PrimaryInput
                    isPasswordInput
                    isPassword
                    error={touched?.currentPassword ? errors.currentPassword : ''}
                    placeholder={'Current Password'}
                    onChangeText={handleChange('currentPassword')}
                    onBlur={handleBlur('currentPassword')}
                    value={values.currentPassword}
                    errorStyle={{ marginBottom: 0 }}
                    containerStyle={{marginTop:mvs(20)}}
                  />
                  <PrimaryInput
                    isPasswordInput
                    isPassword
                    error={touched?.newPassword ? errors.newPassword : ''}
                    placeholder={'New Password'}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                    errorStyle={{ marginBottom: 0 }}
                    containerStyle={{marginTop:mvs(15)}}
                  />
                  <PrimaryInput
                    isPasswordInput
                    isPassword
                    error={touched?.confirmPassword ? errors.confirmPassword : ''}
                    placeholder={'Confirm New Password'}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    errorStyle={{ marginBottom: 0 }}
                    containerStyle={{marginTop:mvs(15)}}
                  />

                  <TouchableOpacity
                    onPress={() => navigate('ForgotPassword')}
                    style={styles.forgotPasswordLink}>
                    <Medium
                      label="Forgot Password?"
                      color={colors.primary}
                      fontSize={mvs(14)}
                    />
                  </TouchableOpacity>

                 
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidScrollview>
        <View style={{paddingHorizontal:mvs(20),marginBottom:mvs(15)}}>
        <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(50),
                      marginTop: mvs(30),
                    }}
                    loading={loading}
                    // onPress={handleSubmit}
                    title={'Update'}
                  />
                  </View>
      </View>

    </View>
  );
};
export default ResetPasswordScreen;