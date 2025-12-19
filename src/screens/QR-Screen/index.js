import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  Modal,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {goBack} from 'navigation/navigation-ref';
import * as IMG from 'assets/images'; // ✅ make sure checkmarklocation is imported here

const QRScannerScreen = () => {
  const [qrCodeData, setQrCodeData] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  /** Automatically open camera when screen opens **/
  useEffect(() => {
    openCamera();
  }, []);

const openCamera = () => {
  ImagePicker.openCamera({
    mediaType: 'photo',
    cropping: false,
    includeBase64: false,
  })
    .then(image => {
      console.log('Captured image:', image.path);
      setCapturedImage(image.path);

      // ✅ Show modal only after camera capture
      setShowModal(true);
    })
    .catch(error => {
      console.log('Camera error:', error);
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Unable to open camera.');
      }
    });
};

const handleScanFromGallery = () => {
  ImagePicker.openPicker({
    mediaType: 'photo',
  })
    .then(image => {
      console.log('Selected image:', image.path);
      setCapturedImage(image.path);

      // ❌ Do NOT show modal for gallery
      // setShowModal(true);  <-- remove this
    })
    .catch(error => {
      console.log('Gallery error:', error);
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Unable to open gallery.');
      }
    });
};


  const handleManualEntry = () => {
    if (qrCodeData.trim()) {
      Alert.alert('QR Code Entered', `Data: ${qrCodeData.trim()}`);
    } else {
      Alert.alert('Error', 'Please enter the QR Code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header1x2x title={'QR Code Scan'} back={() => goBack()} />

      {/* ======= TOP HALF: CAMERA / IMAGE PREVIEW ======= */}
      <View style={styles.topHalf}>
        {capturedImage ? (
          <Image
            source={{uri: capturedImage}}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Regular
              label="Camera preview will appear here"
              color={colors.white}
            />
          </View>
        )}

        {/* Camera Controls */}
        <View style={styles.utilityButtonsContainer}>
          <TouchableOpacity style={styles.utilityButton} onPress={openCamera}>
            <Medium
              label="Open Camera"
              color={colors.white}
              fontSize={mvs(12)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.utilityButton}
            onPress={handleScanFromGallery}>
            <Medium
              label="Scan from Gallery"
              color={colors.white}
              fontSize={mvs(12)}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ======= BOTTOM HALF: MANUAL ENTRY ======= */}
      <View style={styles.bottomHalf}>
        <Medium
          label={'Enter QR Code Manually'}
          color={colors.black}
          fontSize={mvs(18)}
          style={{marginBottom: mvs(10)}}
        />

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Enter QR Code / Tracking Number"
          placeholderTextColor={colors.subteXTcOLOR}
          value={qrCodeData}
          onChangeText={setQrCodeData}
          keyboardType="default"
          returnKeyType="done"
        />

        <TouchableOpacity
          style={[styles.enterButton, {opacity: qrCodeData.trim() ? 1 : 0.6}]}
          disabled={!qrCodeData.trim()}
          onPress={handleManualEntry}>
          <Medium label="Submit Code" color={colors.white} fontSize={mvs(16)} />
        </TouchableOpacity>
      </View>

      {/* ======= SUCCESS MODAL ======= */}
      <Modal
        transparent
        animationType="fade"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconWrapper}>
              {/* ✅ SVG or Image for checkmark */}
              {/* Example if SVG: */}
              {IMG.checkmarklocation ? (
                <IMG.checkmarklocation width={mvs(50)} height={mvs(50)} />
              ) : (
                <Image
                  source={IMG.checkmarklocation}
                  style={{height: mvs(50), width: mvs(50)}}
                  resizeMode="contain"
                />
              )}
            </View>

            <Medium
              label="QR Scan Save Successfully"
              fontSize={mvs(18)}
              color={colors.black}
              style={{marginTop: mvs(10)}}
            />
            <Regular
              numberOfLines={10}
              label="The Driver’s current geographic location has been captured and stored successfully for tracking or service purposes."
              color={colors.subteXTcOLOR}
              fontSize={mvs(13)}
              style={{
                textAlign: 'center',
                marginTop: mvs(8),
                paddingHorizontal: mvs(10),
              }}
            />

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.doneButton}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  topHalf: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    flex: 1,
    width: '100%',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  utilityButtonsContainer: {
    position: 'absolute',
    top: mvs(20),
    right: mvs(20),
    alignItems: 'flex-end',
  },
  utilityButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: mvs(8),
    borderRadius: mvs(20),
    marginBottom: mvs(10),
    alignItems: 'center',
  },
  bottomHalf: {
    flex: 1,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(20),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: '#F2F2F2',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: mvs(8),
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(12),
    marginBottom: mvs(15),
    color: colors.black,
    fontSize: mvs(14),
  },
  enterButton: {
    backgroundColor: colors.primary,
    paddingVertical: mvs(14),
    borderRadius: mvs(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ===== Modal Styles =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    width: '85%',
    borderRadius: mvs(20),
    alignItems: 'center',
    paddingVertical: mvs(25),
    paddingHorizontal: mvs(15),
  },
  iconWrapper: {
    height: mvs(60),
    width: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: colors.lightgreen || '#E6F7EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(30),
    paddingVertical: mvs(12),
    paddingHorizontal: mvs(40),
    marginTop: mvs(20),
  },
  doneText: {
    color: colors.white,
    fontSize: mvs(15),
    fontWeight: '600',
  },
});

export default QRScannerScreen;
