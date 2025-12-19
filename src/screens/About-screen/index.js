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

const AboutScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  
  // State for each section
  const [inYourOwnWords, setInYourOwnWords] = React.useState('Creative director living in...');
  const [inYourOwnWordsVisible, setInYourOwnWordsVisible] = React.useState(false);
  
  const [adjectives, setAdjectives] = React.useState('Creative, Empathetic, Organized');
  const [adjectivesVisible, setAdjectivesVisible] = React.useState(false);
  
  const [favoriteHero, setFavoriteHero] = React.useState('My grandmother, a painter...');
  const [favoriteHeroVisible, setFavoriteHeroVisible] = React.useState(false);
  
  const [hobbiesInterests, setHobbiesInterests] = React.useState('My grandmother, a painter...');
  const [hobbiesInterestsVisible, setHobbiesInterestsVisible] = React.useState(false);

  const maxCharacters = 500;

  const getCharacterCount = (text) => {
    return text ? text.length : 0;
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
        <Bold label="About" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* In Your Own Words Section */}
        <View style={styles.section}>
          <Bold
            label="In Your Own Words"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.sectionTitle}
          />
          <TextInput
            style={styles.multilineInput}
            value={inYourOwnWords}
            onChangeText={(text) => {
              if (text.length <= maxCharacters) {
                setInYourOwnWords(text);
              }
            }}
            multiline
            placeholder="Tell us about yourself..."
            placeholderTextColor={colors.textColorSecondary}
            maxLength={maxCharacters}
          />
          <Regular
            label={`(${getCharacterCount(inYourOwnWords)}/${maxCharacters})`}
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.characterCount}
          />
          <Row style={styles.toggleRow}>
            <Regular
              label="Shown on Profile"
              fontSize={mvs(14)}
               style={{marginRight:mvs(10)}}
              color={colors.textColor}
            />
            <ToggleSwitch
              isOn={inYourOwnWordsVisible}
              onToggle={setInYourOwnWordsVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Adjectives Section */}
        <View style={styles.section}>
          <Bold
            label="Adjectives"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.sectionTitle}
          />
          <InputWithIcon
            placeholder="Enter adjectives..."
            value={adjectives}
            onChangeText={(text) => {
              if (text.length <= maxCharacters) {
                setAdjectives(text);
              }
            }}
            containerStyle={styles.inputContainer}
            rightIcon={() => <Feather name="chevron-down" size={mvs(20)} color={colors.textColorSecondary} />}
            maxLength={maxCharacters}
          />
          <Regular
            label={`(${getCharacterCount(adjectives)}/${maxCharacters})`}
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.characterCount}
          />
          <Row style={styles.toggleRow}>
            <Regular
              label="Shown on Profile"
              fontSize={mvs(14)}
              color={colors.textColor}
              style={{marginRight:mvs(10)}}
            />
            <ToggleSwitch
              isOn={adjectivesVisible}
              onToggle={setAdjectivesVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Favorite Hero Section */}
        <View style={styles.section}>
          <Bold
            label="Favorite Hero"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.sectionTitle}
          />
          <TextInput
            style={styles.multilineInput}
            value={favoriteHero}
            onChangeText={(text) => {
              if (text.length <= maxCharacters) {
                setFavoriteHero(text);
              }
            }}
            multiline
            placeholder="Tell us about your favorite hero..."
            placeholderTextColor={colors.textColorSecondary}
            maxLength={maxCharacters}
          />
          <Regular
            label={`(${getCharacterCount(favoriteHero)}/${maxCharacters})`}
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.characterCount}
          />
          <Row style={styles.toggleRow}>
            <Regular
              label="Shown on Profile"
              fontSize={mvs(14)}
               style={{marginRight:mvs(10)}}
              color={colors.textColor}
            />
            <ToggleSwitch
              isOn={favoriteHeroVisible}
              onToggle={setFavoriteHeroVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>

        {/* Hobbies & Interests Section */}
        <View style={styles.section}>
          <Bold
            label="Hobbies & Interests"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.sectionTitle}
          />
          <TextInput
            style={styles.multilineInput}
            value={hobbiesInterests}
            onChangeText={(text) => {
              if (text.length <= maxCharacters) {
                setHobbiesInterests(text);
              }
            }}
            multiline
            placeholder="Tell us about your hobbies and interests..."
            placeholderTextColor={colors.textColorSecondary}
            maxLength={maxCharacters}
          />
          <Regular
            label={`(${getCharacterCount(hobbiesInterests)}/${maxCharacters})`}
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.characterCount}
          />
          <Row style={styles.toggleRow}>
            <Regular
              label="Shown on Profile"
              fontSize={mvs(14)}
              color={colors.textColor}
               style={{marginRight:mvs(10)}}
            />
            <ToggleSwitch
              isOn={hobbiesInterestsVisible}
              onToggle={setHobbiesInterestsVisible}
              onColor={colors.primary}
              offColor="#E5E5E5"
              circleColor={colors.white}
              size="small"
            />
          </Row>
        </View>
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
export default AboutScreen;