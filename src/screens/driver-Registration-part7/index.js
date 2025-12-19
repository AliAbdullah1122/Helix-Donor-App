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

const DriverRegistrationPart7Screen = props => {
  const scrollViewRef = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState('Yes');
  const [selectedSponsorship, setSelectedSponsorship] = React.useState('Yes');
  const [frontImage, setFrontImage] = React.useState(null);
  const [backImage, setBackImage] = React.useState(null);
  const [showSubmit, setShowSubmit] = React.useState(false);


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
<ScrollView
  ref={scrollViewRef}
  onScroll={({nativeEvent}) => {
    const paddingToBottom = 20;
    if (
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - paddingToBottom
    ) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }}
  scrollEventThrottle={16}
>

       
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
           <IMG.Steps7Svg 
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
            label={'Agrement & Consent'}
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

                    <Bold
                      style={{fontWeight: '700'}}
                      color={colors.black}
                      numberOfLines={2}
                      fontSize={mvs(16)}
                      label={'Clause 1'}
                    />
                    <View style={{marginTop:mvs(5),marginBottom:mvs(15)}}>
                    <Regular
                      style={{fontWeight: '400'}}
                      color={colors.subteXTcOLOR}
                      numberOfLines={20}
                      fontSize={mvs(14)}
                      label={
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
                      }
                    />
                    </View>
                    <Bold
                      style={{fontWeight: '700'}}
                      color={colors.black}
                      numberOfLines={2}
                      fontSize={mvs(16)}
                      label={'Clause 2'}
                    />
                    <View style={{marginVertical:mvs(5)}}>
                    <Regular
                      style={{fontWeight: '400'}}
                      color={colors.subteXTcOLOR}
                      numberOfLines={20}
                      fontSize={mvs(14)}
                      label={
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
                      }
                    />
                    </View>
                    <Bold
                      style={{fontWeight: '700'}}
                      color={colors.black}
                      numberOfLines={2}
                      fontSize={mvs(16)}
                      label={'Clause 3'}
                    />
                     <View style={{marginTop:mvs(5),marginBottom:mvs(15)}}>
                    <Regular
                      style={{fontWeight: '400'}}
                      color={colors.subteXTcOLOR}
                      numberOfLines={20}
                      fontSize={mvs(14)}
                      label={
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
                      }
                    />
                    </View>

                    <Medium
                                          style={{fontWeight: '500'}}
                                          color={colors.black}
                                          numberOfLines={2}
                                          fontSize={mvs(13)}
                                          label={'Do you agree to the terms and conditions?'}
                                        />

                    <Row style={{justifyContent: 'space-between'}}>
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
                    <View style={{marginVertical:mvs(14)}}>
                    <Medium
                      style={{fontWeight: '500'}}
                      color={colors.black}
                      numberOfLines={2}
                      fontSize={mvs(13)}
                      label={'Do you allowed background checks and verfication of your documents?'}
                    />
   <Row style={{justifyContent: 'space-between'}}>
                      {['Yes', 'No'].map(gender => (
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
                            paddingVertical: mvs(10),
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
                    </Row>

                    </View>
                  
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>
      {/* <PrimaryButton
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
        onPress={() => navigate('DriverRegistrationPart3Screen')}
        title={'Next'}
      /> */}
      {showSubmit ? (
  <PrimaryButton
    containerStyle={{
      borderRadius: mvs(50),
      height: mvs(50),
      marginHorizontal: mvs(10),
      alignItems: 'center',
      marginBottom: mvs(20),
      width: '95%',
    }}
    loading={loading}
    onPress={() => navigate('SubmitScreen')}
    title={'Submit'}
  />
) : (
<PrimaryButton
  containerStyle={{
    borderRadius: mvs(50),
    height: mvs(50),
    marginHorizontal: mvs(10),
    alignItems: 'center',
    marginBottom: mvs(20),
    width: '95%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  }}
  textStyle={{color:colors.primary}}
  title={'Read More'}
  onPress={() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }}
/>

)}

    </View>
  );
};
export default DriverRegistrationPart7Screen;
