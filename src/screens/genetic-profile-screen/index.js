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

const GeneticProfileScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  
  // Genetic Profile state
  const [shownOnProfile, setShownOnProfile] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [reportedConditions, setReportedConditions] = React.useState(['(MKS1)', '(MKS1)']);

  const handleRemoveCondition = (index) => {
    const newConditions = reportedConditions.filter((_, i) => i !== index);
    setReportedConditions(newConditions);
  };

  const handleUploadReport = () => {
    // In real app, open file picker
  };

  const handleGetStarted = () => {
    // In real app, navigate to iGenomix
  };

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
        <Bold label="Genetic Profile" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Introduction Text */}
        <Regular
          label="Update your carrier status or upload a new report from your provider."
          fontSize={mvs(14)}
          color={colors.textColorSecondary}
          style={styles.introText}
        />

        {/* Profile Visibility Toggle */}
        <Row style={styles.toggleRow}>
            <Regular
            label="Shown on Profile"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={{marginRight: mvs(12)}}
          />
          <ToggleSwitch
            isOn={shownOnProfile}
            onToggle={setShownOnProfile}
            onColor={colors.primary}
            offColor="#E5E5E5"
            circleColor={colors.white}
            size="small"
          />
        
        </Row>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={mvs(20)} color={colors.textColorSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a condition or gene (e.g. CFTR)"
            placeholderTextColor={colors.textColorSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* YOUR REPORTED CONDITIONS Section */}
        <Bold
          label="YOUR REPORTED CONDITIONS"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        
        {/* Reported Conditions Tags */}
        {reportedConditions.length > 0 && (
          <View style={styles.conditionsContainer}>
            {reportedConditions.map((condition, index) => (
              <View key={index} style={styles.conditionTagSelected}>
                <Regular
                  label={condition}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveCondition(index)}
                  style={styles.removeButton}>
                  <Icon name="close" size={mvs(16)} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Divider with "or" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Regular
            label="or"
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.dividerText}
          />
          <View style={styles.dividerLine} />
        </View>

        {/* Upload Full Genetic Report Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadReport}
          activeOpacity={0.8}>
          <IMG.GeneticCloud width={mvs(24)} height={mvs(24)} />
          <Medium
            label="Upload Full Genetic Report"
            fontSize={mvs(16)}
            color={colors.white}
            style={styles.uploadButtonText}
          />
        </TouchableOpacity>

        {/* Divider with "or" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Regular
            label="or"
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.dividerText}
          />
          <View style={styles.dividerLine} />
        </View>

        {/* GENETIC SCREENING PARTNER Section */}
        <Bold
          label="GENETIC SCREENING PARTNER"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />

        {/* Igenomix Logo */}
        <View style={styles.logoContainer}>
          <IMG.geneticImage width={mvs(200)} height={mvs(60)} />
          <Regular
            label="PART OF VITROLIFE GROUP"
            fontSize={mvs(10)}
            color={colors.textColorSecondary}
            style={styles.logoSubtext}
          />
        </View>

        {/* Description */}
        <Regular
          label="Get Your Professional CGT Screen for 500+ conditions"
          fontSize={mvs(14)}
          numberOfLines={10}
          color={colors.textColorSecondary}
          style={styles.descriptionText}
        />

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}>
          <Medium
            label="Get Started with iGenomix"
            fontSize={mvs(16)}
            color={colors.white}
          />
        </TouchableOpacity>
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
    </View>
  );
};
export default GeneticProfileScreen;