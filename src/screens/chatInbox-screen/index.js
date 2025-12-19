import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ImagePicker from 'react-native-image-crop-picker';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Header1x2xChat from 'components/atoms/headers/header-1x-2x-chat';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Header1x2xChatInbox from 'components/atoms/headers/header-1x-2x-chat-inbox';
import {navigate} from 'navigation/navigation-ref';

const makeTextMessage = (txt, sent = true, replyTo = null) => ({
  id: Date.now().toString() + Math.random().toString(36).slice(2),
  type: 'text',
  text: txt,
  sent,
  time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
  status: sent ? 'Read' : undefined,
  replyTo,
});

export default function ChatDetailScreen() {
  const [message, setMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'text',
      text: 'Any updates',
      sent: true,
      time: '16:50',
      status: 'Read',
    },
    {
      id: '2',
      type: 'text',
      text: 'Can I come over?',
      sent: false,
      time: '16:50',
      status: 'Read',
    },
    {
      id: '3',
      type: 'text',
      text: 'Yes, just arrived. Waiting time has started — no one at the door yet.',
      sent: true,
      time: '16:50',
      status: 'Read',
    },
    {
      id: '4',
      type: 'date',
      date: 'Sat, 17/10',
    },
    {
      id: '5',
      type: 'text',
      text: 'Thanks. Keep us posted once you’re en route back.',
      sent: false,
      time: '09:45',
    },
  ]);

  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({animated: true});
      }, 50);
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = makeTextMessage(message.trim(), true, replyTo);
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
    setReplyTo(null);
  };

  const openCamera = async () => {
    navigate('ChatUploadScreen', {
      onImageCaptured: (imagePath) => {
        if (imagePath) {
          addImageMessage(imagePath, true);
        }
      },
    });
  };

  const openGallery = async () => {
    try {
      const img = await ImagePicker.openPicker({
        width: 800,
        height: 800,
        cropping: true,
      });
      if (img && img.path) {
        addImageMessage(img.path, true);
      }
    } catch (err) {
      console.log('Gallery cancelled or error', err);
    }
  };

  const addImageMessage = (imagePath, sent = true, reply = null) => {
    const msg = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      type: 'image',
      image: imagePath,
      sent,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: sent ? 'Read' : undefined,
      replyTo: reply,
    };
    setMessages(prev => [...prev, msg]);
    setReplyTo(null);
  };

 const shareLocation = async () => {
    navigate('ChatLocationScreen', {
      onLocationCaptured: (location) => {
        if (location) {
          const msg = {
            id: Date.now().toString(),
            type: 'location',
            coords: {latitude: location.latitude, longitude: location.longitude},
            sent: true,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            status: 'Read',
            replyTo,
          };
          setMessages(prev => [...prev, msg]);
          setReplyTo(null);
        }
      },
    });
  };

  const onSwipeReply = msg => {
    if (msg && msg.type && msg.type !== 'date') {
      setReplyTo(msg);
    }
  };

  const renderLeftAction = () => (
    <View style={styles.leftAction}>
      <Text style={{color: '#fff'}}>Reply</Text>
    </View>
  );

  const renderMessageItem = ({item}) => {
    if (item.type === 'date') {
      return (
        <View style={styles.dateRow}>
          <View style={styles.dateLine} />
          <Text style={styles.dateText}>{item.date}</Text>
          <View style={styles.dateLine} />
        </View>
      );
    }

    const isSent = !!item.sent;
    const avatar = IMG.chatvector;
    const nameLabel = isSent ? 'You' : 'Warehouse';

    const messageBody = (
      <View
        style={[
          styles.bubble,
          isSent ? styles.bubbleSent : styles.bubbleReceived,
        ]}>
        {item.replyTo && (
          <View
            style={[
              styles.quoted,
              isSent
                ? {backgroundColor: 'rgba(255,255,255,0.12)'}
                : {backgroundColor: '#FAFAFA'},
            ]}>
            <Text
              numberOfLines={1}
              style={[
                styles.quotedText,
                isSent ? {color: '#fff'} : {color: '#333'},
              ]}>
              {item.replyTo.text
                ? item.replyTo.text
                : item.replyTo.type === 'image'
                ? 'Photo'
                : 'Location'}
            </Text>
          </View>
        )}

        {item.type === 'text' && (
          <Text
            style={[
              styles.messageText,
              isSent ? {color: '#fff'} : {color: '#000'},
            ]}>
            {item.text}
          </Text>
        )}

        {item.type === 'image' && (
          <Image
            source={{uri: item.image}}
            style={styles.imageMessage}
            resizeMode="cover"
          />
        )}

        {item.type === 'location' && (
          <View style={styles.locationContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: item.coords.latitude,
                longitude: item.coords.longitude,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025,
              }}
              pointerEvents="none">
              <Marker coordinate={item.coords} />
            </MapView>
            <Text
              style={[
                styles.locationText,
                isSent ? {color: '#fff'} : {color: '#333'},
              ]}>
              📍 {item.coords.latitude.toFixed(5)},{' '}
              {item.coords.longitude.toFixed(5)}
            </Text>
          </View>
        )}

        {item.time && (
          <Text
            style={[
              styles.timeStamp,
              isSent ? {color: '#fff'} : {color: '#8E8E93'},
            ]}>
            {item.time} {item.status ? ` • ${item.status}` : ''}
          </Text>
        )}
      </View>
    );

    return (
      <Swipeable
        renderLeftActions={() => renderLeftAction()}
        onSwipeableLeftOpen={() => onSwipeReply(item)}
        overshootLeft={false}>
        <View style={styles.row}>
          {/* ✅ Only show avatar for warehouse replies */}
          {!isSent && (
            <View style={styles.avatarContainer}>
              {/* <Image
                resizeMode="contain"
                source={avatar}
                style={styles.avatar}
              /> */}
              <IMG.inboxaVATARsVG height={mvs(48)} width={mvs(48)}/>
            </View>
          )}

          <View style={{flex: 1}}>
            <Text style={styles.nameLabel}>{nameLabel}</Text>
            <View style={{alignItems: item.sent ? 'flex-end' : 'flex-start'}}>
              {messageBody}
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <Header1x2xChatInbox title={'Warehouse/Shop Name'} />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.bottomContainer}>
          {replyTo && (
            <View style={styles.replyPreview}>
              {/* ✅ Show avatar in reply preview if replying to warehouse */}
              {!replyTo.sent && (
                <View style={styles.avatarContainerSmall}>
                  {/* <Image source={IMG.chatvector} style={styles.avatarSmall} /> */}
                     <IMG.inboxaVATARsVG height={mvs(28)} width={mvs(28)}/>
                </View>
              )}
              <View style={{flex: 1}}>
                <Text style={styles.replyingLabel}>
                  {replyTo.sent ? 'Replying to you' : 'Replying to'}
                </Text>
                <Text numberOfLines={1} style={styles.replyingText}>
                  {replyTo.type === 'text'
                    ? replyTo.text
                    : replyTo.type === 'image'
                    ? 'Photo'
                    : 'Location'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setReplyTo(null)}
                style={styles.closeReply}>
                <Text style={{fontSize: 18}}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          <Row style={styles.inputRow}>
            <TouchableOpacity onPress={openCamera} style={styles.iconBtn}>
              {/* <Image
                source={IMG.Photo}
                style={styles.icon1}
                resizeMode="contain"
              /> */}

              <IMG.cameraSvg height={mvs(26)} width={mvs(26)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={styles.iconBtn}>
              {/* <Image
                source={IMG.Gallery}
                style={styles.icon2}
                resizeMode="contain"
              /> */}
               <IMG.GallerySvg height={mvs(22)} width={mvs(22)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareLocation} style={styles.iconBtn}>
              {/* <Image
                source={IMG.locationChat}
                style={styles.icon3}
                resizeMode="contain"
              /> */}
               <IMG.LocationSvg height={mvs(26)} width={mvs(26)} />
            </TouchableOpacity>

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type message here"
              placeholderTextColor="#A0A0A0"
              style={styles.textInput}
            />

            <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
              {/* <Image
                source={IMG.sendmESSAGE}
                style={styles.sendIcon}
                resizeMode="contain"
              /> */}

               <IMG.sendSVG height={mvs(36)} width={mvs(36)} />
            </TouchableOpacity>
          </Row>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  messageList: {
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(12),
    paddingBottom: mvs(16),
  },
  row: {flexDirection: 'row', alignItems: 'flex-start', marginVertical: mvs(6)},
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(48),
    width: mvs(48),
    backgroundColor: colors.primary,
    borderRadius: mvs(100),
    marginRight: mvs(8),
  },
  inputRow:{ alignItems: 'center' },
  avatar: {width: mvs(25), height: mvs(25)},
  avatarContainerSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(28),
    width: mvs(28),
    backgroundColor: colors.primary,
    borderRadius: mvs(100),
    marginRight: mvs(6),
  },
  avatarSmall: {width: mvs(16), height: mvs(16)},
  nameLabel: {fontSize: mvs(12), color: colors.primary, marginBottom: mvs(4)},
  bubble: {maxWidth: width * 0.72, padding: mvs(12), borderRadius: mvs(12)},
  bubbleSent: {backgroundColor: colors.primary, borderTopRightRadius: 4},
  bubbleReceived: {backgroundColor: '#F5F5F5', borderTopLeftRadius: 4},
  messageText: {fontSize: mvs(15), lineHeight: mvs(20)},
  timeStamp: {fontSize: mvs(11), marginTop: mvs(6), textAlign: 'right'},
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: mvs(12),
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: mvs(10),
  },
  dateText: {fontSize: mvs(12), color: '#A0A0A0'},
  quoted: {
    padding: mvs(6),
    borderLeftWidth: mvs(3),
    borderLeftColor: colors.primary,
    marginBottom: mvs(6),
    borderRadius: mvs(6),
  },
  quotedText: {fontSize: mvs(12)},
  imageMessage: {
    width: width * 0.6,
    height: width * 0.45,
    borderRadius: mvs(8),
    marginTop: mvs(6),
  },
  locationContainer: {
    borderRadius: mvs(8),
    overflow: 'hidden',
    marginTop: mvs(6),
  },
  map: {width: width * 0.6, height: mvs(120)},
  locationText: {fontSize: mvs(13), padding: mvs(8)},
  bottomContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(8),
  },
  iconBtn: {paddingHorizontal: mvs(4)},
  icon1: {width: mvs(26), height: mvs(26), tintColor: colors.primary},
  icon2: {width: mvs(21), height: mvs(21), tintColor: colors.primary},
  icon3: {width: mvs(27), height: mvs(27), tintColor: colors.primary},
    icon: {width: mvs(26), height: mvs(26), tintColor: colors.primary},

  textInput: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderRadius: mvs(25),
    paddingHorizontal: mvs(16),
    height: mvs(44),
    marginHorizontal: mvs(8),
    color: '#0F1828',
  },
  sendBtn: {paddingHorizontal: mvs(4)},
  sendIcon: {width: mvs(33), height: mvs(33), tintColor: colors.primary},
  replyPreview: {
    backgroundColor: '#FAFAFA',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: mvs(8),
    marginBottom: mvs(8),
    borderRadius: mvs(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyingLabel: {color: colors.primary, fontSize: mvs(12), fontWeight: '600'},
  replyingText: {fontSize: mvs(13), color: '#333'},
  closeReply: {paddingLeft: mvs(10)},
  leftAction: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: mvs(20),
    borderRadius: mvs(8),
    marginVertical: mvs(6),
  },
});
