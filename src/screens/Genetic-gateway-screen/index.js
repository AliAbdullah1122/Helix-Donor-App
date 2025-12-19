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

const GeneticGatewayScreen = props => {
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
  
  // Sample genetic conditions data
  const geneticConditions = [
    {id: 'MKS1', name: 'Meckel Syndrome Type 1 (MKS1)', gene: 'MKS1'},
    {id: 'MCCC1', name: '3-Methylcrotonyl-CoA Carboxylase Deficiency, MCCC1-Related (MCCC1)', gene: 'MCCC1'},
    {id: 'MCCC2', name: '3-Methylcrotonyl-CoA Carboxylase Deficiency, MCCC2-Related (MCCC2)', gene: 'MCCC2'},
    {id: 'OPA3', name: '3-Methylglutaconic Aciduria Type IIL also known as Costeff Optic Atrophy (OPA3)', gene: 'OPA3'},
    {id: 'CFTR', name: 'Cystic Fibrosis (CFTR)', gene: 'CFTR'},
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = geneticConditions.filter(condition =>
        condition.name.toLowerCase().includes(text.toLowerCase()) ||
        condition.gene.toLowerCase().includes(text.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCondition = (condition) => {
    if (!selectedConditions.find(c => c.id === condition.id)) {
      setSelectedConditions([...selectedConditions, condition]);
    }
    setSearchText('');
    setShowSuggestions(false);
  };

  const handleRemoveCondition = (conditionId) => {
    setSelectedConditions(selectedConditions.filter(c => c.id !== conditionId));
  };
  return (
    <View style={styles.container}>
               {/* <Header1x2x title={'Driver Registration'} /> */}

      <ScrollView>
               <Row style={{alignItems:"center",marginHorizontal:mvs(14),marginVertical:mvs(10)}}>

        <IMG.Progress4
          width="100%" height={mvs(20)}
        
        />
        

        </Row>
        <View style={{paddingHorizontal:mvs(10)}}>
        <Medium label={'Skip For Now'} color={"#404040"} fontSize={mvs(14)} style={{textDecorationLine:"underline",alignSelf:"flex-end"}}/>
        </View>
        <View style={{marginHorizontal:mvs(20)}}>

         <Regular label={'Stage 4 of 6'} fontSize={mvs(12)} color={"#8C8C8C"}/>
         </View>
       
        <View style={{marginHorizontal:mvs(14),marginVertical:mvs(10)}}>
        <Medium
          label={'Genetic Profile (CGT)'}
          color={colors.textColor}
          fontSize={mvs(18)}
        />
        <Regular
          label={'Are you a carrier for any genetic conditions?'}
          color={colors.textColor}
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
              {/* Search Input */}
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <IMG.SearchNew width={mvs(20)} height={mvs(20)} style={styles.searchIcon} />
                  <TextInput
                    placeholder="Search for a condition or gene (e.g. CFTR)"
                    value={searchText}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
                    placeholderTextColor={colors.placeholder}
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => handleSearch('')}>
                      <Icon name="close-circle" size={mvs(20)} color={colors.placeholder} />
                    </TouchableOpacity>
                  )}
                </View>
                
                {/* Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    {searchSuggestions.map((condition) => (
                      <TouchableOpacity
                        key={condition.id}
                        onPress={() => handleSelectCondition(condition)}
                        style={styles.suggestionItem}>
                        <Regular
                          label={condition.name}
                          fontSize={mvs(14)}
                          color={colors.textColor}
                          numberOfLines={2}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Selected Conditions */}
              {selectedConditions.length > 0 && (
                <View style={styles.selectedContainer}>
                  <Bold
                    label="Selected"
                    fontSize={mvs(14)}
                    color={colors.textColor}
                    style={{marginBottom: mvs(12)}}
                  />
                  <View style={styles.tagsContainer}>
                    {selectedConditions.map((condition) => (
                      <View key={condition.id} style={styles.tag}>
                        <Regular
                          label={`(${condition.gene})`}
                          fontSize={mvs(12)}
                          color={colors.white}
                        />
                        <TouchableOpacity
                          onPress={() => handleRemoveCondition(condition.id)}
                          style={styles.tagClose}>
                          <Icon name="close" size={mvs(16)} color={colors.white} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Upload Button */}
             
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>

     

      <View style={{marginHorizontal: mvs(20), marginBottom: mvs(10)}}>
        <View style={{marginBottom:mvs(20)}}>
         <TouchableOpacity style={styles.uploadButton}>
                <IMG.UploadWhite width={mvs(24)} height={mvs(24)} />
                <Medium
                  label="Upload Full Genetic Report"
                  fontSize={mvs(16)}
                  color={colors.white}
                  style={{marginLeft: mvs(12)}}
                />
              </TouchableOpacity>

              </View>
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
                      onPress={()=>navigate("DonorBenefitsScreen")}
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
export default GeneticGatewayScreen;