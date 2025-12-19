import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {goBack} from 'navigation/navigation-ref';
import * as IMG from 'assets/images';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import {
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

// Initialize Geocoder
Geocoder.init('AIzaSyD8VWu4IhYsj3ghntxcOO_tGWAU7Zs0Tn8');

const ChatLocationScreen = ({route}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 41.0082,
    longitude: 28.9784,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    requestLocationPermissionAndGetLocation();
  }, []);

  const requestLocationPermissionAndGetLocation = async () => {
    try {
      let granted = false;

      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        granted = result === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        granted = status === RESULTS.GRANTED;
      }

      if (!granted) {
        Alert.alert('Permission Denied', 'Location access is required.');
        setLoading(false);
        goBack();
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const location = {latitude, longitude};
          setCurrentLocation(location);
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          getAddressFromCoordinates(latitude, longitude);
          setLoading(false);
        },
        error => {
          console.log('Location error:', error);
          Alert.alert('Error', 'Unable to fetch location.');
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (e) {
      Alert.alert('Error', 'Unable to fetch location.');
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const json = await Geocoder.from(latitude, longitude);
      const addressComponent = json.results[0]?.formatted_address || '';
      setAddress(addressComponent);
    } catch (error) {
      console.log('Geocoding error:', error);
      setAddress('Address not available');
    }
  };

  const handleSendLocation = () => {
    if (currentLocation) {
      const onLocationCaptured = route.params?.onLocationCaptured;
      if (onLocationCaptured) {
        onLocationCaptured(currentLocation);
      }
      goBack();
    } else {
      Alert.alert('Error', 'Location not available. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-back" size={mvs(30)} color={colors.white} />
        </TouchableOpacity>
        <Medium
          label="Send Location"
          color={colors.white}
          fontSize={mvs(18)}
          style={styles.headerTitle}
        />
       
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Regular
              label="Getting your location..."
              color={colors.subteXTcOLOR}
              fontSize={mvs(14)}
              style={{marginTop: mvs(10)}}
            />
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsMyLocationButton={false}
            scrollEnabled={true}
            zoomEnabled={true}>
            {currentLocation && (
              <Marker
                coordinate={currentLocation}
                title="Your Location"
                pinColor="red"
              />
            )}
          </MapView>
        )}
      </View>

      {/* Address Display */}
      <View style={styles.addressContainer}>
        <Image
          source={IMG.chatlocation}
          style={styles.addressIcon}
          resizeMode="contain"
        />
        <Regular
          label={address || 'Getting address...'}
          color={colors.black}
          fontSize={mvs(14)}
          numberOfLines={2}
          style={styles.addressText}
        />
      </View>

      {/* Send Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendLocation}
          disabled={!currentLocation || loading}>
          <Medium
            label="Send Current Location"
            color={colors.white}
            fontSize={mvs(16)}
          />
          {/* <Image
            source={IMG.rightArrow}
            style={styles.sendArrow}
            resizeMode="contain"
          /> */}
            <View style={{right:-70}}>
                      <IMG.Arrowdouble 
                               width={mvs(25)}
                                height={mvs(22)}/>
                                </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(12),
    height: mvs(60),
  },
  backButton: {
    padding: mvs(5),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: mvs(5),
    width: mvs(30),
    alignItems: 'center',
  },
  menuIcon: {
    color: colors.white,
    fontSize: mvs(24),
    lineHeight: mvs(24),
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(12),
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addressIcon: {
    width: mvs(30),
    height: mvs(30),
    marginRight: mvs(10),
  },
  addressText: {
    flex: 1,
    color: colors.black,
  },
  buttonContainer: {
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(15),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(100),
    paddingVertical: mvs(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendArrow: {
    width: mvs(20),
    height: mvs(20),
    tintColor: colors.white,
    marginLeft: mvs(8),
  },
});

export default ChatLocationScreen;

