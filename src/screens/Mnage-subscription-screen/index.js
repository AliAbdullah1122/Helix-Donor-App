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

const ManageSusbcriptionScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const handleGetStarted = () => {
    // In real app, navigate to iGenomix
  };

  const handleViewBillingHistory = () => {
    // In real app, navigate to billing history
  };

  const handleChangePlan = () => {
    // In real app, navigate to change plan
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Manage Subscription" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* YOUR CURRENT PLAN Section */}
        <Bold
          label="YOUR CURRENT PLAN"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        <Regular
          label="Premium Member"
          fontSize={mvs(14)}
          color={colors.textColorSecondary}
          style={styles.sectionValue}
        />
        <View style={styles.separator} />

        {/* STATUS Section */}
        <Bold
          label="STATUS"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        <Regular
          label="Active"
          fontSize={mvs(14)}
          color={colors.textColorSecondary}
          style={styles.sectionValue}
        />
        <View style={styles.separator} />

        {/* NEXT BILLING DATE Section */}
        <Bold
          label="NEXT BILLING DATE"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        <Regular
          label="September 17, 2026"
          fontSize={mvs(14)}
          color={colors.textColorSecondary}
          style={styles.sectionValue}
        />
        <View style={styles.separator} />

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

      {/* Bottom Action Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.viewBillingButton}
          onPress={handleViewBillingHistory}
          activeOpacity={0.8}>
          <Medium
            label="View Billing History"
            fontSize={mvs(14)}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changePlanButton}
          onPress={handleChangePlan}
          activeOpacity={0.8}>
          <Medium
            label="Change Plan"
            fontSize={mvs(14)}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ManageSusbcriptionScreen;