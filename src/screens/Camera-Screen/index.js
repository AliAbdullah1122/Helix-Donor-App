import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {goBack} from 'navigation/navigation-ref';

// Assuming you have these components/assets and they are imported correctly
import Header1x2x from 'components/atoms/headers/header-1x-2x'; 
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import * as IMG from 'assets/images'; // Your checkmark image should be here

const CameraScreen = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /** 1. Automatically open camera when screen opens **/
  // useEffect(() => {
  //   openCamera();
  // }, []);

  const openCamera = () => {
    // In a real app, this would open the native camera interface
    // For this example, we simulate a successful capture for the UI.
    // Replace with your actual implementation that uses react-native-camera or similar
    
    // Using ImagePicker for a full camera experience (as it was before):
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: false,
      includeBase64: false,
    })
      .then(image => {
        console.log('Captured image:', image.path);
        setCapturedImage(image.path);
        
        // Open modal on successful capture
        setShowModal(true); 
      })
      .catch(error => {
        console.log('Camera error:', error);
        // We go back if the camera is dismissed or fails, as this screen is camera-focused.
        if (error.code === 'E_PICKER_CANCELLED') {
           goBack(); 
        } 
      });
  };

  const closeCameraAndGoBack = () => {
    goBack();
  }

  // NOTE: Gallery/Flash logic is mocked as buttons are for UI only
  const handleFlashToggle = () => {
    console.log('Flash Toggle Pressed (Mock)');
  };

  const handleOpenGallery = () => {
    console.log('Open Gallery Pressed (Mock - Use for Selfie/ID)');
    // If this screen is ONLY for packages, you might not use the gallery.
    // If it's for Photo ID/Selfie (as per the screenshot header), you might use it.
    // The original code used it, so we keep the button, but remove the handler logic 
    // to keep the flow focused on capture.
  };


  return (
    <SafeAreaView style={styles.safeArea}>
        {/* 2. Simplified Header with only an 'X' button */}
        <View style={styles.header}>
            <TouchableOpacity onPress={closeCameraAndGoBack} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text> 
            </TouchableOpacity>
            <Medium label="Upload - Photo ID Card + Selfie" color={colors.white} />
        </View>

        {/* ======= MAIN VIEW: IMAGE PREVIEW / CAMERA FEED ======= */}
        <View style={styles.cameraView}>
            {/* Display captured image or a placeholder for the live feed */}
            {capturedImage ? (
                <Image
                    source={{uri: capturedImage}}
                    style={styles.previewImage}
                    resizeMode="cover"
                />
            ) : (
                // In a real app, the live camera feed would render here
                <View style={styles.placeholder}> 
                    <Regular
                        label="Live Camera Feed Here"
                        color={colors.white}
                    />
                </View>
            )}

            {/* Warning Text */}
            <View style={styles.warningContainer}>
                <Regular
                    label="❗ Make sure you are in a well-lit area."
                    color={colors.white}
                    fontSize={mvs(13)}
                />
            </View>

            {/* 4. Camera Controls (Shutter Bar) */}
            <View style={styles.cameraControlsContainer}>
                {/* Flash/Toggle (Mock) */}
                <TouchableOpacity style={styles.controlButton} onPress={handleFlashToggle}>
                    <Image source={IMG.flashOff} style={styles.iconStyle} resizeMode='contain' />
                    {/* Assuming you have a flashOff icon in IMG */}
                </TouchableOpacity>

                {/* Main Shutter Button - Re-opens camera for a new capture */}
                <TouchableOpacity style={styles.shutterButton} onPress={openCamera}>
                    <View style={styles.shutterInnerRing} />
                </TouchableOpacity>

                {/* Gallery/Toggle (Mock) */}
                <TouchableOpacity style={styles.controlButton} onPress={handleOpenGallery}>
                    <Image source={IMG.galleryIcon} style={styles.iconStyle} resizeMode='contain' />
                    {/* Assuming you have a galleryIcon in IMG */}
                </TouchableOpacity>
            </View>
        </View>

        {/* 5. SUCCESS MODAL (Updated UI) */}
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
              label="Photo Uploaded Successfully"
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

// --- STYLES ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: colors.black // Main background is black
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(10),
    backgroundColor: colors.black,
  },
  closeButton: {
    paddingRight: mvs(15),
    paddingVertical: mvs(5), // Increase touch area
  },
  closeText: {
    color: colors.white,
    fontSize: mvs(30),
    lineHeight: mvs(30), // Adjust line height to center the 'x'
    fontWeight: '300',
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black, // Background for the 'live feed' area
  },
  previewImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  // Camera Controls Area
  warningContainer: {
    backgroundColor: 'transparent',
    padding: mvs(10),
    marginBottom: mvs(15), // Move slightly up from the bottom controls
  },
  cameraControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: mvs(25),
    backgroundColor: colors.black, // Dark background for the control bar
    borderTopColor: '#333',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  controlButton: {
    width: mvs(50), 
    height: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    // Mock icon background
    borderRadius: mvs(25), 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
  },
  iconStyle: {
    width: mvs(24),
    height: mvs(24),
    tintColor: colors.white,
  },
  shutterButton: {
    width: mvs(70),
    height: mvs(70),
    borderRadius: mvs(35),
    borderWidth: mvs(3),
    borderColor: colors.white,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInnerRing: {
    width: mvs(60),
    height: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: colors.primary, // Orange color for the inner ring
  },

  // ===== Modal Styles (Updated to match screenshot) =====
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
    justifyContent:"center",
    alignItems:"center",
    width:"100%"
  },
  doneText: {
    color: colors.white,
    fontSize: mvs(15),
    fontWeight: '600',
    alignItems:"center"
  },
  successContent: {
    alignItems: 'center',
    paddingVertical: mvs(30), // Padding inside the content area
    paddingHorizontal: mvs(20),
  },
  checkmarkIcon: {
    width: mvs(50), 
    height: mvs(50), 
    tintColor: colors.success || 'green', // Use a standard success color
  },
 
});

export default CameraScreen;