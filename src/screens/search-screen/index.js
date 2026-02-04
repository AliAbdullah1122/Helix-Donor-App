import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { mvs } from 'config/metrices';
import { colors } from 'config/colors';
import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { navigate } from 'navigation/navigation-ref';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking, Platform, AppState } from 'react-native';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
// Max height for the search suggestions card so it doesn't overlap members section
const SEARCH_CARD_MAX_HEIGHT = SCREEN_HEIGHT - mvs(250);
// 250 = approx height of members section + search input + top padding


const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [hasLocationAccess, setHasLocationAccess] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const reduxState = useSelector(state => state);
  console.log('Redux State:', reduxState);

  const subscribed = useSelector(state => state.user.subscribed);
  console.log('Subscribed search:', subscribed);

  // Suggested searches data
  const suggestedSearches = useMemo(
    () => [
      'Donors in California',
      'New Donor',
      'Verified Donor',
      'Irish Ancestry',
      'CMV Negative',
    ],
    [],
  );

  // Recent searches data
  const recentSearches = useMemo(
    () => [
      'O+ Blood Type',
      'German Nationality',
      'New York City',
    ],
    [],
  );

  // All suggestions data for filtering
  const allSuggestions = useMemo(
    () => [
      'Blonde hair',
      'Brown eyes',
      'Blood Type: B+',
      'Body Build: Athletic',
      'Blue eyes',
      'Black hair',
      'Blood Type: O+',
      'Body Build: Slim',
      'Green eyes',
      'Red hair',
      'Negative for: Cystic Fibrosis (CFTR)'
    ],
    [],
  );

  const combinedSearchData = useMemo(() => {
    return [
      ...allSuggestions,
      ...recentSearches,
      ...suggestedSearches,
    ];
  }, [allSuggestions, recentSearches, suggestedSearches]);


  // Filtered suggestions based on search text
  // const filteredSuggestions = useMemo(() => {
  //   if (!searchText.trim()) {
  //     return [];
  //   }
  //   return allSuggestions.filter(item =>
  //     item.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // }, [searchText, allSuggestions]);
  const filteredSuggestions = useMemo(() => {
    if (!searchText.trim()) return [];

    return combinedSearchData.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, combinedSearchData]);


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
        coordinate: { latitude: 40.7128, longitude: -74.006 },
        profileImage: IMG.MapUser1,
      },
      {
        id: 2,
        coordinate: { latitude: 40.7589, longitude: -73.9851 },
        profileImage: IMG.MapMoreUser,
      },
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
      image: IMG.SearchImage1, // SvgComponent
      imageName: 'SearchImage1.svg',
      image2: IMG.HomeImageOng, // PNG
      image2Name: 'HomeImageOng.png',
      // image from membersNearbyBase
      badge: 'Xytex',
      price: "$800.00 USD",
      // userstatus:'paid',
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
      image: IMG.SearchImage2,
      imageName: 'SearchImage2.svg',
      image2: IMG.HomeImageOnline,
      image2Name: 'HomeImageOnline.jpg', // image from membersNearbyBase
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
      image: IMG.SearchImage3,
      imageName: 'SearchImage3.svg', // image from membersNearbyBase
      image2: IMG.HomeImagethree,
      image2Name: 'HomeImagethree.png',
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
      image: IMG.SearchImage1, // SvgComponent
      imageName: 'SearchImage1.svg',
      image2: IMG.HomeImageOng, // PNG
      image2Name: 'HomeImageOng.png', // from membersNearbyBase
      badge: null,
      price: null,
      mutualMatch: false,
      Subscription: false,
      isOnline: false,
    },
    {
      id: 5,
      name: 'Lyon',
      age: 29,
      location: 'New York, New York',
      flag: '🇺🇸',
      donorType: 'Donor (Offering: Sperm)',
      options: 'Private Donor',
      image: IMG.SearchImage3,
      imageName: 'SearchImage3.svg', // image from membersNearbyBase
      image2: IMG.HomeImagethree,
      image2Name: 'HomeImagethree.png',
      badge: 'New',
      price: "$800.00 USD",
      mutualMatch: true,
      Subscription: true,
      isOnline: false, // default
    },
  ];
  const handleMarkerPress = () => {
    navigate('SearchScreenTap');
  };

  // const renderMarker = marker => {
  //   if (marker.isCluster) {
  //     const PinImageComponent = marker.pinImage;
  //     return (
  //       <Marker 
  //         key={marker.id} 
  //         coordinate={marker.coordinate} 
  //         anchor={{x: 0.5, y: 1}}
  //         onPress={handleMarkerPress}>
  //         <TouchableOpacity activeOpacity={0.8}>
  //           <View style={styles.markerContainer}>
  //             <View style={styles.clusterContainer}>
  //               {marker.clusterImages.map((img, idx) => {
  //                 const ImageComponent = img;
  //                 return (
  //                   <View
  //                     key={idx}
  //                     style={[
  //                       styles.clusterImageWrapper,
  //                       {
  //                         left: idx * 18,
  //                         zIndex: marker.clusterImages.length - idx,
  //                       },
  //                     ]}>
  //                     <ImageComponent width={mvs(50)} height={mvs(50)} />
  //                   </View>
  //                 );
  //               })}
  //             </View>
  //             <View style={styles.pinLine} />
  //             <PinImageComponent width={mvs(20)} height={mvs(20)} />
  //           </View>
  //         </TouchableOpacity>
  //       </Marker>
  //     );
  //   }

  //   const ProfileImageComponent = marker.profileImage;
  //   const PinImageComponent = marker.pinImage;
  //   return (
  //     <Marker 
  //       key={marker.id} 
  //       coordinate={marker.coordinate} 
  //       anchor={{x: 0.5, y: 1}}
  //       onPress={handleMarkerPress}>
  //       <TouchableOpacity activeOpacity={0.8}>
  //         <View style={styles.markerContainer}>
  //           <ProfileImageComponent width={mvs(50)} height={mvs(50)} />
  //           <View style={styles.pinLine} />
  //           <PinImageComponent width={mvs(20)} height={mvs(20)} />
  //         </View>
  //       </TouchableOpacity>
  //     </Marker>
  //   );
  // };
  //  const renderMarker = marker => (
  //     <Marker
  //       key={marker.id}
  //       coordinate={marker.coordinate}
  //        anchor={{x: 0.5, y: 0.9}}
  //       tracksViewChanges={false}
  //       onPress={() => navigate('SearchScreenTap')}>
  //       <View style={styles.markerContainer}>
  //         <Image source={marker.profileImage} resizeMode='contain' style={{...styles.profileImage,width:mvs(97),height:mvs(60)}} />
  //         <View style={styles.pinLine} />
  //         <View style={styles.pinDot} />
  //       </View>
  //     </Marker>
  //   );
  // const renderMarker = marker => (
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
      anchor={{ x: 0.5, y: 1 }}
      onPress={() => navigate('SearchScreenTap')}
    >
      <View style={styles.markerContainer}>
        <Image
          source={marker.profileImage}
          style={styles.markerProfileImage}
          resizeMode="contain"
        />
        <View style={styles.pinLine} />
        <View style={styles.pinDot} />
      </View>
    </Marker>
  );


  const renderMemberCard = ({ item }) => {
    const ImageComponent = item.image;
    return (
      // <TouchableOpacity style={styles.memberCard}>
      <TouchableOpacity style={styles.memberCard} onPress={() => navigate("ProfileDetailsHomeScreen", { item })}>
        <View style={styles.memberImageContainer}>
          <ImageComponent width={mvs(100)} height={mvs(128)} />
        </View>
        {/* {item.isOnline && <View style={styles.onlineIndicator} />} */}
      </TouchableOpacity>
    );
  };
  //  const renderMember = ({item}) => (
  //     <TouchableOpacity
  //       style={styles.memberCard}
  //       onPress={() => navigate('ProfileDetailsHomeScreen', {item})}>
  //       <Image source={item.image} style={styles.memberImage} />
  //     </TouchableOpacity>
  //   );
  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  // useEffect(() => {
  //   checkLocationPermission();

  //   // Listen for app state changes (when user returns from settings)
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (nextAppState === 'active') {
  //       checkLocationPermission();
  //     }
  //   });

  //   return () => {
  //     subscription?.remove();
  //   };
  // }, []);
  useEffect(() => {
    checkLocationPermission();
    const sub = AppState.addEventListener('change', s => {
      if (s === 'active') checkLocationPermission();
    });

    // Keyboard listeners for Android
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      sub.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkLocationPermission();
    }, []),
  );


  useFocusEffect(
    useCallback(() => {
      checkLocationPermission();
    }, []),
  );

  // 250 = approx height of members section + search input + top padding

  // const checkLocationPermission = async () => {
  //   try {
  //     let hasPermission = false;

  //     if (Platform.OS === 'android') {
  //       const result = await PermissionsAndroid.check(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //       hasPermission = result;
  //     } else {
  //       const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //       hasPermission = status === RESULTS.GRANTED;
  //     }

  //     setHasLocationAccess(hasPermission);
  //   } catch (error) {
  //     console.log('Error checking location permission:', error);
  //     setHasLocationAccess(false);
  //   }
  // };

  // const checkLocationPermission = async () => {
  //   try {
  //     let granted = false;
  //     if (Platform.OS === 'android') {
  //       granted = await PermissionsAndroid.check(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //     } else {
  //       const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //       granted = status === RESULTS.GRANTED;
  //     }
  //     setHasLocationAccess(granted);
  //   } catch {
  //     setHasLocationAccess(false);
  //   }
  // };
  const checkLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setHasLocationAccess(granted);
      } else {
        const status = await check(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        if (status === RESULTS.DENIED) {
          const req = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          setHasLocationAccess(req === RESULTS.GRANTED);
        } else {
          setHasLocationAccess(status === RESULTS.GRANTED);
        }
      }
    } catch (e) {
      setHasLocationAccess(false);
    }
  };
  const showSuggestions =
    (isSearchFocused || keyboardVisible) && filteredSuggestions.length > 0;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}>
      <SafeAreaView style={{ marginBottom: Platform.OS === 'ios' ? mvs(-120) : 0 }} />
      {/* <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" /> */}
      <StatusBar
        backgroundColor="transparent" // or colors.helixBackground if you want
        barStyle="dark-content"
        translucent={true} // important for Android
      />

      {/* Search Input */}


      {/* Map Section or Location Access Prompt */}
      {hasLocationAccess ? (
        <>
          <View style={styles.mapContainer}>
            <MapView
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              style={StyleSheet.absoluteFill}
              initialRegion={initialRegion}
              // rotateEnabled={false}
              // pitchEnabled={false}
              scrollEnabled={!isSearchFocused && !keyboardVisible}
              zoomEnabled={!isSearchFocused && !keyboardVisible}
              pitchEnabled={!isSearchFocused && !keyboardVisible}
              rotateEnabled={!isSearchFocused && !keyboardVisible}
            >
              {mapMarkers.map(renderMarker)}
            </MapView>
          </View>

          {showSuggestions && (
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={Keyboard.dismiss}
              pointerEvents="auto"
            />
          )}

          <View style={styles.locationIndicator}>
            <IMG.searchNavigate width={mvs(24)} height={mvs(24)} />
            <Medium
              label="New York City"
              fontSize={mvs(16)}
              color={colors.textColor}
              style={{ marginLeft: mvs(6), fontWeight: "500" }}
            />
          </View>

          <View style={{...styles.membersSection,
              top: Platform.OS === 'android' && keyboardVisible ? mvs(-300) : undefined,
            }}>
            <View style={styles.membersHandle} />
            <Medium
              label="Members Nearby"
              fontSize={mvs(16)}
              // color="#333333"
              color={colors.textColor}
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

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <IMG.SearchNew width={mvs(18)} height={mvs(18)} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by Ancestry, etc."
                placeholderTextColor={colors.placeholder}
                value={searchText}
                onChangeText={setSearchText}
                onFocus={() => {
                  if (!subscribed) {
                    navigate('PremiumUnlockSearchScreen');
                  } else {
                    setIsSearchFocused(true);
                  }
                }}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchText('')}
                  style={styles.clearButton}>
                  <Icon name="close-circle" size={mvs(20)} color="#8C8C8C" />
                </TouchableOpacity>
              )}
              <View style={styles.searchDivider} />
              <TouchableOpacity onPress={() => navigate("SearchFilterScreen")}>
                <IMG.HomeFilter width={mvs(20)} height={mvs(20)} />
              </TouchableOpacity>
            </View>

            {(isSearchFocused || searchText.length > 0) && (
              <View
                pointerEvents="auto"
                style={[
                  styles.searchSuggestionsCard,
                  Platform.OS === 'android' && keyboardVisible && { height: mvs(300) }
                ]}>
                <ScrollView
                  contentContainerStyle={styles.searchSuggestionsContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                  scrollEnabled={true}
                  removeClippedSubviews={false}>
                  {searchText.length > 0 && (
                    <View style={styles.suggestionsSection}>
                      <Regular
                        label="Search Results"
                        fontSize={mvs(14)}
                        color="#8C8C8C"
                        style={styles.sectionTitle}
                      />
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((item, index) => (
                          <Pressable
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => setSearchText(item)}
                            delayPressIn={100}>
                            <Regular
                              label={item}
                              fontSize={mvs(14)}
                              color="#333333"
                            />
                          </Pressable>
                        ))
                      ) : (
                        <Regular
                          label="No results found"
                          fontSize={mvs(14)}
                          color="#8C8C8C"
                        />
                      )}
                    </View>
                  )}

                  {searchText.length === 0 && (
                    <>
                      <View style={styles.suggestionsSection}>
                        <Regular
                          label="Suggested Searches"
                          fontSize={mvs(14)}
                          color="#8C8C8C"
                          style={styles.sectionTitle}
                        />
                        {suggestedSearches.map((item, index) => (
                          <Pressable
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => setSearchText(item)}
                            delayPressIn={100}>
                            <Regular
                              label={item}
                              fontSize={mvs(14)}
                              color="#404040"
                            />
                          </Pressable>
                        ))}
                      </View>
                      <View style={styles.suggestionsDivider} />
                      <View style={styles.suggestionsSection}>
                        <Regular
                          label="Recent Searches"
                          fontSize={mvs(14)}
                          color="#8C8C8C"
                          style={styles.sectionTitle}
                        />
                        {recentSearches.map((item, index) => (
                          <Pressable
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => setSearchText(item)}
                            delayPressIn={100}>
                            <Regular
                              label={item}
                              fontSize={mvs(14)}
                              color="#333333"
                            />
                          </Pressable>
                        ))}
                      </View>
                    </>
                  )}
                </ScrollView>
              </View>
            )}
          </View>
          {/* )} */}
        </>
      ) : (
        <View style={styles.locationPromptContainer}>
          <View style={styles.locationPromptContent}>
            <IMG.Nolocation width={mvs(120)} height={mvs(120)} />
            <Medium
              label="Location Access Needed"
              fontSize={mvs(16)}
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
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.helixBackground,
  },
  // searchContainer: {
  //   paddingHorizontal: mvs(20),
  //   paddingTop: mvs(20),
  //   paddingBottom: mvs(12),
  //   backgroundColor: colors.white,
  //   zIndex: 10,
  // },
  //   searchContainer: {
  //   position: 'absolute',
  //   top: Platform.OS==='ios'? mvs(100):mvs(20),
  //   left: mvs(20),
  //   right: mvs(20),
  //   zIndex: 20,
  // },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + mvs(30) : mvs(70),
    left: mvs(20),
    right: mvs(20),
    zIndex: 110,
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: mvs(40),
    paddingHorizontal: mvs(16),
    // paddingVertical: mvs(2),
    height: mvs(46),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: mvs(12),
    fontSize: mvs(14),
    color: colors.inputText,
  },
  clearButton: {
    marginLeft: mvs(8),
    padding: mvs(4),
  },
  searchDivider: {
    width: 1,
    height: mvs(20),
    backgroundColor: '#E5E5E5',
    marginHorizontal: mvs(12),
  },
  mapContainer: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    // position: 'relative',
    // backgroundColor: '#f5f5f5',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor:"red"
  },
  profileImage: {
    width: mvs(50),
    height: mvs(50),
    borderRadius: mvs(25),
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
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
  pinDot: {
    width: mvs(10),
    height: mvs(10),
    borderRadius: mvs(5),
    backgroundColor: colors.primary,
  },

  pinImage: {
    width: mvs(20),
    height: mvs(20),
  },
  locationIndicator: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? mvs(120) : mvs(110),
    left: mvs(20),
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.white,
    paddingHorizontal: mvs(5),
    paddingVertical: mvs(8),
    borderRadius: mvs(20),
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    zIndex: 10,
  },
  membersSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    // marginTop:-1000,
    right: 0,
    // top: 1000,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
    paddingTop: mvs(8),
    paddingBottom: mvs(20),
    maxHeight: mvs(300),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  membersHandle: {
    width: mvs(72),
    marginVertical: mvs(10),
    height: mvs(4),
    backgroundColor: '#404040',
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
  markerProfileImage: {
    width: mvs(94),        // 🔥 BIGGER
    height: mvs(70),
    resizeMode: 'contain'
    // borderRadius: mvs(35),
    // borderWidth: 3,
    // borderColor: colors.white,
    // backgroundColor: colors.white,
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
  locationPromptButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(40),
    paddingVertical: mvs(16),
    paddingHorizontal: mvs(32),
    marginTop: mvs(32),
    marginBottom: mvs(40),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSuggestionsCard: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    marginTop: mvs(12),
    //  marginTop: mvs(60), 
    // maxHeight: mvs(380),
    maxHeight: SEARCH_CARD_MAX_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 120,
  },
  searchSuggestionsContent: {
    paddingVertical: mvs(12),
    paddingHorizontal: mvs(20),
    paddingBottom: Platform.OS === 'android' ? mvs(10) : mvs(10)
  },
  suggestionsSection: {
    marginBottom: mvs(8),
  },
  sectionTitle: {
    marginBottom: mvs(12),
  },
  suggestionItem: {
    paddingVertical: mvs(6),
  },
  suggestionsDivider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: mvs(8),
  },
});
