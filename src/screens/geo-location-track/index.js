import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
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

const GeoLocationTrackScreen = () => {
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

  const handleGetLocation = () => {
    // Simulate saving location
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
       <StatusBar
                translucent={false}
                backgroundColor={colors.primary}
                barStyle={'white-content'}
              />
      <Header1x2x title={'Customer Delivery Navigate'} />

      {/* MAP SECTION */}
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1, overflow: 'hidden'}}>
        <MapView
          style={{flex: 1}}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation={false}
          showsMyLocationButton
          showsCompass
          pitchEnabled
          zoomEnabled
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

              <IMG.checkmarklocation width={mvs(50)} height={mvs(50)}/>
            </View>

            <Medium
              label="Geo Location Save Successfully"
              fontSize={mvs(18)}
              color={colors.black}
              style={{marginTop: mvs(10)}}
            />
            <Regular
            numberOfLines={10}
              label="The Driver’s current geographic location has been captured and stored successfully for tracking or service purposes."
              color={colors.lightgrey1}
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
    width: '85%',
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
});

export default GeoLocationTrackScreen;
