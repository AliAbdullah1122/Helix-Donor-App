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
import { Row } from 'components/atoms/row';


const CELL_COUNT = 6;

const ResourcesScreen = props => {
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

  // Static resources data for cards
  const resources = [
    {
      id: 'ivf',
      title: 'IVF - in vitro fertilization',
      description:
        'Connect with your local Service provider for laboratory Insemination & Egg extraction',
      icon: IMG.ResourcesTestTube,
    },
    {
      id: 'iui',
      title: 'IUI - Intrauterine Insemination',
      description: 'Clinical or at home resources for self insemination',
      icon: IMG.ResourcesSyringe,
    },
    {
      id: 'mrt_ifg',
      title: 'MRT / IFG Advanced Services',
      description:
        'Resources on safe procreation naturally including STD and disease testing.',
      icon: IMG.ResourcesCells,
    },
    {
      id: 'genetic_testing',
      title: 'Genetic Testing',
      description:
        'Connect with iGenomix for your recessive autosomal testing',
      icon: IMG.ResourcesDna,
    },
    {
      id: 'procreation_safety',
      title: 'Procreation Safety',
      description:
        'Resources on safe procreation naturally including STD and disease testing.',
      icon: IMG.ResourcesShiled,
    },
  ];

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

        <Row style={{alignItems:'center',justifyContent:"space-between"}}>

         
      
        <TouchableOpacity 
          style={styles.backButton}
          // onPress={() => navigate('Login')}
          onPress={() => navigation.goBack()}
          >
          <Icon name="chevron-back-outline" size={mvs(24)} color={"#8C8C8C"} />
        </TouchableOpacity>
          <Medium
          label={'Resources'}
          fontSize={mvs(18)}
          color={colors.textColor || '#404040'}
          style={styles.title}
        />

        <View>
          
        </View>
          </Row>

        {/* Resources Header */}
       

        {/* Resources Cards */}
        <View style={styles.resourcesContainer}>
          {resources.map(item => {
            const IconComponent = item.icon;
            return (
              <View key={item.id} style={styles.resourceCard}>
                <View style={styles.resourceInnerCard}>
                  <View style={styles.resourceIconContainer}>
                    <IconComponent width={mvs(60)} height={mvs(60)} />
                  </View>
                  <View style={styles.resourceTextContainer}>
                    <Medium
                      label={item.title}
                      fontSize={mvs(16)}
                      color={colors.textColor || '#404040'}
                    />
                    <Regular
                      label={item.description}
                      fontSize={mvs(14)}
                      color={"#8C8C8C" || '#6D6D6D'}
                      style={{marginTop: mvs(6)}}
                      numberOfLines={3}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
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

export default ResourcesScreen;
