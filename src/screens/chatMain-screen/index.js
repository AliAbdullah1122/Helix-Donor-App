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
import {PrimaryButton} from 'components/atoms/buttons';
import { navigate } from 'navigation/navigation-ref';

const ChatMainScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [showEmptyConnections, setShowEmptyConnections] = useState(false);
  const [hasSeenGuidelines, setHasSeenGuidelines] = useState(false);
  const [currentGuidelineStep, setCurrentGuidelineStep] = useState(1);
  const [showSafetyToolkitModal, setShowSafetyToolkitModal] = useState(false);
  const [showMessageOptionsModal, setShowMessageOptionsModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});
  const [swipedMessageId, setSwipedMessageId] = useState(null);
  const [showBlockConfirmModal, setShowBlockConfirmModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportReceivedModal, setShowReportReceivedModal] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState(null);
  const [reportConcern, setReportConcern] = useState('');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showUnmatchConfirmModal, setShowUnmatchConfirmModal] = useState(false);
  const swipeableRefs = useRef({});
  const swipeableDotRefs = useRef({});

  useEffect(() => {
    // Check if user has seen guidelines before (you can use AsyncStorage for persistence)
    // For now, show modal on first visit
    setShowGuidelinesModal(false);
    setCurrentGuidelineStep(1);
  }, []);

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
            <IMG.chatMainHeart width={mvs(31)} height={mvs(28)} />
          </View>
        )}
        {item.isOnline && <View style={styles.connectionOnlineDot} />}
      </View>
    );
  };

  const renderMessage = ({item}) => {
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
        <TouchableOpacity onPress={()=>navigate("MainInboxScreen")} style={styles.messageCard}>
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
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const handleNextGuidelines = () => {
    if (currentGuidelineStep < 3) {
      setCurrentGuidelineStep(currentGuidelineStep + 1);
    } else {
      // Step 3 - Proceed button
      setShowGuidelinesModal(false);
      setShowEmptyConnections(false);
      setHasSeenGuidelines(true);
      setCurrentGuidelineStep(1); // Reset for next time
    }
  };

  const handleStartSwiping = () => {
    setShowEmptyConnections(false);
  };

  const handleOpenSafetyToolkit = () => {
    setShowSafetyToolkitModal(true);
  };

  const handleCloseSafetyToolkit = () => {
    setShowSafetyToolkitModal(false);
  };

  const handleOpenMessageOptions = (message) => {
    setSelectedMessage(message);
    setShowMessageOptionsModal(true);
  };

  const handleCloseMessageOptions = () => {
    setShowMessageOptionsModal(false);
    setSelectedMessage(null);
  };

  const handleArchiveChat = () => {
    // Handle archive logic
    handleCloseMessageOptions();
  };

  const handleUnmatch = () => {
    handleCloseMessageOptions();
    setShowUnmatchConfirmModal(true);
  };

  const handleCancelUnmatch = () => {
    setShowUnmatchConfirmModal(false);
  };

  const handleConfirmUnmatch = () => {
    // Handle unmatch logic
    setShowUnmatchConfirmModal(false);
    // You can add logic here to actually unmatch the user
  };

  const handleBlock = () => {
    handleCloseMessageOptions();
    setShowBlockConfirmModal(true);
  };

  const handleCancelBlock = () => {
    setShowBlockConfirmModal(false);
  };

  const handleConfirmBlock = () => {
    setShowBlockConfirmModal(false);
    setShowBlockedModal(true);
  };

  const handleBlockDone = () => {
    setShowBlockedModal(false);
  };

  const handleBlockReport = () => {
    setShowBlockedModal(false);
    setShowReportModal(true);
  };

  const handleCancelReport = () => {
    setShowReportModal(false);
    setSelectedReportReason(null);
    setReportConcern('');
  };

  const handleSubmitReport = () => {
    setShowReportModal(false);
    setShowReportReceivedModal(true);
    setSelectedReportReason(null);
    setReportConcern('');
  };

  const handleCloseReportReceived = () => {
    setShowReportReceivedModal(false);
  };

  const handleDeleteChat = () => {
    handleCloseMessageOptions();
    setShowDeleteConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    // Handle delete logic - remove the chat from messages
    setShowDeleteConfirmModal(false);
    // You can add logic here to actually delete the chat from your data
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

  // Show empty connections view
  if (showEmptyConnections) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#F5F5F9" barStyle="dark-content" />
        <View style={styles.emptyConnectionsContainer}>
          <View style={styles.sectionHeader}>
            <Medium label="Your Connections" fontSize={mvs(16)} color={colors.textColor} />
          </View>
          
          {/* Empty connection cards */}
          <View style={styles.emptyConnectionsCardsContainer}>
            {[1, 2, 3, 4].map((item, index) => (
              <View key={index} style={styles.emptyConnectionCard}>
                <View style={styles.emptyConnectionCardInner}>
                  {index === 0 && (
                    <IMG.ChatWhiteheart width={mvs(40)} height={mvs(40)} />
                  )}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.emptyStateContainer}>
            <IMG.chatMainHeart width={mvs(120)} height={mvs(120)} />
            <Medium
              label="Start Swiping"
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.emptyStateTitle}
            />
            <Regular
              label="When you'll match with other users they'll appear here."
              fontSize={mvs(14)}
              numberOfLines={10}
              color="#8C8C8C"
              style={styles.emptyStateText}
            />
            <PrimaryButton
              containerStyle={styles.startSwipingButton}
              loading={false}
              onPress={handleStartSwiping}
              title="Start Swiping"
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Guidelines Modal */}
      <Modal
        visible={showGuidelinesModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Row style={styles.modalHeader}>
              <IMG.ChatGuideline width={mvs(24)} height={mvs(24)} />
              <Medium
                label="Guidelines for Connection"
                fontSize={mvs(14)}
                color={colors.textColor}
                style={styles.modalTitle}
              />
            </Row>

            <View style={styles.modalContent}>
              {currentGuidelineStep === 1 && (
                <>
                  <Medium
                    label="Be Respectful & Kind"
                    fontSize={mvs(14)}
                    color={colors.textColor}
                    style={styles.guidelineHeading}
                  />
                  <Regular
                    label="This is a community built on trust. We do not support discrimination, harassment, or hate speech of any kind. Treat others as you would want to be treated on this important journey."
                    fontSize={mvs(14)}
                    numberOfLines={10}
                    color="#8C8C8C"
                    style={styles.guidelineText}
                  />
                </>
              )}

              {currentGuidelineStep === 2 && (
                <>
                  <Medium
                    label="Be Authentic & Honest"
                    fontSize={mvs(14)}
                    color={colors.textColor}
                    style={styles.guidelineHeading}
                  />
                  <Regular
                    label="Meaningful connections start with transparency. Represent yourself, your history, and your intentions accurately. Authenticity is the foundation of trust."
                    fontSize={mvs(14)}
                    numberOfLines={12}
                    color="#8C8C8C"
                    style={styles.guidelineText}
                  />
                </>
              )}

              {currentGuidelineStep === 3 && (
                <>
                  <Medium
                    label="Communicate with Purpose"
                    fontSize={mvs(14)}
                    color={colors.black}
                    style={styles.guidelineHeading}
                  />
                  <Regular
                    label="Everyone here shares a profound goal. Be clear and considerate in your conversations. Respect each other's boundaries and communicate with the seriousness this journey deserves."
                    fontSize={mvs(12)}
                    numberOfLines={10}
                    color="#8C8C8C"
                    style={styles.guidelineText}
                  />
                </>
              )}

              {/* Pagination dots */}
              <View style={styles.paginationContainer}>
                <View
                  style={[
                    styles.paginationDot,
                    currentGuidelineStep >= 1 && styles.paginationDotActive,
                  ]}
                />
                <View
                  style={[
                    styles.paginationDot,
                    currentGuidelineStep >= 2 && styles.paginationDotActive,
                  ]}
                />
                <View
                  style={[
                    styles.paginationDot,
                    currentGuidelineStep >= 3 && styles.paginationDotActive,
                  ]}
                />
              </View>

              <PrimaryButton
                containerStyle={styles.nextButton}
                loading={false}
                onPress={handleNextGuidelines}
                title={currentGuidelineStep === 3 ? 'Proceed' : 'Next'}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Only show main content when modal is not visible */}
      {!showGuidelinesModal && (
        <>
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
              <TouchableOpacity style={styles.shieldButton} onPress={handleOpenSafetyToolkit}>
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
              <TouchableOpacity onPress={()=>navigate("ArchiveChatScreen")}>
              <Row style={styles.archivedRow}>

                <IMG.chatArchive width={mvs(18)} height={mvs(18)} />
                <Medium
                  label="Archived"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginLeft: mvs(4)}}
                />
              </Row>
              </TouchableOpacity>
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
        </>
      )}

      {/* Safety Toolkit Modal */}
      <Modal
        visible={showSafetyToolkitModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSafetyToolkit}>
        <TouchableOpacity
          style={styles.safetyModalOverlay}
          activeOpacity={1}
          onPress={handleCloseSafetyToolkit}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.safetyModalContainer}>
            <Bold
              label="Safety Toolkit"
              fontSize={mvs(18)}
              color={colors.textColor}
              style={styles.safetyModalTitle}
            />

            {/* Report an Issue */}
            <TouchableOpacity style={styles.safetyOptionRow}>
              <Row style={styles.safetyOptionContent}>
                <Icon name="flag" size={mvs(20)} color="#FF3B30" />
                <View style={styles.safetyOptionText}>
                  <Medium
                    label="Report an Issue"
                    fontSize={mvs(14)}
                    color={colors.textColor}
                  />
                  <Regular
                    label="Report a user or incident."
                    fontSize={mvs(12)}
                    color="#8C8C8C"
                    style={styles.safetyOptionSubtitle}
                  />
                </View>
              </Row>
              <Icon name="chevron-forward" size={mvs(20)} color="#8C8C8C" />
            </TouchableOpacity>

            {/* Safety & Education Centre */}
            <TouchableOpacity style={styles.safetyOptionRow}>
              <Row style={styles.safetyOptionContent}>
                <Icon name="book" size={mvs(20)} color="#27AE60" />
                <View style={styles.safetyOptionText}>
                  <Medium
                    label="Safety & Education Centre"
                    fontSize={mvs(14)}
                    color={colors.textColor}
                  />
                  <Regular
                    label="Guides and resources to stay safe."
                    fontSize={mvs(12)}
                    color="#8C8C8C"
                    style={styles.safetyOptionSubtitle}
                  />
                </View>
              </Row>
              <Icon name="chevron-forward" size={mvs(20)} color="#8C8C8C" />
            </TouchableOpacity>

            {/* Safety Tools */}
            <TouchableOpacity style={styles.safetyOptionRow}>
              <Row style={styles.safetyOptionContent}>
                <Icon name="construct" size={mvs(20)} color="#8C8C8C" />
                <View style={styles.safetyOptionText}>
                  <Medium
                    label="Safety Tools"
                    fontSize={mvs(14)}
                    color={colors.textColor}
                  />
                  <Regular
                    label="Access emergency contacts and location sharing."
                    fontSize={mvs(12)}
                    color="#8C8C8C"
                    style={styles.safetyOptionSubtitle}
                  />
                </View>
              </Row>
              <Icon name="chevron-forward" size={mvs(20)} color="#8C8C8C" />
            </TouchableOpacity>

            {/* Dismiss Button */}
            <TouchableOpacity
              style={styles.safetyDismissButton}
              onPress={handleCloseSafetyToolkit}>
              <Medium
                label="Dismiss"
                fontSize={mvs(16)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

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
            {/* Archive chat */}
            <TouchableOpacity
              style={styles.messageOptionRow}
              onPress={handleArchiveChat}>
              <Row style={styles.messageOptionContent}>
                <Regular
                  label="Archive chat"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                />
              </Row>
              <IMG.SwipeArchive width={mvs(20)} height={mvs(20)} />
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

      {/* Block Confirmation Modal (Image 1) */}
      <Modal
        visible={showBlockConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelBlock}>
        <TouchableOpacity
          style={styles.blockModalOverlay}
          activeOpacity={1}
          onPress={handleCancelBlock}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.blockModalContainer}>
            <Bold
              label="Block User"
              fontSize={mvs(18)}
              color={colors.textColor}
              style={styles.blockModalTitle}
            />
            <Regular
              label={`Are you sure you want to block ${selectedMessage?.name || 'this user'}?`}
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.blockModalMessage}
              numberOfLines={10}
            />
            <Row style={styles.blockModalButtons}>
              <TouchableOpacity
                style={styles.blockCancelButton}
                onPress={handleCancelBlock}>
                <Medium
                  label="Cancel"
                  fontSize={mvs(16)}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.blockConfirmButton}
                onPress={handleConfirmBlock}>
                <Medium
                  label="Block"
                  fontSize={mvs(16)}
                  color={"#FF5F57"}
                />
              </TouchableOpacity>
            </Row>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Blocked Success Modal (Image 2) */}
      <Modal
        visible={showBlockedModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleBlockDone}>
        <TouchableOpacity
          style={styles.blockModalOverlay}
          activeOpacity={1}
          onPress={handleBlockDone}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.blockModalContainer}>
            <Bold
              label={`${selectedMessage?.name || 'User'} has been blocked`}
              fontSize={mvs(18)}
              color={colors.textColor}
              style={styles.blockModalTitle}
            />
            <Regular
              label="You will no longer see their profile or receive messages from them."
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.blockModalMessage}
              numberOfLines={10}
            />
            <Regular
              label={`Would you also like to report ${selectedMessage?.name || 'this user'}?`}
              fontSize={mvs(14)}
              color={colors.textColor}
              style={[styles.blockModalMessage, {marginTop: mvs(12)}]}
              numberOfLines={10}
            />
            <Row style={styles.blockModalButtons}>
              <TouchableOpacity
                style={styles.blockReportButton}
                onPress={handleBlockReport}>
                <Medium
                  label="Report"
                  fontSize={mvs(16)}
                  color="#FF5F57"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.blockDoneButton}
                onPress={handleBlockDone}>
                <Medium
                  label="Done"
                  fontSize={mvs(16)}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Row>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Report Modal (Image 3 & 4) */}
      <Modal
        visible={showReportModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelReport}>
        <TouchableOpacity
          style={styles.blockModalOverlay}
          activeOpacity={1}
          onPress={handleCancelReport}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.reportModalContainer}>
            <Bold
              label={`Why are you reporting ${selectedMessage?.name || 'this user'}?`}
              fontSize={mvs(18)}
              color={colors.textColor}
              style={styles.reportModalTitle}
            />
            <Regular
              label="Your feedback helps keep our community safe. Please select a reason below."
              fontSize={mvs(14)}
              color={colors.textColorSecondary}
              style={styles.reportModalSubtitle}
              numberOfLines={10}
            />
            
            {/* Report Reasons */}
            {['Spam or Scam', 'Inappropriate Profile or Photos', 'Abusive or Threatening Behavior', 'Misleading Profile / Catfishing', 'Something Else...'].map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reportReasonRow}
                onPress={() => setSelectedReportReason(reason)}>
                <View style={styles.radioButton}>
                  {selectedReportReason === reason && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Regular
                  label={reason}
                  fontSize={mvs(14)}
                  color={colors.textColor}
                  style={{flex: 1, marginLeft: mvs(12)}}
                />
              </TouchableOpacity>
            ))}

            {/* Text Input for Something Else */}
            {selectedReportReason === 'Something Else...' && (
              <View style={styles.reportTextInputContainer}>
                <TextInput
                  style={styles.reportTextInput}
                  placeholder="Write your concern here"
                  placeholderTextColor="#8C8C8C"
                  multiline
                  value={reportConcern}
                  onChangeText={setReportConcern}
                  numberOfLines={6}
                />
              </View>
            )}

            <Row style={styles.reportModalButtons}>
              <TouchableOpacity
                style={styles.reportCancelButton}
                onPress={handleCancelReport}>
                <Medium
                  label="Cancel"
                  fontSize={mvs(16)}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.reportSubmitButton,
                  (!selectedReportReason || (selectedReportReason === 'Something Else...' && !reportConcern.trim())) && styles.reportSubmitButtonDisabled,
                ]}
                onPress={handleSubmitReport}
                // disabled={!selectedReportReason || (selectedReportReason === 'Something Else...' && !reportConcern.trim())}
                >
                <Medium
                  label="Submit Report"
                  fontSize={mvs(16)}
                  color={selectedReportReason && (selectedReportReason !== 'Something Else...' || reportConcern.trim()) ? colors.primary : colors.primary}
                />
              </TouchableOpacity>
            </Row>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Report Received Modal (Image 5) */}
      <Modal
        visible={showReportReceivedModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseReportReceived}>
        <TouchableOpacity
          style={styles.blockModalOverlay}
          activeOpacity={1}
          onPress={handleCloseReportReceived}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.reportReceivedModalContainer}>
            <Medium
              label="Report Received"
              fontSize={mvs(18)}
              color={colors.textColor}
              style={styles.reportReceivedModalTitle}
            />
            <Regular
              label="Thank you. Our safety team will review the profile and take action."
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.reportReceivedModalMessage}
              numberOfLines={10}
            />
            <TouchableOpacity
              style={styles.reportReceivedCloseButton}
              onPress={handleCloseReportReceived}>
              <Medium
                label="Close"
                fontSize={mvs(16)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Delete Chat Confirmation Modal */}
      <Modal
        visible={showDeleteConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}>
        <TouchableOpacity
          style={styles.blockModalOverlay}
          activeOpacity={1}
          onPress={handleCancelDelete}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.deleteModalContainer}>
            <Medium
              label="Delete Chat"
              fontSize={mvs(16)}
              color={colors.textColor}
              style={styles.deleteModalTitle}
            />
            <Regular
              label="Are you sure you want to delete this chat?"
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.deleteModalMessage}
              numberOfLines={10}
            />
            <Row style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={styles.deleteCancelButton}
                onPress={handleCancelDelete}>
                <Medium
                  label="Cancel"
                  fontSize={mvs(16)}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteConfirmButton}
                onPress={handleConfirmDelete}>
                <Medium
                  label="Delete"
                  fontSize={mvs(16)}
                  color={"#FF5F57"}
                />
              </TouchableOpacity>
            </Row>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Unmatch User Confirmation Modal */}
      <Modal
        visible={showUnmatchConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelUnmatch}>
        <TouchableOpacity
          style={styles.blockModalOverlay}
          activeOpacity={1}
          onPress={handleCancelUnmatch}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.unmatchModalContainer}>
            <Bold
              label="Unmatch User"
              fontSize={mvs(18)}
              color={colors.textColor}
              style={styles.unmatchModalTitle}
            />
            <Regular
              label="Would you like to unmatch this user? This cannot be undone."
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.unmatchModalMessage}
              numberOfLines={10}
            />
            <Row style={styles.unmatchModalButtons}>
              <TouchableOpacity
                style={styles.unmatchCancelButton}
                onPress={handleCancelUnmatch}>
                <Medium
                  label="Cancel"
                  fontSize={mvs(16)}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.unmatchConfirmButton}
                onPress={handleConfirmUnmatch}>
                <Medium
                  label="Yes"
                  fontSize={mvs(16)}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Row>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    paddingTop: mvs(20),
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
  // Block/Report Modal styles
  blockModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockModalContainer: {
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
  blockModalTitle: {
    textAlign: 'center',
    marginBottom: mvs(16),
  },
  blockModalMessage: {
    textAlign: 'center',
    marginBottom: mvs(24),
    lineHeight: mvs(20),
  },
  blockModalButtons: {
    justifyContent: 'space-between',
    gap: mvs(12),
  },
  blockCancelButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockConfirmButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    // backgroundColor: '#FF3B30',
    borderColor:"#FF5F57",
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockReportButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: '#FF5F57',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockDoneButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    // backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Report Modal styles
  reportModalContainer: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    padding: mvs(24),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  reportModalTitle: {
    marginBottom: mvs(12),
  },
  reportModalSubtitle: {
    marginBottom: mvs(20),
    lineHeight: mvs(20),
  },
  reportReasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: mvs(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  radioButton: {
    width: mvs(20),
    height: mvs(20),
    borderRadius: mvs(10),
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: mvs(12),
    height: mvs(12),
    borderRadius: mvs(6),
    backgroundColor: colors.primary,
  },
  reportTextInputContainer: {
    marginTop: mvs(16),
    marginBottom: mvs(20),
  },
  reportTextInput: {
    minHeight: mvs(120),
    backgroundColor: '#F5F5F9',
    borderRadius: mvs(12),
    padding: mvs(16),
    fontSize: mvs(14),
    color: colors.textColor,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  reportModalButtons: {
    justifyContent: 'space-between',
    gap: mvs(12),
    marginTop: mvs(8),
  },
  reportCancelButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportSubmitButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    backgroundColor: colors.white,
    borderWidth:2,
    borderColor:colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportSubmitButtonDisabled: {
    // backgroundColor: '#E0E0E0',
  },
  // Report Received Modal styles
  reportReceivedModalContainer: {
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
  reportReceivedModalTitle: {
    textAlign: 'center',
    marginBottom: mvs(16),
  },
  reportReceivedModalMessage: {
    textAlign: 'center',
    marginBottom: mvs(24),
    lineHeight: mvs(20),
  },
  reportReceivedCloseButton: {
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Delete Chat Modal styles
  deleteModalContainer: {
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
  deleteModalTitle: {
    textAlign: 'center',
    marginBottom: mvs(16),
  },
  deleteModalMessage: {
    textAlign: 'center',
    marginBottom: mvs(24),
    lineHeight: mvs(20),
  },
  deleteModalButtons: {
    justifyContent: 'space-between',
    gap: mvs(12),
  },
  deleteCancelButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteConfirmButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    // backgroundColor: '#FF5F57',
    borderWidth:1,
    borderColor:"#FF5F57",
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Unmatch Modal styles
  unmatchModalContainer: {
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
  unmatchModalTitle: {
    textAlign: 'center',
    marginBottom: mvs(16),
  },
  unmatchModalMessage: {
    textAlign: 'center',
    marginBottom: mvs(24),
    lineHeight: mvs(20),
  },
  unmatchModalButtons: {
    justifyContent: 'space-between',
    gap: mvs(12),
  },
  unmatchCancelButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unmatchConfirmButton: {
    flex: 1,
    paddingVertical: mvs(14),
    borderRadius: mvs(40),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
