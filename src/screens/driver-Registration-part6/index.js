import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {TouchableOpacity, View, Image, ScrollView, Alert} from 'react-native';
import PrimaryInput, {InputWithIcon} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
// import {signupDetailsFormValidation} from 'validations'; // We will create this
import styles from './styles';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';
import {FacBookIcon, GoogleIcon} from 'assets/icons';
import Regular from 'typography/regular-text';
import DropdownModal from 'components/molecules/modals/dropdown-modal';
import ResendOtpModal from 'components/molecules/modals/ResendOtp-modal';
import * as Yup from 'yup'; // Import Yup for validation
import {SignupSchema} from 'validations';
import {signUpForm, verifyOtp} from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import ImagePicker from 'react-native-image-crop-picker';

const DriverRegistrationPart6Screen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState('Yes');
  const [selectedSponsorship, setSelectedSponsorship] = React.useState('Uber');
  const [frontImage, setFrontImage] = React.useState(null);
  const [backImage, setBackImage] = React.useState(null);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const FullverifyOtp = async () => {
    try {
      setLoading(true);
      const payload = {
        otp: parseInt(otpValue),
        reset: false,
      };
      const res = await verifyOtp(payload);
      if (res?.success) {
        setOtpModalVisible(false);
        navigate('Login');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const openImagePicker = type => {
    Alert.alert('Upload Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          try {
            const image = await ImagePicker.openCamera({
              cropping: true,
              compressImageQuality: 0.8,
            });
            if (type === 'front') setFrontImage(image);
            else setBackImage(image);
          } catch (error) {
            console.log('Camera cancelled:', error);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          try {
            const image = await ImagePicker.openPicker({
              cropping: true,
              compressImageQuality: 0.8,
            });
            if (type === 'front') setFrontImage(image);
            else setBackImage(image);
          } catch (error) {
            console.log('Gallery cancelled:', error);
          }
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const handleFormSubmit = async (values, {resetForm}) => {
    try {
      setLoading(true);
      const apiBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      console.log('API Body:', apiBody);
      const response = await signUpForm(apiBody);
      if (response.success) {
        console.log('API Response:', response);
        resetForm();
        setOtpModalVisible(true);
      }
      console.log('response', response);
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setLoading(false); // Set loading to false after submission (success or error)
    }
  };
  const Nationality = [
    {id: 'Pakistan'},
    {id: 'United Kingdom'},
    {id: 'France'},
    {id: 'America'},
  ];
  return (
    <View style={styles.container}>
        <Header1x2x title={'Driver Registration'} />
      <ScrollView>
        <Row
          style={{
            alignItems: 'center',
            marginHorizontal: mvs(14),
            marginVertical: mvs(10),
          }}>
          {/* <Image
            source={IMG.Stepper6}
            resizeMode="contain"
            style={styles.imglogo}
          /> */}
          <IMG.Steps6Svg 
                            width="80%" height={mvs(20)}
                            // style={styles.imglogo}
                            />
          <Medium
            label={'Step 6 / 10'}
            fontSize={mvs(12)}
            color={colors.black}
          />
        </Row>
        {/* <Row style={styles.titleview}>
          <Bold
            label={'Welcome back'}
            color={colors.black}
            fontSize={mvs(26)}
          />
          <Image source={IMG.wave} style={styles.waveimg} />
        </Row> */}
        <View style={{marginHorizontal: mvs(14)}}>
          <Medium
            label={'Experience & Preferences'}
            color={colors.black}
            fontSize={mvs(18)}
          />
        </View>
        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.contentContainerStyleNew}>
              <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema} // Apply the validation schema
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
                    {console.log('errors', errors)}

                    <Medium
                      style={{fontWeight: '500'}}
                      color={colors.black}
                      numberOfLines={2}
                      fontSize={mvs(13)}
                      label={
                        'Are you legally allowed to work in Saudia Arabia?'
                      }
                    />

                    <Row style={{justifyContent: 'space-between',marginVertical:mvs(10)}}>
                      {['Yes', 'No'].map(gender => (
                        <TouchableOpacity
                          key={gender}
                          onPress={() => setSelectedGender(gender)}
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'center',
                            backgroundColor: colors.inputBackground,
                            borderRadius: mvs(50),
                            marginHorizontal: mvs(5),
                            paddingVertical: mvs(10),
                            // borderWidth: selectedGender === gender ? 1.5 : 0.5,
                            borderColor:
                              selectedGender === gender
                                ? colors.primary
                                : '#ccc',
                          }}>
                          <Row
                            style={{marginLeft: mvs(20), alignItems: 'center'}}>
                            <View
                              style={{
                                height: mvs(20),
                                width: mvs(20),
                                borderRadius: mvs(10),
                                borderWidth: 1,
                                borderColor:
                                  selectedGender === gender
                                    ? colors.primary
                                    : colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: mvs(8),
                              }}>
                              {selectedGender === gender && (
                                <View
                                  style={{
                                    height: mvs(10),
                                    width: mvs(10),
                                    borderRadius: mvs(5),
                                    backgroundColor: colors.primary,
                                  }}
                                />
                              )}
                            </View>
                            <Medium
                              label={gender}
                              color={colors.black}
                              fontSize={mvs(15)}
                            />
                          </Row>
                        </TouchableOpacity>
                      ))}
                    </Row>
                    <Medium
                      style={{fontWeight: '500'}}
                      color={colors.black}
                      numberOfLines={2}
                      fontSize={mvs(13)}
                      label={'Are you under your own sponsorship?'}
                    />

                    <View style={{justifyContent: 'space-between',gap:mvs(10),
                            marginTop:mvs(15),
                    }}>
                      {['Uber', 'Jahez','Hungerstation','Other'].map(gender => (
                        <TouchableOpacity
                          key={gender}
                          onPress={() => setSelectedSponsorship(gender)}
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'center',
                            backgroundColor: colors.inputBackground,
                            borderRadius: mvs(50),
                            marginHorizontal: mvs(5),
                            paddingVertical: mvs(13),
                            // borderWidth: selectedGender === gender ? 1.5 : 0.5,
                            borderColor:
                              selectedSponsorship === gender
                                ? colors.primary
                                : '#ccc',
                          }}>
                          <Row
                            style={{marginLeft: mvs(20), alignItems: 'center'}}>
                            <View
                              style={{
                                height: mvs(20),
                                width: mvs(20),
                                borderRadius: mvs(10),
                                borderWidth: 1,
                                borderColor:
                                  selectedSponsorship === gender
                                    ? colors.primary
                                    : colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: mvs(8),
                              }}>
                              {selectedSponsorship === gender && (
                                <View
                                  style={{
                                    height: mvs(10),
                                    width: mvs(10),
                                    borderRadius: mvs(5),
                                    backgroundColor: colors.primary,
                                  }}
                                />
                              )}
                            </View>
                            <Medium
                              label={gender}
                              color={colors.black}
                              fontSize={mvs(15)}
                            />
                          </Row>
                        </TouchableOpacity>
                      ))}
                    </View>

                   

                   

                    
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>
      <PrimaryButton
        containerStyle={{
          borderRadius: mvs(50),
          height: mvs(50),
          // marginTop: mvs(25),
          marginHorizontal: mvs(10),
          alignItems: 'center',
          marginBottom: mvs(20),
          width: '95%',
        }}
        loading={loading}
        // onPress={handleSubmit}
        onPress={() => navigate('DriverRegistrationPart7Screen')}
        title={'Next'}
      />
    </View>
  );
};
export default DriverRegistrationPart6Screen;
