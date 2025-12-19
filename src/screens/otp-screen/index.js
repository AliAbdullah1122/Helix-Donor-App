import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, ScrollView, StatusBar, Text, Image} from 'react-native';
import styles from './styles';
import {colors} from 'config/colors';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/Ionicons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {Checkbox} from 'components/atoms/checkbox';
import { useNavigation } from '@react-navigation/native';


const CELL_COUNT = 6;

const OtpScreen = props => {
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigation = useNavigation();
  const email = props?.route?.params?.email || 'jessica@mail.com';

  const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
  const [propsCodeField, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`;
  };

  const handleResend = () => {
    if (canResend) {
      setTimeLeft(10);
      setCanResend(false);
      // Add your resend OTP logic here
    }
  };

  const handleContinue = () => {
    if (otpValue.length === CELL_COUNT) {
      setError('');
      // Open modal directly
      setShowModal(true);
    } else {
      setError('Please enter complete OTP');
    }
  };

  const handleAgree = () => {
    if (agreed) {
      setShowModal(false);
      navigate("GetStartedScreen")
      // Add your navigation logic here after agreement
      // navigate("Drawer");
    }
  };

  // Clear error when OTP value changes
  useEffect(() => {
    if (error && otpValue.length > 0) {
      setError('');
    }
  }, [otpValue]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}>
        
        {/* Back Arrow */}
        <TouchableOpacity 
          style={styles.backButton}
          // onPress={() => navigate('Login')}
          onPress={() => navigation.goBack()}
          >
          <Icon name="chevron-back-outline" size={mvs(24)} color={"#8C8C8C"} />
        </TouchableOpacity>

<View
 style={{gap:mvs(25)}}
 >
        <Medium
          label={'OTP Verification'}
          fontSize={mvs(14)}
          color={"#404040"}
          style={styles.title}
        />
        <View style={{borderWidth:0.7,borderColor:"#E6E8FF",width:"95%",alignSelf:'center'}}>

        </View>


        <Regular
          label={`We have sent the verification code to ${email}`}
          fontSize={mvs(14)}
          color={"#404040"}
          numberOfLines={10}
          style={styles.message}
        />


        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          <CodeField
            ref={ref}
            {...propsCodeField}
            value={otpValue}
            onChangeText={setOtpValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[
                  styles.cellRoot,
                  isFocused && styles.focusCell,
                ]}>
                {symbol ? (
                  <Regular
                    fontSize={mvs(16)}
                    color={colors.black}
                    style={styles.cellText}>
                    {symbol}
                  </Regular>
                ) : isFocused ? (
                  <Text style={styles.cellText}>
                    <Cursor />
                  </Text>
                ) : (
                  <Regular
                    fontSize={mvs(16)}
                    color={colors.subText || '#8C8C8C'}
                    style={styles.cellText}>
                    1
                  </Regular>
                )}
              </View>
            )}
          />
        </View>

        {/* Error Message */}
        {error ? (
          <View style={styles.errorContainer}>
            <View style={styles.errorIconContainer}>
              {/* <Icon name="alert-circle" size={mvs(14)} color="#FFFFFF" /> */}
              <Image source={IMG.alertcircle} resizeMode='contain' style={{height:mvs(18),width:mvs(18)}}/>
            </View>
            <Regular
              label={error}
              fontSize={mvs(12)}
              color="#FF5F57"
              style={styles.errorText}
            />
          </View>
        ) : null}

        {/* Continue Button */}
        <PrimaryButton
          containerStyle={styles.continueButton}
          loading={loading}
          onPress={handleContinue}
          title={'Continue'}
        />
          <View >
         <Regular
              label={'Didn\'t get the OTP?'}
              fontSize={mvs(14)}
              color={"#404040"}
              style={{marginBottom:mvs(10)}}
            />
        <View style={styles.footerContainer}>
          <View style={styles.resendContainer}>
           
            <TouchableOpacity onPress={handleResend} disabled={!canResend}>
              <Medium
                label={'Resend'}
                fontSize={mvs(14)}
                color={"#404040"}
                style={styles.resendLink}
              />
            </TouchableOpacity>
          </View>
          <Medium
            label={`Request again in ${formatTime(timeLeft)}`}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.timerText}
          />
        </View>
</View>
                </View>
        
        {/* Footer Section */}
      
        {/* Back to Login Link */}
        <TouchableOpacity 
          style={styles.backToLoginContainer}
          onPress={() => navigate('Login')}>
          <Medium
            label={'Back to login'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.backToLoginLink}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Terms Modal */}
      <ModalWrapper
        visible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        style={styles.modalContainer}>
        <ScrollView 
          contentContainerStyle={styles.modalContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Donate Icon */}
          <View style={styles.modalIconContainer}>
            <Image
              source={IMG.Donate}
              resizeMode="contain"
              style={styles.modalIcon}
            />
          </View>

          {/* Mission Section */}
          <Medium
            label={'Mission'}
            fontSize={mvs(18)}
            color={"#404040"}
            style={styles.sectionTitle}
          />
          
          <Regular
            label={'Despite technology keeping us more connected than ever, millions of people in search for a partner to start a family are finding it harder than ever, feeling disconnected and disheartened by the process. Meanwhile birth rates are declining and the dream of having a child is fading for many.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'This is where Helix can help.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'Our mission is to expand procreation options globally. We provide a dedicated platform to connect you with like-minded individuals who share your goal of having a child.'}
            fontSize={mvs(14)}
  color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'Helix is here to help you not just date, but procreate.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'Signed Team Helix'}
            fontSize={mvs(14)}
           color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />

          {/* Divider */}
          <View style={styles.modalDivider} />

          {/* Responsibility Section */}
          <Medium
            label={'Responsibility'}
            fontSize={mvs(18)}
            color={"#404040"}
            style={styles.sectionTitle}
          />
          
          <Regular
            label={'Helix is a technology platform and matching database, allowing users to connect with the like-minded goal of procreation in mind.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'We kindly request that all users engage in their own due diligence before proceeding with any next steps.'}
            fontSize={mvs(14)}
           color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />

          {/* Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && (
                <Icon name="checkmark" size={mvs(14)} color={colors.helixPrimary} />
              )}
            </View>
            <View style={styles.checkboxTextContainer}>
              <Regular
                fontSize={mvs(12)}
                color={colors.black}
                style={styles.checkboxText}
                numberOfLines={2}>
                <Regular label={'I have read and agree to the '} fontSize={mvs(12)} color={"#404040"} />
                <Regular
                  label={'Terms and Conditions'}
                  fontSize={mvs(12)}
                  color={colors.helixPrimary}
                  style={{textDecorationLine: 'underline'}}
                  onPress={() => {}}
                />
                <Regular label={' and '} fontSize={mvs(12)} color={"#404040"} />
                <Regular
                  label={'Privacy Policy'}
                  fontSize={mvs(12)}
                  color={colors.helixPrimary}
                  style={{textDecorationLine: 'underline'}}
                  onPress={() => {}}
                />
                <Regular label={'.'} fontSize={mvs(12)} color={"#404040"} />
              </Regular>
            </View>
          </TouchableOpacity>

          {/* Agree Button */}
          <PrimaryButton
            containerStyle={styles.agreeButton}
            loading={false}
            onPress={handleAgree}
            title={'Agree'}
            disabled={!agreed}
            
          />
        </ScrollView>
      </ModalWrapper>
    </View>
  );
};

export default OtpScreen;
