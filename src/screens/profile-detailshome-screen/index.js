import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {navigate} from 'navigation/navigation-ref';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ProfileDetailsHomeScreen = ({route}) => {

  const item = route?.params?.item;

  console.log(item);
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
        image: IMG.HomeImageOng, // PNG image
        badge: 'Xytex',
        price: '$800.00 USD',
        mutualMatch: false,
        Subscription: false,
      },
      {
        id: 2,
        name: 'Sarah',
        age: 28,
        location: 'New York, New York',
        flag: '🇺🇸',
        donorType: 'Donor (Offering: Eggs)',
        options: 'Private Donor',
        image: IMG.HomeImageOng, // PNG image
        badge: 'New',
        price: '$800.00 USD',
        mutualMatch: false,
        Subscription: true,
      },
      {
              id: 3,
              name: 'Lyon',
              age: 29,
              location: 'New York, New York',
              flag: '🇺🇸',
              donorType: 'Donor (Offering: Sperm)',
              options: 'Private Donor',
              image: IMG.HomeImageOng, // PNG image
              badge: 'New',
              price: "$800.00 USD",
                   mutualMatch: true,
              Subscription: true,
      },
    ],
    [],
  );

  const profile = item || {};
  console.log("object",item)
  // const profile = profiles[0];
  const images = useMemo(
    () => [
      profile.image,
      profile.image,
      profile.image,
      profile.image,
      profile.image,
    ],
    [profile.image],
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  // Relationship status – toggle these booleans based on actual state when wired up
  const isLiked = true;
  const isConnection = false;
  // Control blur vs scroll sections via prop
  const blurEnabled = route?.params?.blurEnabled ?? false;

  // Expand / collapse states for detail sections under blue card
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [physicalExpanded, setPhysicalExpanded] = useState(true);
  const [educationExpanded, setEducationExpanded] = useState(true);
  const [healthExpanded, setHealthExpanded] = useState(true);
  const [geneticExpanded, setGeneticExpanded] = useState(true);

  const handleImageScrollEnd = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentImageIndex(index);
  };

  const renderProfileCard = useCallback(() => null, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      {/* Top Image Carousel with Progress */}
      <View style={styles.topImageWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleImageScrollEnd}>
          {/* {images.map((img, index) => (
            <Image
              key={index}
              // source={img}
              source={img}
              style={styles.mainImage}
              resizeMode="cover"
            />
            
          ))} */}
          {images.map((img, index) => (
  <View key={index} style={styles.mainImage}>
    {typeof img === 'function' ? (
      // SVG component case
      (() => {
        const SvgIcon = img;
        return <SvgIcon width="100%" height="100%" />;
      })()
    ) : img?.uri ? (
      // Normal image
      <Image
        source={img}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
    ) : (
      // Fallback SVG
      <IMG.SearchImage2 width="100%" height="100%" />
    )}
  </View>
))}

          {/* {images.map((img, index) => (
  <View key={index} style={styles.mainImage}>
    {img ? (
      <Image
        source={img}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
    ) : (
      <PlaceholderSvg width="100%" height="100%" />
    )}
  </View>
))} */}

        </ScrollView>

        {/* Darken bottom of image like design */}
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.25)']}
          style={styles.imageGradient}
        />

        {/* Top overlay controls */}
        <Row style={styles.topOverlayRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigate('Home')}>
            <Icon name="chevron-back" size={mvs(22)} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowOptions(prev => !prev)}>
            <Icon
              name="ellipsis-horizontal"
              size={mvs(22)}
              color={colors.white}
            />
          </TouchableOpacity>
        </Row>

        {/* Relationship status pill */}
        {(isLiked || isConnection) && (
          <View style={styles.relationshipPill}>
            <Medium
              label={isLiked ? 'You Liked Their Profile' : 'Your Connection'}
              fontSize={mvs(14)}
              color={colors.white}
            />
          </View>
        )}

        {/* Options dropdown for Share / Block */}
        {showOptions && (
          <View style={styles.optionsMenu}>
            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.8}
              onPress={() => setShowOptions(false)}>
              <Row style={styles.optionContent}>
                <Medium
                  label="Share Profile"
                  fontSize={mvs(14)}
                  color={colors.white || '#1F2933'}
                  style={styles.optionText}
                />
                <IMG.ProfileDetailsShare width={mvs(18)} height={mvs(18)} />
              </Row>
            </TouchableOpacity>
            <View style={styles.optionDivider} />
            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.8}
              onPress={() => setShowOptions(false)}>
              <Row style={styles.optionContent}>
                <Medium
                  label="Block Nathan"
                  fontSize={mvs(14)}
                  color="#FF5F57"
                  style={styles.optionText}
                />
                <IMG.BlockProfileIcon width={mvs(18)} height={mvs(18)} />
              </Row>
            </TouchableOpacity>
          </View>
        )}

        {/* Progress bar */}
        <Row style={styles.progressRow}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentImageIndex && styles.progressDotActive,
              ]}
            />
          ))}
        </Row>
      </View>

      {/* Bottom blur behind blue card & buttons (only when blurEnabled) */}
      {/* <BlurView
         blurType="regular"
  blurAmount={22}
        style={styles.bottomBlur}
        pointerEvents="none"
      />
      <View
  style={styles.blurOverlay}
  pointerEvents="none"
/> */}
      {blurEnabled &&
        (Platform.OS === 'ios' ? (
          <>
            <BlurView
              blurType="regular"
              blurAmount={22}
              style={styles.bottomBlur}
              pointerEvents="none"
            />
            <View style={styles.blurOverlay} pointerEvents="none" />
          </>
        ) : (
          <View style={styles.androidBlurFallback} pointerEvents="none" />
        ))}

      {/* Profile content overlay */}
      <View style={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <View>
              <Bold
                label={`${profile.name}, ${profile.age}`}
                fontSize={mvs(28)}
                color={colors.white}
              />
              <Row style={{alignItems: 'center', marginTop: mvs(4)}}>
                <IMG.HomeFlags width={mvs(22)} height={mvs(16)} />
                <Medium
                  label={` ${profile.location}`}
                  fontSize={mvs(24)}
                  color={colors.white}
                  style={{marginLeft: mvs(4)}}
                />
              </Row>
            </View>
            {profile.badge && (
              <View style={styles.badgeContainer}>
                <IMG.HomeBankCard width={mvs(16)} height={mvs(16)} />
                <Regular
                  label={profile.badge}
                  fontSize={mvs(12)}
                  color={colors.white}
                  style={{marginLeft: mvs(6)}}
                />
              </View>
            )}
          </Row>

          <Medium
            label={profile.donorType}
            fontSize={mvs(16)}
            color={colors.white}
            style={{marginTop: mvs(8)}}
          />
          <Medium
            label={profile.options}
            fontSize={mvs(16)}
            color={colors.white}
            style={{marginTop: mvs(6)}}
          />
        </View>
        <Row
          style={{
            marginTop: mvs(0),
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Medium
            label={'PRICE PER VIAL'}
            fontSize={mvs(16)}
            color={colors.white}
            style={{marginTop: mvs(4)}}
          />
          <Medium
            label={profile.price}
            fontSize={mvs(16)}
            color={colors.white}
            style={{marginTop: mvs(4)}}
          />
        </Row>

        {/* Voice Intro label */}
        <View style={styles.voiceRow}>
          <Medium
            label={'Voice Intro'}
            fontSize={mvs(16)}
            color={colors.white}
          />
        </View>
        {/* Voice Intro player row */}
        <Row style={styles.voicePlayerRow}>
          <TouchableOpacity>
            <IMG.Audio width={mvs(378)} height={mvs(28)} />
          </TouchableOpacity>
          <View style={styles.voiceWavePlaceholder} />
          <Regular
            label={'00:20'}
            fontSize={mvs(12)}
            color={colors.white}
            style={{marginLeft: mvs(8)}}
          />
        </Row>
        <Row style={styles.bidBuyButtonsContainer}>
          <TouchableOpacity   onPress={() => {navigate("PrivateOfferScreen")}} style={styles.bidBuyButton}>
            <Row style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* <IMG.HomeCardCross width={mvs(20)} height={mvs(20)} /> */}
              <Regular
                label="Bid now"
                fontSize={mvs(12)}
                color={colors.primary || '#1E40AF'}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigate("AuctionScreen")}} style={styles.bidBuyButton}>
            <Row style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* <IMG.ResourcesDna width={mvs(20)} height={mvs(20)} /> */}
              <Regular
                label="Buy Now"
                fontSize={mvs(12)}
                color={colors.primary || '#1E40AF'}
                style={{marginLeft: mvs(8), marginRight: mvs(8)}}
              />
            </Row>
          </TouchableOpacity>
        </Row>

        {/* Bottom blue info sheet + scrollable detail sections
            - When blurEnabled: show ONLY the blue sheet (no scroll sections)
            - When blurEnabled is false: show blue sheet + scrollable sections */}
        {blurEnabled ? (
          <View style={styles.infoSheet}>
            <Row style={styles.infoTopRow}>
              <Regular
                label={"6' 1”"}
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Regular
                label={'170lbs'}
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Regular label={'O+'} fontSize={mvs(14)} color={colors.white} />
            </Row>
            <View
              style={{
                borderBottomWidth: 0.4,
                borderBottomColor: colors.white,
                height: mvs(1),
                width: '100%',
              }}
            />
            <Row style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Eye Color'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Blue'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Hair Color'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Brown'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
            </Row>
            <View
              style={{
                marginTop: mvs(6),
                borderBottomWidth: 0.4,
                borderBottomColor: colors.white,
                height: mvs(1),
                width: '100%',
              }}
            />

            <Row style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Education'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Occupation'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
              <View style={styles.infoColumn}>
                <Medium
                  label={'PhD (Currently enrolled)'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Research Assistant'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
            </Row>
            <View
              style={{
                marginTop: mvs(6),
                borderBottomWidth: 0.4,
                borderBottomColor: colors.white,
                height: mvs(1),
                width: '100%',
              }}
            />
          </View>
        ) : (
        <ScrollView
          style={styles.detailsScroll}
          contentContainerStyle={styles.detailsScrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Blue summary card at top of scroll */}
          <View style={styles.infoSheet}>
            <Row style={styles.infoTopRow}>
              <Regular
                label={"6' 1”"}
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Regular
                label={'170lbs'}
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Regular label={'O+'} fontSize={mvs(14)} color={colors.white} />
            </Row>
            <View
              style={{
                borderBottomWidth: 0.4,
                borderBottomColor: colors.white,
                height: mvs(1),
                width: '100%',
              }}
            />
            <Row style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Eye Color'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Blue'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Hair Color'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Brown'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
            </Row>
            <View
              style={{
                marginTop: mvs(6),
                borderBottomWidth: 0.4,
                borderBottomColor: colors.white,
                height: mvs(1),
                width: '100%',
              }}
            />

            <Row style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Education'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Occupation'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
              <View style={styles.infoColumn}>
                <Medium
                  label={'PhD (Currently enrolled)'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Research Assistant'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
            </Row>
            <View
              style={{
                marginTop: mvs(6),
                borderBottomWidth: 0.4,
                borderBottomColor: colors.white,
                height: mvs(1),
                width: '100%',
              }}
            />
          </View>

          {/* White expandable cards under blue section */}
          {/* ABOUT card */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAboutExpanded(prev => !prev)}>
              <Row style={styles.sectionHeader}>
                <Row style={{alignItems: 'center'}}>
                  <IMG.ProfileDetailUser width={mvs(16)} height={mvs(16)} />
                  <Bold
                    label="ABOUT"
                    fontSize={mvs(14)}
                    color={colors.primary}
                    style={{marginLeft: mvs(8)}}
                  />
                </Row>
                <Icon
                  name={aboutExpanded ? 'chevron-up' : 'chevron-down'}
                  size={mvs(18)}
                  color={colors.primary}
                />
              </Row>
            </TouchableOpacity>
            {aboutExpanded && (
              <View style={styles.sectionBody}>
                <Medium
                  label="In His Own Words"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginBottom: mvs(6),alignSelf: 'center'}}
                />
                <Regular
                  label="I was born in a big village in the Soviet Union. I spent my childhood between my farm and my school... When I look at my son, I understand more than ever that knowledge is the most valuable thing. I want my son to know how to live, how to love, and how to be happy."
                  fontSize={mvs(14)}
                  numberOfLines={10}
                  color={colors.primary}
                />

                <View
                  style={{
                    marginVertical: mvs(10),
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: '#E5E7EB',
                  }}
                />

                <Medium
                  label="Personality & Interests"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginBottom: mvs(8),alignSelf: 'center'}}
                />

                <Regular
                  label="Adjectives"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  numberOfLines={10}
                  style={{marginBottom: mvs(4)}}
                />
                <Regular
                  label="Smart, Flexible, Persevering (Determined)"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  numberOfLines={10}
                  style={{marginBottom: mvs(8)}}
                />

                <Regular
                  label="Favorite Hero"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  numberOfLines={10}
                  style={{marginBottom: mvs(4)}}
                />
                <Regular
                  label="Mother Theresa – she excelled in teaching and used all her resources to help, nourish, and educate the most disadvantaged."
                  fontSize={mvs(14)}
                  color={colors.primary}
                  numberOfLines={10}
                  style={{marginBottom: mvs(8)}}
                />

                <Regular
                  label="Hobbies & Interests"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  numberOfLines={10}
                  style={{marginBottom: mvs(4)}}
                />
                <Regular
                  label="Travel, Teaching, Movies"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  numberOfLines={10}
                />
              </View>
            )}
          </View>

          {/* PHYSICAL ATTRIBUTES card */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPhysicalExpanded(prev => !prev)}>
              <Row style={styles.sectionHeader}>
                <Row style={{alignItems: 'center'}}>
                  <IMG.ProfileDetailBicep width={mvs(16)} height={mvs(16)} />
                  <Bold
                    label="PHYSICAL ATTRIBUTES"
                    fontSize={mvs(14)}
                    color={colors.primary}
                    style={{marginLeft: mvs(8)}}
                  />
                </Row>
                <Icon
                  name={physicalExpanded ? 'chevron-up' : 'chevron-down'}
                  size={mvs(18)}
                  color={colors.primary}
                />
              </Row>
            </TouchableOpacity>
            {physicalExpanded && (
              <View style={styles.sectionBody}>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Height"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label={'6\' 0" (182.88 cm)'}
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Weight"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="154 lbs (69 kg)"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Body Build"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Medium"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Race"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="White Or Caucasian"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Ethnicity"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Kazakh, Russian"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Face Shape"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Oval"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Skin Tone"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Fair"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Eye Color"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Green/Grey"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Hair Color"
            fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Brown"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Hair Type"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Wavy"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Hair Texture"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Fine"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Hair Loss"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="None"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Beard Color"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Brown, Dark"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Eyebrows"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Medium"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Long Eyelashes"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular label="No"  fontSize={mvs(14)}
                    color={colors.primary} />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Hairy Chest"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular label="No"  fontSize={mvs(14)}
                    color={colors.primary} />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Hairy"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular label="No"  fontSize={mvs(14)}
                    color={colors.primary} />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Freckles"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="None"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Dimples"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular label="No"  fontSize={mvs(14)}
                    color={colors.primary} />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Lips"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Normal"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Nose Shape"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Normal"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Ear Lobes"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Detached"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Dominant Hand"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Right"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Shoe Size"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="8.5"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Acne"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular label="No"  fontSize={mvs(14)}
                    color={colors.primary} />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Acne Information"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular label="-"  fontSize={mvs(14)}
                    color={colors.primary} />
                </Row>
              </View>
            )}
          </View>

          {/* EDUCATION & CAREER card */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setEducationExpanded(prev => !prev)}>
              <Row style={styles.sectionHeader}>
                <Row style={{alignItems: 'center'}}>
                  <IMG.ProfileDetailEducation
                    width={mvs(16)}
                    height={mvs(16)}
                  />
                  <Medium
                    label="EDUCATION & CAREER"
                    fontSize={mvs(14)}
                    color={colors.primary}
                    style={{marginLeft: mvs(8)}}
                  />
                </Row>
                <Icon
                  name={educationExpanded ? 'chevron-up' : 'chevron-down'}
                  size={mvs(18)}
                  color={colors.primary}
                />
              </Row>
            </TouchableOpacity>
            {educationExpanded && (
              <View style={styles.sectionBody}>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Occupation"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Research Assistant"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Education Level"
                     fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                  />
                  <Regular
                    label="PhD (Currently enrolled)"
                     fontSize={mvs(14)}
                     numberOfLines={10}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Undergraduate"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                 
                </Row>
                 <Regular
                    label="Bachelor of Science, Economics (Graduated)"
                    fontSize={mvs(14)}
                    numberOfLines={10}
                    color={colors.primary}
                  />
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Graduate"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  
                </Row>
                <Regular
                    label="Master of Science, Finance (Graduated)"
                    fontSize={mvs(14)}
                    numberOfLines={10}
                    color={colors.primary}
                  />
                <Row style={styles.sectionRow}>
                  <Medium
                    label="PhD"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                 
                </Row>
                 <Regular
                 numberOfLines={10}
                    label="Economics (Currently enrolled)"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  />
              </View>
            )}
          </View>

          {/* HEALTH SUMMARY card */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHealthExpanded(prev => !prev)}>
              <Row style={styles.sectionHeader}>
                <Row style={{alignItems: 'center'}}>
                  <IMG.ProfileDetailEducationHealth
                    width={mvs(16)}
                    height={mvs(16)}
                  />
                  <Medium
                    label="HEALTH SUMMARY"
                    fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                    style={{marginLeft: mvs(8)}}
                  />
                </Row>
                <Icon
                  name={healthExpanded ? 'chevron-up' : 'chevron-down'}
                  size={mvs(18)}
                  color={colors.primary}
                />
              </Row>
            </TouchableOpacity>
            {healthExpanded && (
              <View style={styles.sectionBody}>
                <Medium
                  label="Birth & Childhood"
                   fontSize={mvs(14)}
                    color={colors.primary}
                  style={{alignSelf: 'center', marginBottom: mvs(8)}}
                />
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Carried to Term"
                fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Yes"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Pregnancy Complications"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular label="No"  fontSize={mvs(14)}
                    color={colors.primary} />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Birth Weight"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="7 lbs 11 ounces"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Birth Length"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="20 inches"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Childhood Health"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Excellent"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>

                <View
                  style={{
                    marginVertical: mvs(10),
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: '#E5E7EB',
                  }}
                />

                <Medium
                  label="Health Information"
                  fontSize={mvs(14)}
                    color={colors.primary}
                  style={{alignSelf: 'center', marginBottom: mvs(8)}}
                />
                <Row style={styles.sectionRow}>
                  <Medium
                    label="CMV Status"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Negative"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Eyesight Correction"
                  fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Yes, Nearsighted"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Hernia"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Yes"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Allergies"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="None Reported"
                     fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
                <Row style={styles.sectionRow}>
                  <Medium
                    label="Comments"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  <Regular
                    label="Donor has an inguinal hernia."
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </Row>
              </View>
            )}
          </View>

          {/* GENETIC PROFILE card */}
           <View style={[styles.sectionCard, {marginBottom: mvs(40)}]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setGeneticExpanded(prev => !prev)}>
              <Row style={styles.sectionHeader}>
                <Row style={{alignItems: 'center'}}>
                  <IMG.ProfileDetailGenetic width={mvs(16)} height={mvs(16)} />
                  <Medium
                    label="GENETIC PROFILE"
                  fontSize={mvs(14)}
                    color={colors.primary}
                    style={{marginLeft: mvs(8)}}
                  />
                </Row>
                <Icon
                  name={geneticExpanded ? 'chevron-up' : 'chevron-down'}
                  size={mvs(18)}
                  color={colors.primary}
                />
              </Row>
            </TouchableOpacity>
            {geneticExpanded && (
              <View style={styles.sectionBody}>
                <Row style={{alignItems: 'center', marginBottom: mvs(6)}}>
                  <Medium
                    label={'\u26A0  ADVISORY'}
                    fontSize={mvs(14)}
                    color={colors.primary || '#EAB308'}
                  />
                </Row>
                <Regular
                  label="This donor is a carrier of one or more genetic conditions."
                  fontSize={mvs(14)}
                    color={colors.primary}
                  numberOfLines={10}
                  style={{marginBottom: mvs(10)}}
                />

                <Medium
                  label="Expanded Carrier Screen (283 Genes)"
                  fontSize={mvs(14)}
                    color={colors.primary}
                  style={{
                    alignSelf: 'center',
                    marginBottom: mvs(10),
                  }}
                />

                <Medium
                  label="POSITIVE CARRIER STATUS"
                  fontSize={mvs(14)}
                    color={colors.primary}
                  style={{marginBottom: mvs(4)}}
                />
                <Regular
                  label="Limb-Girdle Muscular Dystrophy, Type 2A (CAPN3): Carrier"
                  fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                  style={{marginBottom: mvs(4)}}
                />
                <Regular
                  label="• One pathogenic variant, c.1465C>T, p.R489W, was detected."
                  fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                />
                <Regular
                  label="• Carriers are not expected to show symptoms."
                 fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                  style={{marginBottom: mvs(10)}}
                />

                <Medium
                  label="NEGATIVE RESULTS"
                  fontSize={mvs(11)}
                  color={colors.black}
                  style={{marginBottom: mvs(4)}}
                />
                <Regular
                  label="Cystic Fibrosis (CFTR): Reduced Risk"
                fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                />
                <Regular
                  label="Spinal Muscular Atrophy (SMN1): Reduced Risk (2 copies of SMN1 detected)"
                 fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                />
                <Regular
                  label="Tay-Sachs Disease (HEXA): Reduced Risk (Normal enzyme analysis)"
                 fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                />
                <Regular
                  label="Sickle Cell Disease (HBB): Reduced Risk"
                 fontSize={mvs(14)}
                    color={colors.primary}
                    numberOfLines={10}
                  style={{marginBottom: mvs(12)}}
                />

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{
                    marginTop: mvs(4),
                    backgroundColor: colors.primary,
                    borderRadius: mvs(22),
                    paddingVertical: mvs(10),
                    alignItems: 'center',
                  }}>
                  <Medium
                    label="Download Full Genetics Report"
                    fontSize={mvs(12)}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
         {/* Inline action buttons at end of scroll when blur is OFF */}
         <Row style={styles.actionButtonsRowInline}>
          <TouchableOpacity>
            <IMG.HomeCardCross width={mvs(54)} height={mvs(54)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IMG.HomeCardIcon width={mvs(122)} height={mvs(112)} />
          </TouchableOpacity>
  <TouchableOpacity
          onPress={() => {
                          if(item.mutualMatch){
                            
                            navigate("MainInboxScreen")
                          } else {
                            if (item?.Subscription) {
                              navigate("MainInboxScreen")
                            } else {
                              navigate("PremiumUnlockChatScreen")
                            }
                          }
                        }}>
            <IMG.HomeCardMessage width={mvs(54)} height={mvs(54)} />
          </TouchableOpacity>
        </Row>
         </ScrollView>
        )}

        {/* Bottom floating action buttons when blur is ON */}
        {blurEnabled && (
        <Row style={styles.actionButtonsRow}>
          <TouchableOpacity>
            <IMG.HomeCardCross width={mvs(54)} height={mvs(54)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IMG.HomeCardIcon width={mvs(122)} height={mvs(112)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IMG.HomeCardMessage width={mvs(54)} height={mvs(54)} />
          </TouchableOpacity>
        </Row>
        )}
      </View>
    </View>
  );
};

