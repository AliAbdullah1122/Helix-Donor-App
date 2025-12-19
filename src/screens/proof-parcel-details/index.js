import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  StatusBar, // Import Modal
} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import * as IMG from 'assets/images'; // keep same path
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import { Image } from 'react-native';
import { navigate } from 'navigation/navigation-ref';

const ProofParcelDetailsScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  // 1. New state for the modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const options = [
    // {
    //   id: 1,
    //   title: 'Geo Location Track',
    //   icon: IMG.geolocation,
    //   iconFocused: IMG.geolocationFocused,
    //   screen:"GeoLocationTrackScreen"
    // },
    {
      id: 2,
      // 2. Updated title to match the screenshot 'E-Signature' 
      //    (Original code had 'E-Signature or Code')
      title: 'E-Signature', 
      icon: IMG.barcode,
      iconFocused: IMG.barcodeFocused,
      screen:"ESignatureScreen" // Placeholder for the actual E-Signature screen
    },
    {
      id: 3,
      title: 'Take Picture',
      icon: IMG.camera,
      iconFocused: IMG.cameraFocused,
      screen:"CameraScreen" // Placeholder for the actual Take Picture screen
    },
  ];
  
  // ID for E-Signature option
  const ESIGNATURE_ID = 2; 

  const handleNext = () => {
    // 3. Logic to show the modal for E-Signature option
    if (selectedOption === ESIGNATURE_ID) {
      setIsModalVisible(true);
    } else {
      const selected = options.find(o => o.id === selectedOption);
      if (selected) {
        navigate(selected.screen);
      }
    }
  };
  
  // Function for the 'Send Notify' button in the modal
  const handleSendNotify = () => {
    setIsModalVisible(false);
    // Add logic for what happens after 'Send Notify', e.g., navigate or API call
    console.log('Send Notify clicked');
    // Example: navigate('ESignatureFlowScreen'); 
  };
  
  // Function for the 'QR Scan' button in the modal
  const handleQRScan = () => {
    setIsModalVisible(false);
    navigate("QRScreen")
    // Add logic for what happens after 'QR Scan', e.g., navigate to QR scanner
    console.log('QR Scan clicked');
    // Example: navigate('QRScannerScreen');
  };


  // 4. Modal Component for the 'Send Notify to Customer' popup
  const NotifyCustomerModal = () => (
    <Modal
      animationType="slide" // Slide up from the bottom
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Android back button closes the modal
    >
      <TouchableOpacity // Overlay to close the modal when tapped outside
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsModalVisible(false)} // Close modal on overlay press
      >
        <View style={styles.modalView}>
          <Row style={styles.modalHeader}>
            <Medium label={'Send Notify to Customer'} fontSize={mvs(16)} color={colors.black} />
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                {/* Use a simple Text 'X' or an imported close icon */}
                {/* <Medium label="X" fontSize={mvs(18)} color={colors.subteXTcOLOR} /> */}
                 <Image
                  source={IMG.closeoutline}
                  style={styles.checklistIcon}
                  resizeMode="contain"
                />
            </TouchableOpacity>
          </Row>

          <Regular
          numberOfLines={10}
            label={'The customer will get a notification popup to get a verified parcel via QR scan from driver'}
            color={colors.subteXTcOLOR}
            fontSize={mvs(14)}
            style={{marginBottom: mvs(20)}}
          />

          <Row style={{justifyContent: 'space-between'}}>
            {/* Send Notify Button */}
            <TouchableOpacity 
              style={[styles.modalButton, styles.sendNotifyButton]}
              onPress={handleSendNotify}
            >
              <Medium label="Send Notify" color={colors.primary} fontSize={mvs(16)} />
            </TouchableOpacity>

            {/* QR Scan Button */}
            <TouchableOpacity 

              style={[styles.modalButton, styles.qrScanButton]}
              onPress={handleQRScan}
            >
              <Medium label="QR Scan" color={colors.white} fontSize={mvs(16)} />
            </TouchableOpacity>
          </Row>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
       <StatusBar
                translucent={false}
                backgroundColor={colors.primary}
                barStyle={'white-content'}
              />
      <Header1x2x title={'Proof of Delivery Options'} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(20),
        }}>
        <Medium
          label={'Proof of Parcel Delivery'}
          color={colors.black}
          fontSize={mvs(22)}
        />
        <Regular
        numberOfLines={10}
          label={
            'Select option for confirmation upon delivery to ensure verified and secure handoff of all parcels'
          }
          color={colors.subteXTcOLOR}
          fontSize={mvs(15)}
          style={{marginTop: mvs(8), marginBottom: mvs(20)}}
        />

        {options.map(option => {
          const isSelected = selectedOption === option.id;
          const IconComponent = isSelected
            ? option.iconFocused
            : option.icon;

          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionBox,
                isSelected && styles.optionBoxSelected,
              ]}
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
          style={[
            styles.nextBtn,
            {opacity: selectedOption ? 1 : 0.6},
          ]}>
          <Medium label="Next" color={colors.white} fontSize={mvs(16)} />
        </TouchableOpacity>
      </View>
      
      {/* Render the modal */}
      <NotifyCustomerModal />
    </View>
  );
};

// ... existing styles remain the same ...

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

  // ** New Modal Styles **
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Position the modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the background
  },
  modalView: {
    backgroundColor: colors.white,
    padding: mvs(20),
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
    // Shadow properties for iOS/Android
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
    flex: 1, // Make buttons take equal width
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

export default ProofParcelDetailsScreen;