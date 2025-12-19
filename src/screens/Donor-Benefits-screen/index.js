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

const DonorBenefitsScreen = props => {
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
  const [searchText, setSearchText] = React.useState('');
  const [selectedConditions, setSelectedConditions] = React.useState([]);
  const [searchSuggestions, setSearchSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isInterestedInCompensation, setIsInterestedInCompensation] = React.useState(false);
  const [allowBidding, setAllowBidding] = React.useState(false);
  const [askingCompensation, setAskingCompensation] = React.useState('');
  const [minimumCompensation, setMinimumCompensation] = React.useState('');
  const [buyNowCompensation, setBuyNowCompensation] = React.useState('');

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

        <IMG.Progress5
          width="100%" height={mvs(20)}
        
        />
        

        </Row>
        <View style={{paddingHorizontal:mvs(10)}}>
        <Medium label={'Skip For Now'} color={"#404040"} fontSize={mvs(14)} style={{textDecorationLine:"underline",alignSelf:"flex-end"}}/>
        </View>
        <View style={{marginHorizontal:mvs(20)}}>

         <Regular label={'Stage 5 of 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
       
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Donor Compensation'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'Are you interested in being compensated for the services of providing your gametes?'}
          color={colors.textColor}
          numberOfLines={10}
          fontSize={mvs(14)}
          style={{marginTop:mvs(8)}}
        />
        </View>

        {/* Compensation Interest Toggle */}
        <View style={styles.compensationToggleContainer}>
          <Regular label="No" fontSize={mvs(14)} color={"#D9D9D9"} style={{marginRight:mvs(12)}} />
          <ToggleSwitch
            isOn={isInterestedInCompensation}
            onToggle={setIsInterestedInCompensation}
            onColor={colors.primary}
            offColor="#E5E5E5"
            circleColor={colors.white}
            size="medium"
          />
          <Regular label="Yes I am Interested" fontSize={mvs(14)} color={colors.textColor} style={{marginLeft:mvs(12)}} />
        </View>

        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.contentContainerStyleNew}>
              {/* Compensation Fields - Show when interested */}
              {isInterestedInCompensation && (
                <>
                  {/* Asking Compensation */}
                  <View style={{marginTop: mvs(0)}}>
                    <Medium
                      label="Asking Compensation"
                      fontSize={mvs(14)}
                      color={colors.textColorSecondary}
                      style={{marginBottom: mvs(12)}}
                    />
                    <PrimaryInput
                      placeholder="Enter amount"
                      value={askingCompensation}
                      onChangeText={setAskingCompensation}
                      keyboardType="numeric"
                      containerStyle={styles.amountInput}
                    />
                    <Regular
                      label="(This is your standard requested compensation amount.)"
                      fontSize={mvs(12)}
                      numberOfLines={10}
                      color={"#8C8C8C"}
                      // style={{marginTop: mvs(8)}}
                    />
                  </View>

                  {/* Allow Bidding Toggle */}
                  <View style={{marginTop: mvs(24)}}>
                    <View style={styles.biddingToggleContainer}>
                      <Medium
                        label="Allow Bidding / Auction?"
                        fontSize={mvs(14)}
                           numberOfLines={10}
                        color={colors.textColor}
                        style={{marginRight: mvs(12), flex: 1}}
                      />
                      <ToggleSwitch
                        isOn={allowBidding}
                        onToggle={setAllowBidding}
                        onColor={colors.primary}
                        offColor="#E5E5E5"
                        circleColor={colors.white}
                        size="medium"
                      />
                    </View>

                    {/* Bidding Fields - Show when bidding is allowed */}
                    {allowBidding && (
                      <>
                        <View style={{marginTop: mvs(0)}}>
                          <Medium
                            label="Minimum Accepted Compensation"
                            fontSize={mvs(14)}
                            color={colors.textColorSecondary}
                               numberOfLines={10}
                            style={{marginBottom: mvs(7)}}
                          />
                          <PrimaryInput
                            placeholder="Enter amount"
                            value={minimumCompensation}
                            onChangeText={setMinimumCompensation}
                            keyboardType="numeric"
                            containerStyle={styles.amountInput}
                          />
                        </View>

                        <View style={{marginTop: mvs(0)}}>
                          <Medium
                            label='"Buy Now" Compensation (Maximum)'
                            fontSize={mvs(14)}
                               numberOfLines={10}
                            color={colors.textColorSecondary}
                            style={{marginBottom: mvs(8)}}
                          />
                          <PrimaryInput
                            placeholder="Enter amount"
                            value={buyNowCompensation}
                            onChangeText={setBuyNowCompensation}
                            keyboardType="numeric"
                            containerStyle={styles.amountInput}
                          />
                          <Regular
                            label="(The amount at which you immediately accept an agreement.)"
                            fontSize={mvs(12)}
                               numberOfLines={10}
                            color={"#8C8C8C"}
                            style={{marginTop: mvs(8)}}
                          />
                        </View>
                      </>
                    )}
                  </View>
                </>
              )}
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>

     

      {/* Legal Disclaimer */}
      <View style={{marginHorizontal: mvs(20), marginTop: mvs(20), marginBottom: mvs(10)}}>
        <Regular
          label="Helix does not provide legal advice. You are responsible for verifying that gamete compensation is legal in your jurisdiction. Please abide by the laws of your country."
          fontSize={mvs(14)}
             numberOfLines={10}
          color={"#8C8C8C"}
          style={{ lineHeight: mvs(16)}}
        />
      </View>

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
                      onPress={()=>navigate("VerificationCompletionScreen")}
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
export default DonorBenefitsScreen;