export default ProfileDetailsHomeScreen;

const styles = StyleSheet.create({
  topImageWrapper: {
    height: Dimensions.get('window').height,
    width: '100%',
    // backgroundColor:colors.white
  },
  mainImage: {
    width: SCREEN_WIDTH,
    height: Dimensions.get('window').height,
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // height: mvs(340),
    // stronger dark blur effect over bottom of image
    opacity: 10,
  },
  topOverlayRow: {
    position: 'absolute',
    top: mvs(40),
    left: mvs(10),
    right: mvs(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: mvs(4),
    backgroundColor: '#07060660',
    // backgroundColor: 'rgba(255,255,255,0.25)',

    borderRadius: mvs(8),
  },
  progressRow: {
    position: 'absolute',
    top: mvs(12),
    left: mvs(20),
    right: mvs(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressDot: {
    flex: 1,
    height: mvs(3),
    marginHorizontal: mvs(2),
    borderRadius: mvs(2),
    // backgroundColor: "whitee",
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressDotActive: {
    backgroundColor: colors.white,
  },
  bidBuyButtonsContainer: {
    marginTop: mvs(20),
    justifyContent: 'space-between',
    gap: mvs(12),
    // marginBottom:mvs(50)
    // width: '100%',
  },
  bidBuyButton: {
    // flex: 1,
    height: mvs(30),
    width: mvs(86),
    borderRadius: mvs(20),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -50,
    paddingHorizontal: mvs(10),
    paddingBottom: mvs(50), // space for bottom buttons
  },
  profileHeader: {
    marginBottom: mvs(16),
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27AE60',
    borderRadius: mvs(20),
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(4),
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: mvs(6),
  },
  voicePlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mvs(8),
  },
  voiceWavePlaceholder: {
    flex: 1,
    height: mvs(26),
    marginLeft: mvs(12),
    borderRadius: mvs(8),
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  infoSheet: {
    // marginTop: mvs(14),
    // height:mvs(238),

    // backgroundColor:"#3a3e90ab",
    // borderTopLeftRadius: mvs(24),
    // borderTopRightRadius: mvs(24),
    // borderRadius:mvs(24),
    // paddingHorizontal: mvs(20),
    // paddingTop: mvs(16),
    // paddingBottom: mvs(14),
    // marginTop: mvs(14),
    height: mvs(238),
    backgroundColor: '#3a3e90ab',
    borderRadius: mvs(24),
    // borderWidth: 1,
    // borderColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: mvs(20),
    paddingTop: mvs(16),
  },
  infoTopRow: {
    justifyContent: 'space-between',
    marginBottom: mvs(16),
    // borderBottomWidth:1,
    // borderBottomColor:colors.white
  },
  infoRow: {
    justifyContent: 'space-between',
    marginTop: mvs(12),
    // borderBottomWidth:1,
    borderBottomColor: colors.white,
  },
  infoColumn: {
    // flex: 1,
  },
  actionButtonsRow: {
    position: 'absolute',
    bottom: mvs(40),
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: mvs(24),
  },
  actionButtonsRowInline: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"black",

    columnGap: mvs(24),
    // marginTop: mvs(24),
    marginBottom: mvs(40),
  },
  actionButton: {
    width: mvs(60),
    height: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPrimary: {
    width: mvs(70),
    height: mvs(70),
    borderRadius: mvs(35),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bottomBlur: {
    position: 'absolute',
    // backgroundColor:'white',
    left: 0,
    right: 0,
    bottom: 0,
    height: mvs(120),
  },
  optionsMenu: {
    position: 'absolute',
    top: mvs(80),
    right: mvs(24),
    // Light glass effect like design – very subtle, not darkening whole screen
    // backgroundColor: 'rgba(255, 255, 255, 0.37)',
    // backgroundColor: 'rgba(255,255,255,0.3)',
    backgroundColor: '#07060660',
    borderRadius: mvs(16),
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(16),
    minWidth: SCREEN_WIDTH * 0.55,
    borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'rgba(255,255,255,0.4)',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.25,
    // shadowRadius: 8,
    // elevation: 6,
  },
  optionRow: {
    paddingVertical: mvs(6),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    flex: 1,
    marginLeft: mvs(8),
  },
  optionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white,
    marginHorizontal: -mvs(16),
  },
  relationshipPill: {
    position: 'absolute',
    top: mvs(40),
    alignSelf: 'center',
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(6),
    borderRadius: mvs(6),
    backgroundColor: '#07060660',
    // backgroundColor: 'rgba(255,255,255,0.25)'
  },

  //   bottomBlur: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: mvs(120),
  // },

  blurOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: mvs(120),
    backgroundColor: 'rgba(255,255,255,0.08)', // balanced frosted look
  },
  androidBlurFallback: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: mvs(120),
    backgroundColor: 'rgba(18, 17, 17, 0.81)', // THIS fixes blackish look
  },

  detailsScroll: {
    marginTop: mvs(12),
    maxHeight: mvs(230), // scrollable area starting under blue card
  },
  detailsScrollContent: {
    // paddingBottom: mvs(24),
    backgroundColor:'black',
    borderRadius:mvs(24)
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: mvs(18),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(12),
    marginTop: mvs(12),
  },
  sectionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionBody: {
    marginTop: mvs(10),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    paddingTop: mvs(10),
  },
  sectionRow: {
    justifyContent: 'space-between',
    marginTop: mvs(6),
  },
});
