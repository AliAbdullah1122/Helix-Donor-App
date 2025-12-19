import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {goBack} from 'navigation/navigation-ref';
import * as IMG from 'assets/images';
import Regular from 'typography/regular-text';

const ChatUploadScreen = ({route, navigation}) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashEnabled, setFlashEnabled] = useState(false);

  const sendImageToChat = (imagePath) => {
    const onImageCaptured = route.params?.onImageCaptured;
    if (onImageCaptured && imagePath) {
      onImageCaptured(imagePath);
    }
    goBack();
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 800,
      height: 800,
      cropping: false,
      includeBase64: false,
    })
      .then(image => {
        console.log('Captured image:', image.path);
        setCapturedImage(image.path);
        // Automatically send image to chat after capture
        sendImageToChat(image.path);
      })
      .catch(error => {
        console.log('Camera error:', error);
        if (error.code === 'E_PICKER_CANCELLED') {
          goBack();
        }
      });
  };

  const handleCapture = () => {
    // Open camera when shutter button is clicked
    openCamera();
  };

  const handleFlashToggle = () => {
    setFlashEnabled(!flashEnabled);
    // Note: Flash control would need native camera implementation
  };

  const handleOpenGallery = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    })
      .then(image => {
        if (image && image.path) {
          setCapturedImage(image.path);
          // Send image to chat immediately
          sendImageToChat(image.path);
        }
      })
      .catch(err => {
        console.log('Gallery cancelled or error', err);
      });
  };

  const closeScreen = () => {
    goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            {/* Status bar icons would go here */}
          </View>
        </View>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={closeScreen} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera Preview */}
      <View style={styles.cameraView}>
        {capturedImage ? (
          <Image
            source={{uri: capturedImage}}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Regular
              label="Camera Preview"
              color={colors.white}
              fontSize={mvs(14)}
            />
          </View>
        )}

        {/* Warning Message */}
        <View style={styles.warningContainer}>
          <View style={styles.warningBox}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Regular
              label="Make sure you are in a well-lit area."
              color={colors.white}
              fontSize={mvs(13)}
              style={styles.warningText}
            />
          </View>
        </View>

        {/* Camera Controls */}
        <View style={styles.cameraControlsContainer}>
          {/* Flash Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleFlashToggle}>
            <View
              style={[
                styles.controlButtonInner,
                flashEnabled && styles.controlButtonActive,
              ]}>
              <Image
                source={IMG.Photo}
                style={[
                  styles.iconStyle,
                  flashEnabled && {tintColor: colors.primary},
                ]}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Shutter Button */}
          <TouchableOpacity
            style={styles.shutterButton}
            onPress={handleCapture}>
            <View style={styles.shutterInnerRing} />
          </TouchableOpacity>

          {/* Gallery Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleOpenGallery}>
            <View style={styles.controlButtonInner}>
              <Image
                source={IMG.Gallery}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    backgroundColor: colors.black,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: mvs(20),
    paddingTop: Platform.OS === 'ios' ? mvs(10) : mvs(20),
    paddingBottom: mvs(10),
  },
  timeText: {
    color: colors.white,
    fontSize: mvs(16),
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBar: {
    backgroundColor: '#1A1A1A', // Dark teal/black bar
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    paddingVertical: mvs(5),
  },
  closeText: {
    color: colors.white,
    fontSize: mvs(32),
    lineHeight: mvs(32),
    fontWeight: '300',
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  warningContainer: {
    position: 'absolute',
    bottom: mvs(120),
    width: '100%',
    paddingHorizontal: mvs(20),
  },
  warningBox: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(8),
    borderRadius: mvs(8),
    alignSelf: 'center',
  },
  warningIcon: {
    fontSize: mvs(16),
    marginRight: mvs(6),
  },
  warningText: {
    flex: 1,
  },
  cameraControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: mvs(25),
    backgroundColor: '#1A1A1A', // Dark teal background
    borderTopColor: '#333',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  controlButton: {
    width: mvs(50),
    height: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonInner: {
    width: mvs(50),
    height: mvs(50),
    borderRadius: mvs(25),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: 'rgba(252, 92, 44, 0.3)',
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
    backgroundColor: colors.primary, // Orange color
  },
});

export default ChatUploadScreen;

