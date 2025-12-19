import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import * as IMG from 'assets/images';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Header1x2xChatInbox from 'components/atoms/headers/header-1x-2x-chat-inbox';
import { navigate } from 'navigation/navigation-ref';

const ChatWithAdminScreen = () => {
  return (
    <View style={styles.container}>
     <Header1x2xChatInbox title={'Chat with Admin'} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          padding: mvs(10),
        }}>
        <Image
          source={IMG.chatadmin}
          resizeMode="contain"
          style={styles.image}
        />

       
      </ScrollView>

       <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Image
              source={IMG.clock} // optional icon for time
              style={styles.icon}
              resizeMode="contain"
            />
            <Medium
              label={'Availability: 11:30 am - 12.15 pm'}
              color={"#838383"}
              fontSize={mvs(14)}
            />
          </View>

          <View style={[styles.row, {marginTop: mvs(5)}]}>
            <Image
              source={IMG.clock}
              style={styles.icon}
              resizeMode="contain"
            />
            <Medium
              label={'1-2hr Response Time'}
              color={"#838383"}
              fontSize={mvs(14)}
            />
          </View>
        </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={()=>navigate("ChatAdminInboxScreen")} style={styles.chatButton}>
          <Medium label="Chat with Admin" color={colors.white} fontSize={mvs(16)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatWithAdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: mvs(400),
    // marginTop: mvs(20),
  },
  infoContainer: {
    // marginTop: mvs(25),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: mvs(14),
    height: mvs(14),
    marginRight: mvs(5),
    tintColor: colors.gray,
  },
  bottomButton: {
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(15),
    backgroundColor: colors.white,

    borderColor: '#F2F2F2',
  },
  chatButton: {
    backgroundColor: colors.primary,
    paddingVertical: mvs(14),
    borderRadius: mvs(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
