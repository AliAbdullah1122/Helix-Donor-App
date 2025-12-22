import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {TouchableOpacity, View, Image, ScrollView, Alert, TextInput} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
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
import {useNavigation} from '@react-navigation/native';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import Icon from 'react-native-vector-icons/Ionicons';

const InfectionDiseaseScreen = props => {
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
  const [hivHepatitis, setHivHepatitis] = React.useState(null);
  const [needleDrugUse, setNeedleDrugUse] = React.useState(null);
  const [bloodTransfusion, setBloodTransfusion] = React.useState(null);
  const [malariaTravel, setMalariaTravel] = React.useState(null);
  const [zikaTravel, setZikaTravel] = React.useState(null);

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

        <IMG.Progress3
          width="100%" height={mvs(20)}
        
        />
        

        </Row>
        <View style={{paddingHorizontal:mvs(10)}}>
        <Medium label={'Skip For Now'} color={"#404040"} fontSize={mvs(14)} style={{textDecorationLine:"underline",alignSelf:"flex-end"}}/>
        </View>
        <View style={{marginHorizontal:mvs(20),marginTop:mvs(20)}}>

         <Regular label={'Stage 3 of 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
       
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Lifestyle & Travel History'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'To ensure the safety of all users, we are required to ask the following standard screeing questions.'}
          color={"#8C8C8C"}
          numberOfLines={3}
          fontSize={mvs(14)}
          style={{marginTop:mvs(8)}}
        />
        <Regular
          label={'Your answers are strictly confidential, used only for mandatory safety screening, and will NEVER be shown on your public profile.'}
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
              <Formik
                initialValues={initialValues}
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
                    {/* HIV, Hepatitis B, or Hepatitis C */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you ever tested positive for HIV, Hepatitis B, or Hepatitis C?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setHivHepatitis(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              hivHepatitis === option && styles.radioCircleSelected,
                            ]}>
                              {hivHepatitis === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                              fontSize={mvs(14)}
                              numberOfLines={10}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Needle Drug Use */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you ever used a needle to take a drug, steroid, or anything not prescribed by a doctor?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setNeedleDrugUse(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              needleDrugUse === option && styles.radioCircleSelected,
                            ]}>
                              {needleDrugUse === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                              fontSize={mvs(14)}
                              numberOfLines={10}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Blood Transfusion or Organ Transplant */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you ever received a blood transfusion or organ transplant?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setBloodTransfusion(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              bloodTransfusion === option && styles.radioCircleSelected,
                            ]}>
                              {bloodTransfusion === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                              fontSize={mvs(14)}
                              numberOfLines={10}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Malaria Travel */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="In the last 3 years, have you traveled to an area with a known risk for malaria?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setMalariaTravel(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              malariaTravel === option && styles.radioCircleSelected,
                            ]}>
                              {malariaTravel === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                              fontSize={mvs(14)}
                              numberOfLines={10}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Zika Travel */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="In the last 6 months, have you traveled to or resided in an area with a known risk for Zika virus transmission?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setZikaTravel(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              zikaTravel === option && styles.radioCircleSelected,
                            ]}>
                              {zikaTravel === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                              fontSize={mvs(14)}
                              numberOfLines={10}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Allergies */}
                   

                    {/* Reproductive Health Issues */}
                
                    {/* Menstrual Cycles */}
                  

                    {/* Pregnancy/Birth */}
                  

                

                    {/* Select all that applies text */}
                    {/* <View style={{marginTop: mvs(30), marginBottom: mvs(20)}}>
                      <Regular
                        label="Select all that applies."
                         numberOfLines={10}
                        fontSize={mvs(14)}
                        color={"#8C8C8C"}
                        style={{textAlign: 'center'}}
                      />
                    </View> */}
                  </>
                )}
              </Formik>
              
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>

     

      <View style={{marginHorizontal: mvs(20), marginBottom: mvs(40)}}>
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
                      onPress={()=>navigate("GeneticGatewayScreen")}
                      title={'Continue'}
                    />
                    </Row>
                    </View>
      {/* Privacy Modal */}
      <ModalWrapper
        visible={privacyModalVisible}
        onBackdropPress={() => setPrivacyModalVisible(false)}
        onBackButtonPress={() => setPrivacyModalVisible(false)}
        style={{paddingHorizontal: mvs(20)}}>
        <View
          style={{
            paddingHorizontal: mvs(24),
            paddingVertical: mvs(24),
            borderRadius: mvs(20),
            backgroundColor: colors.white,
            width: '100%',
          }}>
          <Medium
            label="Privacy"
            fontSize={mvs(18)}
            color={colors.textColor}
            style={{textAlign: 'center', marginBottom: mvs(12)}}
          />
          <Regular
            label={
              'All your medical information will always be kept private to you, and wont be publicly visible.'
            }
            fontSize={mvs(14)}
            color={colors.textColor}
            numberOfLines={3}
            style={{textAlign: 'left', marginBottom: mvs(20)}}
          />
          <View style={styles.modalButtonContainer}>
            <PrimaryButton
              title="Okay"
              onPress={() => setPrivacyModalVisible(false)}
              containerStyle={{
                borderRadius: mvs(50),
                height: mvs(43),
                marginVertical: 0,
                width: mvs(100),
                backgroundColor: colors.helixPrimary,
              }}
              textStyle={{color: colors.white}}
            />
          </View>
        </View>
      </ModalWrapper>

    </View>
  );
};
export default InfectionDiseaseScreen;