import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {TouchableOpacity, View, Image, ScrollView, Alert} from 'react-native';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {LoginSchema, signinFormValidation} from 'validations';
import styles from './styles';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';
import {FacBookIcon, GoogleIcon} from 'assets/icons';
import Regular from 'typography/regular-text';
import {login, onLogin} from 'services/api/auth-api-actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UTILS} from 'utils';
import {STORAGEKEYS} from 'config/constants';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Header1x2x from 'components/atoms/header-home/header-1x-2x';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [rember, setRemember] = React.useState(true);
  const [error, setError] = React.useState('');
const dispatch = useDispatch();

  const initialValues = {
    email: '',
  };


const handleFormSubmit = async (values, {resetForm}) => {
  try {
    setLoading(true);
    setError('');

    const apiBody = {
      email: values.email,
      password: values.password,
    };

    const response = await dispatch(onLogin(apiBody, setLoading));

    console.log("LOGIN RESPONSE:", response);

    if (response?.status === true) {
      resetForm();
      navigate("TabBar");
      return;
    }

    setError(response?.message || "Incorrect email please try again");

  } catch (error) {
    console.error("Login error:", error);
    setError("Incorrect email please try again");
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.imgView}>
          <Image
            source={IMG.HelixWrittenLogo}
            resizeMode="contain"
            style={{width: mvs(140), height: mvs(37)}}
          />
        </View>
        
        <View style={styles.centerSection}>
          <View style={styles.contentContainerStyle}>
            <KeyboardAvoidScrollview
              contentContainerStyle={styles.keyboradscrollcontent}>
              <View style={styles.contentContainerStyleNew}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={LoginSchema}
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
                          // isEmailInput
                          keyboardType={'email-address'}
                          error={touched?.email ? errors.email : ''}
                          placeholder={'Enter Email'}
                          onChangeText={(text) => {
                            handleChange('email')(text);
                            if (error) {
                              setError('');
                            }
                          }}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          containerStyle={styles.emailInputContainer}
                        />
                        
                        {/* Error Message */}
                        {/* {error ? (
                          <View style={styles.errorContainer}>
                            <View style={styles.errorIconContainer}>
                              <Icon name="alert-circle" size={mvs(14)} color="#FFFFFF" />
                            </View>
                            <Regular
                              label={error}
                              fontSize={mvs(12)}
                              color="#FF0000"
                              style={styles.errorText}
                            />
                          </View>
                        ) : null} */}
                        
                        <PrimaryButton
                          containerStyle={styles.continueButton}
                          loading={loading}
                          // onPress={handleSubmit}
                          onPress={()=>navigate("OtpScreen")}
                          title={'Continue'}
                        />
                        
                      
                      </>
                    );
                  }}
                </Formik>
               
              </View>
            </KeyboardAvoidScrollview>
          </View>
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Regular
              label={'or continue with'}
              color={"#404040"}
              fontSize={mvs(12)}
              style={{marginHorizontal: mvs(12)}}
            />
            <View style={styles.divider} />
          </View>

          <Row style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={IMG.google}
                resizeMode="contain"
                style={styles.socialIcon}
              />
              <Regular label={'Google'} color={colors.black} fontSize={mvs(14)} style={{marginLeft: mvs(8)}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={IMG.apple}
                resizeMode="contain"
                style={styles.socialIcon}
              />
              <Regular label={'Apple'} color={colors.black} fontSize={mvs(14)} style={{marginLeft: mvs(8)}} />
            </TouchableOpacity>
          </Row>
        </View>

        <View style={styles.termsContainer}>
          <Regular
            color={colors.subText}
            fontSize={mvs(12)}
            style={{textAlign: 'left'}}
            numberOfLines={2}
          >
            <Regular label={'By continuing you agree to our '} color={"#8C8C8C"} fontSize={mvs(12)} />
            <Regular
              label={'Terms and Conditions'}
              color={colors.black}
              fontSize={mvs(12)}
              style={{textDecorationLine: 'underline'}}
              onPress={() => {}}
            />
            <Regular label={' and our '} color={'#8C8C8C'} fontSize={mvs(12)} />
            <Regular
              label={'Privacy Policy'}
              color={colors.black}
              fontSize={mvs(12)}
              style={{textDecorationLine: 'underline'}}
              onPress={() => {}}
            />
            <Regular label={'.'} color={'#8C8C8C'} fontSize={mvs(12)} />
          </Regular>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
