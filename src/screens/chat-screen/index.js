import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Header1x2xChat from 'components/atoms/headers/header-1x-2x-chat';
import { navigate } from 'navigation/navigation-ref';

const ChatListScreen = () => {
  const [search, setSearch] = useState('');

  const chatList = [
    {
      id: 1,
      name: 'Warehouse Name',
      status: 'Online',
      online: true,
      time: 'Today',
      unread: 2,
    },
    {
      id: 2,
      name: 'Warehouse Name',
      status: 'Online',
      online: false,
      time: '',
      unread: 0,
    },
    {
      id: 3,
      name: 'Warehouse Name',
      status: 'Online',
      online: false,
      time: '',
      unread: 0,
    },
    {
      id: 4,
      name: 'Warehouse Name',
      status: 'Online',
      online: true,
      time: '',
      unread: 0,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
    onPress={()=>navigate("ChatInboxScreen")}
     style={styles.itemContainer}>
      <Row style={{alignItems: 'center'}}>
        <View style={{position: 'relative'}}>
          <View
            // style={{
            //   alignItems: 'center',
            //   justifyContent: 'center',
            //   height: mvs(48),
            //   width: mvs(48),
            //   backgroundColor: colors.primary,
            //   borderRadius: mvs(100),
            // }}
            >
            {/* <Image
              resizeMode="contain"
              source={IMG.chatvector} // replace with your warehouse/store icon
              style={styles.avatar}
            /> */}
             {item.online ? (
    <IMG.chatOnlineSvg width={mvs(48)} height={mvs(48)} />
  ) : (
    <IMG.chatOflineSvg width={mvs(48)} height={mvs(48)} />
  )}

          </View>
          {/* <View
            style={[
              styles.statusDot,
              {backgroundColor: item.online ? '#4CD964' : '#C7C7CC'},
            ]}
          /> */}
        </View>
        <View style={{flex: 1, marginLeft: mvs(10)}}>
          <Medium label={item.name} fontSize={mvs(15)} />
          <Regular
            label={item.status}
            fontSize={mvs(13)}
            color={colors.subteXTcOLOR || '#8E8E93'}
          />
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {item.time ? (
            <Regular
              label={item.time}
              fontSize={mvs(13)}
              color={colors.subteXTcOLOR || '#8E8E93'}
            />
          ) : null}
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </Row>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <Header1x2xChat back={false} title={'Chat List'} />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={IMG.searchchat} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* Chat List */}
        <FlatList
          data={chatList.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: mvs(20)}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: mvs(15),
    paddingTop: mvs(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: mvs(25),
    paddingHorizontal: mvs(12),
    marginBottom: mvs(10),
  },
  searchIcon: {
    height: mvs(18),
    width: mvs(18),
    tintColor: '#999',
    marginRight: mvs(6),
  },
  searchInput: {
    flex: 1,
    fontSize: mvs(14),
    color: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: mvs(12),
    borderBottomWidth: 0.7,
    borderColor: '#E5E5E5',
  },
  avatar: {
    height: mvs(26),
    width: mvs(26),
    // borderRadius: mvs(22),
  },
  statusDot: {
    height: mvs(10),
    width: mvs(10),
    borderRadius: mvs(5),
    position: 'absolute',
    right: 0,
    bottom: 0,
    top:mvs(2),
    borderWidth: 1,
    borderColor: '#fff',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: mvs(10),
    minWidth: mvs(20),
    height: mvs(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(5),
  },
  unreadText: {
    color: '#fff',
    fontSize: mvs(12),
    fontWeight: '600',
  },
});
