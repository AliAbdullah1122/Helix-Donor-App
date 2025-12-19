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
import MapView, {Marker, Polyline} from 'react-native-maps';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwipeAcceptButton from 'components/atoms/SwipeAcceptButton/SwipeAcceptButton';
import {navigate} from 'navigation/navigation-ref';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const DeliveryDetailsScreen = () => {
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    'No one answered the door',
    'Phone unreachable',
    'Health issues',
    'Vehicle issue',
    'Emergency',
    'Other',
    'Late delivery time',
  ];

  return (
    <BottomSheetModalProvider>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header1x2x title={'Delivery Details'} />

        {/* MAP SECTION */}
        <View style={{height: mvs(250), overflow: 'hidden'}}>
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
            <Marker
              coordinate={pickupLocation}
              title="Pickup"
              description="Warehouse: Shop #1">
              <Image
                source={IMG.pickupicon}
                style={{height: mvs(35), width: mvs(35)}}
                resizeMode="contain"
              />
            </Marker>

            <Marker
              coordinate={dropoffLocation}
              title="Drop Off"
              description="Batha Main Area Stree Dist">
              <Image
                source={IMG.orderLocation}
                style={{height: mvs(35), width: mvs(35)}}
                resizeMode="contain"
              />
            </Marker>

            <Polyline
              coordinates={[pickupLocation, dropoffLocation]}
              strokeColor={colors.primary}
              strokeWidth={4}
            />
          </MapView>
        </View>

        {/* WHITE CONTENT BELOW MAP */}
        <View style={styles.bottomContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: mvs(60)}}>
            {/* ORDER INFO */}
            <Row
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <Row>
                <Regular
                  label="Order#:"
                  color={colors.subteXTcOLOR}
                  fontSize={mvs(14)}
                />
                <Medium
                  label=" 52621"
                  color={colors.black}
                  fontSize={mvs(15)}
                />
              </Row>
              <View style={styles.timeTag}>
                <Medium
                  label="5 min"
                  color={colors.primary}
                  fontSize={mvs(13)}
                />
              </View>
            </Row>

            <View
              style={{
                borderBottomWidth: 2,
                borderColor: colors.inputBackground,
                paddingHorizontal: mvs(10),
                marginVertical: mvs(10),
              }}
            />

            {/* PICK UP */}
            <Row
              style={{
                paddingHorizontal: mvs(6),
                paddingVertical: mvs(5),
                alignItems: 'center',
                backgroundColor: '#F8F8F8',
                borderRadius: mvs(8),
                justifyContent: 'flex-start',
              }}>
              {/* <Image
                source={IMG.pickupicon}
                resizeMode="contain"
                style={{height: mvs(30), width: mvs(30), marginRight: mvs(8)}}
              /> */}

               <IMG.pickupicon height={mvs(30)} width={ mvs(30)} style={{marginRight:mvs(8)}}/>
              <View>
                <Bold
                  label={'Pick Up'}
                  color={colors.primary}
                  fontSize={mvs(12)}
                />
                <Medium
                  label={'Warehouse: Shop #1'}
                  color={colors.black}
                  fontSize={mvs(15)}
                />
              </View>
            </Row>

            {/* Line between pickup/dropoff */}
            <View>
              {/* <Image
                source={IMG.orderline}
                resizeMode="contain"
                style={{width: mvs(20), height: mvs(24)}}
              /> */}
               <IMG.orderline height={mvs(24)} width={ mvs(24)} />
            </View>

            {/* DROP OFF */}
            <View style={{marginTop: mvs(10)}}>
              <Row
                style={{
                  paddingHorizontal: mvs(6),
                  paddingVertical: mvs(5),
                  alignItems: 'center',
                  backgroundColor: '#F8F8F8',
                  borderRadius: mvs(8),
                  justifyContent: 'flex-start',
                }}>
                {/* <Image
                  source={IMG.orderLocation}
                  resizeMode="contain"
                  style={{height: mvs(30), width: mvs(30), marginRight: mvs(8)}}
                /> */}

                 <IMG.orderLocation height={mvs(30)} width={ mvs(30)} style={{marginRight:mvs(8)}}/>
                <View>
                  <Bold
                    label={'Drop Off'}
                    color={colors.primary}
                    fontSize={mvs(12)}
                  />
                  <Medium
                    label={'Customer: Ahmed'}
                    color={colors.black}
                    fontSize={mvs(15)}
                  />
                </View>
              </Row>
            </View>

            {/* DELIVERY TIMINGS */}
            <View style={{marginTop: mvs(20)}}>
              <Bold
                label="Delivery Timings"
                color={colors.black}
                fontSize={mvs(15)}
                style={{fontWeight: '500'}}
              />
              <Row>
                <View style={styles.timingBox}>
                  <Medium
                    label="Delivery Date"
                    color={colors.subteXTcOLOR}
                    fontSize={mvs(14)}
                  />
                  <Medium
                    label="27 May"
                    fontSize={mvs(15)}
                    color={colors.black}
                  />
                </View>
                <View style={{...styles.timingBox, marginLeft: mvs(10)}}>
                  <Medium
                    label="Due Time"
                    color={colors.subteXTcOLOR}
                    fontSize={mvs(14)}
                  />
                  <Medium
                    label="1h 15 min"
                    fontSize={mvs(15)}
                    color={colors.black}
                  />
                </View>
                <View style={{...styles.timingBox, marginLeft: mvs(10)}}>
                  <Medium
                    label="Duration"
                    color={colors.subteXTcOLOR}
                    fontSize={mvs(14)}
                  />
                  <Medium
                    label="50 min"
                    fontSize={mvs(15)}
                    color={colors.black}
                  />
                </View>
              </Row>
            </View>

            {/* WAREHOUSE INFO */}
            <Row style={styles.warehouseBox}>
              <Row>
                {/* <Image
                  source={IMG.warehouse}
                  resizeMode="contain"
                  style={{
                    height: mvs(36),
                    width: mvs(40),
                    marginRight: mvs(10),
                  }}
                /> */}

                <IMG.warehouseName height={mvs(36)} width={ mvs(40)} style={{marginRight:mvs(10)}}/>
                <View>
                  <Medium
                    label="Warehouse Name"
                    fontSize={mvs(14)}
                    color={colors.black}
                  />
                  <Regular
                    label="Warehouse address"
                    fontSize={mvs(12)}
                    color={colors.subteXTcOLOR}
                  />
                </View>
              </Row>
              <Row>
                <TouchableOpacity style={styles.smallBtn}>
                  {/* <Image
                    source={IMG.Call}
                    style={styles.smallIcon}
                    resizeMode="contain"
                  /> */}
                  <IMG.CallSvg height={mvs(21)} width={ mvs(21)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn}>
                  {/* <Image
                    source={IMG.chat}
                    style={styles.smallIcon}
                    resizeMode="contain"
                  /> */}
                  <IMG.chatSvg height={mvs(21)} width={ mvs(21)} />
                </TouchableOpacity>
              </Row>
            </Row>

            {/* ACTION BUTTONS */}

          </ScrollView>
                      <View style={{marginTop: mvs(25)}}>
              <SwipeAcceptButton
                onAccept={() => navigate('DeliveryParcelDetailsScreen')}
              />
            </View>

            <TouchableOpacity
              style={{marginVertical: mvs(15), alignItems: 'center'}}
              onPress={() => setShowConfirm(true)}>
              <Medium
                label="Decline Delivery"
                color={colors.red}
                fontSize={mvs(15)}
                style={{fontWeight: '500', textDecorationLine: 'underline'}}
              />
            </TouchableOpacity>
        </View>

        {/* CONFIRM DECLINE BOTTOM SHEET */}
        {showConfirm && (
          <View style={styles.bottomSheetContainer}>
            <View style={styles.sheetBox}>
              {/* <Medium style={styles.sheetTitle}>
                Are you sure you want to decline this delivery?
              </Medium> */}
              <Row>
                <View style={{
                  width:"90%",
                }}>
                <Medium
                numberOfLines={3}
                  color={colors.black}
                  fontSize={mvs(16)}
                  label={'Are you sure you want to decline this delivery?'}
                />
                </View>
                <TouchableOpacity onPress={() => setShowConfirm(false)}>
                <Image
                  source={IMG.closeoutline}
                  resizeMode="contain"
                  style={{height: mvs(25), width: mvs(25)}}
                />
                </TouchableOpacity>
              </Row>
              <Row style={{justifyContent: 'space-around', marginTop: mvs(15)}}>
                <TouchableOpacity
                
                  style={styles.noBtn}
                  onPress={() => {
                    setShowConfirm(false);
                    setShowReasons(true);
                  }}
                  //  onPress={() => setShowConfirm(false)}
                >
                  {/* <Medium style={styles.noText}>Yes</Medium>
                   */}
                   <Medium label='Yes' color={colors.primary} fontSize={mvs(16)}/>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.yesBtn}
                  onPress={() => setShowConfirm(false)}>
                    <Medium label='No' color={colors.white} fontSize={mvs(16)}/>
                  {/* <Text style={styles.yesText}>No</Text> */}
                </TouchableOpacity>
              </Row>
            </View>
          </View>
        )}

        {/* REASON SELECTION MODAL */}
        <Modal transparent visible={showReasons} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.reasonModal}>
              {/* <Text style={styles.reasonTitle}>
                Please select a reason below to help us understand why.
              </Text> */}
               <Medium style={{textAlign:'center'}} numberOfLines={10} label='Please select a reason below to help us understand why.' color={colors.black} fontSize={mvs(16)}/>
              <View style={styles.reasonsContainer}>
                {reasons.map(reason => (
                  <TouchableOpacity
                    key={reason}
                    onPress={() => setSelectedReason(reason)}
                    style={[
                      styles.reasonChip,
                      selectedReason === reason && {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      },
                    ]}>
                      <View>
                    <Medium
                      style={[
                        styles.reasonText,
                        selectedReason === reason && {color: colors.white},
                      ]}>
                      {reason}
                    </Medium>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => setShowReasons(false)}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(25),
    borderTopRightRadius: mvs(25),
    marginTop: -mvs(20),
    paddingHorizontal: mvs(15),
    paddingTop: mvs(20),
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  timeTag: {
    backgroundColor: '#FFF1ED',
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(4),
    borderRadius: mvs(8),
  },
  timingBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: mvs(10),
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(10),
    marginTop: mvs(10),
  },
  warehouseBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mvs(20),
    backgroundColor: '#F8F8F8',
    borderRadius: mvs(12),
    padding: mvs(12),
  },
  smallBtn: {
    backgroundColor: colors.primary,
    height: mvs(36),
    width: mvs(36),
    borderRadius: mvs(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: mvs(8),
  },
  smallIcon: {height: mvs(21), width: mvs(21), tintColor: colors.white},

  // Bottom Sheet styles
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    height: '100%',
  },
  sheetBox: {
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
    padding: mvs(20),
  },
  sheetTitle: {
    fontSize: mvs(15),
    color: colors.black,
    textAlign: 'center',
    marginBottom: mvs(10),
  },
  yesBtn: {
    backgroundColor: colors.primary,
    borderRadius: mvs(30),
    width: '45%',
    alignItems: 'center',
    paddingVertical: mvs(14),
  },
  yesText: {color: colors.white, fontSize: mvs(15)},
  noBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: mvs(30),
    width: '45%',
    alignItems: 'center',
    paddingVertical: mvs(14),
  },
  noText: {color: colors.primary, fontSize: mvs(15)},

  // Reason Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  reasonModal: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    padding: mvs(20),
  },
  reasonTitle: {
    textAlign: 'center',
    color: colors.black,
    marginBottom: mvs(15),
  },
  reasonsContainer: {
    flexDirection: 'row',
    marginTop:mvs(10),
    flexWrap: 'wrap',
    // justifyContent: 'center',
    gap: 5,
  },
  reasonChip: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: mvs(20),
    paddingVertical: mvs(6),
    paddingHorizontal: mvs(12),
    margin: mvs(5),
  },
  reasonText: {color: colors.primary, fontSize: mvs(13)},
  doneBtn: {
    marginTop: mvs(15),
    backgroundColor: colors.primary,
    borderRadius: mvs(25),
    alignItems: 'center',
    paddingVertical: mvs(12),
  },
  doneText: {color: colors.white, fontSize: mvs(16)},
});

export default DeliveryDetailsScreen;
