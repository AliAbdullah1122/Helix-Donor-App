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

const MatchMakingScreen = props => {
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
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* Close Icon */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={mvs(20)} color={"#A6A6A6"} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerSection}>
          <Row style={styles.sparkleRow}>
            <IMG.MatchSparkle width={mvs(28)} height={mvs(28)} />
            <Medium
              label={"It's a Match!"}
              fontSize={mvs(24)}
              color={colors.white}
              style={styles.matchTitle}
            />
            <IMG.MatchSparkle width={mvs(28)} height={mvs(28)} />
          </Row>
          <Regular
            label={'"The feeling is mutual."'}
            fontSize={mvs(14)}
            color={colors.white}
            style={styles.subTitle}
          />
        </View>

        {/* Match Images */}
        <Row style={styles.imagesRow}>
          <View
           style={styles.profileCard

          }
          >
            <IMG.MatchLeftImage width={mvs(123)} height={mvs(157)} />
          </View>

          <View style={styles.heartContainer}>
            <IMG.MatchWhiteHeart width={mvs(68)} height={mvs(60)} />
          </View>

          <View style={styles.profileCard}>
            <IMG.MatchRightImage width={mvs(123)} height={mvs(157)} />
          </View>
        </Row>

        {/* Connected Text */}
        <View style={styles.connectedTextContainer}>
          <Regular
            label={'You and Nathan'}
            fontSize={mvs(16)}
            color={colors.white}
            style={{textAlign: 'center'}}
          />
          <Regular
            label={'have connected!'}
            fontSize={mvs(16)}
            color={colors.white}
            style={{textAlign: 'center', marginTop: mvs(2)}}
          />
        </View>

        {/* Messaging Info */}
       
      </ScrollView>

      {/* Terms Modal (logic kept, UI unchanged) */}
      <View style={{marginBottom:mvs(40)}}>
        <Regular
          label={'Messaging is unlocked and free.'}
          fontSize={mvs(14)}
          color={'#D9D9D9'}
          style={styles.messagingText}
        />

        {/* Message Input Bar */}
        <View style={styles.messageBar}>
          <Regular
            label={'Say something nice...'}
            fontSize={mvs(14)}
            color={"#D9D9D9"}
            style={styles.messagePlaceholder}
            numberOfLines={1}
          />
          <View style={styles.sendIconWrapper}>
            <IMG.MatchSendIcon width={mvs(20)} height={mvs(20)} />
          </View>
        </View>
        </View>
    </View>
  );
};

export default MatchMakingScreen;
