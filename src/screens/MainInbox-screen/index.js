import React, {useState, useMemo, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  Linking,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const MainInboxScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [inputHeight, setInputHeight] = useState(mvs(40));
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingTimer, setRecordingTimer] = useState(null);
  const flatListRef = useRef(null);

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


  // Chat functionality
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: messageText.trim(),
      sent: true,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      status: 'Sent', // Will be updated to 'Delivered' then 'Read'
      replyTo: replyTo,
    };
    setChatMessages(prev => [...prev, newMessage]);
    setMessageText('');
    setInputHeight(mvs(40));
    setReplyTo(null);
    
    // Update status to Delivered after 1 second
    setTimeout(() => {
      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? {...msg, status: 'Delivered'} : msg
        )
      );
    }, 1000);
    
    // Update status to Read after 2 seconds
    setTimeout(() => {
      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? {...msg, status: 'Read'} : msg
        )
      );
    }, 2000);
    
    // Simulate receiving a reply after 3 seconds
    setTimeout(() => {
      // Liam replies to the message the user just sent
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Hi Jessica, thanks for reaching out. It\'s nice to hear from you.',
        sent: false,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        replyTo: newMessage, // Liam replies to the message user just sent
      };
      setChatMessages(prev => [...prev, replyMessage]);
    }, 3000);
  };

  useEffect(() => {
    if (flatListRef.current && chatMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [chatMessages]);

  const handleLongPressMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const handleReply = () => {
    setReplyTo(selectedMessage);
    setShowMessageModal(false);
    setSelectedMessage(null);
  };

  const handleEdit = () => {
    if (selectedMessage) {
      setMessageText(selectedMessage.text);
      setChatMessages(prev => prev.filter(msg => msg.id !== selectedMessage.id));
    }
    setShowMessageModal(false);
    setSelectedMessage(null);
  };

  const handleDelete = () => {
    setShowMessageModal(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMessage) {
      setChatMessages(prev => prev.filter(msg => msg.id !== selectedMessage.id));
    }
    setShowDeleteModal(false);
    setSelectedMessage(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedMessage(null);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    // Start timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setRecordingTimer(timer);
  };

  const handlePauseRecording = () => {
    if (isPaused) {
      // Resume recording
      setIsPaused(false);
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingTimer(timer);
    } else {
      // Pause recording
      setIsPaused(true);
      if (recordingTimer) {
        clearInterval(recordingTimer);
        setRecordingTimer(null);
      }
    }
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    if (recordingTimer) {
      clearInterval(recordingTimer);
      setRecordingTimer(null);
    }
  };

  const handleSendVoiceMessage = () => {
    if (recordingTime > 0) {
      const voiceMessage = {
        id: Date.now().toString(),
        type: 'voice',
        duration: recordingTime,
        sent: true,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        status: 'Read',
      };
      setChatMessages(prev => [...prev, voiceMessage]);
      
      // Reset recording
      handleCancelRecording();
      
      // Simulate receiving a voice message after 2 seconds
      setTimeout(() => {
        const receivedVoiceMessage = {
          id: (Date.now() + 1).toString(),
          type: 'voice',
          duration: recordingTime,
          sent: false,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        };
        setChatMessages(prev => [...prev, receivedVoiceMessage]);
      }, 2000);
    }
  };

  const handleOpenCamera = async () => {
    setShowPlusMenu(false);
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'any',
        cropping: false,
        includeBase64: false,
      });
      
      if (image.mime && image.mime.startsWith('video/')) {
        // Video
        const videoMessage = {
          id: Date.now().toString(),
          type: 'video',
          uri: image.path,
          text: 'Hope it is helpful.',
          duration: '0:27',
          sent: true,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          status: 'Read',
        };
        setChatMessages(prev => [...prev, videoMessage]);
        
        // Simulate receiving a video from other user after 2 seconds
        setTimeout(() => {
          const receivedVideoMessage = {
            id: (Date.now() + 1).toString(),
            type: 'video',
            uri: image.path,
            text: 'Hope it is helpful.',
            duration: '0:27',
            sent: false,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          };
          setChatMessages(prev => [...prev, receivedVideoMessage]);
        }, 2000);
    } else {
        // Image
        const imageMessage = {
          id: Date.now().toString(),
          type: 'image',
          uri: image.path,
          sent: true,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          status: 'Read',
        };
        setChatMessages(prev => [...prev, imageMessage]);
        
        // Simulate receiving an image from other user after 2 seconds
        setTimeout(() => {
          const receivedImageMessage = {
            id: (Date.now() + 1).toString(),
            type: 'image',
            uri: image.path,
            sent: false,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          };
          setChatMessages(prev => [...prev, receivedImageMessage]);
        }, 2000);
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.log('Camera error:', error);
      }
    }
  };

  const handleOpenGallery = async () => {
    setShowPlusMenu(false);
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'any',
        cropping: false,
        includeBase64: false,
      });
      
      if (image.mime && image.mime.startsWith('video/')) {
        // Video
        const videoMessage = {
          id: Date.now().toString(),
          type: 'video',
          uri: image.path,
          text: 'Hope it is helpful.',
          duration: '0:27',
          sent: true,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          status: 'Read',
        };
        setChatMessages(prev => [...prev, videoMessage]);
      } else {
        // Image
        const imageMessage = {
          id: Date.now().toString(),
          type: 'image',
          uri: image.path,
          sent: true,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
          status: 'Read',
        };
        setChatMessages(prev => [...prev, imageMessage]);
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.log('Gallery error:', error);
      }
    }
  };

  const handleOpenFiles = async () => {
    setShowPlusMenu(false);
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      
      const file = results[0];
      const fileSize = file.size || 0;
      const fileSizeKB = Math.round(fileSize / 1024);
      const fileSizeMB = fileSizeKB > 1024 ? (fileSizeKB / 1024).toFixed(1) + ' mb' : fileSizeKB + ' kb';
      
      const fileMessage = {
        id: Date.now().toString(),
        type: 'file',
        uri: file.uri,
        name: file.name || 'filename.pdf',
        size: fileSizeKB,
        sizeText: fileSizeMB,
        mime: file.type || 'application/pdf',
        sent: true,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        status: 'Read',
      };
      setChatMessages(prev => [...prev, fileMessage]);
      
      // Simulate receiving a file after 2 seconds
      setTimeout(() => {
        const receivedFileMessage = {
          id: (Date.now() + 1).toString(),
          type: 'file',
          uri: file.uri,
          name: file.name || 'filename.pdf',
          size: Math.round(fileSizeKB * 0.1), // Smaller file for received
          sizeText: Math.round(fileSizeKB * 0.1) + ' kb',
          mime: file.type || 'application/pdf',
          sent: false,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        };
        setChatMessages(prev => [...prev, receivedFileMessage]);
      }, 2000);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled
      } else {
        console.log('File picker error:', error);
      }
    }
  };

  const handleDownloadFile = async (fileMessage) => {
    try {
      const {uri} = fileMessage;
      const canOpen = await Linking.canOpenURL(uri);
      if (canOpen) {
        await Linking.openURL(uri);
      } else {
        Alert.alert('Error', 'Unable to open file');
      }
    } catch (error) {
      console.log('Download error:', error);
      Alert.alert('Error', 'Failed to open file');
    }
  };

  const handleVideoCall = () => {
    // Create video call log (sent by user) - completed call with duration
    const callMessage = {
      id: Date.now().toString(),
      type: 'call',
      callType: 'video',
      status: 'completed',
      duration: '10m 19s',
      sent: true,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      status: 'Read',
    };
    setChatMessages(prev => [...prev, callMessage]);
    
    // Simulate receiving a completed video call from other user after 2 seconds
    setTimeout(() => {
      const receivedCallMessage = {
        id: (Date.now() + 1).toString(),
        type: 'call',
        callType: 'video',
        status: 'completed',
        duration: '10m 19s',
        sent: false,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      };
      setChatMessages(prev => [...prev, receivedCallMessage]);
    }, 2000);
  };

  const handleVoiceCall = () => {
    // Create voice call log (sent by user)
    const callMessage = {
      id: Date.now().toString(),
      type: 'call',
      callType: 'voice',
      status: 'completed',
      duration: '10m 19s',
      sent: true,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      status: 'Read',
    };
    setChatMessages(prev => [...prev, callMessage]);
    
    // Simulate receiving a voice call from other user after 2 seconds
    setTimeout(() => {
      const receivedCallMessage = {
        id: (Date.now() + 1).toString(),
        type: 'call',
        callType: 'voice',
        status: 'completed',
        duration: '10m 19s',
        sent: false,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      };
      setChatMessages(prev => [...prev, receivedCallMessage]);
    }, 2000);
  };

  const renderChatMessage = ({item}) => {
    const isSent = item.sent;
    const isRead = item.status === 'Read';
    const isDelivered = item.status === 'Delivered' || item.status === 'Read';
    const isSentStatus = item.status === 'Sent';
    
    // Render call log message
    if (item.type === 'call') {
      const isMissed = item.status === 'missed';
      const isVideo = item.callType === 'video';
      
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={isMissed ? (isVideo ? handleVideoCall : handleVoiceCall) : undefined}
          style={[
            styles.chatMessageContainer,
            isSent ? styles.chatMessageSent : styles.chatMessageReceived,
          ]}>
          <View
            style={[
              styles.chatBubble,
              styles.callBubble,
              isSent ? styles.callBubbleSent : styles.callBubbleReceived,
            ]}>
            <Row style={styles.callLogRow}>
              <View style={styles.callIconContainer}>
                {isVideo ? (
                  <IMG.InboxVideoCall width={mvs(42)} height={mvs(42)} />
                ) : (
                  <IMG.InboxVoiceCall width={mvs(42)} height={mvs(42)} />
                  )}
                </View>
              <View style={styles.callLogContent}>
                {isMissed ? (
                  <>
                    <Regular
                      label={isVideo ? 'Missed video call' : 'Missed voice call'}
              fontSize={mvs(14)}
                      numberOfLines={10}
                      color="#404040"
            />
            <Regular
                      label="Click to call back"
                      fontSize={mvs(12)}
              numberOfLines={10}
              color="#8C8C8C"
                      style={{marginTop: mvs(2)}}
                    />
                  </>
                ) : (
                  <>
                    <Regular
                      label={isVideo ? 'Video Call' : 'Voice Call'}
                      fontSize={mvs(14)}
                      color="#404040"
                    />
                    {item.duration && (
                      <Regular
                        label={item.duration}
                        fontSize={mvs(12)}
                        color="#8C8C8C"
                        style={{marginTop: mvs(2)}}
                      />
                    )}
                  </>
                )}
          </View>
            </Row>
            <Row style={styles.chatMessageFooter}>
                  <Regular
                label={item.time}
                    numberOfLines={10}
                fontSize={mvs(11)}
                color={isSent ? '#8C8C8C' : '#8C8C8C'}
              />
              {isSent && (
                <Icon
                  name="checkmark-done"
                  size={mvs(14)}
                  color={isRead ? '#4FC3F7' : '#8C8C8C'}
                  style={{marginLeft: mvs(4)}}
                />
              )}
            </Row>
        </View>
        </TouchableOpacity>
    );
  }

    // Render image message
    if (item.type === 'image') {
  return (
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => handleLongPressMessage(item)}
          style={[
            styles.chatMessageContainer,
            isSent ? styles.chatMessageSent : styles.chatMessageReceived,
          ]}>
          <View
            style={[
              styles.chatBubble,
              isSent ? styles.chatBubbleSent : styles.chatBubbleReceived,
              styles.mediaBubble,
            ]}>
            <View style={styles.mediaImageContainer}>
              <Image source={{uri: item.uri}} style={styles.mediaImage} />
              <View style={styles.mediaFooterContainer}>
                <Row style={styles.chatMessageFooter}>
                  <Regular
                    label={item.time}
                    numberOfLines={10}
                    fontSize={mvs(11)}
                    color={isSent ? '#FFFFFF' : '#FFFFFF'}
                    style={styles.mediaTimestamp}
                  />
                  {isSent && (
                    <Icon
                      name="checkmark-done"
                      size={mvs(14)}
                      color={isRead ? '#4FC3F7' : '#FFFFFF'}
                      style={{marginLeft: mvs(4)}}
                    />
                  )}
                </Row>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    // Render video message
    if (item.type === 'video') {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => handleLongPressMessage(item)}
          style={[
            styles.chatMessageContainer,
            isSent ? styles.chatMessageSent : styles.chatMessageReceived,
          ]}>
          <View
            style={[
              styles.chatBubble,
              isSent ? styles.chatBubbleSent : styles.chatBubbleReceived,
              styles.mediaBubble,
            ]}>
            <View style={styles.mediaImageContainer}>
              <View style={styles.videoContainer}>
                <Image source={{uri: item.uri}} style={styles.mediaImage} />
                <View style={styles.videoPlayButton}>
                  <IMG.InboxVdieolayer width={mvs(40)} height={mvs(40)} />
                </View>
              </View>
            </View>
            {item.text && (
              <View style={styles.videoTextContainer}>
                <Row style={styles.videoTextRow}>
                  <Icon name="videocam" size={mvs(14)} color="#8C8C8C" style={{marginRight: mvs(4)}} />
                  <Regular
                    label={item.duration || '0:27'}
                    fontSize={mvs(12)}
                    color="#8C8C8C"
                    style={{marginRight: mvs(8)}}
                  />
                  <Regular
                    label={item.text}
                    fontSize={mvs(14)}
                    color={isSent ? "#404040" : "#404040"}
                    style={{flex: 1}}
                  />
                </Row>
              </View>
            )}
            <View style={styles.mediaFooterContainer}>
              <Row style={styles.chatMessageFooter}>
                <Regular
                  label={item.time}
                  numberOfLines={10}
                  fontSize={mvs(11)}
                  color={isSent ? '#FFFFFF' : '#FFFFFF'}
                  style={styles.mediaTimestamp}
                />
                {isSent && (
                  <Icon
                    name="checkmark-done"
                    size={mvs(14)}
                    color={isRead ? '#4FC3F7' : '#FFFFFF'}
                    style={{marginLeft: mvs(4)}}
                  />
                )}
              </Row>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    // Render file message
    if (item.type === 'file') {
      const isPDF = item.mime && item.mime.includes('pdf');
      const pageCount = '1 page';
      
      return (
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => handleLongPressMessage(item)}
          style={[
            styles.chatMessageContainer,
            isSent ? styles.chatMessageSent : styles.chatMessageReceived,
          ]}>
          <View
            style={[
              styles.chatBubble,
              isSent ? styles.chatBubbleSent : styles.chatBubbleReceived,
              styles.fileBubble,
            ]}>
            <Row style={styles.fileRow}>
              <View style={styles.fileIconContainer}>
                {isPDF ? (
                  <IMG.InboxDocs width={mvs(24)} height={mvs(24)} />
                ) : (
                  <IMG.InboxFile width={mvs(24)} height={mvs(24)} />
                )}
              </View>
              <View style={styles.fileContent}>
                
                <Medium
                  label={item.name}
                  fontSize={mvs(14)}
                  color={isSent ? "#404040" : "#404040"}
                  numberOfLines={1}
                />
                
                <Regular
                  label={`${pageCount} · ${item.sizeText} · ${item.mime?.split('/')[1] || 'pdf'}`}
                  fontSize={mvs(12)}
                  color="#8C8C8C"
                  style={{marginTop: mvs(2)}}
                />
                
              </View>
              {!isSent && (
                <TouchableOpacity
                  onPress={() => handleDownloadFile(item)}
                  style={styles.downloadButton}>
                  <IMG.InboxFileDownload width={mvs(20)} height={mvs(20)} />
                </TouchableOpacity>
              )}
            </Row>
            <View style={styles.fileFooterContainer}>
              <Row style={styles.chatMessageFooter}>
                <Regular
                  label={item.time}
                  numberOfLines={10}
                  fontSize={mvs(11)}
                  color={isSent ? '#8C8C8C' : '#8C8C8C'}
                />
                {isSent && (
                  <Icon
                    name="checkmark-done"
                    size={mvs(14)}
                    color={isRead ? '#4FC3F7' : '#8C8C8C'}
                    style={{marginLeft: mvs(4)}}
                  />
                )}
              </Row>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    // Render voice message
    if (item.type === 'voice') {
      const isPlayingVoice = item.isPlaying || false;
      
      return (
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => handleLongPressMessage(item)}
          style={[
            styles.chatMessageContainer,
            isSent ? styles.chatMessageSent : styles.chatMessageReceived,
          ]}>
          <View
            style={[
              styles.chatBubble,
              isSent ? styles.chatBubbleSent : styles.chatBubbleReceived,
              styles.voiceBubble,
            ]}>
            <Row style={styles.voiceMessageRow}>
              <TouchableOpacity
                onPress={() => {
                  setChatMessages(prev => prev.map(msg => 
                    msg.id === item.id ? {...msg, isPlaying: !isPlayingVoice} : {...msg, isPlaying: false}
                  ));
                }}
                style={styles.voicePlayButton}>
                {isPlayingVoice ? (
                  <IMG.inboxPause width={mvs(20)} height={mvs(20)} />
                ) : (
                  <Icon name="play" size={mvs(20)} color={isSent ? "#404040" : "#404040"} />
                )}
              </TouchableOpacity>
              <Regular
                label={formatTime(item.duration)}
                fontSize={mvs(14)}
                color={isSent ? "#404040" : "#404040"}
                style={{marginLeft: mvs(8), marginRight: mvs(8), minWidth: mvs(50)}}
              />
              <View style={styles.voiceWaveformContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((bar, index) => {
                  const heights = [8, 12, 18, 25, 30, 28, 22, 15, 10, 8, 12, 20, 28, 32, 30, 25, 18, 12, 8, 10];
                  const isPlayed = isPlayingVoice && index < 10;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.voiceWaveformBar,
                        {
                          height: mvs(heights[index % heights.length]),
                          backgroundColor: isPlayed 
                            ? (isSent ? colors.primary : colors.primary)
                            : (isSent ? '#D1D5DB' : '#D1D5DB'),
                        },
                      ]}
                    />
                  );
                })}
              </View>
              {!isSent && (
                <TouchableOpacity
                  onPress={() => handleDownloadFile(item)}
                  style={styles.voiceDownloadButton}>
                  <Icon name="arrow-down" size={mvs(16)} color="#8C8C8C" />
                </TouchableOpacity>
              )}
            </Row>
            <Row style={styles.chatMessageFooter}>
              <Regular
                label={item.time}
                numberOfLines={10}
                fontSize={mvs(11)}
                color={isSent ? '#8C8C8C' : '#8C8C8C'}
              />
              {isSent && (
                <Icon
                  name="checkmark-done"
                  size={mvs(14)}
                  color={isRead ? '#4FC3F7' : '#8C8C8C'}
                  style={{marginLeft: mvs(4)}}
                />
              )}
            </Row>
          </View>
        </TouchableOpacity>
      );
    }
    
    // Render regular text message
    return (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => handleLongPressMessage(item)}
                  style={[
          styles.chatMessageContainer,
          isSent ? styles.chatMessageSent : styles.chatMessageReceived,
        ]}>
                <View
                  style={[
            styles.chatBubble,
            isSent ? styles.chatBubbleSent : styles.chatBubbleReceived,
          ]}>
          {item.replyTo && (
            <View style={styles.replyPreviewInMessage}>
              <View style={styles.replyPreviewLineInBubble} />
              <View style={styles.replyPreviewContentInBubble}>
                <Regular
                  label={item.replyTo.sent ? 'You' : 'Liam Carter'}
                  fontSize={mvs(12)}
                  color={isSent ? '#8C8C8C' : colors.primary}
                  style={{marginBottom: mvs(2)}}
                />
                <Regular
                  label={item.replyTo.text}
                  fontSize={mvs(12)}
                  color="#8C8C8C"
                  numberOfLines={2}
                />
              </View>
                </View>
          )}
          <Regular
            label={item.text}
            numberOfLines={10}
              fontSize={mvs(14)}
            color={isSent ? "#404040" : "#404040"}
            style={styles.chatMessageText}
            />
          <Row style={styles.chatMessageFooter}>
            <Regular
              label={item.time}
              numberOfLines={10}
              fontSize={mvs(11)}
              color={isSent ? '#8C8C8C' : '#8C8C8C'}
            />
            {isSent && (
              <Icon
                name="checkmark-done"
                size={mvs(14)}
                color={isRead ? '#4FC3F7' : '#8C8C8C'}
                style={{marginLeft: mvs(4)}}
              />
            )}
          </Row>
            </View>
      </TouchableOpacity>
    );
  };

  // Check if chat has started (has messages)
  const hasChatStarted = chatMessages.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {!hasChatStarted ? (
            // Image 1: New Match Screen
            <View style={styles.newMatchContainer}>
              {/* Header */}
              <View style={styles.chatHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="chevron-back" size={mvs(24)} color={colors.black} />
                </TouchableOpacity>
                <View style={styles.chatHeaderProfile}>
                  <View style={styles.chatHeaderAvatar}>
                    <IMG.InboxAvatar width={mvs(40)} height={mvs(40)} />
          </View>
                  <Medium label="Liam Carter" fontSize={mvs(16)} color={colors.black} />
        </View>
                <Row style={styles.chatHeaderActions}>
                  <TouchableOpacity style={styles.chatHeaderIcon} onPress={handleVideoCall}>
                    <IMG.InboxVideo width={mvs(24)} height={mvs(24)} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatHeaderIcon} onPress={handleVoiceCall}>
                    <IMG.InboxCall width={mvs(24)} height={mvs(24)} />
                  </TouchableOpacity>
                </Row>
              </View>

              {/* New Match Content */}
              <View style={styles.newMatchContent}>
                <View style={styles.newMatchProfileContainer}>
                  <View style={styles.newMatchProfileBorder}>
                    <IMG.InboxAvatar width={mvs(150)} height={mvs(150)} />
                  </View>
                </View>
                <Bold
                  label="You matched with Liam"
                  fontSize={mvs(18)}
                  color={colors.black}
                  style={styles.newMatchTitle}
                  />
                  <Regular
                  label="47 Minutes ago"
                    fontSize={mvs(14)}
                    color="#8C8C8C"
                  style={styles.newMatchTime}
                />
              </View>

              {/* Input Bar */}
              <View style={styles.chatInputContainer}>
                <TouchableOpacity 
                  style={styles.chatInputIcon}
                  onPress={() => setShowPlusMenu(!showPlusMenu)}>
                  <IMG.InboxPlus width={mvs(24)} height={mvs(24)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatInputIcon}>
                  <IMG.InboxSmile width={mvs(24)} height={mvs(24)} />
                </TouchableOpacity>
                <TextInput
                  style={[styles.chatInput, {height: inputHeight}]}
                  placeholder="Type Here"
                  placeholderTextColor="#D9D9D9"
                  value={messageText}
                  onChangeText={setMessageText}
                  multiline
                  onContentSizeChange={(e) => {
                    const height = Math.min(Math.max(mvs(40), e.nativeEvent.contentSize.height), mvs(100));
                    setInputHeight(height);
                  }}
                />
                <TouchableOpacity
                  onPress={messageText.trim() ? handleSendMessage : handleStartRecording}
                  style={styles.chatInputIcon}>
                  {messageText.trim() ? (
                    <IMG.ChatSend width={mvs(22)} height={mvs(22)} />
                  ) : (
                    <IMG.InboxVoice width={mvs(24)} height={mvs(24)} />
                  )}
                </TouchableOpacity>
              </View>

              {/* Recording Bottom View */}
              {isRecording && (
                <View style={styles.recordingBottomView}>
                  <View style={styles.recordingWaveformContainer}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((bar, index) => {
                      const heights = [8, 12, 18, 25, 30, 28, 22, 15, 10, 8, 12, 20, 28, 32, 30, 25, 18, 12, 8, 10, 15, 22, 28, 30, 25, 20, 15, 10, 8, 12];
                      return (
                        <View
                          key={index}
                          style={[
                            styles.recordingWaveformBar,
                            {
                              height: mvs(heights[index % heights.length]),
                              backgroundColor: colors.primary,
                            },
                          ]}
                        />
                      );
                    })}
                  </View>
                  {/* Centered duration under waveform */}
                  <Regular
                    label={formatTime(recordingTime)}
                    fontSize={mvs(16)}
                    color={colors.black}
                    style={styles.recordingDuration}
                  />
                  {/* Controls row: X  |  pause/mic  |  send */}
                  <Row style={styles.recordingControlsRow}>
                    <TouchableOpacity
                      onPress={handleCancelRecording}
                      style={styles.recordingCancelButton}>
                      <Icon name="close" size={mvs(24)} color={colors.textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handlePauseRecording}
                      style={styles.recordingPauseButton}>
                      {isPaused ? (
                        <IMG.InboxVdieolayer width={mvs(60)} height={mvs(60)} />
                      ) : (
                        <IMG.inboxPause width={mvs(60)} height={mvs(60)} />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleSendVoiceMessage}
                      style={styles.recordingSendButton}>
                      {/* <Icon name="send" size={mvs(24)} color={colors.white} /> */}
                      <IMG.ChatSend height={mvs(30)} width={mvs(30)}/>
                    </TouchableOpacity>
                  </Row>
                </View>
              )}

              {/* Plus Menu Inline View - Below Input */}
              {showPlusMenu && !isRecording && (
                <View style={styles.plusMenuInlineContainer}>
                  <Row style={styles.plusMenuRow}>
                    <TouchableOpacity
                      style={styles.plusMenuOption}
                      onPress={handleOpenGallery}>
                      <View style={styles.plusMenuIconContainer}>
                        <IMG.InboxGallery width={mvs(50)} height={mvs(50)} />
                      </View>
                      <Regular label="Gallery" fontSize={mvs(12)} color={colors.textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.plusMenuOption}
                      onPress={handleOpenCamera}>
                      <View style={styles.plusMenuIconContainer}>
                        <IMG.InboxCamera width={mvs(50)} height={mvs(50)} />
                      </View>
                      <Regular label="Camera" fontSize={mvs(12)} color={colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.plusMenuOption}
                      onPress={handleOpenFiles}>
                      <View style={styles.plusMenuIconContainer}>
                        <IMG.InboxFile width={mvs(50)} height={mvs(50)} />
                      </View>
                      <Regular label="Document" fontSize={mvs(12)} color={colors.black} />
                    </TouchableOpacity>
                  </Row>
                </View>
              )}
            </View>
          ) : (
            // Image 2: Active Chat Screen
            <KeyboardAvoidingView
              style={styles.chatContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
              {/* Header */}
              <View style={styles.chatHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="chevron-back" size={mvs(24)} color={colors.black} />
                </TouchableOpacity>
                <View style={styles.chatHeaderProfile}>
                  <View style={styles.chatHeaderAvatar}>
                    <IMG.InboxAvatar width={mvs(40)} height={mvs(40)} />
          </View>
                  <Medium label="Liam Carter" fontSize={mvs(16)} color={colors.black} />
        </View>
                <Row style={styles.chatHeaderActions}>
                  <TouchableOpacity style={styles.chatHeaderIcon} onPress={handleVideoCall}>
                    <IMG.InboxVideo width={mvs(24)} height={mvs(24)} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatHeaderIcon} onPress={handleVoiceCall}>
                    <IMG.InboxCall width={mvs(24)} height={mvs(24)} />
              </TouchableOpacity>
            </Row>
          </View>

              {/* Chat Messages */}
              <View style={styles.chatMessagesContainer}>
                <View style={styles.dateSeparator}>
                  <Regular label="Today" fontSize={mvs(12)} color="#8C8C8C" />
            </View>
            <FlatList
                  ref={flatListRef}
                  data={chatMessages}
              keyExtractor={item => item.id.toString()}
                  renderItem={renderChatMessage}
                  contentContainerStyle={styles.chatMessagesList}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              {/* Reply Preview */}
              {replyTo && (
                <View style={styles.replyPreviewContainer}>
                  <View style={styles.replyPreviewLine} />
                  <View style={styles.replyPreviewContent}>
                    <Row style={styles.replyPreviewHeader}>
                      <Regular
                        label={replyTo.sent ? 'You' : 'Liam Carter'}
                        fontSize={mvs(12)}
                  color={colors.primary}
                        style={{marginBottom: mvs(2)}}
                />
                      <TouchableOpacity onPress={handleCancelReply} style={styles.replyCancelButton}>
                        <Icon name="close" size={mvs(18)} color="#8C8C8C" />
                      </TouchableOpacity>
              </Row>
                    <Regular
                      label={replyTo.text}
                      fontSize={mvs(12)}
                      color="#8C8C8C"
                      numberOfLines={1}
                    />
                  </View>
                </View>
              )}

              {/* Input Bar */}
              <View style={styles.chatInputContainer}>
                <TouchableOpacity 
                  style={styles.chatInputIcon}
                  onPress={() => setShowPlusMenu(!showPlusMenu)}>
                  <IMG.InboxPlus width={mvs(24)} height={mvs(24)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatInputIcon}>
                  <IMG.InboxSmile width={mvs(24)} height={mvs(24)} />
                </TouchableOpacity>
                <TextInput
                  style={[styles.chatInput, {height: inputHeight}]}
                  placeholder="Type Here"
                  placeholderTextColor="#8C8C8C"
                  value={messageText}
                  onChangeText={setMessageText}
                  multiline
                  onContentSizeChange={(e) => {
                    const height = Math.min(Math.max(mvs(40), e.nativeEvent.contentSize.height), mvs(100));
                    setInputHeight(height);
                  }}
                />
                <TouchableOpacity
                  onPress={messageText.trim() ? handleSendMessage : handleStartRecording}
                  style={styles.chatInputIcon}>
                  {messageText.trim() ? (
                   <IMG.ChatSend width={mvs(22)} height={mvs(22)} />
                  ) : (
                    <IMG.InboxVoice width={mvs(24)} height={mvs(24)} />
                  )}
                </TouchableOpacity>
              </View>

              {/* Recording Bottom View */}
              {isRecording && (
                <View style={styles.recordingBottomView}>
                  <View style={styles.recordingWaveformContainer}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((bar, index) => {
                      const heights = [8, 12, 18, 25, 30, 28, 22, 15, 10, 8, 12, 20, 28, 32, 30, 25, 18, 12, 8, 10, 15, 22, 28, 30, 25, 20, 15, 10, 8, 12];
                      return (
                        <View
                          key={index}
                          style={[
                            styles.recordingWaveformBar,
                            {
                              height: mvs(heights[index % heights.length]),
                              backgroundColor: colors.primary,
                            },
                          ]}
                        />
                      );
                    })}
                  </View>
                  {/* Centered duration under waveform */}
                  <Regular
                    label={formatTime(recordingTime)}
                    fontSize={mvs(16)}
                    color={colors.black}
                    style={styles.recordingDuration}
                  />
                  {/* Controls row: X  |  pause/mic  |  send */}
                  <Row style={styles.recordingControlsRow}>
                    <TouchableOpacity
                      onPress={handleCancelRecording}
                      style={styles.recordingCancelButton}>
                      <Icon name="close" size={mvs(24)} color={colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handlePauseRecording}
                      style={styles.recordingPauseButton}>
                      {isPaused ? (
                        <IMG.InboxNewVoice width={mvs(60)} height={mvs(60)} />
                      ) : (
                        <IMG.inboxPause width={mvs(60)} height={mvs(60)} />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleSendVoiceMessage}
                      style={styles.recordingSendButton}>
                      {/* <Icon name="send" size={mvs(24)} color={colors.white} /> */}
                        <IMG.ChatSend height={mvs(30)} width={mvs(30)}/>
                    </TouchableOpacity>
                  </Row>
                </View>
              )}

              {/* Plus Menu Inline View - Below Input */}
              {showPlusMenu && !isRecording && (
                <View style={styles.plusMenuInlineContainer}>
                  <Row style={styles.plusMenuRow}>
                    <TouchableOpacity
                      style={styles.plusMenuOption}
                      onPress={handleOpenGallery}>
                      <View style={styles.plusMenuIconContainer}>
                        <IMG.InboxGallery width={mvs(50)} height={mvs(50)} />
                      </View>
                      <Regular label="Gallery" fontSize={mvs(12)} color={colors.textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.plusMenuOption}
                      onPress={handleOpenCamera}>
                      <View style={styles.plusMenuIconContainer}>
                        <IMG.InboxCamera width={mvs(50)} height={mvs(50)} />
                      </View>
                      <Regular label="Camera" fontSize={mvs(12)} color={colors.textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.plusMenuOption}
                      onPress={handleOpenFiles}>
                      <View style={styles.plusMenuIconContainer}>
                        <IMG.InboxFile width={mvs(50)} height={mvs(50)} />
                      </View>
                      <Regular label="Document" fontSize={mvs(12)} color={colors.textColor} />
                    </TouchableOpacity>
                  </Row>
                </View>
              )}
            </KeyboardAvoidingView>
          )}

      {/* Message Options Modal */}
      <Modal
        visible={showMessageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setShowMessageModal(false);
          setSelectedMessage(null);
        }}>
        <TouchableOpacity
          style={styles.messageModalOverlay}
          activeOpacity={1}
          onPress={() => {
            setShowMessageModal(false);
            setSelectedMessage(null);
          }}>
          {selectedMessage && (
            <View style={styles.messageModalContainer}>
              {selectedMessage.sent ? (
                // Sent message options (Image 2)
                <>
                  <TouchableOpacity
                    style={styles.messageModalOption}
                    onPress={handleReply}>
                    <Row style={styles.messageModalOptionRow}>
                      <Regular label="Reply" fontSize={mvs(14)} color={colors.black} />
                      {/* <Icon name="arrow-undo" size={mvs(18)} color={colors.black} /> */}
                      <IMG.InboxBackIcon height={mvs(16)} width={mvs(16)}/>
                    </Row>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.messageModalOption}
                    onPress={handleEdit}>
                    <Row style={styles.messageModalOptionRow}>
                      <Regular label="Edit Message" fontSize={mvs(14)} color={colors.black} />
                      <IMG.InboxEditicon width={mvs(18)} height={mvs(18)} />
                    </Row>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.messageModalOption, styles.messageModalOptionDelete]}
                    onPress={handleDelete}>
                    <Row style={styles.messageModalOptionRow}>
                      <Regular label="Delete Message" fontSize={mvs(14)} color="#FF5F57" />
                      <IMG.InboxDeleteIcon width={mvs(18)} height={mvs(18)} />
                    </Row>
                  </TouchableOpacity>
                </>
              ) : (
                // Received message options (Image 1)
                <>
                  <TouchableOpacity
                    style={styles.messageModalOption}
                    onPress={handleReply}>
                    <Row style={styles.messageModalOptionRow}>
                      <Regular label="Reply" fontSize={mvs(14)} color={colors.black} />
                      {/* <Icon name="arrow-undo" size={mvs(18)} color={colors.black} /> */}
                      <IMG.InboxBackIcon height={mvs(16)} width={mvs(16)}/>
                    </Row>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.messageModalOption, styles.messageModalOptionDelete]}
                    onPress={handleDelete}>
                    <Row style={styles.messageModalOptionRow}>
                      <Regular label="Delete Message" fontSize={mvs(14)} color="#FF3B30" />
                      <IMG.InboxDeleteIcon width={mvs(18)} height={mvs(18)} />
                    </Row>
                  </TouchableOpacity>
        </>
      )}
            </View>
          )}
        </TouchableOpacity>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}>
        <View style={styles.deleteModalOverlay}>
          <View style={styles.deleteModalContainer}>
            <Bold
              label="Delete Message"
              fontSize={mvs(16)}
              color={colors.textColor}
              numberOfLines={10}
              style={styles.deleteModalTitle}
            />
            <Regular
              label="Are you sure you want to delete this message?"
              fontSize={mvs(14)}
              color={colors.textColorSecondary}
              numberOfLines={10}

              style={styles.deleteModalMessage}
            />
            <Row style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={styles.deleteModalCancelButton}
                onPress={handleCancelDelete}>
                <Medium
                  label="Cancel"
                  fontSize={mvs(16)}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteModalDeleteButton}
                onPress={handleConfirmDelete}>
                <Medium
                  label="Delete"
                  fontSize={mvs(16)}
                  color="#FF5F57"
                />
              </TouchableOpacity>
            </Row>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MainInboxScreen;

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
  // New Match Screen Styles
  newMatchContainer: {
    flex: 1,
    backgroundColor: '#F5F5F9',
  },
  newMatchContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mvs(20),
  },
  newMatchProfileContainer: {
    marginBottom: mvs(24),
  },
  newMatchProfileBorder: {
    width: mvs(160),
    height: mvs(160),
    borderRadius: mvs(80),
    borderWidth: mvs(4),
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  newMatchTitle: {
    marginBottom: mvs(8),
  },
  newMatchTime: {
    marginTop: mvs(4),
  },
  // Chat Screen Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#F5F5F9',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(12),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  chatHeaderProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: mvs(12),
  },
  chatHeaderAvatar: {
    width: mvs(40),
    height: mvs(40),
    borderRadius: mvs(20),
    overflow: 'hidden',
    marginRight: mvs(12),
  },
  chatHeaderActions: {
    gap: mvs(16),
  },
  chatHeaderIcon: {
    padding: mvs(4),
  },
  chatMessagesContainer: {
    flex: 1,
    paddingTop: mvs(12),
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: mvs(12),
  },
  chatMessagesList: {
    paddingHorizontal: mvs(16),
    paddingBottom: mvs(12),
  },
  chatMessageContainer: {
    marginBottom: mvs(8),
    flexDirection: 'row',
  },
  chatMessageSent: {
    justifyContent: 'flex-end',
  },
  chatMessageReceived: {
    justifyContent: 'flex-start',
  },
  chatBubble: {
    maxWidth: '75%',
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(8),
    borderRadius: mvs(8),
  },
  chatBubbleSent: {
    backgroundColor:"#E6E8FF",
    // backgroundColor: colors.primary,
    borderBottomRightRadius: mvs(4),
  },
  chatBubbleReceived: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: mvs(4),
  },
  chatMessageText: {
    marginBottom: mvs(4),
  },
  chatMessageFooter: {
    alignItems: 'center',
    // marginTop:mvs(10),
    justifyContent: 'flex-end',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(20),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F9',
    // marginBottom:mvs(20)
  },
  chatInputIcon: {
    padding: mvs(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    // backgroundColor: '#F5F5F9',
    backgroundColor:"white",
    borderRadius: mvs(20),
    paddingHorizontal: mvs(16),
    borderWidth:2,
    borderColor:"#F5F5F9",
    paddingVertical: mvs(8),
    fontSize: mvs(14),
    color: colors.black,
    maxHeight: mvs(100),
    marginHorizontal: mvs(4),
  },
  // Reply Preview Styles
  replyPreviewContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(8),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F9',
  },
  replyPreviewLine: {
    width: mvs(3),
    backgroundColor: colors.primary,
    marginRight: mvs(12),
    borderRadius: mvs(2),
  },
  replyPreviewContent: {
    flex: 1,
  },
  replyPreviewHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mvs(4),
  },
  replyCancelButton: {
    padding: mvs(4),
  },
  replyPreviewLineInBubble: {
    width: mvs(3),
    backgroundColor: colors.primary,
    marginRight: mvs(8),
    borderRadius: mvs(2),
  },
  replyPreviewContentInBubble: {
    flex: 1,
  },
  replyPreviewInMessage: {
    flexDirection: 'row',
    marginBottom: mvs(8),
    paddingBottom: mvs(8),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  // Message Modal Styles
  messageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageModalContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    paddingVertical: mvs(8),
    minWidth: mvs(250),
    minHeight:mvs(120),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  messageModalOption: {
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F9',
  },
  messageModalOptionDelete: {
    borderBottomWidth: 0,
  },
  messageModalOptionRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Delete Confirmation Modal Styles
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(16),
    padding: mvs(24),
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  deleteModalTitle: {
    marginBottom: mvs(12),
    textAlign: 'center',
  },
  deleteModalMessage: {
    marginBottom: mvs(24),
    textAlign: 'center',
    lineHeight: mvs(20),
  },
  deleteModalButtons: {
    justifyContent: 'space-between',
    gap: mvs(12),
  },
  deleteModalCancelButton: {
    flex: 1,
    paddingVertical: mvs(12),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(40),
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteModalDeleteButton: {
    flex: 1,
    paddingVertical: mvs(12),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(40),
    borderWidth: 1,
    borderColor: '#FF5F57',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Call Log Styles
  callBubble: {
    paddingVertical: mvs(12),
    paddingHorizontal: mvs(12),
    backgroundColor: '#E6E8FF',
  },
  callBubbleSent: {
    backgroundColor: '#E6E8FF',
  },
  callBubbleReceived: {
    backgroundColor: '#ffffff',
  },
  callLogRow: {
    alignItems: 'center',
    marginBottom: mvs(4),
  },
  callIconContainer: {
    width: mvs(40),
    height: mvs(40),
    borderRadius: mvs(20),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mvs(12),
  },
  callLogContent: {
    // flex: 1,
    width:"100%",
  },
  // Plus Menu Inline Styles
  plusMenuInlineContainer: {
    backgroundColor: colors.white,
    paddingVertical: mvs(16),
    paddingHorizontal: mvs(16),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F9',
  },
  plusMenuRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  plusMenuOption: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusMenuIconContainer: {
    // width: mvs(50),
    // height: mvs(50),
    // borderRadius: mvs(25),
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: mvs(8),
  },
  // Media Styles
  mediaBubble: {
    padding: 0,
    overflow: 'hidden',
    maxWidth: mvs(250),
    borderRadius: mvs(8),
  },
  mediaImageContainer: {
    position: 'relative',
    width: mvs(250),
    height: mvs(200),
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: mvs(8),
  },
  mediaFooterContainer: {
    position: 'absolute',
    bottom: mvs(8),
    right: mvs(12),
    backgroundColor: 'transparent',
  },
  mediaTimestamp: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  videoPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -mvs(20)}, {translateY: -mvs(20)}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTextContainer: {
    paddingHorizontal: mvs(12),
    paddingTop: mvs(8),
    paddingBottom: mvs(4),
  },
  videoTextRow: {
    alignItems: 'center',
  },
  // File Styles
  fileBubble: {
    padding: mvs(12),
    maxWidth: mvs(280),
    minWidth: mvs(200),
  },
  fileRow: {
    alignItems: 'flex-start',
    width:'100%',
    marginBottom: mvs(8),
  },
  fileIconContainer: {
    marginRight: mvs(12),
    justifyContent: 'flex-start',
    paddingTop: mvs(2),
  },
  fileContent: {
    flex: 1,
    // width:"100%",
    // backgroundColor:'red',
    minWidth: 0,
  },
  downloadButton: {
    padding: mvs(4),
    // paddingRight: mvs(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileFooterContainer: {
    alignItems: 'flex-end',
    marginTop: mvs(4),
  },
  // Recording Bottom View Styles
  recordingBottomView: {
    backgroundColor: colors.white,
    paddingVertical: mvs(16),
    paddingHorizontal: mvs(16),
    borderTopWidth: 1,
    borderTopColor: '#F5F5F9',
  },
  recordingWaveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(40),
    marginBottom: mvs(12),
    paddingHorizontal: mvs(8),
  },
  recordingWaveformBar: {
    width: mvs(3),
    marginHorizontal: mvs(1),
    borderRadius: mvs(2),
    minHeight: mvs(4),
  },
  recordingControlsRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recordingCancelButton: {
    padding: mvs(8),
  },
  recordingDuration: {
    textAlign: 'center',
    marginTop: mvs(8),
    marginBottom: mvs(8),
  },
  recordingPauseButton: {
    // width: mvs(50),
    // height: mvs(50),
    borderRadius: mvs(25),
    // backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: mvs(12),
  },
  recordingSendButton: {
    // width: mvs(40),
    // height: mvs(40),
    borderRadius: mvs(20),
    // backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Voice Message Styles
  voiceBubble: {
    padding: mvs(12),
    // backgroundColor:'red',
    maxWidth: "80%",
    minWidth: "80%",
  },
  voiceMessageRow: {
    alignItems: 'center',
    marginBottom: mvs(8),
  },
  voicePlayButton: {
    padding: mvs(4),
    marginRight: mvs(8),
  },
  voiceWaveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(32),
    marginHorizontal: mvs(8),
  },
  voiceWaveformBar: {
    width: mvs(2),
    marginHorizontal: mvs(1),
    borderRadius: mvs(1),
    minHeight: mvs(4),
  },
  voiceDownloadButton: {
    padding: mvs(4),
    marginLeft: mvs(8),
  },
});
