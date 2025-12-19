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

const MainNotificationScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  // Sample notifications data
  const newNotifications = [
    {
      id: 1,
      text: 'Liam sent you a new message. "Absolutely. Weeknights aft..."',
      timestamp: '5 minutes ago',
    },
    {
      id: 2,
      text: 'Mark added you to his queue.',
      timestamp: '1 hour ago',
    },
  ];

  const earlierNotifications = [
    {
      id: 3,
      text: 'Alex sent you a new message. "Hi Jessica, thanks for..."',
      timestamp: '2 days ago',
    },
    {
      id: 4,
      text: 'New Safety Guidelines Added Tap to review our updated Community Pledge.',
      timestamp: '4 days ago',
    },
  ];

  const handleNotificationPress = (notificationId) => {
    // In real app, handle notification press
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Notifications" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* NEW Section */}
        <Bold
          label="NEW"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        
        <View style={styles.sectionCard}>
          {newNotifications.map((notification, index) => (
            <View key={notification.id}>
              <TouchableOpacity
                style={styles.notificationItem}
                onPress={() => handleNotificationPress(notification.id)}
                activeOpacity={0.7}>
                <Regular
                  label={notification.text}
                  fontSize={mvs(14)}
                                    numberOfLines={10}
                  color={colors.textColor}
                  style={styles.notificationText}
                />
                <Regular
                  label={notification.timestamp}
                  fontSize={mvs(12)}
                                    numberOfLines={10}
                  color={colors.textColorSecondary}
                  style={styles.notificationTimestamp}
                />
              </TouchableOpacity>
              {index < newNotifications.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        <View style={styles.sectionSeparator} />

        {/* EARLIER Section */}
        <Bold
          label="EARLIER"
          fontSize={mvs(14)}
          color={colors.textColor}
          style={styles.sectionTitle}
        />
        
        <View style={styles.sectionCard}>
          {earlierNotifications.map((notification, index) => (
            <View key={notification.id}>
              <TouchableOpacity
                style={styles.notificationItem}
                onPress={() => handleNotificationPress(notification.id)}
                activeOpacity={0.7}>
                <Regular
                  label={notification.text}
                  fontSize={mvs(14)}
                  color={colors.textColor}
                  numberOfLines={10}
                  style={styles.notificationText}
                />
                <Regular
                  label={notification.timestamp}
                  fontSize={mvs(12)}
                                    numberOfLines={10}
                  color={colors.textColorSecondary}
                  style={styles.notificationTimestamp}
                />
              </TouchableOpacity>
              {index < earlierNotifications.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default MainNotificationScreen;