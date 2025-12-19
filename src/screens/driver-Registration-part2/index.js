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
  Text,
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
import { OtpInput } from 'components/atoms/otp-input';


const DriverRegistrationPart2Screen = props => {
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
               <Header1x2x title={'Driver Registration'} />
      <ScrollView>
               <Row style={{alignItems:"center",marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        {/* <Image source={IMG.Stepper2} resizeMode='contain' style={styles.imglogo} />
         */}
         <IMG.Steps2Svg 
        //  style={styles.imglogo}
          width="80%" height={mvs(20)}
         />
        <Medium label={'Step 2 / 10'} fontSize={mvs(12)} color={colors.black}/> 

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
          label={'Verification your number'}
          color={colors.black}
          fontSize={mvs(18)}
        />
        <View style={{marginVertical:mvs(10)}}>
       <Text numberOfLines={3} style={{fontWeight:'400',fontSize:mvs(17)}}  color={colors.black}>
  Enter the 5-digit code we just texted to your phone number,
  <Text style={{ fontWeight: 'bold', color: colors.subteXTcOLOR }}> +51 513 123515</Text>
</Text>
</View>

        </View>
        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.contentContainerStyleNew}>
             
               <View style={styles.otp}>
                        <OtpInput

                        //  setValue={setValue} 
                        //  value={value}
                          />
                      </View>

                      <Row style={{alignItems:"center",justifyContent:"center",marginVertical:mvs(20)}}>
                        <Medium fontSize={mvs(16)} label={'Resend Code in '} color={colors.subteXTcOLOR}/>
                        <Medium fontSize={mvs(16)} label={'00:30'} color={colors.black}/>
                      </Row>
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
                            onPress={()=>navigate("DriverRegistrationPart3Screen")}
                            title={'Next'}
                          />
                        
      
    </View>
  );
};
export default DriverRegistrationPart2Screen;