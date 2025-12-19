import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {TouchableOpacity, View, Image, ScrollView, Alert, TextInput, StatusBar, Modal} from 'react-native';
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

const SettingsScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = React.useState(false);

  const handleBlockedContacts = () => {
    // In real app, navigate to blocked contacts
  };

  const handleDeleteAccount = () => {
    setDeleteAccountModalVisible(true);
  };

  const handleCancelDelete = () => {
    setDeleteAccountModalVisible(false);
  };

  const handleConfirmDelete = () => {
    // In real app, handle delete account
    setDeleteAccountModalVisible(false);
  };

  const handleHelpSupport = () => {
    // In real app, navigate to help & support
  };

  const handleResources = () => {
    // In real app, navigate to resources
  };

  const handlePrivacyPolicy = () => {
    // In real app, navigate to privacy policy
  };

  const handleTermsOfService = () => {
    // In real app, navigate to terms of service
  };

  const handleLogOut = () => {
    // In real app, handle logout
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Settings" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* ACCOUNT Section */}
        <Bold
          label="ACCOUNT"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        
        <TouchableOpacity
          style={styles.optionRow}
          onPress={handleBlockedContacts}
          activeOpacity={0.7}>
          <Regular
            label="Blocked Contacts"
            fontSize={mvs(14)}
            color={colors.textColor}
          />
          <Icon name="chevron-forward" size={mvs(20)} color={colors.textColorSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={handleDeleteAccount}
          activeOpacity={0.7}>
          <Regular
            label="Delete Account"
            fontSize={mvs(14)}
            color={colors.textColor}
          />
          <Icon name="chevron-forward" size={mvs(20)} color={colors.textColorSecondary} />
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* SUPPORT Section */}
        <Bold
          label="SUPPORT"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        
        <TouchableOpacity
          style={styles.optionRow}
          onPress={handleHelpSupport}
          activeOpacity={0.7}>
          <Regular
            label="Help & Support Centre"
            fontSize={mvs(14)}
            color={colors.textColor}
          />
          <Icon name="chevron-forward" size={mvs(20)} color={colors.textColorSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={handleResources}
          activeOpacity={0.7}>
          <Regular
            label="Resources"
            fontSize={mvs(14)}
            color={colors.textColor}
          />
          <Icon name="chevron-forward" size={mvs(20)} color={colors.textColorSecondary} />
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* LEGAL Section */}
        <Bold
          label="LEGAL"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        
        <TouchableOpacity
          style={styles.optionRow}
          onPress={handlePrivacyPolicy}
          activeOpacity={0.7}>
          <Regular
            label="Privacy Policy"
            fontSize={mvs(14)}
            color={colors.textColor}
          />
          <Icon name="chevron-forward" size={mvs(20)} color={colors.textColorSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={handleTermsOfService}
          activeOpacity={0.7}>
          <Regular
            label="Terms of Service"
            fontSize={mvs(14)}
            color={colors.textColor}
          />
          <Icon name="chevron-forward" size={mvs(20)} color={colors.textColorSecondary} />
        </TouchableOpacity>
      </ScrollView>

      {/* Log Out Button */}
      <View style={styles.logOutButtonContainer}>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut}
          activeOpacity={0.8}>
          <Medium
            label="Log Out"
            fontSize={mvs(16)}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      {/* Delete Account Modal */}
      <Modal
        visible={deleteAccountModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Bold
              label="Delete Account"
              fontSize={mvs(18)}
              color={colors.textColor}
              style={styles.modalTitle}
            />
            <Regular
              label="Are you sure you want to delete your account?"
              fontSize={mvs(14)}
              numberOfLines={10}
              color={colors.textColorSecondary}
              style={styles.modalMessage}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleCancelDelete}
                activeOpacity={0.8}>
                <Medium
                  label="Cancel"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDeleteButton}
                onPress={handleConfirmDelete}
                activeOpacity={0.8}>
                <Medium
                  label="Delete"
                  fontSize={mvs(14)}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SettingsScreen;