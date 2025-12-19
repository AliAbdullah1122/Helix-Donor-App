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

const BlockedContactsScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  
  // Sample blocked contacts data
  const [blockedContacts, setBlockedContacts] = React.useState([
    {id: 1, name: 'Bob'},
    {id: 2, name: 'Steve'},
    {id: 3, name: 'Ron'},
  ]);

  const handleUnblock = (contactId) => {
    // In real app, handle unblock contact
    setBlockedContacts(blockedContacts.filter(contact => contact.id !== contactId));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Blocked Contacts" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Description Text */}
        <Regular
          label="Users you block will appear here. They will not be able to see your profile or contact you."
          fontSize={mvs(14)}
          numberOfLines={10}
          color={colors.textColorSecondary}
          style={styles.descriptionText}
        />

        {/* Blocked Contacts List */}
        {blockedContacts.map((contact) => (
          <View key={contact.id} style={styles.contactRow}>
            <View style={styles.contactLeft}>
              <View style={styles.contactIcon}>
                {/* <Icon name="person" size={mvs(24)} color={colors.textColorSecondary} /> */}
                <IMG.BlockedUser height={mvs(24)} width={mvs(24)}/>
              </View>
              <Regular
                label={contact.name}
                fontSize={mvs(14)}
                color={colors.textColor}
                style={styles.contactName}
              />
            </View>
            <TouchableOpacity
              style={styles.unblockButton}
              onPress={() => handleUnblock(contact.id)}
              activeOpacity={0.7}>
              <Medium
                label="Unblock"
                fontSize={mvs(14)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default BlockedContactsScreen;