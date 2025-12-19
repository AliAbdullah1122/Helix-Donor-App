import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {navigate} from 'navigation/navigation-ref';
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

const DriverRegistrationPart4Screen = props => {
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
               <Header1x2x title={'Driver Registration'} />
      <ScrollView>
               <Row style={{alignItems:"center",marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        {/* <Image source={IMG.Stepper4} resizeMode='contain' style={styles.imglogo} /> */}

         <IMG.Steps4Svg 
                width="80%" height={mvs(20)}
                // style={styles.imglogo}
                />
        <Medium label={'Step 4 / 10'} fontSize={mvs(12)} color={colors.black}/> 

        </Row>
        {/* <Row style={styles.titleview}>
          <Bold
            label={'Welcome back'}
            color={colors.black}
            fontSize={mvs(26)}
          />
          <Image source={IMG.wave} style={styles.waveimg} />
        </Row> */}
        <View style={{marginHorizontal:mvs(14)}}>
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
                    
                <Medium style={{fontWeight:"500"}} color={colors.black} fontSize={mvs(13)} label='Upload photo of Vehicle'/>


{frontImage ? (
  <View
    style={{
      borderRadius: mvs(50),
      height: mvs(60),
      marginTop: mvs(25),
      // borderWidth: 1,
      borderColor: colors.primary,
      paddingHorizontal: mvs(15),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
    <Row style={{ alignItems: 'center',width:"70%"}}>
      <View
        style={{
          width: mvs(25),
          height: mvs(25),
          borderRadius: mvs(25),
          borderWidth: 2,
          borderColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: mvs(10),
        }}>
        {/* <Medium label="✓" color={colors.primary} /> */}
        {/* <Image source={IMG.tickmark} resizeMode='contain' style={{width:mvs(40),height:mvs(40)}}/> */}
         <IMG.TickSvg height={mvs(40)} width={mvs(40)}/>
      </View>
      <View style={{marginLeft:mvs(10)}}>
        <Medium  label="Front Image" color={colors.black} />
       <Regular
       numberOfLines={1}
      style={{width:"50%"}}
      //  style={{width:"40%"}}
  label={
    frontImage?.filename
      ? frontImage.filename
      : frontImage?.path
      ? frontImage.path.split('/').pop()
      : 'File selected'
  }
/>

      </View>
    </Row>
    <TouchableOpacity
      onPress={() => openImagePicker('front')}
      style={{
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: mvs(10),
        paddingVertical: mvs(5),
        borderRadius: mvs(20),
      }}>
      <Medium label="Again Upload" color={colors.primary} fontSize={mvs(12)} />
    </TouchableOpacity>
  </View>
) : (
  <PrimaryButton
    containerStyle={{
      borderRadius: mvs(50),
      height: mvs(50),
      marginTop: mvs(25),
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
    }}
    textStyle={{
      color: colors.primary,
    }}
    onPress={() => openImagePicker('front')}
    title="Front Image"
  />
)}


{/* ===== BACK IMAGE SECTION ===== */}
{backImage ? (
  <View
    style={{
      borderRadius: mvs(50),
      height: mvs(60),
      marginTop: mvs(25),
      // borderWidth: 1,
      borderColor: colors.primary,
      paddingHorizontal: mvs(15),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
    <Row style={{alignItems: 'center', width: '70%'}}>
      <View
        style={{
          width: mvs(25),
          height: mvs(25),
          borderRadius: mvs(25),
          borderWidth: 2,
          borderColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: mvs(10),
        }}>
        {/* <Image source={IMG.tickmark} resizeMode="contain" style={{width: mvs(40), height: mvs(40)}} /> */}
         <IMG.TickSvg height={mvs(40)} width={mvs(40)}/>
      </View>
      <View style={{marginLeft: mvs(10)}}>
        <Medium label="Back Image" color={colors.black} />
        <Regular
          numberOfLines={1}
          style={{width: '50%'}}
          label={
            backImage?.filename
              ? backImage.filename
              : backImage?.path
              ? backImage.path.split('/').pop()
              : 'File selected'
          }
        />
      </View>
    </Row>
    <TouchableOpacity
      onPress={() => openImagePicker('back')}
      style={{
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: mvs(10),
        paddingVertical: mvs(5),
        borderRadius: mvs(20),
      }}>
      <Medium label="Again Upload" color={colors.primary} fontSize={mvs(12)} />
    </TouchableOpacity>
  </View>
) : (
  <PrimaryButton
    containerStyle={{
      borderRadius: mvs(50),
      height: mvs(50),
      marginTop: mvs(25),
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
    }}
    textStyle={{
      color: colors.primary,
    }}
    onPress={() => openImagePicker('back')}
    title="Back Image"
  />
)}


                   
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
                                  onPress={()=>navigate("DriverRegistrationPart5Screen")}
                                  title={'Next'}
                                />
      
    </View>
  );
};
export default DriverRegistrationPart4Screen;