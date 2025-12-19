import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
import {PrimaryButton} from 'components/atoms/buttons';

const WareHouseMapGuideScreen = () => {
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

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header1x2x title={'WareHouse Map Guide'} />

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
          <Marker
            coordinate={pickupLocation}
            title="Pickup"
            description="Warehouse: Shop #1">
            <Image
              source={IMG.driver}
              style={{height: mvs(35), width: mvs(35)}}
              resizeMode="contain"
            />
          </Marker>

          <Marker
            coordinate={dropoffLocation}
            title="Drop Off"
            description="Batha Main Area Stree Dist">
            <Image
              source={IMG.maplocationicon}
              style={{height: mvs(35), width: mvs(35)}}
              resizeMode="contain"
            />
          </Marker>

          {/* <Polyline
            coordinates={[pickupLocation, dropoffLocation]}
            strokeColor={colors.primary}
            strokeWidth={4}
          /> */}
        </MapView>
      </ScrollView>
      {/* <PrimaryButton
                      containerStyle={{
                        borderRadius: mvs(50),
                        height: mvs(50),
                        marginTop: mvs(25),
                      }}
                      // onPress={handleSubmit}
                      onPress={()=>navigate("DriverRegistrationPart2Screen")}
                      title={'Start Navigate'}
                    /> */}
<View style={{marginBottom:mvs(10)}}>
      <TouchableOpacity
      activeOpacity={mvs(0.9)}
      onPress={()=>navigate("WareHouseMapRouteScreen")}
        style={{
          borderRadius: mvs(50),
          height: mvs(55),
          marginTop: mvs(25),
          width: '90%',
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
  pickupDropBox: {
    alignItems: 'center',
    backgroundColor: '#FFF8F6',
    borderRadius: mvs(10),
    padding: mvs(10),
    marginTop: mvs(10),
  },
  icon: {
    height: mvs(26),
    width: mvs(26),
    marginRight: mvs(10),
  },
  timingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // distributes items evenly
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: mvs(10),
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(10),
    marginTop: mvs(10),
  },

  timingBox: {
    flex: 1, // take equal space
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
  smallIcon: {
    height: mvs(21),
    width: mvs(21),
    tintColor: colors.white,
  },
  acceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: mvs(30),
    paddingVertical: mvs(14),
    width: '90%',
  },
  arrowIconWhite: {
    height: mvs(20),
    width: mvs(20),
    tintColor: colors.white,
    marginRight: mvs(8),
  },
});

export default WareHouseMapGuideScreen;
