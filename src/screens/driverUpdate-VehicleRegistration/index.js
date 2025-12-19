import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {goBack, navigate} from 'navigation/navigation-ref';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import PrimaryInput, { InputWithIcon } from 'components/atoms/inputs';
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
import { SignupSchema } from 'validations';
import { signUpForm, verifyOtp } from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import ImagePicker from 'react-native-image-crop-picker';

const DriverUpdateVehicleRegistrationScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState('Male');
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
          navigate("Login");
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while verifying OTP');
      } finally {
        setLoading(false);
      }
    };

    const openImagePicker = (type) => {
  Alert.alert(
    'Upload Image',
    'Choose an option',
    [
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
      { text: 'Cancel', style: 'cancel' },
    ]
  );
};


  const handleFormSubmit = async (values,{ resetForm }) => {
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
  const Nationality = [{id: 'Pakistan'}, {id: 'United Kingdom'}, {id: 'France'}, {id: 'America'}];
  return (
 <View style={styles.container}>
 
               <Header1x2x title={'Vehicle Information'} />
           
      <ScrollView>
             
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Vehicle Information'}
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
                    
                  
{/*                   
                      <InputWithIcon

                    placeholder={'Vehicle Type'}
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    items={Nationality}
                    
                    /> */}
                      <PrimaryInput
                    isVehicleType
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Vehicle Type'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                      {/* <InputWithIcon

                    placeholder={'Vehicle Make'}
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    items={Nationality}
                    
                    /> */}
                      <PrimaryInput
                    isVehicleType
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Vehicle Make'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                      {/* <InputWithIcon

                    placeholder={'Vehicle Model'}
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    items={Nationality}
                    
                    /> */}
                      <PrimaryInput
                    isVehicleType
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Vehicle Model'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                      {/* <InputWithIcon

                    placeholder={'Vehcile Year'}
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    items={Nationality}
                    
                    /> */}

                      <PrimaryInput
                    isCalendarInput
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Vehicle Year'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                   
                     <PrimaryInput
                    isCalendarInput
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Plate Number'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                     <PrimaryInput
                    isCalendarInput
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Vehcile Registration (Istimara) Number'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                     <PrimaryInput
                    isCalendarInput
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Istimara Expiry Date'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                    
          

                   
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
                                    marginHorizontal:mvs(10),
                                    alignItems:"center",
                                    marginBottom:mvs(20),
                                    width:'95%'
                                  }}
                                  loading={loading}
                                  // onPress={handleSubmit}
                                  // onPress={()=>navigate("DriverRegistrationPart5Screen")}
                                  title={'Update'}
                                />
      
    </View>
  );
};
export default DriverUpdateVehicleRegistrationScreen;