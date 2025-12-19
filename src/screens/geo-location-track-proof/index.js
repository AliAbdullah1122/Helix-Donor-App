import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {navigate} from 'navigation/navigation-ref';
import {SvgUri} from 'react-native-svg'; // For SVGs

const GeoLocationTrackProofScreen = () => {
  const pickupLocation = {
    latitude: 41.0638,
    longitude: 28.9407,
  };
  const dropoffLocation = {
    latitude: 41.0483,
    longitude: 28.9385,
  };

  const [region, setRegion] = useState({
    latitude: 41.055,
    longitude: 28.94,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null); // New state for selected reason

  const handleGetLocation = () => {
    // Simulate saving location
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

  const handleReasonSelect = reason => {
    setSelectedReason(reason);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header1x2x title={'Customer Delivery Navigate'} />

      {/* MAP SECTION */}
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1, overflow: 'hidden'}}>
        <MapView
          style={{flex: 1}}
          region={region}
          onRegionChangeComplete={setRegion}

          showsMyLocationButton
          showsCompass
          pitchEnabled
          zoomEnabled
showsUserLocation={false}
scrollEnabled>
          <Marker coordinate={pickupLocation} title="Pickup">
            {/* <Image
              source={IMG.driver}
              style={{height: mvs(35), width: mvs(35)}}
              resizeMode="contain"
            /> */}
            <IMG.driverSvg height={mvs(35)} width={mvs(35)}/>
          </Marker>

          <Marker coordinate={dropoffLocation} title="Drop Off">
            {/* <Image
              source={IMG.maplocationicon}
              style={{height: mvs(35), width: mvs(35)}}
              resizeMode="contain"
            /> */}

              <IMG.mapTrackSvg height={mvs(35)} width={mvs(35)}/>
          </Marker>
        </MapView>
      </ScrollView>

      {/* GET LOCATION BUTTON */}
      <View style={{marginBottom: mvs(10)}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleGetLocation}
          style={styles.button}>
          <Medium
            style={{fontWeight: '500'}}
            fontSize={mvs(16)}
            label={'Get Location Now'}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      {/* SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconWrapper}>
              {/* SVG Checkmark */}
              {/* <Image
                source={IMG.checkmarklocation}
                style={{height: mvs(50), width: mvs(50)}}
                resizeMode="contain"
              /> */}

              <IMG.checkmarklocation width={mvs(50)} height={mvs(50)} />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.borderColor,
                paddingVertical: mvs(10),
              }}>
              <Medium
                label="Geo Location Save Successfully"
                fontSize={mvs(18)}
                color={colors.black}
                style={{marginTop: mvs(10)}}
              />
              <Regular
                numberOfLines={10}
                label="The Driver’s current geographic location has been captured and stored successfully for tracking and service purposes."
                color={colors.subteXTcOLOR}
                fontSize={mvs(13)}
                style={{
                  textAlign: 'center',
                  marginTop: mvs(8),
                  paddingHorizontal: mvs(10),
                }}
              />
            </View>

            {/* NEW ADDED REASONS SECTION */}
            <Medium
              label="Add Reasons"
              fontSize={mvs(16)}
              color={colors.black}
              style={{
                marginTop: mvs(20),
                alignSelf: 'flex-start',
                marginLeft: mvs(20),
              }}
            />
            <View style={styles.reasonsContainer}>
              <TouchableOpacity
                style={[
                  styles.reasonButton,
                  selectedReason === 'No one answered the door' &&
                    styles.selectedReasonButton,
                ]}
                onPress={() => handleReasonSelect('No one answered the door')}>
                <Regular
                  label="No one answered the door"
                  color={
                    selectedReason === 'No one answered the door'
                      ? colors.white
                      : colors.primary
                  }
                  fontSize={mvs(13)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.reasonButton,
                  selectedReason === 'Call unreachable' &&
                    styles.selectedReasonButton,
                ]}
                onPress={() => handleReasonSelect('Call unreachable')}>
                <Regular
                  label="Call unreachable"
                  color={
                    selectedReason === 'Call unreachable'
                      ? colors.white
                      : colors.primary
                  }
                  fontSize={mvs(13)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.reasonButton,
                  selectedReason === 'Customer not home' &&
                    styles.selectedReasonButton,
                ]}
                onPress={() => handleReasonSelect('Customer not home')}>
                <Regular
                  label="Customer not home"
                  color={
                    selectedReason === 'Customer not home'
                      ? colors.white
                      : colors.primary
                  }
                  fontSize={mvs(13)}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.doneButton}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: mvs(50),
    height: mvs(55),
    marginTop: mvs(25),
    width: '90%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    alignItems: 'center',
    paddingVertical: mvs(25),
    paddingHorizontal: mvs(15),
  },
  iconWrapper: {
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(50),
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(50),
    marginTop: mvs(20),
  },
  doneText: {
    color: colors.white,
    fontSize: mvs(16),
    fontWeight: '600',
  },
  reasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: mvs(10),
    width: '100%',
    paddingHorizontal: mvs(15),
  },
  reasonButton: {
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(15),
    borderRadius: mvs(20),
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: mvs(10),
    marginBottom: mvs(10),
  },
  selectedReasonButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export default GeoLocationTrackProofScreen;
