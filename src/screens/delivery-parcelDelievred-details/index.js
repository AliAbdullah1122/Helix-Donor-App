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
import SwipeParcelButton from 'components/atoms/SwipeParcelButton/SwipeParcelButton';
import { navigate } from 'navigation/navigation-ref';
import SwipeStartPickupLocationButton from 'components/atoms/SwipeStartPickupLocation/SwipeStartPickupLocation';
import SwipeParcelDelieveredButton from 'components/atoms/SwipeParcelDelieveredButton/SwipeParcelDelieveredButton';

const DeliveryParcelDelieveredScreen = () => {
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
      <Header1x2x title={'Delivery Details'} />

      {/* MAP SECTION */}
      <View style={{height: mvs(100), overflow: 'hidden',backgroundColor:colors.primary}}>
        <IMG.deliveryStepper2 
         width={'100%'}
          height={mvs(75)}/>

      </View>

      {/* WHITE CONTENT BELOW MAP */}
      <View style={styles.bottomContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: mvs(60)}}>
          {/* ORDER INFO */}
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Row>
              <Regular
                label="Order#:"
                color={colors.subteXTcOLOR}
                fontSize={mvs(14)}
              />
              <Medium label=" 52621" color={colors.black} fontSize={mvs(15)} />
            </Row>
            <View style={styles.timeTag}>
              <Medium label="Due: 1hr 20 min" color={colors.primary} fontSize={mvs(13)} />
            </View>
          </Row>
          {/* <View style={{marginVertical:mvs(10)}}>
            <Medium color={colors.black} fontSize={mvs(15)} style={{fontWeight:"500"}} label={'Order Status'}/>
            <IMG.PackingSVG 
         width={'100%'}
          height={mvs(75)}/>
          </View> */}

          <View
            style={{
              borderBottomWidth: 2,
              borderColor: colors.inputBackground,
              // paddingHorizontal: mvs(10),
              marginVertical: mvs(10),
            }}>

               <Medium color={colors.black} fontSize={mvs(15)} style={{fontWeight:"500"}} label={'Location Details'}/>
            </View>

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
                  <View style={{width:"80%"}}>
                    <Bold label={'Pick Up'} color={colors.primary} fontSize={mvs(12)} />
                    <Medium label={'Warehouse: Shop #1'} color={colors.black} fontSize={mvs(15)} />
                  </View>
                  <View style={{marginLeft:mvs(6)}}>
                   <IMG.Maplocation 
         width={mvs(24)}
          height={mvs(24)}/>
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

                  <View style={{width:"80%"}}>
                    <Bold label={'Drop Off'} color={colors.primary} fontSize={mvs(12)} />
                    <Medium label={'Customer: Ahmed'} color={colors.black} fontSize={mvs(15)} />
                  </View>
                  <View style={{marginLeft:mvs(6)}}>
                   <IMG.Maplocation 
         width={mvs(24)}
          height={mvs(24)}/>
          </View>
                </Row>
              </View>

          {/* DELIVERY TIMINGS */}
          <View style={{marginTop: mvs(20)}}>
            <Bold
              label="Delivery Timings"
              color={colors.black}
                  fontSize={mvs(15)}
                  style={{fontWeight:'500'}}
            />
<Row 
// style={styles.timingsContainer}
>
  <View style={styles.timingBox}>
    <Medium
      label="Delivery Date"
      color={colors.subteXTcOLOR}
      fontSize={mvs(14)}
      style={{fontWeight: '500'}}
    />
    <Medium
      fontSize={mvs(15)}
      style={{fontWeight: '500'}}
      color={colors.black}
      label="27 May"
    />
  </View>

  <View style={{...styles.timingBox,marginLeft:mvs(10)}}>
    <Medium
      style={{fontWeight: '500'}}
      label="Due Time"
      color={colors.subteXTcOLOR}
      fontSize={mvs(14)}
    />
    <Medium
      label="1h 15 min"
      fontSize={mvs(15)}
      style={{fontWeight: '500'}}
      color={colors.black}
    />
  </View>

  <View style={{...styles.timingBox,marginLeft:mvs(10)}}>
    <Medium
      style={{fontWeight: '500'}}
      label="Duration"
      color={colors.subteXTcOLOR}
      fontSize={mvs(14)}
    />
    <Medium
      label="50 min"
      fontSize={mvs(15)}
      style={{fontWeight: '500'}}
      color={colors.black}
    />
  </View>
</Row>


          </View>

 <Medium
                  label="Customer Details"
                  fontSize={mvs(15)}
                  style={{fontWeight:"500"}}
                  color={colors.black}
                />
          {/* WAREHOUSE INFO */}
          <Row style={styles.warehouseBox}>
            <Row style={{justifyContent:"flex-start",width:"85%",}}>
              {/* <Image
                source={IMG.customer}
                resizeMode="contain"
                style={{
                  height: mvs(36),
                  width: mvs(40),
                  marginRight: mvs(10),
                }}
              /> */}
                <IMG.profileDelverySvg height={mvs(36)} width={mvs(40)} style={{marginRight:mvs(10)}}/>
              <View style={{width:"80%",}}>
                <Medium
                  label="Customer Name"
                  fontSize={mvs(14)}
                  style={{fontWeight:"500"}}
                  color={colors.black}
                />
                <Regular
                numberOfLines={6}
                  label="House #1,Street no 4 United Kingdom address"
                  fontSize={mvs(12)}
                  color={colors.subteXTcOLOR}
                  style={{fontWeight:"400"}}
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
             
            </Row>
          </Row>


          <View style={{marginVertical:mvs(10)}}>
          <Medium
                  label="Delievry Instruction"
                  fontSize={mvs(15)}
                  style={{fontWeight:"500"}}
                  color={colors.black}
                />

<View style={{marginVertical:mvs(8)}}> 
                 <Regular
                 numberOfLines={10}
                  label="Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, "
                  fontSize={mvs(12)}
                  color={colors.subteXTcOLOR}
                  style={{fontWeight:"400"}}
                />
                </View>
          </View>

          {/* ACTION BUTTONS */}
          <View style={{marginTop: mvs(25), }}>
            {/* <TouchableOpacity style={styles.acceptBtn}>
              <Image
                source={IMG.accepticon}
                resizeMode="contain"
                style={styles.arrowIconWhite}
              />
              <Medium
                label="Accept Delivery"
                color={colors.white}
                fontSize={mvs(16)}
              />
            </TouchableOpacity> */}

            

            
          </View>
         
        </ScrollView>
        <View style={{marginBottom:mvs(10)}}>
         <SwipeParcelDelieveredButton
         
              onAccept={() =>navigate('CustomerDeliveryNavigateScreen')} 
              />
              </View>
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
    justifyContent: 'flex-start',
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

export default DeliveryParcelDelieveredScreen;
