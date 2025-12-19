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

const DriverRegistrationPart1Screen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState('Male');


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
               {/* <Header1x2x title={'Driver Registration'} /> */}

      <ScrollView>
               <Row style={{alignItems:"center",marginHorizontal:mvs(14),marginVertical:mvs(10)}}>

        <IMG.Progress1
          width="100%" height={mvs(20)}
        
        />
        

        </Row>
        <View style={{marginHorizontal:mvs(20)}}>

         <Regular label={'Step 1 / 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
       
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Lets start with the basis'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'Please give us the information that appears on your gpvernment-issued ID.'}
          color={"8C8C8C"}
          numberOfLines={10}
          fontSize={mvs(12)}
          style={{marginTop:mvs(8)}}
        />
        </View>
        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.contentContainerStyleNew}>
              <Formik
                initialValues={initialValues}
                // validationSchema={SignupSchema} // Apply the validation schema
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
                    <PrimaryInput
                    // isFulName
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Name'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      label='Full Legal Name'
                      isRequired
                      value={values.firstName}
                      containerStyle={{backgroundColor:colors.white}}
                      // containerStyle={styles.input}
                    />
                   
                   <PrimaryInput
                   label="Date of Birth"

                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'MM / DD / YYYY'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                       isRequired
                                containerStyle={{backgroundColor:colors.white}}
                      // containerStyle={styles.input}
                    />
                    
                    
{/* <View style={{marginTop:mvs(20)}}>
<PrimaryInput
                    isCountry
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Mobile Number'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      // containerStyle={styles.input}
                    />
                    <Regular style={{marginBottom:mvs(0)}} fontSize={mvs(13)} color={colors.black} label={'We will verified your number'}/>
                    </View> */}

                   
                  
                   
                  </>
                )}
              </Formik>
              
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>
      <View style={{marginHorizontal:mvs(20)}}>
       <PrimaryButton
                      containerStyle={{
                        borderRadius: mvs(50),
                        height: mvs(50),
                        marginVertical: mvs(10),
                        backgroundColor:"#3A3E90"
                      }}
                      loading={loading}
                      // onPress={handleSubmit}
                      onPress={()=>navigate("ContactInformationScreen")}
                      title={'Continue'}
                    />
                    </View>
      {/* <DropdownModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onChangeText={() => {
          setModalVisible(false);
        }}
      /> */}
      <ResendOtpModal
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        onPress={FullverifyOtp}
        value={otpValue}
        setValue={setOtpValue}
        email={initialValues.email} // Pass the email from form
        loading={loading} // Pass loading state if needed
        
      />
    </View>
  );
};
export default DriverRegistrationPart1Screen;