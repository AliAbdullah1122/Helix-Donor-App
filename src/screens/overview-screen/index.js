// DeliveryParcelOverviewScreen.js
import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Header1x2xOverview from 'components/atoms/headers/header-1x-2x-overview';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DeliveryParcelOverviewScreen = () => {
  const [selectedRating] = useState(4);

  const stats = {
    rating: 4.75,
    completed: 107,
    failed: 4,
    ratingCountText: 'Based on 100 deliveries',
  };

  // --- Separate data arrays ---
  const unreadActivities = [
    {
      id: '1',
      title: 'Reminder: Pending Delivery',
      desc: 'You have 1 undelivered parcel due by 3:00 PM today.',
      time: '1m',
      icon: 'filled',
    },
    {
      id: '2',
      title: 'Timer Started',
      desc: 'Waiting timer started at Customer Location for Order #PKL2481.',
      time: '10 m',
      icon: 'filled',
    },
    {
      id: '3',
      title: 'Location Alert',
      desc: 'GPS shows you are outside the expected route zone.',
      time: '15 m',
      icon: 'filled',
    },
  ];

  const allActivities = [
    {
      id: '4',
      title: 'Message from Dispatch',
      desc: 'Please prioritize the Fragile Parcel #PKL2499 on your next route.',
      time: '16 m',
      icon: 'unfilled',
    },
    {
      id: '5',
      title: 'Delivery Failed',
      desc: 'Order #PKL2403 marked as unsuccessful. Start return process.',
      time: '1 hr',
      icon: 'unfilled',
    },
    {
      id: '6',
      title: 'Return Parcel Required',
      desc: 'Start return process for Order #PKL2399.',
      time: '1 hr',
      icon: 'unfilled',
    },
  ];

  const renderActivity = ({item}) => {
     const IconComponent =
    item.icon === 'filled'
      ? IMG.AllactivityFilledSvg
      : IMG.AllactivityUnFilledSvg;

    // const iconSource =
    //   item.icon === 'filled' ? IMG.fillednotification : IMG.unfillednotification;

    return (
      <View style={styles.activityRow}>
        <View style={styles.iconWrap}>
          {/* <View style={styles.iconCircle}> */}
            {/* <Image
              source={iconSource}
              style={styles.notificationIcon}
              resizeMode="contain"
            /> */}
             <IconComponent
        width={mvs(35)}
        height={mvs(35)}
        style={{ marginRight: mvs(10) }}
      />
          {/* </View> */}
        </View>

        <View style={styles.activityContent}>
          <Medium
            label={item.title}
            color={colors.black}
            fontSize={mvs(14)}
            numberOfLines={1}
          />
          <Regular
            label={item.desc}
            color={colors.subteXTcOLOR}
            fontSize={mvs(13)}
            numberOfLines={10}
            style={{marginTop: mvs(4)}}
          />
        </View>

        <View style={styles.activityTime}>
          <Regular
            label={item.time}
            color={colors.subteXTcOLOR}
            fontSize={mvs(12)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Orange header */}
      <View style={styles.headerArea}>
        <Header1x2xOverview  back={false} title={'Driver Overview'}  />

        <View style={styles.statsRow}>
          <View style={{flex: 1}}>
            <View style={styles.ratingCard}>
              <Medium
                label="Overall Ratings"
                color={colors.subteXTcOLOR}
                fontSize={mvs(15)}
              />
              <View style={{alignSelf:"center",paddingVertical:mvs(12), justifyContent:"center",alignItems:"center"}}>
              <Bold label={`${stats.rating}`} color={colors.primary} fontSize={mvs(24)} />
              <View style={styles.starRow}>
                {/* {[1, 2, 3, 4, 5].map((s) => (
                  <Image
                    key={s}
                    source={
                      s <= Math.round(selectedRating)
                        ? IMG.starRatingFilled
                        : IMG.starRatingFilled
                    }
                    style={styles.starIcon}
                    resizeMode="contain"
                  />
                ))} */}

                {[1, 2, 3, 4, 5].map((s) => {
  const StarIcon =
    s <= Math.round(selectedRating)
      ? IMG.starfilledSvg     // filled
      : IMG.starfilledSvg;  // unfilled

  return (
    <StarIcon
      key={s}
      width={mvs(25)}
      height={mvs(25)}
      style={styles.starIcon}
    />
  );
})}

              </View>
              </View>
              <Medium
                label={stats.ratingCountText}
                color={colors.subteXTcOLOR}
                fontSize={mvs(12)}
                style={{alignSelf:"center"}}
              />
            </View>
          </View>

          <View style={{width: mvs(12)}} />

          <View style={{flex: 1,height:mvs(160), justifyContent: 'space-between'}}>
            <View style={styles.statCard}>
              <Medium
                label="Completed Orders"
                color={colors.subteXTcOLOR}
                fontSize={mvs(14)}
              />
              <Bold label={`${stats.completed}`} color={colors.primary} fontSize={mvs(22)} />
            </View>

            <View style={[styles.statCard, {marginTop: mvs(10)}]}>
              <Medium
                label="Failed Deliveries"
                color={colors.subteXTcOLOR}
                fontSize={mvs(14)}
              />
              <Bold label={`${stats.failed}`} color={colors.primary} fontSize={mvs(22)} />
            </View>
          </View>
        </View>
      </View>

      {/* White curved section */}
      <View style={styles.bottomContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: mvs(80)}}>
          {/* Unread Section */}
          <View style={styles.sectionHeader}>
            <Bold label="All Activity" color={colors.black} fontSize={mvs(16)} />
          </View>
          <FlatList
            data={unreadActivities}
            keyExtractor={(i) => i.id}
            renderItem={renderActivity}
            ItemSeparatorComponent={() => <View style={{height: mvs(6)}} />}
            scrollEnabled={false}
          />

          {/* All Activity Section */}
          <View style={[styles.sectionHeader, {marginTop: mvs(18)}]}>
            <Bold label="Unread" color={colors.black} fontSize={mvs(16)} />
          </View>
          <FlatList
            data={allActivities}
            keyExtractor={(i) => i.id}
            renderItem={renderActivity}
            ItemSeparatorComponent={() => <View style={{height: mvs(6)}} />}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  headerArea: {
    backgroundColor: colors.primary,
    paddingBottom: mvs(40), // increased height
    paddingTop: mvs(16),
    paddingHorizontal: mvs(14),
  },
  statsRow: {
    marginTop: mvs(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  ratingCard: {
    backgroundColor:colors.white,
    height:mvs(160),
    borderRadius: mvs(12),
    padding: mvs(12),
    width: '100%',
  },
  starRow: {flexDirection: 'row', marginVertical: mvs(6), alignItems: 'center'},
  starIcon: {width: mvs(18), height: mvs(18), marginRight: mvs(4)},
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(35),
    borderTopRightRadius: mvs(35),
    marginTop: -mvs(25), // adjusted so no overlap
    paddingHorizontal: mvs(16),
    paddingTop: mvs(18),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  sectionHeader: {
    marginBottom: mvs(8),
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: mvs(10),
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    shadowColor: '#000',
    shadowOpacity: 0.02,
    elevation: 1,
    marginBottom: mvs(3),
    marginHorizontal: mvs(2),
  },
  iconWrap: {
    width: mvs(48),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: mvs(6),
  },
  iconCircle: {
    width: mvs(36),
    height: mvs(36),
    borderRadius: mvs(18),
    backgroundColor: '#FFEDE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {width: mvs(35), height: mvs(35)},
  activityContent: {
    flex: 1,
    paddingRight: mvs(8),
    justifyContent: 'center',
  },
  activityTime: {
    width: mvs(50),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: mvs(10),
    padding: mvs(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 2,
  },
});

export default DeliveryParcelOverviewScreen;
