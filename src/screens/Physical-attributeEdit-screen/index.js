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

const PhysicalAttributeEditScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  
  // Static data for dropdowns
  const heightOptions = ['5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"', '6\'1"', '6\'2"', '6\'3"', '6\'4"', '6\'5"'];
  const bodyBuildOptions = ['Slim', 'Athletic', 'Average', 'Muscular', 'Curvy', 'Plus Size'];
  const hairColorOptions = ['Black', 'Brown', 'Blonde', 'Red', 'Auburn', 'Grey', 'White', 'Other'];
  const eyeColorOptions = ['Brown', 'Blue', 'Green', 'Hazel', 'Grey', 'Amber', 'Other'];
  const raceOptions = ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Hispanic or Latino', 'Native Hawaiian or Other Pacific Islander', 'White', 'Other', 'Prefer not to say'];
  const ethnicityOptions = ['Hispanic or Latino', 'Not Hispanic or Latino', 'Prefer not to say'];
  
  // State for each physical attribute
  const [height, setHeight] = React.useState('');
  const [heightVisible, setHeightVisible] = React.useState(false);
  
  const [weight, setWeight] = React.useState('');
  const [weightVisible, setWeightVisible] = React.useState(true);
  
  const [bodyBuild, setBodyBuild] = React.useState('');
  const [bodyBuildVisible, setBodyBuildVisible] = React.useState(false);
  
  const [hairColor, setHairColor] = React.useState('');
  const [hairColorVisible, setHairColorVisible] = React.useState(false);
  
  const [eyeColor, setEyeColor] = React.useState('');
  const [eyeColorVisible, setEyeColorVisible] = React.useState(true);
  
  const [race, setRace] = React.useState('');
  const [raceVisible, setRaceVisible] = React.useState(true);
  
  const [ethnicity, setEthnicity] = React.useState('');
  const [ethnicityVisible, setEthnicityVisible] = React.useState(false);

  // Dropdown modal states
  const [heightModalVisible, setHeightModalVisible] = React.useState(false);
  const [bodyBuildModalVisible, setBodyBuildModalVisible] = React.useState(false);
  const [hairColorModalVisible, setHairColorModalVisible] = React.useState(false);
  const [eyeColorModalVisible, setEyeColorModalVisible] = React.useState(false);
  const [raceModalVisible, setRaceModalVisible] = React.useState(false);
  const [ethnicityModalVisible, setEthnicityModalVisible] = React.useState(false);

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
        <Bold label="Physical Attributes" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Height Section */}
        <View style={styles.attributeSection}>
          <Bold
            label="Height"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setHeightModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={height}
                editable={false}
                containerStyle={styles.attributeInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={heightVisible}
              onToggle={setHeightVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Weight Section */}
        {/* <View style={styles.attributeSection}>
          
          <Bold
            label="Weight"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
             <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setHeightModalVisible(true)}>
            <PrimaryInput

              placeholder="Enter Weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              containerStyle={styles.attributeInput}
            />
            <ToggleSwitch
              isOn={weightVisible}
              onToggle={setWeightVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
            </TouchableOpacity>
          </Row>
        </View> */}

         <View style={styles.attributeSection}>
          <Bold
            label="Weight"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setHeightModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={height}
                editable={false}
                containerStyle={styles.attributeInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={heightVisible}
              onToggle={setHeightVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Body Build Section */}
        <View style={styles.attributeSection}>
          <Bold
            label="Body Build"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setBodyBuildModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={bodyBuild}
                editable={false}
                containerStyle={styles.attributeInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={bodyBuildVisible}
              onToggle={setBodyBuildVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Hair Color Section */}
        <View style={styles.attributeSection}>
          <Bold
            label="Hair Color"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setHairColorModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={hairColor}
                editable={false}
                containerStyle={styles.attributeInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={hairColorVisible}
              onToggle={setHairColorVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Eye Color Section */}
        <View style={styles.attributeSection}>
          <Bold
            label="Eye Color"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setEyeColorModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={eyeColor}
                editable={false}
                containerStyle={styles.attributeInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={eyeColorVisible}
              onToggle={setEyeColorVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Race Section */}
        <View style={styles.attributeSection}>
          <Bold
            label="Race"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setRaceModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={race}
                editable={false}
                containerStyle={styles.attributeInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={raceVisible}
              onToggle={setRaceVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Ethnicity Section */}
        <View style={styles.attributeSection}>
          <Bold
            label="Ethnicity"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.attributeLabel}
          />
          <Row style={styles.attributeRow}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setEthnicityModalVisible(true)}>
              <InputWithIcon
                placeholder="Select One"
                value={ethnicity}
                editable={false}
                containerStyle={styles.attributeInput}
                rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
              />
            </TouchableOpacity>
            <ToggleSwitch
              isOn={ethnicityVisible}
              onToggle={setEthnicityVisible}
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
        visible={heightModalVisible}
        onClose={() => setHeightModalVisible(false)}
        data={heightOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setHeight(item.label);
          setHeightModalVisible(false);
        }}
      />
      <DropdownModal
        visible={bodyBuildModalVisible}
        onClose={() => setBodyBuildModalVisible(false)}
        data={bodyBuildOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setBodyBuild(item.label);
          setBodyBuildModalVisible(false);
        }}
      />
      <DropdownModal
        visible={hairColorModalVisible}
        onClose={() => setHairColorModalVisible(false)}
        data={hairColorOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setHairColor(item.label);
          setHairColorModalVisible(false);
        }}
      />
      <DropdownModal
        visible={eyeColorModalVisible}
        onClose={() => setEyeColorModalVisible(false)}
        data={eyeColorOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setEyeColor(item.label);
          setEyeColorModalVisible(false);
        }}
      />
      <DropdownModal
        visible={raceModalVisible}
        onClose={() => setRaceModalVisible(false)}
        data={raceOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setRace(item.label);
          setRaceModalVisible(false);
        }}
      />
      <DropdownModal
        visible={ethnicityModalVisible}
        onClose={() => setEthnicityModalVisible(false)}
        data={ethnicityOptions.map(item => ({id: item, label: item}))}
        onSelect={(item) => {
          setEthnicity(item.label);
          setEthnicityModalVisible(false);
        }}
      />
    </View>
  );
};
export default PhysicalAttributeEditScreen;