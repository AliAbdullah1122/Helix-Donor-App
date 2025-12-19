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
  StatusBar,
  Modal,
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
import Icon from 'react-native-vector-icons/Ionicons';

const AccountRoleScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState('Woman');
  const [roleChangeModalVisible, setRoleChangeModalVisible] = React.useState(false);
  const [pendingRoleChange, setPendingRoleChange] = React.useState(null);
  const [previousRole, setPreviousRole] = React.useState('Looking for a Donor');
  const setFieldValueRef = React.useRef(null);
    const navigation = useNavigation();

  const initialValues = {
    fullLegalName: 'Jessica Anne Miller',
    dateOfBirth: 'August 15, 1989',
    contactEmail: 'jess.miller@email.com',
    phoneNumber: '+1 (555) 987-6543',
    currentAddress: '1234 South Lamar Blvd, Apt 205, Austin, TX 78704, USA',
    genderIdentity: 'Woman',
    orientation: 'Straight',
    myRole: 'Looking for a Donor',
    lookingFor: 'Sperm Donor',
    intentConnectionType: 'Private Donor, Co-Parenting',
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

  const genderIdentityOptions = [
    {id: 'woman', title: 'Woman'},
    {id: 'man', title: 'Man'},
    {id: 'non-binary', title: 'Non-Binary'},
    {id: 'other', title: 'Other'},
  ];

  const myRoleOptions = [
    {id: 'looking_for_donor', title: 'Looking for a Donor'},
    {id: 'donor', title: 'I am a Donor'},
    {id: 'co_parent', title: 'Co-Parent'},
  ];

  const lookingForOptions = [
    {id: 'sperm_donor', title: 'Sperm Donor'},
    {id: 'egg_donor', title: 'Egg Donor'},
    {id: 'embryo_donor', title: 'Embryo Donor'},
  ];

  const intentConnectionTypeOptions = [
    {id: 'private_donor_co_parenting', title: 'Private Donor, Co-Parenting'},
    {id: 'private_donor', title: 'Private Donor'},
    {id: 'co_parenting', title: 'Co-Parenting'},
  ];

  const handleRoleChange = (newRoleId, setFieldValue, currentRole) => {
    setFieldValueRef.current = setFieldValue;
    const newRoleTitle = myRoleOptions.find(opt => opt.id === newRoleId)?.title;
    if (newRoleId !== currentRole && newRoleTitle) {
      setPendingRoleChange(newRoleId);
      setRoleChangeModalVisible(true);
    } else {
      setFieldValue('myRole', newRoleId);
    }
  };

  const handleConfirmRoleChange = () => {
    if (pendingRoleChange && setFieldValueRef.current) {
      setFieldValueRef.current('myRole', pendingRoleChange);
      setPreviousRole(pendingRoleChange);
    }
    setRoleChangeModalVisible(false);
    setPendingRoleChange(null);
  };

  const handleCancelRoleChange = () => {
    setRoleChangeModalVisible(false);
    setPendingRoleChange(null);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Account & Role" fontSize={mvs(18)} color={colors.textColorSecondary} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Description */}
        <Regular
          label="This is your private account information used for verification and communication. It is never shown on your public profile."
          fontSize={mvs(14)}
          numberOfLines={10}
          color={colors.textColorSecondary || '#8C8C8C'}
          style={styles.description}
        />
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
                  setFieldValue,
                }) => (
                  <>
                    {/* PRIVATE ACCOUNT DETAILS Section */}
                    <View style={styles.section}>
                      <Bold
                        label="PRIVATE ACCOUNT DETAILS"
                        fontSize={mvs(14)}
                        color={colors.textColorSecondary}
                        style={styles.sectionTitle}
                      />
                      <PrimaryInput
                        label="Full Legal Name"
                        placeholder="Enter full legal name"
                        onChangeText={handleChange('fullLegalName')}
                        onBlur={handleBlur('fullLegalName')}
                        value={values.fullLegalName}
                        containerStyle={styles.inputContainer}
                      />
                      <PrimaryInput
                        label="Date of Birth"
                        placeholder="Enter date of birth"
                        onChangeText={handleChange('dateOfBirth')}
                        onBlur={handleBlur('dateOfBirth')}
                        value={values.dateOfBirth}
                        containerStyle={styles.inputContainer}
                      />
                      <PrimaryInput
                        label="Contact Email"
                        placeholder="Enter contact email"
                        onChangeText={handleChange('contactEmail')}
                        onBlur={handleBlur('contactEmail')}
                        value={values.contactEmail}
                        containerStyle={styles.inputContainer}
                      />
                      <PrimaryInput
                        label="Phone Number"
                        placeholder="Enter phone number"
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}
                        containerStyle={styles.inputContainer}
                      />
                      <PrimaryInput
                        label="Current Address"
                        placeholder="Enter current address"
                        onChangeText={handleChange('currentAddress')}
                        onBlur={handleBlur('currentAddress')}
                        value={values.currentAddress}
                        containerStyle={[styles.inputContainer, styles.addressInputContainer]}
                        multiline
                        numberOfLines={3}
                      />
                    </View>

                    {/* MY VOICE INTRO Section */}
                    <View style={styles.section}>
                      <Bold
                        label="MY VOICE INTRO"
                        fontSize={mvs(14)}
                        color={colors.textColorSecondary}
                        style={styles.sectionTitle}
                      />
                      <TouchableOpacity style={styles.recordAudioRow}>
                        <Regular
                          label="Record Audio"
                          fontSize={mvs(14)}
                          color={colors.textColorSecondary}
                        />
                        <Icon name="chevron-forward" size={mvs(20)} color={colors.textColorSecondary} />
                      </TouchableOpacity>
                    </View>

                    {/* MY CORE PROFILE Section */}
                    <View style={styles.section}>
                      <Bold
                        label="MY CORE PROFILE"
                        fontSize={mvs(14)}
                        color={colors.textColorSecondary}
                        style={styles.sectionTitle}
                      />
                      <View style={styles.dropdownContainer}>
                        <InputWithIcon
                          label="Gender Identity"
                          placeholder="Select Gender Identity"
                          items={genderIdentityOptions}
                          value={values.genderIdentity}
                          onChangeText={id => setFieldValue('genderIdentity', id)}
                        />
                        <View style={styles.pinkDot} />
                      </View>
                      <InputWithIcon
                        label="Orientation"
                        placeholder="Select Orientation"
                        items={orientationOptions}
                        value={values.orientation}
                        onChangeText={id => setFieldValue('orientation', id)}
                      />
                      <InputWithIcon
                        label="My Role"
                        placeholder="Select My Role"
                        items={myRoleOptions}
                        value={values.myRole}
                        onChangeText={id => handleRoleChange(id, setFieldValue, values.myRole)}
                    />
                      <InputWithIcon
                        label="I am looking for"
                        placeholder="Select what you're looking for"
                        items={lookingForOptions}
                        value={values.lookingFor}
                        onChangeText={id => setFieldValue('lookingFor', id)}
                      />
                    </View>

                    {/* MY PAIRING PREFERENCES Section */}
                    <View style={styles.section}>
                      <Bold
                        label="MY PAIRING PREFERENCES"
                        fontSize={mvs(14)}
                        color={colors.black}
                        style={styles.sectionTitle}
                      />
                      <InputWithIcon
                        label="Intent & Connection Type"
                        placeholder="Select Intent & Connection Type"
                        items={intentConnectionTypeOptions}
                        value={values.intentConnectionType}
                        onChangeText={id => setFieldValue('intentConnectionType', id)}
                      />
                    </View>
                  </>
                )}
        </Formik>
      </ScrollView>
      {/* Save Changes Button */}
      {/* <View style={{paddingHorizontal: mvs(20), paddingBottom: mvs(20)}}>
        <PrimaryButton
          containerStyle={styles.saveButton}
          loading={loading}
          onPress={handleFormSubmit}
          title="Save Changes"
        />
      </View> */}
      {/* <DropdownModal
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    // items={Nationality}
                    
                    /> 
                      <InputWithIcon

                    placeholder={'Select One'}
                    label='Hair Color'
                     items={hairColorOptions}
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    // items={Nationality}
                    
                    /> 
                      <InputWithIcon
                    placeholder={'Select One'}
                    label='Eye Color'
                    items={eyeColorOptions}
                    /> 
                   
                      <InputWithIcon

                    placeholder={'Select One'}
                    label='Race'
                     items={eyeColorOptions}
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    // items={Nationality}
                    
                    /> 
                   
                      <InputWithIcon

                    placeholder={'Select One'}
                    label='Orientation'
                     items={eyeColorOptions}
                    // isRequired
                    // error={touched?.method ? t(errors.method) : ''}
                    // onChangeText={id => setFieldValue('method', id)}
                    // onBlur={handleChange('vehicle_make')}
                    // value={values?.method}
                    // id={values?.method}
                    // items={Nationality}
                    
                    /> 
                   
                  
                    
                    


                   
                  
                   
                  </>
                )}
              </Formik>
      </ScrollView>
      {/* Save Changes Button */}
      <View style={{paddingHorizontal: mvs(20), paddingBottom: mvs(20)}}>
             <PrimaryButton
          containerStyle={styles.saveButton}
                            loading={loading}
          onPress={handleFormSubmit}
          title="Save Changes"
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

      {/* Change Role Confirmation Modal */}
      <Modal
        visible={roleChangeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelRoleChange}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Bold
              label="Change Your Role?"
              fontSize={mvs(18)}
              color={colors.textColorSecondary}
              style={styles.modalTitle}
            />
            <Regular
              label="Changing your role will fundamentally update your profile and the matches you see. Are you sure you want to proceed?"
              fontSize={mvs(14)}
              numberOfLines={10}
              color={colors.textColorSecondary}
              style={styles.modalMessage}
            />
            <Row style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleCancelRoleChange}>
                <Medium
                  label="Cancel"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleConfirmRoleChange}>
                <Medium
                  label="Change Role"
                  fontSize={mvs(14)}
                  color={colors.white}
                />
              </TouchableOpacity>
            </Row>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default AccountRoleScreen;