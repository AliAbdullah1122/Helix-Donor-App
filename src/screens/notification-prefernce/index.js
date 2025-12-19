import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

const NotificationPreferenceScreen = () => {
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <Header1x2x title={'Notification Preference'} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(20),
        }}>
        {/* In-App Notification Section */}
        <Medium
          label={'In-App Notification'}
          color={colors.black}
          fontSize={mvs(16)}
          style={{marginBottom: mvs(10)}}
        />

        <View style={styles.card}>
          <View style={{flex: 1}}>
            <Medium
              label={'Order Notifications'}
              fontSize={mvs(15)}
              color={colors.black}
            />
            <Regular
              label={'Receive push notifications for order, status etc'}
              color={colors.subteXTcOLOR}
              fontSize={mvs(13)}
              style={{marginTop: mvs(4)}}
            />
          </View>

          <Switch
            trackColor={{false: '#E6E6E6', true: colors.primary}}
            thumbColor={colors.white}
            onValueChange={() => setOrderNotifications(!orderNotifications)}
            value={orderNotifications}
          />
        </View>

        {/* Chat & Updates Notification Section */}
        <Medium
          label={'Chat & Updates Notification'}
          color={colors.black}
          fontSize={mvs(16)}
          style={{marginTop: mvs(25), marginBottom: mvs(10)}}
        />

        <View style={styles.card}>
          <View style={{flex: 1}}>
            <Medium label={'Chat'} fontSize={mvs(15)} color={colors.black} />
            <Regular
              label={'Get notified from admin chat, updates'}
              color={colors.subteXTcOLOR}
              fontSize={mvs(13)}
              style={{marginTop: mvs(4)}}
            />
          </View>

          <Switch
            trackColor={{false: '#E6E6E6', true: colors.primary}}
            thumbColor={colors.white}
            onValueChange={() => setChatNotifications(!chatNotifications)}
            value={chatNotifications}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: mvs(12),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingVertical: mvs(15),
    paddingHorizontal: mvs(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: mvs(10),
  },
});

export default NotificationPreferenceScreen;
