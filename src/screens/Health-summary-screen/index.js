import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {TouchableOpacity, View, Image, ScrollView, Alert, TextInput, StatusBar} from 'react-native';
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

const HealthSummaryScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  
  // Static data for dropdowns
  const eyesightCorrectionOptions = ['Glasses', 'Contact Lenses', 'LASIK', 'Other'];
  
  // BIRTH & CHILDHOOD Section
  const [carriedToTerm, setCarriedToTerm] = React.useState('No');
  const [carriedToTermVisible, setCarriedToTermVisible] = React.useState(true);
  
  const [pregnancyComplications, setPregnancyComplications] = React.useState('No');
  const [pregnancyComplicationsVisible, setPregnancyComplicationsVisible] = React.useState(true);
  
  const [birthWeight, setBirthWeight] = React.useState('');
  const [birthWeightVisible, setBirthWeightVisible] = React.useState(false);
  
  const [birthLength, setBirthLength] = React.useState('');
  const [birthLengthVisible, setBirthLengthVisible] = React.useState(false);
  
  const [childhoodHealth, setChildhoodHealth] = React.useState('');
  const [childhoodHealthVisible, setChildhoodHealthVisible] = React.useState(false);
  
  // HEALTH INFORMATION Section
  const [cmvStatus, setCmvStatus] = React.useState('Negative');
  const [cmvStatusVisible, setCmvStatusVisible] = React.useState(true);
  
  const [eyesightCorrection, setEyesightCorrection] = React.useState('Yes');
  const [eyesightCorrectionType, setEyesightCorrectionType] = React.useState('');
  const [eyesightCorrectionVisible, setEyesightCorrectionVisible] = React.useState(true);
  
  const [hernia, setHernia] = React.useState('Yes');
  const [herniaVisible, setHerniaVisible] = React.useState(true);
  
  const [allergies, setAllergies] = React.useState('Yes');
  const [allergiesText, setAllergiesText] = React.useState('');
  const [allergiesVisible, setAllergiesVisible] = React.useState(true);
  
  // Comments Section
  const [comments, setComments] = React.useState('');
  const [commentsVisible, setCommentsVisible] = React.useState(false);

  // Dropdown modal states
  const [eyesightCorrectionModalVisible, setEyesightCorrectionModalVisible] = React.useState(false);

  const handleSaveChanges = () => {
    // In real app, save the data
    navigation.goBack();
  };
  // Radio Button Component
  const RadioButton = ({selected, onPress, label}) => (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Regular label={label} fontSize={mvs(14)} color={colors.textColor} style={{marginLeft: mvs(8)}} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Health Summary" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* BIRTH & CHILDHOOD Section */}
        <Bold
          label="BIRTH & CHILDHOOD"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        
        {/* Carried to Term */}
        <View style={styles.healthSection}>
          <Bold
            label="Carried to Term"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={carriedToTerm === 'Yes'}
                onPress={() => setCarriedToTerm('Yes')}
                label="Yes"
              />
              <RadioButton
                selected={carriedToTerm === 'No'}
                onPress={() => setCarriedToTerm('No')}
                label="No"
              />
            </View>
            <ToggleSwitch
              isOn={carriedToTermVisible}
              onToggle={setCarriedToTermVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Pregnancy Complications */}
        <View style={styles.healthSection}>
          <Bold
            label="Pregnancy Complications"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={pregnancyComplications === 'Yes'}
                onPress={() => setPregnancyComplications('Yes')}
                label="Yes"
              />
              <RadioButton
                selected={pregnancyComplications === 'No'}
                onPress={() => setPregnancyComplications('No')}
                label="No"
              />
            </View>
            <ToggleSwitch
              isOn={pregnancyComplicationsVisible}
              onToggle={setPregnancyComplicationsVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Birth Weight */}
        <View style={styles.healthSection}>
          <Bold
            label="Birth Weight"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TextInput
              style={styles.healthInput}
              placeholder="Enter Weight"
              placeholderTextColor={colors.textColorSecondary}
              value={birthWeight}
              onChangeText={setBirthWeight}
              keyboardType="numeric"
            />
            <ToggleSwitch
              isOn={birthWeightVisible}
              onToggle={setBirthWeightVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Birth Length */}
        <View style={styles.healthSection}>
          <Bold
            label="Birth Length"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TextInput
              style={styles.healthInput}
              placeholder="Enter Length"
              placeholderTextColor={colors.textColorSecondary}
              value={birthLength}
              onChangeText={setBirthLength}
              keyboardType="numeric"
            />
            <ToggleSwitch
              isOn={birthLengthVisible}
              onToggle={setBirthLengthVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Childhood Health */}
        <View style={styles.healthSection}>
          <Bold
            label="Childhood Health"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TextInput
              style={styles.healthInput}
              placeholder="Enter Health Condition"
              placeholderTextColor={colors.textColorSecondary}
              value={childhoodHealth}
              onChangeText={setChildhoodHealth}
            />
            <ToggleSwitch
              isOn={childhoodHealthVisible}
              onToggle={setChildhoodHealthVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* HEALTH INFORMATION Section */}
        <Bold
          label="HEALTH INFORMATION"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={[styles.sectionTitle, {marginTop: mvs(24)}]}
        />

        {/* CMV Status */}
        <View style={styles.healthSection}>
          <Bold
            label="CMV Status"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={cmvStatus === 'Positive'}
                onPress={() => setCmvStatus('Positive')}
                label="Positive"
              />
              <RadioButton
                selected={cmvStatus === 'Negative'}
                onPress={() => setCmvStatus('Negative')}
                label="Negative"
              />
            </View>
            <ToggleSwitch
              isOn={cmvStatusVisible}
              onToggle={setCmvStatusVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Eyesight Correction */}
        <View style={styles.healthSection}>
          <Bold
            label="Eyesight Correction"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <View style={{flex: 1}}>
              <View style={styles.radioGroup}>
                <RadioButton
                  selected={eyesightCorrection === 'Yes'}
                  onPress={() => setEyesightCorrection('Yes')}
                  label="Yes"
                />
                <RadioButton
                  selected={eyesightCorrection === 'No'}
                  onPress={() => setEyesightCorrection('No')}
                  label="No"
                />
              </View>
              {eyesightCorrection === 'Yes' && (
                <View style={{marginTop: mvs(12)}}>
                  <TouchableOpacity
                    onPress={() => setEyesightCorrectionModalVisible(true)}>
                    <InputWithIcon
                      placeholder="Select One"
                      value={eyesightCorrectionType}
                      editable={false}
                      containerStyle={styles.healthInput}
                      rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <ToggleSwitch
              isOn={eyesightCorrectionVisible}
              onToggle={setEyesightCorrectionVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Hernia */}
        <View style={styles.healthSection}>
          <Bold
            label="Hernia"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={hernia === 'Yes'}
                onPress={() => setHernia('Yes')}
                label="Yes"
              />
              <RadioButton
                selected={hernia === 'No'}
                onPress={() => setHernia('No')}
                label="No"
              />
            </View>
            <ToggleSwitch
              isOn={herniaVisible}
              onToggle={setHerniaVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Allergies */}
        <View style={styles.healthSection}>
          <Bold
            label="Allergies"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <View style={{flex: 1}}>
              <View style={styles.radioGroup}>
                <RadioButton
                  selected={allergies === 'Yes'}
                  onPress={() => setAllergies('Yes')}
                  label="Yes"
                />
                <RadioButton
                  selected={allergies === 'No'}
                  onPress={() => setAllergies('No')}
                  label="No"
                />
              </View>
              {allergies === 'Yes' && (
                <TextInput
                  style={[styles.multilineInput, styles.healthInput, {marginTop: mvs(12), minHeight: mvs(80)}]}
                  value={allergiesText}
                  onChangeText={setAllergiesText}
                  multiline
                  placeholder="Please Specify"
                  placeholderTextColor={colors.textColorSecondary}
                />
              )}
            </View>
            <ToggleSwitch
              isOn={allergiesVisible}
              onToggle={setAllergiesVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Comments Section */}
        <View style={styles.healthSection}>
          <Bold
            label="Comments"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TextInput
              style={[styles.multilineInput, styles.healthInput]}
              value={comments}
              onChangeText={setComments}
              multiline
              placeholder="Please Specify"
              placeholderTextColor={colors.textColorSecondary}
            />
            <ToggleSwitch
              isOn={commentsVisible}
              onToggle={setCommentsVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Instructional Text */}
        <Regular
          label="Toggle on indicates the information will be visible on your profile."
          fontSize={mvs(12)}
          numberOfLines={10}
          color={colors.textColorSecondary}
          style={styles.instructionText}
        />
      </ScrollView>

      {/* Save Changes Button */}
      <View style={styles.saveButtonContainer}>
        <PrimaryButton
          containerStyle={styles.saveButton}
          onPress={handleSaveChanges}
          title="Save Changes"
          loading={loading}
        />
      </View>

      {/* Dropdown Modal */}
      <DropdownModal
        visible={eyesightCorrectionModalVisible}
        onClose={() => setEyesightCorrectionModalVisible(false)}
        data={eyesightCorrectionOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setEyesightCorrectionType(item.label);
          setEyesightCorrectionModalVisible(false);
        }}
      />
    </View>
  );
};
export default HealthSummaryScreen;