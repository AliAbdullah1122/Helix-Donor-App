import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { mvs } from 'config/metrices';
import { colors } from 'config/colors';
import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { navigate } from 'navigation/navigation-ref';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

const HomeTab = () => {
  // Sample profile data
  const profiles = useMemo(
    () => [
      {
        id: 1,
        name: 'Nathan',
        age: 32,
        location: 'Denver, Colorado',
        flag: '🇺🇸',
        donorType: 'Donor (Offering: Sperm)',
        options: 'Private Donor, Donor + Co-Parenting',
        image: IMG.HomeImageOng,
        badge: 'Xytex',
        price: "$800.00 USD",
        mutualMatch: false,
        Subscription: false,
        hidebutton: false,
        userstatus:"free"
      },
      {
        id: 2,
        name: 'Sarah',
        age: 28,
        location: 'New York, New York',
        flag: '🇺🇸',
        donorType: 'Donor (Offering: Eggs)',
        options: 'Private Donor',
        image: IMG.HomeImagetwo,
        badge: 'New',
        price: "$800.00 USD",
        mutualMatch: false,
        Subscription: true,
        hidebutton: true,
          userstatus:"paid"
      },
      {
        id: 3,
        name: 'Lyon',
        age: 29,
        location: 'New York, New York',
        flag: '🇺🇸',
        donorType: 'Donor (Offering: Sperm)',
        options: 'Private Donor',
        image: IMG.HomeImagethree,
        badge: 'New',
        price: "$800.00 USD",
        mutualMatch: true,
        hidebutton: false,
        Subscription: true,
          userstatus:"free"
      },
      {
        id: 4,
        name: 'Lyon',
        age: 29,
        location: 'New York, New York',
        flag: '🇺🇸',
        donorType: 'Donor (Offering: Sperm)',
        options: 'Private Donor',
        image: IMG.HomeImagethree,
        badge: 'New',
        price: "$800.00 USD",
        mutualMatch: true,
        hidebutton: false,
        Subscription: true,
          userstatus:"paid"
      },
      {
        id: 5,
        name: 'Nathan',
        age: 32,
        location: 'Denver, Colorado',
        flag: '🇺🇸',
        donorType: 'Donor (Offering: Sperm)',
        options: 'Private Donor, Donor + Co-Parenting',
        image: IMG.HomeImageOng,
        badge: 'Xytex',
        price: "$800.00 USD",
        mutualMatch: false,
        Subscription: false,
        hidebutton: false,
          userstatus:"free"
      },
      {
        id: 6,
        name: 'Sarah',
        age: 28,
        location: 'New York, New York',
        flag: '🇺🇸',
        donorType: 'Donor (Offering: Eggs)',
        options: 'Private Donor',
        image: IMG.HomeImagetwo,
        badge: 'New',
        price: "$800.00 USD",
        mutualMatch: false,
        Subscription: true,
        hidebutton: true,
          userstatus:"paid"
      },
    ],
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);

  // Animation values
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Touch tracking
  const startX = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = (e) => {
    startX.current = e.nativeEvent.pageX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current) return;

    const currentX = e.nativeEvent.pageX;
    const deltaX = currentX - startX.current;

    // Only update if we're moving horizontally
    if (Math.abs(deltaX) > 10) {
      translateX.setValue(deltaX);

      // Add rotation effect - opposite direction for better visual
      const rotate = deltaX * 0.05;

      // Scale down slightly during swipe
      const scaleValue = 1 - Math.min(Math.abs(deltaX) / 500, 0.1);
      scale.setValue(scaleValue);
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const currentX = e.nativeEvent.pageX;
    const deltaX = currentX - startX.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        // LEFT SWIPE - Navigate to MatchMakingScreen
        swipeLeft();
      } else {
        // RIGHT SWIPE - Show next card
        swipeRight();
      }
    } else {
      // Not enough swipe - reset position
      resetCard();
    }
  };

  // Updated: Left swipe now navigates to MatchMakingScreen
  const swipeLeft = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      const nextSwipeCount = swipeCount + 1;
      setSwipeCount(nextSwipeCount);

      if (nextSwipeCount >= 5) {
        navigate("ResourcesScreen");
        setShowEmptyState(true);
      } else {
        // Move to next card or show empty state on LEFT swipe
        if (currentIndex < profiles.length - 1) {
          setCurrentIndex(currentIndex + 1);
          resetCard();
        } else {
          setShowEmptyState(true);
        }
      }
      // Reset for next time
      resetCard();
    });
  };

  // Updated: Right swipe now shows next card
  // const swipeRight = () => {
  //   Animated.parallel([
  //     Animated.timing(translateX, {
  //       toValue: SCREEN_WIDTH,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(opacity, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true,
  //     })
  //   ]).start(() => {
  //     const nextSwipeCount = swipeCount + 1;
  //     setSwipeCount(nextSwipeCount);

  //     if (nextSwipeCount >= 5) {
  //       navigate("ResourcesScreen");
  //       setShowEmptyState(true);
  //     } else {
  //       // Move to next card or show empty state on RIGHT swipe
  //       if (currentIndex < profiles.length - 1) {
  //         setCurrentIndex(currentIndex + 1);
  //         resetCard();
  //       } else {
  //         setShowEmptyState(true);
  //       }
  //     }
  //   });
  // };
