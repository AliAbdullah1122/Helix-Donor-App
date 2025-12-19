import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {TouchableOpacity, View, Image, ScrollView, Alert, TextInput} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import PrimaryInput, { InputWithIcon } from 'components/atoms/inputs';
import Feather from 'react-native-vector-icons/Feather';
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
import {useNavigation} from '@react-navigation/native';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import Icon from 'react-native-vector-icons/Ionicons';

const VerificationCompletionScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = React.useState(false);
  const [alwaysPrivate, setAlwaysPrivate] = React.useState(false);
  const [chronicConditions, setChronicConditions] = React.useState({
    diabetes: false,
    heartCondition: false,
    autoimmune: false,
    cancer: false,
    neurological: false,
    respiratory: false,
    other: false,
  });
  const [otherConditionText, setOtherConditionText] = React.useState('');
  const [majorSurgeries, setMajorSurgeries] = React.useState(null);
  const [surgeriesText, setSurgeriesText] = React.useState('');
  const [allergies, setAllergies] = React.useState(null);
  const [cmvStatus, setCmvStatus] = React.useState(null);
  const [prescriptionMeds, setPrescriptionMeds] = React.useState(null);
  const [medsText, setMedsText] = React.useState('');
  const [mentalHealth, setMentalHealth] = React.useState(null);
  const [mentalHealthText, setMentalHealthText] = React.useState('');
  const [fatheredChildren, setFatheredChildren] = React.useState(null);
  const [reproductiveIssues, setReproductiveIssues] = React.useState(null);
  const [menstrualCycles, setMenstrualCycles] = React.useState(null);
  const [pregnancyBirth, setPregnancyBirth] = React.useState(null);
  const [reproductiveConditions, setReproductiveConditions] = React.useState(null);
  const [informedConsentChecked, setInformedConsentChecked] = React.useState(false);
  const [anonymityPreference, setAnonymityPreference] = React.useState('identity');
  const [completionModalVisible, setCompletionModalVisible] = React.useState(false);

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
  return (
    <View style={styles.container}>
               {/* <Header1x2x title={'Driver Registration'} /> */}

      <ScrollView>
               <Row style={{alignItems:"center",marginHorizontal:mvs(14),marginVertical:mvs(10)}}>

        <IMG.Progress6
          width="100%" height={mvs(20)}
        
        />
        

        </Row>
        <View style={{paddingHorizontal:mvs(10)}}>
        <Medium label={'Skip For Now'} color={"#404040"} fontSize={mvs(14)} style={{textDecorationLine:"underline",alignSelf:"flex-end"}}/>
        </View>
        <View style={{marginHorizontal:mvs(20)}}>

         <Regular label={'Stage 6 of 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
       
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Legal Agreements'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'Please review and agree to the terms of donation to complete your profile.'}
          color={colors.textColor}
          fontSize={mvs(14)}
          style={{marginTop:mvs(8)}}
        />
        </View>

        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.contentContainerStyleNew}>
              {/* Informed Consent */}
              <View style={{marginTop: mvs(20)}}>
                <View style={styles.checkboxRow}>
                  <TouchableOpacity
                    onPress={() => setInformedConsentChecked(!informedConsentChecked)}
                    style={[
                      styles.customCheckbox,
                      informedConsentChecked && styles.customCheckboxChecked,
                    ]}>
                    {informedConsentChecked && (
                      <Icon
                        name="checkmark"
                        size={mvs(14)}
                        color={colors.white}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={{flex: 1, marginLeft: mvs(12)}}>
                    <Regular
                      label="I have read and agree to the Informed Consent for Donation."
                      fontSize={mvs(14)}
                      color={colors.textColor}
                      numberOfLines={3}
                    />
                    <TouchableOpacity onPress={() => {}}>
                      <Regular
                        label="Tap to view document"
                        fontSize={mvs(14)}
                        color={colors.helixPrimary}
                        style={{textDecorationLine: 'underline', marginTop: mvs(4)}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Anonymity Preference */}
              <View style={{marginTop: mvs(30)}}>
                <Medium
                  label="Anonymity Preference:"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                  style={{marginBottom: mvs(16)}}
                />
                
                {/* Identity Disclosure Option */}
                <TouchableOpacity
                  onPress={() => setAnonymityPreference('identity')}
                  style={styles.radioOptionContainer}>
                  <View style={[
                    styles.radioCircle,
                    anonymityPreference === 'identity' && styles.radioCircleSelected,
                  ]}>
                    {anonymityPreference === 'identity' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <View style={{flex: 1, marginLeft: mvs(12)}}>
                    <Regular
                      label="Identity Disclosure"
                      fontSize={mvs(14)}
                      color={colors.textColor}
                      style={{marginBottom: mvs(4)}}
                    />
                    <Regular
                      label="I agree to the release of my identifying information to any offspring upon their 18th birthday."
                      fontSize={mvs(12)}
                      color={"#8C8C8C"}
                      numberOfLines={3}
                    />
                  </View>
                </TouchableOpacity>

                {/* Anonymous Option */}
                <TouchableOpacity
                  onPress={() => setAnonymityPreference('anonymous')}
                  style={[styles.radioOptionContainer, {marginTop: mvs(16)}]}>
                  <View style={[
                    styles.radioCircle,
                    anonymityPreference === 'anonymous' && styles.radioCircleSelected,
                  ]}>
                    {anonymityPreference === 'anonymous' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <View style={{flex: 1, marginLeft: mvs(12)}}>
                    <Regular
                      label="Anonymous"
                      fontSize={mvs(14)}
                      color={colors.textColor}
                      style={{marginBottom: mvs(4)}}
                    />
                    <Regular
                      label="I do not agree to the release of my identifying information."
                      fontSize={mvs(12)}
                      color={"#8C8C8C"}
                      numberOfLines={2}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>

     

      <View style={{marginHorizontal: mvs(20), marginBottom: mvs(10)}}>
        <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
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
                      onPress={() => setCompletionModalVisible(true)}
                      title={'Continue'}
                    />
                    </Row>
                    </View>
      {/* Completion Modal */}
      <ModalWrapper
        visible={completionModalVisible}
        onBackdropPress={() => setCompletionModalVisible(false)}
        onBackButtonPress={() => setCompletionModalVisible(false)}
        style={{paddingHorizontal: mvs(20)}}>
        <View style={styles.completionModalContainer}>
          <View style={styles.completionModalImageContainer}>
            <IMG.Completionuser width={mvs(100)} height={mvs(100)} />
          </View>
          <Medium
            label="You're All Set!"
            fontSize={mvs(20)}
            color={colors.textColor}
            style={{textAlign: 'center', marginTop: mvs(20), marginBottom: mvs(12)}}
          />
          <Regular
            label="It's time to start exploring and find your meaningful procreation connection."
            fontSize={mvs(14)}
            color={colors.textColor}
            numberOfLines={3}
            style={{textAlign: 'center', marginBottom: mvs(24)}}
          />
          <PrimaryButton
            title="Start Swiping"
            onPress={() => {
              setCompletionModalVisible(false);
              navigate("Drawer")
              // Navigate to main app screen
            }}
            containerStyle={{
              borderRadius: mvs(40),
              height: mvs(43),
              width:mvs(183),
              marginVertical: 0,
              // width: '100%',
              backgroundColor: colors.primary,
            }}
            textStyle={{color: colors.white}}
          />
        </View>
      </ModalWrapper>

    </View>
  );
};
export default VerificationCompletionScreen;