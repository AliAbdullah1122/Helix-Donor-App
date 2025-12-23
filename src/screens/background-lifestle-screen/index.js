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
import { useNavigation } from '@react-navigation/native';

const BackgroundLifeStyleScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState('Male');
  const [selectedNationality, setSelectedNationality] = React.useState(null);
  const [selectedDiet, setSelectedDiet] = React.useState(null);
    const navigation = useNavigation();

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
  
  // Static data for dropdowns
  const heightOptions = [
    {id: '4ft', title: '4ft'},
    {id: '5ft', title: '5ft'},
    {id: '6ft', title: '6ft'},
  ];
  
  const bodyBuildOptions = [
    {id: 'slim', title: 'Slim'},
    {id: 'athletic', title: 'Athletic'},
    {id: 'average', title: 'Average'},
    {id: 'curvy', title: 'Curvy'},
    {id: 'large', title: 'Large'},
  ];
  
  const hairColorOptions = [
    {id: 'auburn', title: 'Auburn'},
    {id: 'black', title: 'Black'},
    {id: 'blonde', title: 'Blonde'},
    {id: 'brown', title: 'Brown'},
    {id: 'red', title: 'Red'},
  ];
  
  const eyeColorOptions = [
    {id: 'blue', title: 'Blue'},
    {id: 'black', title: 'Black'},
    {id: 'green', title: 'Green'},
    {id: 'brown', title: 'Brown'},
    {id: 'hazel', title: 'Hazel'},
  ];
  
  const raceOptions = [
    {id: 'asian', title: 'Asian'},
    {id: 'black', title: 'Black'},
    {id: 'white', title: 'White'},
    {id: 'hispanic', title: 'Hispanic'},
    {id: 'other', title: 'Other'},
  ];
  
  const orientationOptions = [
    {id: 'straight', title: 'Straight'},
    {id: 'gay', title: 'Gay'},
    {id: 'lesbian', title: 'Lesbian'},
    {id: 'bisexual', title: 'Bisexual'},
    {id: 'other', title: 'Other'},
  ];
  return (
    <View style={styles.container}>
               {/* <Header1x2x title={'Driver Registration'} /> */}

      <ScrollView>
               <Row style={{alignItems:"center",marginHorizontal:mvs(14),marginVertical:mvs(10)}}>

        <IMG.Progress2
          width="100%" height={mvs(20)}
        
        />
        

        </Row>
        <TouchableOpacity onPress={()=>navigate("TabBar")} style={{paddingHorizontal:mvs(10)}}>
        <Medium label={'Skip For Now'} color={"#404040"} fontSize={mvs(14)} style={{textDecorationLine:"underline",alignSelf:"flex-end"}}/>
        </TouchableOpacity>
        <View style={{marginHorizontal:mvs(20),marginTop:mvs(20)}}>

         <Regular label={'Step 2 / 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
       
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Whats you background?'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'Share a bit about your life and education'}
          color={"#8C8C8C"}
          numberOfLines={10}
          fontSize={mvs(14)}
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
                      placeholder={'Enter Education'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      label='Education'
                      // isRequired
                      value={values.firstName}
                      containerStyle={{backgroundColor:colors.white}}
                      // containerStyle={styles.input}
                    />
                    <PrimaryInput
                    // isFulName
                      error={touched?.firstName ? errors.firstName : ''}
                      placeholder={'Enter Occupation'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      label='Occupation'
                      // isRequired
                      value={values.firstName}
                      containerStyle={{backgroundColor:colors.white}}
                      // containerStyle={styles.input}
                    />
                      <InputWithIcon
                    placeholder={'Select One'}
                    label='Nationality'
                    items={Nationality}
                    onChangeText={(id) => setSelectedNationality(id)}
                    id={selectedNationality}
                    /> 
                      <InputWithIcon
                    placeholder={'Select One'}
                    label='Diet'
                    items={eyeColorOptions}
                    onChangeText={(id) => setSelectedDiet(id)}
                    id={selectedDiet}
                    /> 
                   
                     
                   
                  
                    
                    


                   
                  
                   
                  </>
                )}
              </Formik>
              
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>
        <View style={{marginHorizontal:mvs(20), marginBottom: mvs(40)}}>
              <Row>
             <PrimaryButton
                            containerStyle={{
                              borderRadius: mvs(50),
                              height: mvs(43),
                              marginVertical: mvs(0),
                              backgroundColor:colors.transparent,
                              width:"33%",
                              borderWidth:1,
                              borderColor:colors.primary,
      
                            }}
                            loading={loading}
                            textStyle={{color:colors.primary}}
                            // onPress={handleSubmit}
                          onPress={() => navigation.goBack()}
                            title={'Back'}
                          />
             <PrimaryButton
                            containerStyle={{
                              borderRadius: mvs(50),
                              height: mvs(43),
                              marginVertical: mvs(0),
                              backgroundColor:"#3A3E90",
                               width:"33%"
                            }}
                            loading={loading}
                            // onPress={handleSubmit}
                            onPress={()=>navigate("MyOwnWordsScreen")}
                            title={'Continue'}
                          />
                          </Row>
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
export default BackgroundLifeStyleScreen;