const swipeRight = () => {
  Animated.parallel([
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
  ]).start(() => {
    // reset animation so card doesn’t stay off-screen
    resetCard();

    // navigate directly on right swipe
    navigate('MatchMakingScreen');
  });
};

  const resetCard = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      })
    ]).start();
  };

  const handleManualSwipeRight = () => {
    swipeRight();
  };

  const handleSecondLook = () => {
    setCurrentIndex(0);
    setSwipeCount(0);
    setShowEmptyState(false);
    resetCard();
  };

  const renderProfileCard = useCallback((item) => {
    const rotate = translateX.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp',
    });

    const cardStyle = {
      transform: [
        { translateX: translateX },
        { rotate: rotate },
        { scale: scale }
      ],
      opacity: opacity,
    };

    return (
      <Animated.View style={[styles.profileCardContainer, cardStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.profileCard}
          onPressIn={handleTouchStart}
          onPressOut={handleTouchEnd}
          onMoveShouldSetResponder={() => true}
          onResponderMove={handleTouchMove}
          onResponderRelease={handleTouchEnd}
        >
          <View style={styles.profileCard}>
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
              <Image
                source={item.image}
                style={styles.profileImage}
                resizeMode="cover"
              />
              {/* Rotate Icon - Top Left */}
              <TouchableOpacity style={styles.rotateIcon}>
                <IMG.Homerotateleft width={mvs(40)} height={mvs(40)} />
              </TouchableOpacity>

              {/* Profile Info Overlay - Bottom */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
                style={styles.profileInfoOverlay}>
                <TouchableOpacity onPress={() => navigate("ProfileDetailsHomeScreen", { item })}>
                  <Row style={{ alignItems: "center", }}>
                    <Bold
                      label={`${item.name}, ${item.age}`}
                      fontSize={mvs(28)}
                      color={colors.white}
                    />
                    {item.badge && (
                      <View style={styles.badgeContainer}>
                        <IMG.HomeBankCard width={mvs(12)} height={mvs(12)} />
                        <Regular
                          label={item?.badge}
                          fontSize={mvs(12)}
                          color={colors.white}
                          style={{ marginLeft: mvs(6) }}
                        />
                      </View>
                    )}
                  </Row>
                  <Row style={{ alignItems: 'center', justifyContent: "flex-start", marginTop: mvs(4) }}>
                    <IMG.HomeFlags width={mvs(20)} height={mvs(20)} />
                    <Medium
                      label={` ${item.location}`}
                      fontSize={mvs(24)}
                      color={colors.white}
                      style={{ marginLeft: mvs(4) }}
                    />
                  </Row>
                  <Medium
                    label={item.donorType}
                    fontSize={mvs(16)}
                    color={colors.white}
                    style={{ marginTop: mvs(4) }}
                  />
                  <Regular
                    label={item.options}
                    fontSize={mvs(14)}
                    color={colors.white}
                    style={{ marginTop: mvs(2) }}
                  />
                </TouchableOpacity>

                <Row style={{ marginTop: mvs(10), justifyContent: 'space-between', width: '100%' }}>
                  <Medium
                    label={'PRICE PER VIAL'}
                    fontSize={mvs(16)}
                    color={colors.white}
                    style={{ marginTop: mvs(4) }}
                  />
                  <Medium
                    label={item.price}
                    fontSize={mvs(16)}
                    color={colors.white}
                    style={{ marginTop: mvs(4) }}
                  />
                </Row>

                {/* Bid Now and Buy Now Buttons */}
                <Row style={styles.bidBuyButtonsContainer}>
                  <TouchableOpacity
                    style={styles.bidBuyButton}
                    onPress={() => { navigate("PrivateOfferScreen") }}
                  >
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Regular
                        label="Bid now"
                        fontSize={mvs(12)}
                        color={colors.primary || '#1E40AF'}
                        style={{ marginLeft: mvs(8) }}
                      />
                    </Row>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bidBuyButton}
                    onPress={() => { navigate("AuctionScreen") }}
                  >
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Regular
                        label="Buy Now"
                        fontSize={mvs(12)}
                        color={colors.primary || '#1E40AF'}
                        style={{ marginLeft: mvs(8), marginRight: mvs(8) }}
                      />
                    </Row>
                  </TouchableOpacity>
                </Row>
              </LinearGradient>
            </View>

            {/* Action Buttons - Half on card, half below */}
            <Row style={styles.actionButtonsContainer}>
              {/* Updated: This button now triggers right swipe (next card) */}
              <TouchableOpacity onPress={handleManualSwipeRight}>
                <IMG.HomeCardCross width={mvs(54)} height={mvs(54)} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate("MatchMakingScreen")}>
                <IMG.HomeCardIcon width={mvs(120)} height={mvs(120)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (item.mutualMatch) {
                    navigate("MainInboxScreen")
                  } else {
                    if (item?.Subscription) {
                      navigate("MainInboxScreen")
                    } else {
                      navigate("PremiumUnlockChatScreen")
                    }
                  }
                }}
              >
                <IMG.HomeCardMessage width={mvs(54)} height={mvs(54)} />
              </TouchableOpacity>
            </Row>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [currentIndex]);

  const renderEmptyState = () => {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <IMG.HoneNoData width={mvs(129)} height={mvs(151)} />
          <Medium
            label="No More Matches"
            fontSize={mvs(16)}
            color={"#333333"}
            style={{ marginTop: mvs(20) }}
          />
        </View>
        <View style={{ marginTop: mvs(100) }}>
          <Regular
            label="You've gone through all the profiles currently matching your preferences."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={"#333333"}
            style={styles.emptyParagraph}
          />
          <Regular
            label="Don't worry, someone great could be just around the corner."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={"#333333"}
            style={[styles.emptyParagraph, { marginTop: mvs(8) }]}
          />
        </View>

        <TouchableOpacity
          style={styles.primaryEmptyButton}
          onPress={handleSecondLook}>
          <Medium
            label="Take a Second Look"
            fontSize={mvs(16)}
            color={colors.white}
          />
        </TouchableOpacity>
        <Regular
          label="(Reloads profiles you passed on)"
          fontSize={mvs(14)}
          color={"#999999"}
          style={{ marginTop: mvs(6) }}
        />

        <TouchableOpacity onPress={() => navigate("SearchFilterScreen")} style={styles.secondaryEmptyButton}>
          <Medium
            label="Adjust Your Filters"
            fontSize={mvs(16)}
            color={colors.helixPrimary || colors.primary}
          />
        </TouchableOpacity>
        <Regular
          label="(Broaden your search criteria)"
          fontSize={mvs(14)}
          color={"#999999"}
          style={{ marginTop: mvs(6) }}
        />
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.helixBackground }}>
      <SafeAreaView style={{ marginBottom: Platform.OS === 'ios' ? mvs(-34) : 0 }} />
      <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Row style={styles.headerRow}>
          <IMG.HomeLogo width={mvs(100)} height={mvs(30)} />
          <Row style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigate("MainNotificationScreen")} style={{ marginRight: mvs(16) }}>
              <IMG.Homenotification width={mvs(24)} height={mvs(24)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("SearchFilterScreen")}>
              <IMG.HomeFilter width={mvs(24)} height={mvs(24)} />
            </TouchableOpacity>
          </Row>
        </Row>
      </View>

      {/* Profile Card or Empty State */}
      <View style={styles.cardContainer}>
        {!showEmptyState && profiles[currentIndex] ? (
          renderProfileCard(profiles[currentIndex])
        ) : (
          renderEmptyState()
        )}
      </View>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: mvs(12),
    paddingTop: mvs(20),
    paddingBottom: mvs(10),
    // backgroundColor: "#f4f4ff",
    backgroundColor: colors.helixBackground
  },
  headerRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    // height:mvs(617),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mvs(12),
  },
  profileCardContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    marginTop: mvs(4)
  },
  profileCard: {
    width: '100%',
    borderRadius: mvs(20),
    //  height: mvs(617),
    overflow: 'visible',
  },
  profileImageContainer: {
    width: '100%',
    height: mvs(617),
    position: 'relative',
    borderRadius: mvs(20),
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    opacity: 1, // 👈 reduce lightness
  },
  rotateIcon: {
    position: 'absolute',
    top: mvs(15),
    left: mvs(15),
    width: mvs(40),
    height: mvs(40),
    borderRadius: mvs(20),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  badgeContainer: {
    // position: 'absolute',
    // bottom: Platform.OS==='ios'? mvs(78): mvs(240),
    // right: Platform.OS==='ios'? mvs(0): mvs(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34862E',
    borderRadius: mvs(8),
    paddingHorizontal: mvs(10),
    height: mvs(30),
    paddingVertical: mvs(6),
    // marginTop:mvs(5),
    zIndex: 10,
  },
  profileInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(20),
    paddingTop: mvs(30),
    zIndex: 5,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? mvs(-55) : mvs(-65),
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    gap: mvs(0),
    zIndex: 20,
    paddingHorizontal: mvs(20),
  },
  bidBuyButtonsContainer: {
    marginTop: mvs(20),
    justifyContent: 'space-between',
    gap: mvs(12),
    marginBottom: mvs(50)
  },
  bidBuyButton: {
    height: mvs(30),
    width: mvs(86),
    borderRadius: mvs(20),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
    paddingHorizontal: mvs(12),
    paddingTop: mvs(60),
    paddingBottom: mvs(40),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyParagraph: {
    // marginHorizontal: mvs(12),
  },
  primaryEmptyButton: {
    marginTop: mvs(40),
    width: '90%',
    height: mvs(50),
    borderRadius: mvs(25),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryEmptyButton: {
    marginTop: mvs(20),
    width: '90%',
    height: mvs(50),
    borderRadius: mvs(25),
    borderWidth: 1,
    borderColor: colors.helixPrimary || colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});