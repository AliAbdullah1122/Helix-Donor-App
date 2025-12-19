import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import * as IMG from 'assets/images';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import {Image} from 'react-native';
import {navigate} from 'navigation/navigation-ref';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CountdownTimer = ({duration = 5, size = 120}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(1);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    progress.value = withTiming(0, {
      duration: duration * 1000,
      easing: Easing.linear,
    });

    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Svg width={size} height={size}>
        <Circle
          stroke={"#F7DFD1"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke={colors.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <Medium
       label={`${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(
    timeLeft % 60,
  ).padStart(2, '0')}`}
        fontSize={mvs(24)}
        color={colors.primary}
        style={{position: 'absolute'}}
      />
    </View>
  );
};

const ParcelReturnProofScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = [
    {
      id: 1,
      title: 'Geo Location Track',
      icon: IMG.geolocation,
      iconFocused: IMG.geolocationFocused,
      screen: 'GeoLocationTrackProofScreen',
    },
    // {
    //   id: 2,
    //   title: 'E-Signature',
    //   icon: IMG.barcode,
    //   iconFocused: IMG.barcodeFocused,
    //   screen: 'ESignatureScreen',
    // },
    {
      id: 2,
      title: 'Take Picture',
      icon: IMG.camera,
      iconFocused: IMG.cameraFocused,
      screen: 'CameraScreen',
    },
  ];

  const ESIGNATURE_ID = 2;

  const handleNext = () => {
    if (selectedOption === ESIGNATURE_ID) {
      setIsModalVisible(true);
    } else {
      const selected = options.find(o => o.id === selectedOption);
      if (selected) {
        navigate(selected.screen);
      }
    }
  };

  const handleSendNotify = () => {
    setIsModalVisible(false);
    console.log('Send Notify clicked');
  };

  const handleQRScan = () => {
    setIsModalVisible(false);
    navigate('QRScreen');
    console.log('QR Scan clicked');
  };

  const NotifyCustomerModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsModalVisible(false)}>
        <View style={styles.modalView}>
          <Row style={styles.modalHeader}>
            <Medium
              label={'Send Notify to Customer'}
              fontSize={mvs(16)}
              color={colors.black}
            />
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Image
                source={IMG.closeoutline}
                style={styles.checklistIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Row>

          <Regular
            numberOfLines={10}
            label={
              'The customer will get a notification popup to get a verified parcel via QR scan from driver'
            }
            color={colors.subteXTcOLOR}
            fontSize={mvs(14)}
            style={{marginBottom: mvs(20)}}
          />

          <Row style={{justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={[styles.modalButton, styles.sendNotifyButton]}
              onPress={handleSendNotify}>
              <Medium
                label="Send Notify"
                color={colors.primary}
                fontSize={mvs(16)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.qrScanButton]}
              onPress={handleQRScan}>
              <Medium label="QR Scan" color={colors.white} fontSize={mvs(16)} />
            </TouchableOpacity>
          </Row>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header1x2x title={'Proof of Delivery Options'} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(20),
        }}>
        <Medium
          label={'Proof of Return in Progress'}
          color={colors.black}
          fontSize={mvs(22)}
        />
        <Regular
          numberOfLines={10}
          label={
            'You are arrived at the delivery loction. Waiting time has started. Please wait for the customer to collect the parcel. If there no resposne within the alloted time. Ensure to log the reason and take a photo for return proof if required'
          }
          color={colors.subteXTcOLOR}
          fontSize={mvs(15)}
          style={{marginTop: mvs(8), marginBottom: mvs(20)}}
        />

        {/* Countdown Timer (added) */}
        <View style={{alignItems: 'center', marginBottom: mvs(30)}}>
          <CountdownTimer duration={5} size={120} />
        </View>

        {options.map(option => {
          const isSelected = selectedOption === option.id;
          const IconComponent = isSelected ? option.iconFocused : option.icon;

          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionBox, isSelected && styles.optionBoxSelected]}
              onPress={() => setSelectedOption(option.id)}>
              <Row style={{alignItems: 'center'}}>
                <IconComponent
                  width={mvs(40)}
                  height={mvs(40)}
                  color={isSelected ? colors.primary : colors.black}
                />
                <Medium
                  label={option.title}
                  fontSize={mvs(16)}
                  color={isSelected ? colors.primary : colors.black}
                  style={{marginLeft: mvs(10)}}
                />
              </Row>

              {isSelected ? (
                <Image
                  source={IMG.Checklist}
                  style={styles.checklistIcon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.unselectedCircle} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.bottomButton}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedOption}
          style={[styles.nextBtn, {opacity: selectedOption ? 1 : 0.6}]}>
          <Medium label="Next" color={colors.white} fontSize={mvs(16)} />
        </TouchableOpacity>
      </View>

      <NotifyCustomerModal />
    </View>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    paddingVertical: mvs(20),
    paddingHorizontal: mvs(15),
    marginBottom: mvs(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionBoxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  bottomButton: {
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(15),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: '#F2F2F2',
  },
  nextBtn: {
    backgroundColor: colors.primary,
    paddingVertical: mvs(14),
    borderRadius: mvs(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checklistIcon: {
    width: mvs(22),
    height: mvs(22),
  },
  unselectedCircle: {
    width: mvs(22),
    height: mvs(22),
    borderRadius: mvs(11),
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: colors.white,
    padding: mvs(20),
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mvs(10),
  },
  modalButton: {
    paddingVertical: mvs(12),
    borderRadius: mvs(40),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: mvs(5),
  },
  sendNotifyButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  qrScanButton: {
    backgroundColor: colors.primary,
    marginLeft: mvs(10),
  },
});

export default ParcelReturnProofScreen;
