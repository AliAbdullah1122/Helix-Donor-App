import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images'; // you'll add your icons here
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Row } from 'components/atoms/row';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Reminder: Pending Delivery',
      text: 'You have 1 undelivered parcel due by 3:00 PM today.',
      time: '1m',
      is_read: false,
    },
    {
      id: 2,
      title: 'Timer Started',
      text: 'Waiting timer started at Customer Location for Order #PKL2481.',
      time: '10m',
      is_read: false,
    },
    {
      id: 3,
      title: 'Location Alert',
      text: 'GPS shows you are outside the expected route zone. Check route for Order #PKL2487.',
      time: '15m',
      is_read: false,
    },
    {
      id: 4,
      title: 'Message from Dispatch',
      text: 'Please prioritize the Fragile Parcel #PKL2499 on your next route.',
      time: '16m',
      is_read: false,
    },
    {
      id: 5,
      title: 'Delivery Failed',
      text: 'Order #PKL2403 marked as unsuccessful. Start return process.',
      time: '1h',
      is_read: true,
    },
    {
      id: 6,
      title: 'Return Parcel Required',
      text: 'Please return Order #PKL2403 to hub by 5:00 PM. Order #PKL2403 marked as unsuccessful.',
      time: '1h',
      is_read: true,
    },
  ]);

  const markAllRead = () => {
    const updated = notifications.map(n => ({...n, is_read: true}));
    setNotifications(updated);
  };

  const today = notifications.filter(x => !x.is_read);
  const read = notifications.filter(x => x.is_read);

  const renderItem = ({item}) => (
    <View
      style={[
        styles.card,
        {backgroundColor: item.is_read ? colors.white : colors.white},
      ]}>
      <View style={styles.iconWrapper}>
        <Image
        resizeMode='contain'
          source={
            item.is_read
              ? IMG.unfillednotification // your filled bell
              : IMG.fillednotification // your outline bell
          }
          style={styles.icon}
        />
      </View>

      <View style={{flex: 1}}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Medium label={item?.title} color={'#111827'} fontSize={mvs(14)}/>
        <Medium numberOfLines={10} label={item?.text} color={colors.subteXTcOLOR} fontSize={mvs(13)}/>
        {/* <Text style={styles.text}>{item.text}</Text> */}
      </View>

      {/* <Text style={styles.time}>{item.time}</Text> */}
              <Medium style={[styles.time]}  label={item?.time} color={colors.subteXTcOLOR} fontSize={mvs(10)}/>
    </View>
  );

  return (
    <View style={{flex:1,backgroundColor:colors.white}}>
        <Header1x2x title='Notifications'/>
    <View style={styles.container}>

    
      {/* Header */}
      <View style={styles.header}>

      
      </View>

      {/* Today Section */}
      {today.length > 0 && (
        <>
        <Row style={{paddingVertical:mvs(5)}}>
          <Bold  label='Today' fontSize={mvs(15)} color={colors.black}/>
          
          {/* <Text style={styles.sectionTitle}>Today</Text> */}
            <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
          <Image
            source={
              read.length === notifications.length
                ? IMG.markread
                : IMG.markread
            }
            style={[styles.icon1, {marginRight: 4}]}
          />
          {/* <Text style={styles.markAllText}>Mark all as read</Text>
           */}
           <Medium label='Mark all as read' color={colors.primary} fontSize={mvs(12)}/>

          
        </TouchableOpacity>
        </Row>
          <FlatList
            data={today}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: mvs(5)}} />}
          />
        </>
      )}

      {/* Read Section */}
      {read.length > 0 && (
        <>
          {/* <Text style={[styles.sectionTitle, {marginTop: mvs(15)}]}>Read</Text>
           */}
           <Medium label={'Read'} color={colors.black} fontSize={mvs(14)}/>
          <FlatList
            data={read}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: mvs(5)}} />}
          />
        </>
      )}
    </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: mvs(15),
    paddingTop: mvs(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mvs(10),
  },
  headerTitle: {
    fontSize: mvs(18),
    fontWeight: '600',
    color: colors.black,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllText: {
    fontSize: mvs(13),
    color: colors.primary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: mvs(15),
    fontWeight: '600',
    color: colors.black,
    marginVertical: mvs(5),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: mvs(10),
    padding: mvs(12),
    backgroundColor: colors.white,
  },
  iconWrapper: {
    marginRight: mvs(10),
    marginTop: mvs(3),
  },
  icon: {
    width: mvs(35),
    height: mvs(35),
    // tintColor: colors.primary,
  },
  icon1: {
    width: mvs(18),
    height: mvs(18),
    // tintColor: colors.primary,
  },
  title: {
    fontWeight: '600',
    color: colors.black,
    fontSize: mvs(14),
  },
  text: {
    color: colors.subteXTcOLOR || '#555',
    fontSize: mvs(13),
    marginTop: 2,
  },
  time: {
    fontSize: mvs(12),
    color: colors.placeholder,
    position: 'absolute',
    right: mvs(10),
    bottom: mvs(8),
  },
});
