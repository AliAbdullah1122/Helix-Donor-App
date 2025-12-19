import React, {useState, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatMainScreen = () => {
  const [searchText, setSearchText] = useState('');

  const connections = useMemo(
    () => [
      {id: 1, name: 'Nathan', image: IMG.SearchImage1},
      {id: 2, name: 'Ethan', image: IMG.SearchImage2, isHighlighted: true},
      {id: 3, name: 'Liam', image: IMG.SearchImage3, isOnline: true},
      {id: 4, name: 'Jack', image: IMG.SearchImage1},
    ],
    [],
  );

  const messages = useMemo(
    () => [
      {
        id: 1,
        name: 'Nathan',
        preview: 'Thanks, Talk to you tomorrow then.',
        time: '01:13 PM',
        image: IMG.SearchImage1,
        isOnline: true,
        isUnread: false,
      },
      {
        id: 2,
        name: 'Liam Carter',
        preview: 'Hey!',
        time: '11:23 AM',
        image: IMG.SearchImage2,
        unreadCount: 1,
      },
      {
        id: 3,
        name: 'Ethan Campbell',
        preview: 'I had a few doubts, if we can conne...',
        time: 'Yesterday',
        image: IMG.SearchImage3,
      },
      {
        id: 4,
        name: 'Jack Mitchell',
        preview: 'Thanks for sharing your story, it\'s really...',
        time: '20/05/2024',
        image: IMG.SearchImage1,
      },
    ],
    [],
  );

  const renderConnection = ({item}) => {
    const ImageComponent = item.image;
    return (
      <View style={[styles.connectionItem, item.isHighlighted && styles.connectionHighlighted]}>
        <View style={styles.connectionImageWrapper}>
          <ImageComponent width={mvs(100)} height={mvs(128)} />
        </View>
        {item.isHighlighted && (
          <View style={styles.connectionHeart}>
            <IMG.HomeCardIcon width={mvs(31)} height={mvs(28)} />
          </View>
        )}
        {item.isOnline && <View style={styles.connectionOnlineDot} />}
      </View>
    );
  };

  const renderMessage = ({item}) => {
    const ImageComponent = item.image;
    return (
      <View style={styles.messageCard}>
        <Row style={styles.messageRow}>
          <View style={styles.messageAvatarContainer}>
            <View style={styles.messageAvatarWrapper}>
              <ImageComponent width={mvs(52)} height={mvs(52)} />
            </View>
            {item.isOnline && <View style={styles.messageOnlineDot} />}
          </View>
          <View style={styles.messageContent}>
            <Row style={styles.messageHeaderRow}>
              <Medium label={item.name} fontSize={mvs(15)} color={colors.black} />
              <Regular
                label={item.time}
                fontSize={mvs(11)}
                color="#8C8C8C"
                style={styles.messageTime}
              />
            </Row>
            <Row style={styles.messagePreviewRow}>
              <Icon
                name="checkmark-done-outline"
                size={mvs(14)}
                color="#8C8C8C"
                style={{marginRight: mvs(2)}}
              />
              <Regular
                label={item.preview}
                fontSize={mvs(13)}
                color="#8C8C8C"
                numberOfLines={1}
                style={{flex: 1}}
              />
              {item.unreadCount ? (
                <View style={styles.unreadBadge}>
                  <Regular
                    label={item.unreadCount.toString()}
                    fontSize={mvs(11)}
                    color={colors.white}
                  />
                </View>
              ) : null}
            </Row>
          </View>
        </Row>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Row style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={mvs(20)} color="#8C8C8C" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#8C8C8C"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.shieldButton}>
            <IMG.chatShield width={mvs(32)} height={mvs(32)} />
          </TouchableOpacity>
        </Row>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Connections */}
        <View style={styles.sectionHeader}>
          <Bold label="Your Connections" fontSize={mvs(18)} color={colors.black} />
        </View>
        <FlatList
          data={connections}
          keyExtractor={item => item.id.toString()}
          renderItem={renderConnection}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.connectionsList}
        />

        {/* Messages / Archived header */}
        <Row style={styles.messagesHeaderRow}>
          <Bold label="Messages" fontSize={mvs(18)} color={colors.black} />
          <Row style={styles.archivedRow}>
            <IMG.chatArchive width={mvs(18)} height={mvs(18)} />
            <Medium
              label="Archived"
              fontSize={mvs(14)}
              color={colors.primary}
              style={{marginLeft: mvs(4)}}
            />
          </Row>
        </Row>

        {/* Messages list */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMessage}
          scrollEnabled={false}
          contentContainerStyle={styles.messagesList}
        />
      </ScrollView>
    </View>
  );
};

export default ChatMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F9',
  },
  searchContainer: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(18),
    paddingBottom: mvs(12),
    backgroundColor: colors.white,
  },
  searchRow: {
    alignItems: 'center',
    gap: mvs(10),
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: mvs(26),
    paddingHorizontal: mvs(16),
    // paddingVertical: mvs(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: mvs(10),
    fontSize: mvs(14),
    color: colors.black,
  },
  shieldButton: {
    padding: mvs(4),
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(8),
    paddingBottom: mvs(8),
  },
  connectionsList: {
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(12),
  },
  connectionItem: {
    width: mvs(100),
    height: mvs(128),
    marginRight: mvs(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionImageWrapper: {
    width: mvs(100),
    height: mvs(128),
    borderRadius: mvs(30),
    overflow: 'hidden',
  },
  connectionHighlighted: {
    // borderWidth: 2,
    // borderColor: colors.primary,
  },
  connectionHeart: {
    position: 'absolute',
    bottom: -mvs(10),
    alignSelf: 'center',
  },
  connectionOnlineDot: {
    position: 'absolute',
    bottom: mvs(6),
    right: mvs(8),
    width: mvs(10),
    height: mvs(10),
    borderRadius: mvs(5),
    backgroundColor: '#27AE60',
    borderWidth: 2,
    borderColor: colors.white,
  },
  messagesHeaderRow: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(8),
    paddingBottom: mvs(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  archivedRow: {
    alignItems: 'center',
  },
  messagesList: {
    paddingHorizontal: mvs(12),
    paddingBottom: mvs(20),
  },
  messageCard: {
    backgroundColor: colors.white,
    borderRadius: mvs(18),
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(10),
    marginBottom: mvs(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  messageRow: {
    alignItems: 'center',
  },
  messageAvatarContainer: {
    width: mvs(52),
    height: mvs(52),
    marginRight: mvs(12),
    borderRadius:mvs(100),
    backgroundColor:'white',
    position: 'relative',
  },
  messageAvatarWrapper: {
    width: mvs(52),
    height: mvs(52),
    borderRadius: mvs(100),
    overflow: 'hidden',
  },
  messageOnlineDot: {
    position: 'absolute',
    bottom: mvs(2),
    right: mvs(2),
    width: mvs(10),
    height: mvs(10),
    borderRadius: mvs(5),
    backgroundColor: '#27AE60',
    borderWidth: 2,
    borderColor: colors.white,
  },
  messageContent: {
    flex: 1,
  },
  messageHeaderRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageTime: {
    marginLeft: mvs(8),
  },
  messagePreviewRow: {
    marginTop: mvs(4),
    alignItems: 'center',
  },
  unreadBadge: {
    marginLeft: 'auto',
    backgroundColor: colors.primary,
    width: mvs(18),
    height: mvs(18),
    borderRadius: mvs(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
