import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {navigate} from 'navigation/navigation-ref';
import Icon from 'react-native-vector-icons/Ionicons';
import {Linking, Platform, AppState} from 'react-native';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SearchScreenTap = () => {
  const [searchText, setSearchText] = useState('');
  const [hasLocationAccess, setHasLocationAccess] = useState(false);

  // const [region, setRegion] = useState({
  //   latitude: 40.7128,
  //   longitude: -74.006,
  //   latitudeDelta: 0.1,
  //   longitudeDelta: 0.1,
  // });

    const initialRegion = useMemo(
      () => ({
        latitude: 40.7128,
        longitude: -74.006,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }),
      [],
    );
  // Map markers with profile data
  // const mapMarkers = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       coordinate: {
  //         latitude: 40.7128,
  //         longitude: -74.006,
  //       },
  //       profileImage: IMG.SearchImage1,
  //       pinImage: IMG.SearchUserpin,
  //     },
  //     {
  //       id: 2,
  //       coordinate: {
  //         latitude: 40.7589,
  //         longitude: -73.9851,
  //       },
  //       profileImage: IMG.SearchImage2,
  //       pinImage: IMG.SearchUserpin2,
  //       isCluster: true,
  //       clusterImages: [IMG.SearchImage2, IMG.SearchImage3, IMG.SearchImage1],
  //     },
  //   ],
  //   [],
  // );
const mapMarkers = useMemo(
    () => [
      {
        id: 1,
        coordinate: {latitude: 40.7128, longitude: -74.006},
        profileImage: IMG.MapUser1,
      },
      // {
      //   id: 2,
      //   coordinate: {latitude: 40.7589, longitude: -73.9851},
      //   profileImage: IMG.MapMoreUser,
      // },
    ],
    [],
  );
  // Members nearby data
  // const membersNearby = useMemo(
  //   () => [
  //     {id: 1, image: IMG.SearchImage1},
  //     {id: 2, image: IMG.SearchImage2, isOnline: true},
  //     {id: 3, image: IMG.SearchImage3},
  //     {id: 4, image: IMG.SearchImage1},
  //     {id: 5, image: IMG.SearchImage2},
  //   ],
  //   [],
  // );

  const membersNearby = [
    {
      id: 1,
      name: 'Nathan',
      age: 32,
      location: 'Denver, Colorado',
      flag: '🇺🇸',
      donorType: 'Donor (Offering: Sperm)',
      options: 'Private Donor, Donor + Co-Parenting',
      image: IMG.SearchImage1, // image from membersNearbyBase
      badge: 'Xytex',
      price: "$800.00 USD",
      mutualMatch: false,
      Subscription: false,
      isOnline: false, // from membersNearbyBase (default false)
    },
    {
      id: 2,
      name: 'Sarah',
      age: 28,
      location: 'New York, New York',
      flag: '🇺🇸',
      donorType: 'Donor (Offering: Eggs)',
      options: 'Private Donor',
      image: IMG.SearchImage2, // image from membersNearbyBase
      badge: 'New',
      price: "$800.00 USD",
      mutualMatch: false,
      Subscription: true,
      isOnline: true, // from membersNearbyBase
    },
    {
      id: 3,
      name: 'Lyon',
      age: 29,
      location: 'New York, New York',
      flag: '🇺🇸',
      donorType: 'Donor (Offering: Sperm)',
      options: 'Private Donor',
      image: IMG.SearchImage3, // image from membersNearbyBase
      badge: 'New',
      price: "$800.00 USD",
      mutualMatch: true,
      Subscription: true,
      isOnline: false, // default
    },
    {
      id: 4,
      name: 'Harry', // no profile in profiles array for id 4, keep default values
      age: null,
      location: null,
      flag: null,
      donorType: null,
      options: null,
      image: IMG.SearchImage1, // from membersNearbyBase
      badge: null,
      price: null,
      mutualMatch: false,
      Subscription: false,
      isOnline: false,
    },
    {
      id: 5,
      name: 'Liam', // no profile in profiles array for id 5
      age: null,
      location: null,
      flag: null,
      donorType: null,
      options: null,
      image: IMG.SearchImage2, // from membersNearbyBase
      badge: null,
      price: null,
      mutualMatch: false,
      Subscription: false,
      isOnline: false,
    },
  ];
  // const renderMarker = marker => {
  //   if (marker.isCluster) {
  //     const PinImageComponent = marker.pinImage;
  //     return (
  //       <Marker key={marker.id} coordinate={marker.coordinate} anchor={{x: 0.5, y: 1}}>
  //         <View style={styles.markerContainer}>
  //           <View style={styles.clusterContainer}>
  //             {marker.clusterImages.map((img, idx) => {
  //               const ImageComponent = img;
  //               return (
  //                 <View
  //                   key={idx}
  //                   style={[
  //                     styles.clusterImageWrapper,
  //                     {
  //                       left: idx * 18,
  //                       zIndex: marker.clusterImages.length - idx,
  //                     },
  //                   ]}>
  //                   <ImageComponent width={mvs(50)} height={mvs(50)} />
  //                 </View>
  //               );
  //             })}
  //           </View>
  //           <View style={styles.pinLine} />
  //           <PinImageComponent width={mvs(20)} height={mvs(20)} />
  //         </View>
  //       </Marker>
  //     );
  //   }

  //   const ProfileImageComponent = marker.profileImage;
  //   const PinImageComponent = marker.pinImage;
  //   return (
  //     <Marker key={marker.id} coordinate={marker.coordinate} anchor={{x: 0.5, y: 1}}>
  //       <View style={styles.markerContainer}>
  //         <ProfileImageComponent width={mvs(50)} height={mvs(50)} />
  //         <View style={styles.pinLine} />
  //         <PinImageComponent width={mvs(20)} height={mvs(20)} />
  //       </View>
  //     </Marker>
  //   );
  // };





  // const renderMarker = marker => (
  //     <Marker
  //       key={marker.id}
  //       coordinate={marker.coordinate}
  //        anchor={{x: 0.5, y: 0.9}}
  //       tracksViewChanges={false}
  //       onPress={() => navigate('SearchScreenTap')}>
  //       <View style={styles.markerContainer}>
  //         <Image source={marker.profileImage} style={styles.profileImage} />
  //         <View style={styles.pinLine} />
  //         <View style={styles.pinDot} />
  //       </View>
  //     </Marker>
  //   );
//   const renderMarker = marker => (
//   <Marker
//     key={marker.id}
//     coordinate={marker.coordinate}
//     image={marker.profileImage}   // 🔥 MUST BE PNG
//     anchor={{x: 0.5, y: 1}}
//     tracksViewChanges={false}
//     onPress={() => navigate('SearchScreenTap')}
//   />
// );
const renderMarker = marker => (
  <Marker
    key={marker.id}
    coordinate={marker.coordinate}
    anchor={{x: 0.5, y: 1}}
    tracksViewChanges={false}
    // onPress={() => navigate('SearchScreenTap')}
  >
    <View style={{alignItems: 'center'}}>
      <Image
        source={marker.profileImage}
        resizeMode="contain"
        style={{
          width: mvs(120),
          height: mvs(80),
        }}
      />
      <View
        style={{
          width: 2,
          height: 14,
          backgroundColor: '#999',
        }}
      />
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: colors.primary,
        }}
      />
    </View>
  </Marker>
);

  const renderMemberCard = ({item}) => {
    const ImageComponent = item.image;
    return (
      <TouchableOpacity style={styles.memberCard}>
        <View style={styles.memberImageContainer}>
          <ImageComponent width={mvs(100)} height={mvs(128)} />
        </View>
        {/* {item.isOnline && <View style={styles.onlineIndicator} />} */}
      </TouchableOpacity>
    );
  };

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

 useEffect(() => {
    checkLocationPermission();
    const sub = AppState.addEventListener('change', s => {
      if (s === 'active') checkLocationPermission();
    });
    return () => sub.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkLocationPermission();
    }, []),
  );

  const checkLocationPermission = async () => {
    try {
      let granted = false;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      } else {
        const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        granted = status === RESULTS.GRANTED;
      }
      setHasLocationAccess(granted);
    } catch {
      setHasLocationAccess(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={mvs(20)} color="#8C8C8C" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Ancestry, etc."
            placeholderTextColor="#8C8C8C"
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.searchDivider} />
          <TouchableOpacity onPress={()=>navigate("SearchFilterScreen")}>
            <IMG.HomeFilter width={mvs(20)} height={mvs(20)} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Section or Location Access Prompt */}
      {!!hasLocationAccess ? (
        <>
          <View style={styles.mapContainer}>
            {/* <MapView
              style={styles.map}
              region={region}
              onRegionChangeComplete={setRegion}
              showsUserLocation={false}
              showsMyLocationButton
              showsCompass
              pitchEnabled
              zoomEnabled
              scrollEnabled>
              {mapMarkers.map(renderMarker)}
            </MapView> */}
              <MapView
            provider={PROVIDER_GOOGLE}
            // style={StyleSheet.absoluteFillObject}
             style={{ flex: 1 }}
            initialRegion={initialRegion}
            rotateEnabled={false}
            pitchEnabled={false}>
            {mapMarkers.map(renderMarker)}
          </MapView>
            {/* Location Indicator - Outside MapView */}
            <View style={styles.locationIndicator}>
              <IMG.searchNavigate width={mvs(16)} height={mvs(16)} />
              <Regular
                label="New York City"
                fontSize={mvs(14)}
                color="#333333"
                style={{marginLeft: mvs(6)}}
              />
            </View>
          </View>

          {/* Members Nearby Section */}
          <View style={styles.membersSection}>
            <View style={styles.membersHandle} />
            <Bold
              label="Members in this area"
              fontSize={mvs(18)}
              color="#333333"
              style={styles.membersTitle}
            />
            <FlatList
              data={membersNearby}
              renderItem={renderMemberCard}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.membersList}
            />
          </View>
        </>
      ) : (
        <View style={styles.locationPromptContainer}>
          <View style={styles.locationPromptContent}>
            <IMG.Nolocation width={mvs(120)} height={mvs(120)} />
            <Bold
              label="Location Access Needed"
              fontSize={mvs(20)}
              color="#333333"
              style={styles.locationPromptTitle}
            />
            <Regular
              label="To show donors nearby, Helix needs access to your location."
              fontSize={mvs(14)}
              numberOfLines={10}
              color="#8C8C8C"
              style={styles.locationPromptText}
            />
            <Regular
              label="We respect your privacy and only use this while using the app."
              fontSize={mvs(14)}
              numberOfLines={10}
              color="#8C8C8C"
              style={styles.locationPromptText}
            />
            <TouchableOpacity 
              style={styles.locationPromptButton}
              onPress={handleOpenSettings}>
              <Medium
                label="Open Settings to Enable"
                fontSize={mvs(16)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchScreenTap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(50),
    paddingBottom: mvs(12),
    backgroundColor: colors.white,
    zIndex: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: mvs(40),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: mvs(12),
    fontSize: mvs(14),
    color: colors.black,
  },
  searchDivider: {
    width: 1,
    height: mvs(20),
    backgroundColor: '#E5E5E5',
    marginHorizontal: mvs(12),
  },
  mapContainer: {
    flex: 1,
    // position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: mvs(50),
    height: mvs(50),
    borderRadius: mvs(25),
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
  },
   markerProfileImage: {
  width: mvs(120),        // 🔥 BIGGER
  height: mvs(70),
  borderRadius: mvs(35),
  // borderWidth: 3,
  // borderColor: colors.white,
  // backgroundColor: colors.white,
},
  clusterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: mvs(50),
    width: mvs(90),
    marginBottom: mvs(2),
  },
  clusterImageWrapper: {
    position: 'absolute',
    borderRadius: mvs(25),
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  clusterProfileImage: {
    width: mvs(50),
    height: mvs(50),
    borderRadius: mvs(25),
    borderWidth: 2,
    borderColor: colors.white,
  },
  pinLine: {
    width: 1,
    height: mvs(12),
    backgroundColor: '#999999',
  },
  pinImage: {
    width: mvs(20),
    height: mvs(20),
  },
  locationIndicator: {
    position: 'absolute',
    top: mvs(20),
    left: mvs(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(8),
    borderRadius: mvs(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  membersSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
    paddingTop: mvs(8),
    paddingBottom: mvs(20),
    maxHeight: mvs(280),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  membersHandle: {
    width: mvs(40),
    height: mvs(4),
    backgroundColor: '#D9D9D9',
    borderRadius: mvs(2),
    alignSelf: 'center',
    marginBottom: mvs(12),
  },
  membersTitle: {
    paddingHorizontal: mvs(20),
    marginBottom: mvs(12),
  },
  membersList: {
    paddingHorizontal: mvs(20),
  },
  memberCard: {
    marginRight: mvs(12),
    position: 'relative',
  },
  memberImageContainer: {
    // width: mvs(100),
    // height: mvs(128),
    borderRadius: mvs(35),
    borderWidth: 1,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  memberImage: {
    width: mvs(100),
    height: mvs(128),
    borderRadius: mvs(35),
    borderWidth: 2,
    borderColor: colors.white,
  },
  memberImageSvg: {
    borderRadius: mvs(35),
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  onlineIndicator: {
    position: 'absolute',
    top: mvs(2),
    right: mvs(2),
    width: mvs(14),
    height: mvs(14),
    borderRadius: mvs(7),
    backgroundColor: '#27AE60',
    borderWidth: 2,
    borderColor: colors.white,
  },
  locationPromptContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mvs(40),
  },
  locationPromptContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationPromptTitle: {
    marginTop: mvs(32),
    marginBottom: mvs(16),
    textAlign: 'center',
  },
  locationPromptText: {
    textAlign: 'center',
    marginBottom: mvs(8),
    lineHeight: mvs(20),
  },
    pinLine: {
    width: 1,
    height: mvs(12),
    backgroundColor: '#999999',
  },
  locationPromptButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(40),
    paddingVertical: mvs(16),
    paddingHorizontal: mvs(32),
    marginTop: mvs(32),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
