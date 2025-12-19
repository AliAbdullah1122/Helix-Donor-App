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

const EducationCareerScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  
  // Static data for dropdowns
  const undergraduateOptions = ['Bachelor of Arts', 'Bachelor of Science', 'Bachelor of Engineering', 'Bachelor of Business Administration', 'Other'];
  const graduateOptions = ['Master of Arts', 'Master of Science', 'Master of Business Administration', 'Master of Engineering', 'Other'];
  const phdOptions = ['PhD in Arts', 'PhD in Science', 'PhD in Engineering', 'PhD in Business', 'PhD in Medicine', 'Other'];
  
  // Education & Career fields
  const [occupation, setOccupation] = React.useState('');
  const [occupationVisible, setOccupationVisible] = React.useState(true);
  
  const [educationLevel, setEducationLevel] = React.useState('');
  const [educationLevelVisible, setEducationLevelVisible] = React.useState(false);
  
  const [undergraduate, setUndergraduate] = React.useState('');
  const [undergraduateVisible, setUndergraduateVisible] = React.useState(false);
  
  const [graduate, setGraduate] = React.useState('');
  const [graduateVisible, setGraduateVisible] = React.useState(false);
  
  const [phd, setPhd] = React.useState('');
  const [phdVisible, setPhdVisible] = React.useState(false);

  // Dropdown modal states
  const [undergraduateModalVisible, setUndergraduateModalVisible] = React.useState(false);
  const [graduateModalVisible, setGraduateModalVisible] = React.useState(false);
  const [phdModalVisible, setPhdModalVisible] = React.useState(false);

  const handleSaveChanges = () => {
    // In real app, save the data
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Education & Career" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Occupation */}
        <View style={styles.healthSection}>
          <Bold
            label="Occupation"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TextInput
              style={styles.healthInput}
              placeholder="Enter Occupation"
              placeholderTextColor={colors.textColorSecondary}
              value={occupation}
              onChangeText={setOccupation}
            />
            <ToggleSwitch
              isOn={occupationVisible}
              onToggle={setOccupationVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Education Level */}
        <View style={styles.healthSection}>
          <Bold
            label="Education Level"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TextInput
              style={styles.healthInput}
              placeholder="Enter Education"
              placeholderTextColor={colors.textColorSecondary}
              value={educationLevel}
              onChangeText={setEducationLevel}
            />
            <ToggleSwitch
              isOn={educationLevelVisible}
              onToggle={setEducationLevelVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Undergraduate */}
        <View style={styles.healthSection}>
          <Bold
            label="Undergraduate"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setUndergraduateModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={undergraduate}
                editable={false}
                containerStyle={styles.healthInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={undergraduateVisible}
              onToggle={setUndergraduateVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Graduate */}
        <View style={styles.healthSection}>
          <Bold
            label="Graduate"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setGraduateModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={graduate}
                editable={false}
                containerStyle={styles.healthInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={graduateVisible}
              onToggle={setGraduateVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* PhD */}
        <View style={styles.healthSection}>
          <Bold
            label="PhD"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.healthLabel}
          />
          <Row style={styles.healthRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setPhdModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={phd}
                editable={false}
                containerStyle={styles.healthInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={phdVisible}
              onToggle={setPhdVisible}
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

      {/* Dropdown Modals */}
      <DropdownModal
        visible={undergraduateModalVisible}
        onClose={() => setUndergraduateModalVisible(false)}
        data={undergraduateOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setUndergraduate(item.label);
          setUndergraduateModalVisible(false);
        }}
      />
      <DropdownModal
        visible={graduateModalVisible}
        onClose={() => setGraduateModalVisible(false)}
        data={graduateOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setGraduate(item.label);
          setGraduateModalVisible(false);
        }}
      />
      <DropdownModal
        visible={phdModalVisible}
        onClose={() => setPhdModalVisible(false)}
        data={phdOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setPhd(item.label);
          setPhdModalVisible(false);
        }}
      />
    </View>
  );
};
export default EducationCareerScreen;