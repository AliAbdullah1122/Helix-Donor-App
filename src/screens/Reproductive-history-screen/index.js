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

const ReproductiveHistoryScreen = props => {
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
        <View style={{marginHorizontal:mvs(20)}}>

         <Regular label={'Stage 3 of 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
       
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Personal Health History'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'Please answer the following questions about your personal medical history.'}
          color={"#8C8C8C"}
          numberOfLines={3}
          fontSize={mvs(14)}
          style={{marginTop:mvs(8)}}
        />
        </View>

        {/* Always Private Toggle */}
        <View style={styles.toggleContainer}>
          <Regular label="Always Private" style={{marginRight:mvs(20)}} fontSize={mvs(14)} color={colors.textColor} />
          <ToggleSwitch
            isOn={alwaysPrivate}
            onToggle={value => {
              setAlwaysPrivate(value);
              if (value) {
                setPrivacyModalVisible(true);
              }
            }}
            onColor={colors.helixPrimary}
            offColor="#E5E5E5"
            circleColor={colors.white}
            size="medium"
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
                    {/* Chronic Conditions Section */}
                    <Medium
                      label="Have you ever been diagnosed by a doctor with any of the following chronic conditions?"
                      fontSize={mvs(14)}
                      color={colors.textColor}
                      numberOfLines={10}
                      style={{marginBottom: mvs(12)}}
                    />
                    
                    {[
                      {key: 'diabetes', label: 'Diabetes'},
                      {key: 'heartCondition', label: 'Heart Condition (e.g., high blood pressure, arrhythmia)'},
                      {key: 'autoimmune', label: 'Autoimmune Disorder (e.g., Lupus, Crohn\'s disease, Rheumatoid Arthritis)'},
                      {key: 'cancer', label: 'Cancer'},
                      {key: 'neurological', label: 'Neurological Disorder (e.g., Epilepsy, Multiple Sclerosis)'},
                      {key: 'respiratory', label: 'Significant Respiratory Condition (e.g., Cystic Fibrosis, severe Asthma)'},
                      {key: 'other', label: 'Other'},
                    ].map(condition => (
                      <View key={condition.key} style={styles.checkboxRow}>
                        <TouchableOpacity
                          onPress={() =>
                            setChronicConditions({
                              ...chronicConditions,
                              [condition.key]: !chronicConditions[condition.key],
                            })
                          }
                          style={[
                            styles.customCheckbox,
                            chronicConditions[condition.key] &&
                              styles.customCheckboxChecked,
                          ]}>
                          {chronicConditions[condition.key] && (
                            <Icon
                              name="checkmark"
                              size={mvs(14)}
                              color={colors.white}
                            />
                          )}
                        </TouchableOpacity>
                        <Regular
                          label={condition.label}
                          fontSize={mvs(14)}
                          color={colors.textColor}
                           numberOfLines={10}
                          style={{flex: 1, marginLeft: mvs(12)}}
                        />
                      </View>
                    ))}

                    {chronicConditions.other && (
                      <View style={{ marginTop: mvs(8)}}>
                        <TextInput
                          placeholder="Please Specify"
                          value={otherConditionText}
                          onChangeText={setOtherConditionText}
                          multiline={true}
                          numberOfLines={4}
                          style={styles.largeTextInput}
                          placeholderTextColor={colors.placeholder}
                          textAlignVertical="top"
                        />
                      </View>
                    )}

                    {/* Major Surgeries */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you had any major surgeries?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start', marginBottom: mvs(12)}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setMajorSurgeries(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              majorSurgeries === option && styles.radioCircleSelected,
                            ]}>
                              {majorSurgeries === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                      {majorSurgeries === 'Yes' && (
                        <TextInput
                          placeholder="Please Specify"
                          value={surgeriesText}
                          onChangeText={setSurgeriesText}
                          multiline={true}
                          numberOfLines={4}
                          style={styles.largeTextInput}
                          placeholderTextColor={colors.placeholder}
                          textAlignVertical="top"
                        />
                      )}
                    </View>

                    {/* Allergies */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Do you have any known allergies (medications, food, environmental)?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                         numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setAllergies(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              allergies === option && styles.radioCircleSelected,
                            ]}>
                              {allergies === option && (
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

                    {/* CMV Status */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="What is your CMV Status?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                         numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                        {['Positive', 'Negative', 'Not Sure'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setCmvStatus(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              cmvStatus === option && styles.radioCircleSelected,
                            ]}>
                              {cmvStatus === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                               numberOfLines={10}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>
                    
                    {/* Prescription Medications */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Are you currently taking any prescription medications?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        style={{marginBottom: mvs(12)}}
                         numberOfLines={10}
                      />
                      <Row style={{justifyContent: 'flex-start', marginBottom: mvs(12)}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setPrescriptionMeds(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              prescriptionMeds === option && styles.radioCircleSelected,
                            ]}>
                              {prescriptionMeds === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                               numberOfLines={10}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                      {prescriptionMeds === 'Yes' && (
                        <TextInput
                          placeholder="Please list them"
                          value={medsText}
                          onChangeText={setMedsText}
                          multiline={true}
                          numberOfLines={4}
                          style={styles.largeTextInput}
                          placeholderTextColor={colors.placeholder}
                          textAlignVertical="top"
                        />
                      )}
                    </View>

                    {/* Mental Health */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you ever been diagnosed with or received treatment for a significant mental health condition (e.g., depression, anxiety disorder, bipolar disorder, schizophrenia)?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                         numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start', marginBottom: mvs(12)}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setMentalHealth(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              mentalHealth === option && styles.radioCircleSelected,
                            ]}>
                              {mentalHealth === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                               numberOfLines={10}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                      {mentalHealth === 'Yes' && (
                        <TextInput
                          placeholder="Please specify the condition"
                          value={mentalHealthText}
                          onChangeText={setMentalHealthText}
                          multiline={true}
                          numberOfLines={10}
                          style={styles.largeTextInput}
                          placeholderTextColor={colors.placeholder}
                          textAlignVertical="top"
                        />
                      )}
                    </View>

                    {/* Fathered Children */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you fathered any children (biologically)?"
                        fontSize={mvs(14)}
                         numberOfLines={10}
                        color={colors.textColor}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setFatheredChildren(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              fatheredChildren === option && styles.radioCircleSelected,
                            ]}>
                              {fatheredChildren === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                               numberOfLines={10}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Reproductive Health Issues */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you ever been diagnosed with any reproductive health issues (e.g., low sperm count, varicocele)?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                         numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setReproductiveIssues(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              reproductiveIssues === option && styles.radioCircleSelected,
                            ]}>
                              {reproductiveIssues === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                               numberOfLines={10}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Menstrual Cycles */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Are your menstrual cycles regular?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                         numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setMenstrualCycles(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              menstrualCycles === option && styles.radioCircleSelected,
                            ]}>
                              {menstrualCycles === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                             numberOfLines={10}
                              label={option}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Pregnancy/Birth */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you ever been pregnant or given birth?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                         numberOfLines={10}
                        style={{marginBottom: mvs(12)}}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setPregnancyBirth(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              pregnancyBirth === option && styles.radioCircleSelected,
                            ]}>
                              {pregnancyBirth === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                               numberOfLines={10}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Reproductive Conditions */}
                    <View style={{marginTop: mvs(24)}}>
                      <Medium
                        label="Have you ever been diagnosed with any reproductive health conditions (e.g., PCOS, endometriosis, fibroids)?"
                        fontSize={mvs(14)}
                        color={colors.textColor}
                        style={{marginBottom: mvs(12)}}
                         numberOfLines={10}
                      />
                      <Row style={{justifyContent: 'flex-start'}}>
                        {['Yes', 'No'].map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => setReproductiveConditions(option)}
                            style={styles.radioButton}>
                            <View style={[
                              styles.radioCircle,
                              reproductiveConditions === option && styles.radioCircleSelected,
                            ]}>
                              {reproductiveConditions === option && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Regular
                              label={option}
                               numberOfLines={10}
                              fontSize={mvs(14)}
                              color={colors.textColor}
                              style={{marginLeft: mvs(8)}}
                            />
                          </TouchableOpacity>
                        ))}
                      </Row>
                    </View>

                    {/* Select all that applies text */}
                    <View style={{marginTop: mvs(30), marginBottom: mvs(20)}}>
                      <Regular
                        label="Select all that applies."
                         numberOfLines={10}
                        fontSize={mvs(14)}
                        color={"#8C8C8C"}
                        style={{textAlign: 'center'}}
                      />
                    </View>
                  </>
                )}
              </Formik>
              
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>

     

      <View style={{marginHorizontal: mvs(20), marginBottom: mvs(10)}}>
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
                      onPress={()=>navigate("InfectionDiseaseScreen")}
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
export default ReproductiveHistoryScreen;