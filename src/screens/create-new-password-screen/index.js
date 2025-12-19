import React, { useState } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { mvs } from 'config/metrices';
import { colors } from 'config/colors';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview/index';
import PrimaryInput from 'components/atoms/inputs';
import { PrimaryButton } from 'components/atoms/buttons';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { navigate, goBack } from 'navigation/navigation-ref';
import styles from './styles';
import { ResetPasswordSchema } from 'validations';
import { onUpdatePassword } from 'services/api/auth-api-actions';

const CreateNewPasswordScreen = props => {
  const [loading, setLoading] = useState(false);
  const  email  = props?.route?.params?.email; // pass email from previous screen
console.log('Email for password reset: ', email);
  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };

const handleFormSubmit = async (values, { setErrors }) => {
  setLoading(true);
  try {
    const payload = {
      email, // pass the user's email from previous screen
      password: values.newPassword,
    };
    const res = await onUpdatePassword(payload);

    if (res?.success) {
      Alert.alert('Success', res.message);
      navigate('Login');
    } else {
      Alert.alert('Error', res?.message || 'Something went wrong');
    }
  } catch (err) {
    // err.message = main API message
    // err.fieldErrors = { email: [...], password: [...] }
    if (err.fieldErrors) {
      const formikErrors = {};
      Object.keys(err.fieldErrors).forEach((key) => {
        formikErrors[key === 'password' ? 'newPassword' : key] = err.fieldErrors[key][0];
      });
      setErrors(formikErrors);
    }
    Alert.alert('Error', err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={mvs(30)} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainerStyle}>
        <KeyboardAvoidScrollview contentContainerStyle={styles.keyboradscrollcontent}>
          <View style={styles.contentContainerStyleNew}>
            <Formik
              initialValues={initialValues}
              validationSchema={ResetPasswordSchema}
              onSubmit={handleFormSubmit}>
              {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                <>
                  <Medium
                    label="Create New Password"
                    color={colors.blackgrey}
                    fontSize={mvs(24)}
                    style={styles.forgottext}
                  />
                  <Regular
                    label="Enter your new password below."
                    color={colors.subText}
                    fontSize={mvs(16)}
                    style={styles.forgottext}
                  />

                  <PrimaryInput
                    isPasswordInput
                    isPassword
                    placeholder="New Password"
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                    error={touched.newPassword && errors.newPassword}
                    containerStyle={{ marginTop: mvs(15) }}
                  />

                  <PrimaryInput
                    isPasswordInput
                    isPassword
                    placeholder="Confirm New Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword}
                    containerStyle={{ marginTop: mvs(15) }}
                  />

                  <PrimaryButton
                    title="Save"
                    loading={loading}
                    containerStyle={{ borderRadius: mvs(50), marginTop: mvs(30) }}
                    onPress={handleSubmit}
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

export default CreateNewPasswordScreen;
