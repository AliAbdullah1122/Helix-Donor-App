import React, {useState, useMemo, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
  Modal,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ArchiveChatScreen = () => {
  const navigation = useNavigation();
  const [showMessageOptionsModal, setShowMessageOptionsModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});
  const [swipedMessageId, setSwipedMessageId] = useState(null);
  const swipeableRefs = useRef({});
  const swipeableDotRefs = useRef({});

  // Static data - set to empty array to show empty state, or with data to show list
  const archivedChats = useMemo(
    () => [
      {
        id: 1,
        name: 'Liam Thompson',
        preview: 'Hello',
        time: 'Yesterday',
        image: IMG.SearchImage3,
      },
      {
        id: 2,
        name: 'Michael Johnson',
        preview: 'Okay',
        time: '20/05/2024',
        image: IMG.SearchImage1,
      },
    ],
    [],
  );

  // Set to true to show empty state, false to show archived chats
  const isEmpty = archivedChats.length === 0;

  const renderArchivedChat = ({item}) => {
    const ImageComponent = item.image;
    return (
      <Swipeable
        ref={(ref) => {
          if (ref) {
            swipeableRefs.current[item.id] = ref;
          }
        }}
        renderRightActions={(progress, dragX) => renderSwipeableDot(progress, dragX, item)}
        overshootRight={false}
        onSwipeableWillOpen={() => {
          setSwipedMessageId(item.id);
          // Close other swipeables
          Object.keys(swipeableRefs.current).forEach((key) => {
            if (key !== item.id.toString() && swipeableRefs.current[key]) {
              swipeableRefs.current[key].close();
            }
          });
        }}
        onSwipeableWillClose={() => {
          if (swipedMessageId === item.id) {
            setSwipedMessageId(null);
          }
        }}>
        <View style={styles.archivedChatCard}>
          <Row style={styles.archivedChatRow}>
            <View style={styles.archivedChatAvatarContainer}>
              <View style={styles.archivedChatAvatarWrapper}>
                <ImageComponent width={mvs(52)} height={mvs(52)} />
              </View>
            </View>
            <View style={styles.archivedChatContent}>
              <Row style={styles.archivedChatHeaderRow}>
                <Medium label={item.name} fontSize={mvs(15)} color={colors.black} />
                <Regular
                  label={item.time}
                  fontSize={mvs(11)}
                  color="#8C8C8C"
                  style={styles.archivedChatTime}
                />
              </Row>
              <Regular
                label={item.preview}
                fontSize={mvs(13)}
                color="#8C8C8C"
                numberOfLines={1}
                style={styles.archivedChatPreview}
              />
            </View>
          </Row>
        </View>
      </Swipeable>
    );
  };

  const handleOpenMessageOptions = (message) => {
    setSelectedMessage(message);
    setShowMessageOptionsModal(true);
  };

  const handleCloseMessageOptions = () => {
    setShowMessageOptionsModal(false);
    setSelectedMessage(null);
  };

  const handleUnarchiveChat = () => {
    // Handle unarchive logic
    handleCloseMessageOptions();
  };

  const handleUnmatch = () => {
    // Handle unmatch logic
    handleCloseMessageOptions();
  };

  const handleBlock = () => {
    // Handle block logic
    handleCloseMessageOptions();
  };

  const handleDeleteChat = () => {
    // Handle delete logic
    handleCloseMessageOptions();
  };

  const renderSwipeableDot = (progress, dragX, item) => {
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.swipeableDotContainer}>
        <TouchableOpacity
          ref={(ref) => {
            if (ref) {
              swipeableDotRefs.current[item.id] = ref;
            }
          }}
          activeOpacity={0.7}
          onPress={() => {
            const dotRef = swipeableDotRefs.current[item.id];
            if (dotRef) {
              dotRef.measureInWindow((x, y, width, height) => {
                setModalPosition({
                  x: x - mvs(150), // Position modal to the left of dots
                  y: y + height + mvs(8), // Position modal below dots
                });
                handleOpenMessageOptions(item);
              });
            } else {
              handleOpenMessageOptions(item);
            }
          }}>
          <Animated.View
            style={[
              styles.swipeableDotBackground,
              {
                opacity,
              },
            ]}>
            <IMG.SwipenewDot width={mvs(24)} height={mvs(24)} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={mvs(24)} color="#8C8C8C" />
        </TouchableOpacity>
        <Bold
          label="Archived Chats"
          fontSize={mvs(18)}
          color={colors.textColor}
          style={styles.headerTitle}
        />
        <View style={{width: mvs(24)}} />
      </View>

      {isEmpty ? (
        // Empty State (Image 1)
        <View style={styles.emptyStateContainer}>
          <Bold
            label="Your Archive is Empty"
            fontSize={mvs(18)}
            color={colors.textColor}
            style={styles.emptyStateTitle}
          />
          <Regular
            label="To archive a chat, swipe left on a conversation in your main inbox."
            fontSize={mvs(14)}
            color="#8C8C8C"
            style={styles.emptyStateText}
            numberOfLines={10}
          />
        </View>
      ) : (
        // Archived Chats List (Image 2)
        <FlatList
          data={archivedChats}
          keyExtractor={item => item.id.toString()}
          renderItem={renderArchivedChat}
          contentContainerStyle={styles.archivedChatsList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Message Options Modal */}
      <Modal
        visible={showMessageOptionsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseMessageOptions}>
        <TouchableOpacity
          style={styles.messageOptionsModalOverlay}
          activeOpacity={1}
          onPress={handleCloseMessageOptions}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={[
              styles.messageOptionsModalContainer,
              {
                position: 'absolute',
                top: modalPosition.y,
                right: mvs(20),
              },
            ]}>
            {/* Unarchive chat */}
            <TouchableOpacity
              style={styles.messageOptionRow}
              onPress={handleUnarchiveChat}>
              <Row style={styles.messageOptionContent}>
                <Regular
                  label="Unarchive chat"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                />
              </Row>
              {/* <Icon name="arrow-up-circle-outline" size={mvs(20)} color={colors.textColor} /> */}
              <IMG.SwipeArchive height={mvs(20)} width={mvs(20)}/>
            </TouchableOpacity>

            {/* Unmatch */}
            <TouchableOpacity
              style={styles.messageOptionRow}
              onPress={handleUnmatch}>
              <Row style={styles.messageOptionContent}>
                <Regular
                  label="Unmatch"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                />
              </Row>
              <Icon name="close" size={mvs(20)} color={colors.textColor} />
            </TouchableOpacity>

            {/* Block */}
            <TouchableOpacity
              style={styles.messageOptionRow}
              onPress={handleBlock}>
              <Row style={styles.messageOptionContent}>
                <Regular
                  label="Block"
                  fontSize={mvs(14)}
                  color="#FF3B30"
                />
              </Row>
              <IMG.SwipeAbleBlock width={mvs(20)} height={mvs(20)} />
            </TouchableOpacity>

            {/* Delete Chat */}
            <TouchableOpacity
              style={[styles.messageOptionRow, styles.messageOptionRowLast]}
              onPress={handleDeleteChat}>
              <Row style={styles.messageOptionContent}>
                <Regular
                  label="Delete Chat"
                  fontSize={mvs(14)}
                  color="#FF3B30"
                />
              </Row>
              <IMG.swipeableDeleet width={mvs(20)} height={mvs(20)} />
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ArchiveChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),
    paddingBottom: mvs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor:colors.white
  },
  backButton: {
    padding: mvs(4),
  },
  headerTitle: {
    textAlign: 'center',
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mvs(40),
  },
  emptyStateTitle: {
    marginBottom: mvs(12),
    textAlign: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    lineHeight: mvs(20),
  },
  archivedChatsList: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(12),
    paddingBottom: mvs(20),
  },
  archivedChatCard: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(12),
    marginBottom: mvs(8),
  },
  archivedChatRow: {
    alignItems: 'center',
  },
  archivedChatAvatarContainer: {
    width: mvs(52),
    height: mvs(52),
    marginRight: mvs(12),
    borderRadius: mvs(26),
    overflow: 'hidden',
  },
  archivedChatAvatarWrapper: {
    width: mvs(52),
    height: mvs(52),
    borderRadius: mvs(26),
    overflow: 'hidden',
  },
  archivedChatContent: {
    flex: 1,
  },
  archivedChatHeaderRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mvs(4),
  },
  archivedChatTime: {
    marginLeft: mvs(8),
  },
  archivedChatPreview: {
    marginTop: mvs(2),
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: mvs(30),
    padding: mvs(24),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: mvs(20),
    justifyContent:"center",
    alignSelf:'center'
  },
  modalTitle: {
    marginLeft: mvs(12),
    // flex: 1,
  },
  modalContent: {
    width: '100%',
  },
  guidelineHeading: {
    marginBottom: mvs(16),
  },
  guidelineText: {
    lineHeight: mvs(20),
    marginBottom: mvs(24),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: mvs(24),
    gap: mvs(8),
  },
  paginationDot: {
    width: mvs(8),
    height: mvs(8),
    borderRadius: mvs(4),
    backgroundColor: '#E0E0E0',
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
  },
  nextButton: {
    borderRadius: mvs(40),
    backgroundColor: colors.primary,
    width:"50%",
    alignSelf:'center',
  },
  // Empty connections styles
  emptyConnectionsContainer: {
    flex: 1,
    // backgroundColor: '#F5F5F9',
    paddingTop: mvs(20),
  },
  emptyConnectionsCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(12),
    gap: mvs(10),
  },
  emptyConnectionCard: {
    width: mvs(100),
    height: mvs(128),
    borderRadius: mvs(24),
    padding: mvs(10),
    backgroundColor: '#F2F2F7',
    borderWidth:1,
    borderColor:"#D9D9D9",
    marginRight: mvs(10),
  },
  emptyConnectionCardInner: {
    width: '100%',
    height: '100%',
    borderRadius: mvs(20),
    // backgroundColor: colors.white,
    backgroundColor:"#F2F2F7",
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mvs(20),
  },
  emptyStateTitle: {
    marginTop: mvs(24),
    marginBottom: mvs(12),
  },
  emptyStateText: {
    textAlign: 'center',
    marginBottom: mvs(32),
    paddingHorizontal: mvs(40),
  },
  startSwipingButton: {
    borderRadius: mvs(40),
    backgroundColor: colors.primary,
    width: '60%',
  },
  // Safety Toolkit Modal styles
  safetyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyModalContainer: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    padding: mvs(24),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  safetyModalTitle: {
    textAlign: 'center',
    marginBottom: mvs(24),
  },
  safetyOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mvs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  safetyOptionContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  safetyOptionText: {
    flex: 1,
    marginLeft: mvs(12),
  },
  safetyOptionSubtitle: {
    marginTop: mvs(4),
  },
  safetyDismissButton: {
    marginTop: mvs(20),
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Swipeable styles
  swipeableDotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: mvs(60),
    height: '100%',
  },
  swipeableDotBackground: {
    width: mvs(50),
    height: mvs(50),
    borderRadius: mvs(12),
    backgroundColor: '#3A3E901A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageOptionsButton: {
    padding: mvs(8),
    justifyContent: 'center',
    // backgroundColor:'red',
    alignItems: 'center',
  },
  // Message Options Modal styles
  messageOptionsModalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(254, 252, 252, 0.88)',
  },
  messageOptionsModalContainer: {
    width: mvs(230),
    backgroundColor: colors.white,
    borderRadius: mvs(16),
    paddingVertical: mvs(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  messageOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mvs(16),
    paddingHorizontal: mvs(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  messageOptionRowLast: {
    borderBottomWidth: 0,
  },
  messageOptionContent: {
    flex: 1,
  },
});
