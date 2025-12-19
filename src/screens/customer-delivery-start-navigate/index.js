import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Bold from 'typography/bold-text';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MOCK_DATA = {
  currentInstruction: 'Head east',
  currentDistance: '100 m',
  deliveryTime: '12 Min',
  totalDistance: '4.0 km',
  eta: '12:10 AM',
  customerName: 'Customer Name',
  customerAddress: 'House#12 Street Alhumd 2nd floor apartment',
  pickupLocation: { latitude: 41.0638, longitude: 28.9407 },
  dropoffLocation: { latitude: 41.0483, longitude: 28.9385 },
};

const CustomerDeliveryStartNavigateScreen = () => {
  const sheetRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const snapPoints = useMemo(() => [mvs(170), SCREEN_HEIGHT * 0.55], []);

  const [region, setRegion] = useState({
    latitude: 41.055,
    longitude: 28.94,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  });

  const handleExpand = () => {
    sheetRef.current?.expand();
    setIsExpanded(true);
  };

  const handleClose = () => {
    sheetRef.current?.collapse();
    setIsExpanded(false);
  };

  // --- Header ---
  const renderNavigationHeader = () => (
    <SafeAreaView style={styles.topHeaderSafeArea}>
      <View style={styles.topHeaderContainer}>
        <Row style={styles.topHeaderContent}>
          {/* <Image
            source={IMG.arrowupheader}
            style={styles.topHeaderIcon}
            resizeMode="contain"
          /> */}
            <IMG.arrowUpSvg height={mvs(39)} width={mvs(39)} style={{marginRight:mvs(10)}}/>
          <Medium
            label={MOCK_DATA.currentInstruction}
            color={colors.white}
            fontSize={mvs(15)}
          />
        </Row>
        <Bold
          label={MOCK_DATA.currentDistance}
          color={colors.white}
          fontSize={mvs(14)}
          style={styles.topHeaderDistance}
        />
      </View>
    </SafeAreaView>
  );

  // --- Bottom Sheet Content ---
  const renderBottomSheetContent = () => (
    <View style={styles.sheetContent}>
      {/* Delivery Info Panel */}
      <View style={styles.infoContainer}>
        <Row style={styles.infoInner}>
          <TouchableOpacity style={{ marginLeft: mvs(10) }}>
            {/* <Image
              source={IMG.CroosIcon}
              style={styles.crossIcon}
              resizeMode="contain"
            /> */}
            <IMG.buttonCrosssVG height={mvs(49)} width={mvs(49)}/>
          </TouchableOpacity>

          <View style={styles.infoTextContainer}>
            <Medium
              label={MOCK_DATA.deliveryTime}
              color={colors.black}
              fontSize={mvs(17)}
              style={{ textAlign: 'center' }}
            />
            <Regular
              label={`${MOCK_DATA.totalDistance} - ${MOCK_DATA.eta}`}
              color={colors.subteXTcOLOR || '#757575'}
              fontSize={mvs(13)}
              style={{ textAlign: 'center', marginTop: mvs(2) }}
            />
          </View>
        </Row>
      </View>

      {/* Customer Row */}
      <Row style={styles.customerRow}>
        {/* <Image
          source={IMG.customer}
          style={styles.customerIcon}
          resizeMode="contain"
        /> */}
         <IMG.profileDelverySvg height={mvs(36)} width={mvs(40)} style={{marginRight:mvs(10)}}/>
        <View style={styles.customerText}>
          <Medium
            label={MOCK_DATA.customerName}
            color={colors.black}
            fontSize={mvs(14)}
          />
          <Regular
            label={MOCK_DATA.customerAddress}
            color={colors.subteXTcOLOR || '#757575'}
            fontSize={mvs(12)}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </View>
        <TouchableOpacity style={styles.callButton}>
          {/* <Image source={IMG.Call} style={styles.callIcon} resizeMode="contain" /> */}
           <IMG.CallSvg height={mvs(25)} width={ mvs(25)} />
        </TouchableOpacity>
      </Row>

      {/* Arrow Down Button */}
      <View style={styles.arrowDownWrapper}>
        <TouchableOpacity onPress={isExpanded ? handleClose : handleExpand}>
          {/* <Image
            source={IMG.ArrowDown}
            style={[
              styles.arrowDownIcon,
              isExpanded && { transform: [{ rotate: '180deg' }] },
            ]}
            resizeMode="contain"
          /> */}

                      <IMG.arrowdownSvg height={mvs(30)} width={mvs(25)}  style={[
              styles.arrowDownIcon,
              isExpanded && { transform: [{ rotate: '180deg' }] },
            ]}/>
        </TouchableOpacity>
      </View>

      {/* Delivery Instructions Section */}
      {isExpanded && (
        <View style={styles.instructionsContainer}>
          <Bold
            label="Delivery Instructions"
            color={colors.black}
            fontSize={mvs(16)}
          />
          <Regular
          numberOfLines={10}
            label="Delivery instructions guide the delivery of goods from a seller to a buyer. They typically include the recipient's address, any special handling needs (like fragile items), and contact information for the recipient."
            color={colors.subteXTcOLOR || '#555'}
            fontSize={mvs(14)}
            style={{ marginTop: mvs(8), lineHeight: mvs(18) }}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Map */}
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        <Marker coordinate={MOCK_DATA.pickupLocation}>
          <Image source={IMG.pickupicon} style={styles.markerIcon} />
        </Marker>
        <Marker coordinate={MOCK_DATA.dropoffLocation}>
          <Image source={IMG.orderLocation} style={styles.markerIcon} />
        </Marker>
        <Polyline
          coordinates={[MOCK_DATA.pickupLocation, MOCK_DATA.dropoffLocation]}
          strokeColor={colors.primary}
          strokeWidth={4}
        />
      </MapView>

      {/* Header */}
      {renderNavigationHeader()}

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'transparent' }}
        onChange={(index) => setIsExpanded(index === 1)}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {renderBottomSheetContent()}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default CustomerDeliveryStartNavigateScreen;

// --- Styles ---
const styles = StyleSheet.create({
  // Header
  topHeaderSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.primary,
  },
  topHeaderContainer: {
    height: mvs(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(16),
  },
  topHeaderContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topHeaderIcon: {
    width: mvs(39),
    height: mvs(39),
    marginRight: mvs(10),
  },
  topHeaderDistance: {
    fontWeight: '500',
  },

  // Bottom Sheet
  sheetContent: {
    flex: 1,
    paddingHorizontal: mvs(16),
  },
  infoContainer: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: mvs(30),
    paddingVertical: mvs(2),
    paddingHorizontal: mvs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(5),
  },
  infoInner: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  crossIcon: {
    width: mvs(49),
    height: mvs(49),
  },
  infoTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  customerRow: {
    alignItems: 'center',
    marginTop: mvs(15),
    backgroundColor: colors.inputBackground,
  },
  customerIcon: {
    width: mvs(35),
    height: mvs(35),
  },
  customerText: {
    width: '75%',
    marginLeft: mvs(10),
  },
  callButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(100),
    padding: mvs(5),
  },
  callIcon: {
    width: mvs(30),
    height: mvs(30),
  },
  arrowDownWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(8),
    paddingBottom: mvs(10),
  },
  arrowDownIcon: {
    width: mvs(30),
    height: mvs(30),
  },
  markerIcon: {
    height: mvs(35),
    width: mvs(35),
  },
  instructionsContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(15),
    marginTop: mvs(10),
    padding: mvs(10),
    
  },
});
