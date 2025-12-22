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
import ImagePicker from 'react-native-image-crop-picker';
import DropdownModal from 'components/molecules/modals/dropdown-modal';
import ResendOtpModal from 'components/molecules/modals/ResendOtp-modal';
import * as Yup from 'yup'; // Import Yup for validation
import { SignupSchema } from 'validations';
import { signUpForm, verifyOtp } from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { useNavigation } from '@react-navigation/native';

const VerificationScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState('Male');
  const [documentImage, setDocumentImage] = React.useState(null);
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

  const handleSelectDocument = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 800,
        cropping: true,
        mediaType: 'photo',
      });
      setDocumentImage(image);
    } catch (error) {
      console.log('Image selection cancelled or failed', error);
    }
  };
  return (
    <View style={styles.container}>
               {/* <Header1x2x title={'Driver Registration'} /> */}

      <ScrollView>
               <Row style={{alignItems:"center",marginHorizontal:mvs(14),marginVertical:mvs(10)}}>

        <IMG.Progress1
          width="100%" height={mvs(20)}
        
        />
        

        </Row>
        {/* <View style={{marginHorizontal:mvs(20),marginTop:mvs(20)}}>

         <Regular label={'Stage 1 of 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
        */}

          <View style={{paddingHorizontal:mvs(10)}}>
                         <Medium  color={"#404040"} fontSize={mvs(14)} style={{textDecorationLine:"underline",alignSelf:"flex-end"}}/>
                         </View>
                         <View style={{marginHorizontal:mvs(20),marginTop:mvs(20)}}>
                          <Regular label={'Stage 1 of 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
                         </View>
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Verify Your Identity?'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'To ensure the safety of our community, please upload a clear photo of your government-issued ID.'}
          color={"#8C8C8C"}
          numberOfLines={3}
          fontSize={mvs(14)}
          style={{marginTop:mvs(8)}}
        />
        <Regular
          label={'Accepted: Driver License, Passport'}
          color={"#8C8C8C"}
          numberOfLines={3}
          fontSize={mvs(14)}
          style={{marginTop:mvs(8)}}
        />
        </View>
        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.contentContainerStyleNew}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.uploadBox}
                onPress={handleSelectDocument}>
                {documentImage ? (
                  <Image
                    source={{uri: documentImage.path}}
                    style={styles.uploadPreview}
                  />
                ) : (
                  <>
                    <View style={styles.uploadIconBox}>
                      <IMG.Upload width={mvs(60)} height={mvs(60)} />
                    </View>
                    <Regular
                      label="Upload Document"
                      fontSize={mvs(14)}
                      color={colors.helixPrimary}
                      style={styles.uploadText}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>

      <View style={{marginHorizontal: mvs(20), marginBottom: mvs(40)}}>
        <Regular
          label={'Your contact details are strictly confidential.'}
          fontSize={mvs(12)}
          color={'#8C8C8C'}
          style={{textAlign: 'center', marginTop: mvs(10)}}
        />
      </View>

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
                      onPress={()=>navigate("PrimaryPhotoScreen")}
                      title={'Continue'}
                    />
                    </Row>
                    </View>
    
    </View>
  );
};
export default VerificationScreen;