import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import { mvs } from 'config/metrices';
import { Formik } from 'formik';
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import { TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview/index';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import { LoginSchema, signinFormValidation } from 'validations';
import styles from './styles';
import { colors } from 'config/colors';
import { Row } from 'components/atoms/row';
import { FacBookIcon, GoogleIcon } from 'assets/icons';
import Regular from 'typography/regular-text';
import { login, Signup } from 'services/api/auth-api-actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UTILS } from 'utils';
import { STORAGEKEYS } from 'config/constants';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Header1x2x from 'components/atoms/header-home/header-1x-2x';
import { StatusBar } from 'react-native';

const SignUpScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [rember, setRemember] = React.useState(true);
  const initialValues = {
    email: '',
    password: '',
    firstName: '',
  };
const handleFormSubmit = async (values, { resetForm }) => {
  try {
    setLoading(true);

    const apiBody = {
      name: values.firstName,
      email: values.email,
      password: values.password,
    };

    const response = await Signup(apiBody);

    // ❗ If Signup() returned null → stop execution
    if (!response) {
      return;
    }

    // ❗ Laravel validation errors (email already taken, etc.)
    if (response.errors) {
      const firstError =
        response?.errors?.email?.[0] ||
        response?.errors?.password?.[0] ||
        response?.errors?.name?.[0] ||
        response?.message ||
        "Validation error";

      Alert.alert("Signup Failed", firstError);
      return;
    }

    // ❗ Success
    if (response.status === true) {
      Alert.alert("Success", response.message);
      resetForm();
      navigate("SignUpAuthenticationCode");
      return;
    }

    // ❗ Catch-all for any unknown server response
    Alert.alert("Signup Failed", response.message || "Unexpected error");

  } catch (error) {
    console.error("Signup error:", error);
    Alert.alert("Error", "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.imgView}>
          <Image source={IMG.parcelLogo} style={styles.imglogo} resizeMode='contain' />
        </View>

        <Regular
          label={'Driver Sign Up'}
          color={colors.grey}
          fontSize={mvs(24)}
          style={styles.logintext}
        />
        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.contentContainerStyleNew}>
              <Formik
                initialValues={initialValues}
                // validationSchema={LoginSchema}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  touched,
                  values,
                  errors,
                }) => {
                  console.log('Formik errors:', errors);
                  console.log('Formik values:', values);

                  return (
                    <>
                      <PrimaryInput
                        isFulName
                        error={touched?.firstName ? errors.firstName : ''}
                        placeholder={'First Name'}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                      // containerStyle={styles.input}
                      />
                      <PrimaryInput
                        isEmailInput
                        keyboardType={'email-address'}
                        error={touched?.email ? errors.email : ''}
                        placeholder={'Email'}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      // containerStyle={styles.input}
                      />
                      <PrimaryInput
                        isPasswordInput
                        isPassword
                        error={touched?.password ? errors.password : ''}
                        placeholder={'Password'}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        errorStyle={{ marginBottom: 0 }}
                      // containerStyle={styles.input}
                      />
                      <PrimaryButton
                        containerStyle={{
                          borderRadius: mvs(50),
                          height: mvs(50),
                          marginTop: mvs(10),
                        }}
                        loading={loading}
                        onPress={handleSubmit}
                        title={'Create Account'}
                      />

                    </>
                  );
                }}
              </Formik>

            </View>
          </KeyboardAvoidScrollview>
        </View>
        <Row style={styles.loginview}>
          <Regular fontSize={mvs(16)} label={'Already have an account?'} color={colors.subText} style={styles.textStyle} />
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Regular style={{fontWeight:'bold'}} fontSize={mvs(16)} label={'Sign In'} color={colors.subText} />
          </TouchableOpacity>
        </Row>
      </ScrollView>
    </View>
  );
};
export default SignUpScreen;
