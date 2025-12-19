import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { navigate } from 'navigation/navigation-ref';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomerDeliveryNavigateScreen = () => {
  const [selectedRoute, setSelectedRoute] = useState(1);
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => [SCREEN_HEIGHT * 0.33, SCREEN_HEIGHT * 0.7], []);

  const routes = [
    { id: 1, time: '16 min', distance: '6.2 km' },
    { id: 2, time: '18 min', distance: '6.8 km' },
    { id: 3, time: '20 min', distance: '7.3 km' },
  ];

  const pickupLocation = { latitude: 41.0638, longitude: 28.9407 };
  const dropoffLocation = { latitude: 41.0483, longitude: 28.9385 };

  const [region, setRegion] = useState({
    latitude: 41.055,
    longitude: 28.94,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const renderSteps = () => {
    const stepsData = {
      1: [
        { icon: IMG.arrowup, title: 'Head east', distance: '120 m' },
        { icon: IMG.arrowup, title: 'Continue straight', distance: '80 m' },
        { icon: IMG.Turnleft, title: 'Turn left', distance: '200 m' },
        { icon: IMG.arrowup, title: 'Head north', distance: '250 m' },
        { icon: IMG.Turnright, title: 'Turn right', distance: '110 m' },
        { icon: IMG.arrowup, title: 'Continue', distance: '300 m' },
        { icon: IMG.Turnleft, title: 'Turn left', distance: '50 m' },
      ],
      2: [
        { icon: IMG.arrowup, title: 'Head east', distance: '110 m' },
        { icon: IMG.Turnleft, title: 'Turn left', distance: '140 m' },
        { icon: IMG.Turnright, title: 'Turn right', distance: '160 m' },
        { icon: IMG.arrowup, title: 'Continue', distance: '100 m' },
      ],
      3: [
        { icon: IMG.arrowup, title: 'Head east', distance: '100 m' },
        { icon: IMG.Turnleft, title: 'Turn left', distance: '150 m' },
        { icon: IMG.Turnright, title: 'Turn right', distance: '100 m' },
      ],
    };

    return stepsData[selectedRoute].map((step, index) => (
      <View key={index} style={styles.stepContainer}>
        <Row style={styles.stepRow}>
          <Image
            source={step.icon}
            resizeMode="contain"
            style={{ width: mvs(22), height: mvs(22), marginRight: mvs(10) }}
          />
          <View style={{ flex: 1 }}>
            <Medium label={step.title} color={colors.black} fontSize={mvs(13)} />
            <Regular
              label={step.distance}
              color={colors.subteXTcOLOR}
              fontSize={mvs(12)}
              style={{ marginTop: mvs(2) }}
            />
          </View>
        </Row>
        {index !== stepsData[selectedRoute].length - 1 && (
          <View style={styles.stepDivider} />
        )}
      </View>
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header1x2x title={'Customer Delivery Navigate'} />

      {/* MAP */}
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass

showsUserLocation={false}>
        <Marker coordinate={pickupLocation}>
          <Image
            source={IMG.pickupicon}
            style={{ height: mvs(35), width: mvs(35) }}
          />
        </Marker>
        <Marker coordinate={dropoffLocation}>
          <Image
            source={IMG.orderLocation}
            style={{ height: mvs(35), width: mvs(35) }}
          />
        </Marker>
        <Polyline
          coordinates={[pickupLocation, dropoffLocation]}
          strokeColor={colors.primary}
          strokeWidth={4}
        />
      </MapView>

      {/* BOTTOM SHEET */}
      <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints}>
        <View style={styles.sheetContent}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Medium
              label="Delivery Routes"
              fontSize={mvs(16)}
              color={colors.black}
            />
            <TouchableOpacity style={{ padding: mvs(4) }}>
              <Text style={{ color: colors.subteXTcOLOR, fontSize: mvs(18) }}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <Row style={styles.tabContainer}>
            {routes.map(route => (
              <TouchableOpacity
                key={route.id}
                onPress={() => setSelectedRoute(route.id)}
                style={[
                  styles.tab,
                  selectedRoute === route.id && styles.activeTab,
                ]}
              >
                <Medium
                  label={`Route ${route.id}`}
                  color={
                    selectedRoute === route.id
                      ? colors.primary
                      : colors.subteXTcOLOR
                  }
                  fontSize={mvs(14)}
                />
              </TouchableOpacity>
            ))}
          </Row>

          {/* Route Info */}
          <View style={styles.routeInfo}>
            <Medium
              label={`${routes[selectedRoute - 1].time} (${routes[selectedRoute - 1].distance})`}
              color={colors.black}
              fontSize={mvs(14)}
            />
            <Regular
            numberOfLines={10}
              label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              color={colors.subteXTcOLOR}
              fontSize={mvs(13)}
              style={{ marginTop: mvs(5) }}
            />
          </View>

          {/* Scrollable Steps */}
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: mvs(100) }}
          >
            <View style={{ paddingVertical: mvs(10) }}>
              <Medium label="Steps" color={colors.black} fontSize={mvs(14)} />
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                  marginTop: mvs(10),
                  paddingVertical: mvs(8),
                }}
              >
                {/* <Image
                  source={IMG.driver}
                  style={{
                    height: mvs(30),
                    width: mvs(30),
                    marginRight: mvs(10),
                  }}
                /> */}
                <IMG.driverSvg height={mvs(30)} width={mvs(30)} style={{marginRight:mvs(10)}}/>
                <Medium
                  style={{ fontWeight: '500' }}
                  label="Your Location"
                  color={colors.black}
                  fontSize={mvs(12)}
                />
              </Row>

              {renderSteps()}
            </View>
          </BottomSheetScrollView>

          {/* Fixed Footer */}
          
        </View>
      </BottomSheet>
      <View style={styles.fixedFooter}>
            {/* <TouchableOpacity style={styles.startButtonFixed}>
              <Medium
                label="Start Navigate"
                color={colors.white}
                fontSize={mvs(15)}
              />
           
                <IMG.Arrowdouble 
                                width={mvs(25)}
                                 height={mvs(22)}/>
            </TouchableOpacity> */}
            <View style={{marginBottom:mvs(10)}}>
                  <TouchableOpacity
                  activeOpacity={mvs(0.9)}
                  onPress={()=>navigate("CustomerDeliveryStartNavigateScreen")}
                    style={{
                      borderRadius: mvs(50),
                      height: mvs(55),
                      // marginTop: mvs(25),
                      width: '100%',
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Row style={{alignItems: 'center',justifyContent:"space-around"}}>
                      <Medium
                        style={{fontWeight: '500'}}
                        fontSize={mvs(16)}
                        label={'Start Navigate'}
                        color={colors.white}
                      />
                      <View style={{right:-100}}>
                      <IMG.Arrowdouble 
                               width={mvs(25)}
                                height={mvs(22)}/>
                                </View>
                    </Row>
                  </TouchableOpacity>
                  </View>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    paddingHorizontal: mvs(16),
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mvs(10),
  },
  tabContainer: {
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: mvs(10),
  },
  tab: {
    paddingVertical: mvs(8),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
  routeInfo: {
    backgroundColor: colors.white,
    padding: mvs(10),
    borderRadius: mvs(10),
    marginTop: mvs(10),
  },
  stepContainer: {
    marginLeft: mvs(25),
    marginTop: mvs(10),
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    marginLeft: mvs(32),
    marginTop: mvs(8),
  },
  fixedFooter: {
    paddingHorizontal: mvs(15),
    // backgroundColor:'red'
  },
  startButtonFixed: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: mvs(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: mvs(30),
  },
});

export default CustomerDeliveryNavigateScreen;
