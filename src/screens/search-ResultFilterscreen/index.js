import React, {useState, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {navigate} from 'navigation/navigation-ref';
import Icon from 'react-native-vector-icons/Ionicons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const SearchResultFilterScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedInfoBadge, setSelectedInfoBadge] = useState(null);
  const hasResults = false; // placeholder for future dynamic data

  // Active filters
  const activeFilters = useMemo(
    () => [
      {id: 1, label: "6'0\"-6'4\""},
      {id: 2, label: 'Eye: Blue'},
      {id: 3, label: 'CMV: Negative'},
      {id: 4, label: 'Negative'},
    ],
    [],
  );

  // Profile data
  const profiles = useMemo(
    () => [
      {
        id: 1,
        name: 'Nathan',
        age: 32,
        location: 'Denver, Colorado',
        image: IMG.SearchResultImg1,
        eyeColor: 'Blue',
        hairColor: 'Brown',
        height: "6' 1\"",
        weight: '170lbs',
        bloodType: 'O+',
        occupation: 'Architect',
        badges: ['Private Donor', 'CGT Screened', 'Future Contact', 'Biological Offspring'],
      },
      {
        id: 2,
        name: 'Ron',
        age: 35,
        location: 'Boston, Massachusetts',
        image: IMG.SearchResultImg2,
        eyeColor: 'Blue',
        hairColor: 'Brown',
        height: "5' 9\"",
        weight: '170lbs',
        bloodType: 'O+',
        occupation: 'Architect',
        badges: ['Xytex', 'CGT Screened', 'Future Contact', 'Biological Offspring'],
      },
      {
        id: 3,
        name: 'Sarah',
        age: 28,
        location: 'New York, New York',
        image: IMG.SearchResultImg2,
        eyeColor: 'Blue',
        hairColor: 'Brown',
        height: "5' 6\"",
        weight: '140lbs',
        bloodType: 'A+',
        occupation: 'Doctor',
        badges: ['Private Donor', 'CGT Screened', 'Future Contact', 'Biological Offspring'],
      },
    ],
    [],
  );

  const removeFilter = filterId => {
    // Handle filter removal
  };

  const getBadgeIconName = badge => {
    if (badge === 'Private Donor') return null;
    if (badge === 'CGT Screened') return 'flask-outline';
    if (badge === 'Future Contact') return 'camera-outline';
    if (badge === 'Biological Offspring') return 'leaf-outline';
    if (badge === 'Xytex') return 'business-outline';
    return null;
  };
const BADGE_SVGS = {
  'CGT Screened': IMG.screenedFlask,          // example svg
  'Future Contact': IMG.futureContact,
  'Biological Offspring': IMG.bbioloogicalOffspring,
  'Xytex': IMG.xytex,
};
const getBadgeIcon = (badge) => {
  return BADGE_SVGS[badge] || null;
};

  const getBadgeColor = badge => {
    if (badge === 'Private Donor') return '#8C8C8C';
    if (badge === 'CGT Screened') return '#ABEBF5';
    if (badge === 'Future Contact') return '#D7AEEF';
    if (badge === 'Biological Offspring') return '#B0E9B0';
    if (badge === 'Xytex') return colors.primary;
    return '#8C8C8C';
  };

  const handleInfoBadgePress = badge => {
    if (badge === 'CGT Screened') {
      setSelectedInfoBadge('CGT');
    } else if (badge === 'Future Contact') {
      setSelectedInfoBadge('FUTURE');
    } else if (badge === 'Biological Offspring') {
      setSelectedInfoBadge('BIO');
    }
  };

  // Matches near you data (for horizontal list at bottom)
  const matchesNearby = useMemo(
    () => [
      {
        id: 1,
        name: 'Ethan',
        age: 30,
        location: 'Boston, MA',
        image: IMG.SearchImage1,
        height: "6' 0\"",
        weight: '170lbs',
        bloodType: 'O+',
        occupation: 'Architect',
      },
      {
        id: 2,
        name: 'Liam',
        age: 29,
        location: 'Denver, CO',
        image: IMG.SearchImage2,
        height: "5' 11\"",
        weight: '165lbs',
        bloodType: 'O+',
        occupation: 'Architect',
      },
    ],
    [],
  );

  const renderProfileCard = ({item}) => {
    const ImageComponent = item.image;
    return (
      <View style={styles.profileCard}>
        {/* Top row: image + info */}
        <Row style={styles.profileTopRow}>
          <View style={styles.profileImageContainer}>
            <ImageComponent width="100%" height="100%" />
          </View>
          <View style={styles.profileContent}>
            <Row style={styles.profileHeader}>
              <View style={styles.profileHeaderLeft}>
                <Row style={styles.nameRow}>
                  <Medium
                    label={`${item.name}, ${item.age}`}
                    fontSize={mvs(18)}
                    color={colors.textColor}
                  />
                  <IMG.HomeFlags width={mvs(20)} height={mvs(14)} style={{marginLeft: mvs(6)}} />
                </Row>
                <Regular
                  label={item.location}
                  fontSize={mvs(14)}
                  color="#8C8C8C"
                  style={{marginTop: mvs(4)}}
                />
              </View>
              {/* <Icon name="flag-outline" size={mvs(18)} color={colors.primary} /> */}
            </Row>

            {/* Eye / Hair color row */}
            <Row style={styles.attributesContainer}>
              <View style={styles.attributeBlock}>
                <Bold
                  label="Eye Color"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                />
                <Regular
                  label={item.eyeColor}
                  fontSize={mvs(14)}
                  color={colors.textColorSecondary}
                  style={{marginTop: mvs(2)}}
                />
              </View>
              <View style={styles.attributeBlock}>
                <Bold
                  label="Hair Color"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                />
                <Regular
                  label={item.hairColor}
                  fontSize={mvs(14)}
                 color={colors.textColorSecondary}
                  style={{marginTop: mvs(2)}}
                />
              </View>
            </Row>

            {/* Height / Weight / Blood type row */}
            <Row style={styles.physicalRow}>
              <View style={styles.metricItem}>
                <Regular label={item.height} fontSize={mvs(14)} color={colors.textColorSecondary} />
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Regular label={item.weight} fontSize={mvs(14)} color={colors.textColorSecondary} />
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Regular label={item.bloodType} fontSize={mvs(14)} color={colors.textColorSecondary} />
              </View>
            </Row>

            {/* Occupation */}
            <Row style={styles.occupationRow}>
              <Icon name="briefcase-outline" size={mvs(14)} color={colors.textColorSecondary} />
              <Regular
                label={item.occupation}
                fontSize={mvs(14)}
                color={colors.textColorSecondary}
                style={{marginLeft: mvs(6)}}
              />
            </Row>
          </View>
        </Row>

        {/* Badges row under image (full width) */}
        <View style={styles.badgesContainer}>
          {item.badges.map((badge, index) => {
  const BadgeIcon = getBadgeIcon(badge);
            const badgeColor = getBadgeColor(badge);
            const isInfoBadge =
              badge === 'CGT Screened' ||
              badge === 'Future Contact' ||
              badge === 'Biological Offspring';
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={isInfoBadge ? 0.8 : 1}
                onPress={() => isInfoBadge && handleInfoBadgePress(badge)}>
                <View style={[styles.badge, {backgroundColor: badgeColor}]}>
                  {BadgeIcon && (
                    <BadgeIcon
                      // name={iconName}
                      size={mvs(18)}
                      color={colors.white}
                      style={{marginRight: mvs(4)}}
                    />
                    // <IMG.HomeFilter width={mvs(20)} height={mvs(20)} />
                  )}
                  <Regular label={badge} fontSize={mvs(12)} color={badge == "Xytex" || badge == "Private Donor" ? colors.white : '#404040'} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderMatchCard = ({item}) => {
    const ImageComponent = item.image;
    return (
      <View style={styles.matchCard}>
        <Row style={styles.matchTopRow}>
          <View style={styles.matchImageContainer}>
            <ImageComponent width={mvs(100)} height={mvs(128)} />
          </View>
          <View style={styles.matchInfoContainer}>
            <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
              <Medium
                label={`${item.name}, ${item.age}`}
                fontSize={mvs(18)}
                color={colors.textColor}
              />
              <IMG.HomeFlags width={mvs(20)} height={mvs(14)} />
            </Row>
            <Regular
              label={item.location}
              fontSize={mvs(14)}
              color="#8C8C8C"
              style={{marginTop: mvs(2)}}
            />
            <Regular
              label={`${item.height}   |   ${item.weight}   |   ${item.bloodType}`}
              fontSize={mvs(14)}
              color={colors.textColorSecondary}
              style={{marginTop: mvs(8),paddingVertical:mvs(5)}}
            />
            <Row style={styles.matchOccupationRow}>
              <Icon name="briefcase-outline" size={mvs(14)} color={colors.textColorSecondary} />
              <Regular
                label={item.occupation}
                fontSize={mvs(14)}
                color={colors.textColorSecondary}
                style={{marginLeft: mvs(6)}}
              />
            </Row>
          </View>
        </Row>
        <TouchableOpacity style={styles.matchXytexButton}>
          <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="business-outline" size={mvs(14)} color={colors.white} />
            <Regular
              label="Xytex"
              fontSize={mvs(12)}
              color={colors.white}
              style={{marginLeft: mvs(4)}}
            />
          </Row>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
          <SafeAreaView style={{ marginBottom:Platform.OS==='ios'? mvs(-40): 0,backgroundColor:Platform.OS==='ios'? "#FFFFFF":""}} />
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <IMG.SearchNew width={mvs(18)} height={mvs(18)}/>
          {/* <Icon name="search" size={mvs(20)} color="#8C8C8C" /> */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Ancestry, etc."
            placeholderTextColor={colors.placeholder}
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.searchDivider} />
          <TouchableOpacity onPress={() => navigate('SearchFilterScreen')}>
            <IMG.HomeFilter width={mvs(20)} height={mvs(20)} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Active Filters */}
        <View style={styles.filtersSection}>
          <Bold
            label="Active Filters"
            fontSize={mvs(16)}
            color={colors.textColor}
            style={styles.filtersTitle}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}>
            {activeFilters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={styles.filterChip}
                onPress={() => removeFilter(filter.id)}>
                <Regular
                  label={filter.label}
                  fontSize={mvs(12)}
                  color={colors.white}
                />
                <Icon
                  name="close"
                  size={mvs(14)}
                  color={colors.white}
                  style={{marginLeft: mvs(6)}}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
<View style={{backgroundColor:'#f2f2f7'}}>
        {/* Results Count */}
        <Regular
          label="Showing 14 results..."
          fontSize={mvs(14)}
          color="#8C8C8C"
          style={styles.resultsCount}
        />
</View>
        {!hasResults ? (
          <View >
            {/* Profile Cards */}
            <FlatList
              data={profiles}
              renderItem={renderProfileCard}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.profilesList}
            />

            {/* Matches near You horizontal list */}
            <View style={styles.matchesSection}>
              <Row style={styles.matchesHeader}>
                <Medium
                  label="Matches near You"
                  fontSize={mvs(16)}
                  color={colors.textColor}
                />
                <TouchableOpacity>
                  <Bold
                    label="View All"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </Row>
              <FlatList
                data={matchesNearby}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.matchesList}
                renderItem={renderMatchCard}
              />
            </View>
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <IMG.Nosearch width={mvs(80)} height={mvs(80)} />
            <Medium
              label="No donors found here"
              fontSize={mvs(16)}
              color={colors.textColor || colors.black}
              style={styles.emptyTitle}
            />
            <Regular
              label="We couldn't find any donors in this area matching your filters."
              fontSize={mvs(13)}
              numberOfLines={10}
              color={colors.textColorSecondary || '#8C8C8C'}
              style={styles.emptyDescription}
            />
            <Regular
              label="Try expanding your search area or adjusting your preferences."
              fontSize={mvs(13)}
              numberOfLines={10}
              color={colors.textColorSecondary || '#8C8C8C'}
              style={styles.emptyDescription}
            />
            <TouchableOpacity style={styles.emptyClearButton}>
              <Medium
                label="Clear All Filters"
                fontSize={mvs(14)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Show Map button */}
{/* {hasResults && ( */}
  <View style={styles.showMapWrapper}>
    <TouchableOpacity onPress={()=> navigate("SearchScreenResult")} activeOpacity={0.9} style={styles.showMapButton}>
      <Row style={{alignItems: 'center', justifyContent: 'center'}}>
        <IMG.Showmap width={mvs(18)} height={mvs(18)} />
        <Medium
          label="Show Map"
          fontSize={mvs(14)}
          color={colors.white}
          style={{marginLeft: mvs(8)}}
        />
      </Row>
    </TouchableOpacity>
  </View>
{/* )} */}


      {/* CGT Screened modal */}
      <ModalWrapper
        visible={selectedInfoBadge === 'CGT'}
        onBackdropPress={() => setSelectedInfoBadge(null)}
        onBackButtonPress={() => setSelectedInfoBadge(null)}
        style={styles.infoModalWrapper}>
        <View style={styles.infoModalCard}>
          <Row style={styles.infoModalHeader}>
            {/* <Icon name="flask-outline" size={mvs(20)} color={colors.primary} /> */}
            <IMG.CGTTestTube width={mvs(18)} height={mvs(18)}/>
            <Medium
              label="CGT Screened"
              fontSize={mvs(14)}
              color={colors.textColor || colors.black}
              style={{marginLeft: mvs(8)}}
            />
          </Row>
          <Regular
            label="Indicates the donor has undergone carrier testing for 525 genetic conditions."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.infoModalDescription}
          />
          <TouchableOpacity
            style={styles.infoModalButton}
            onPress={() => setSelectedInfoBadge(null)}>
            <Medium
              label="Dismiss"
              fontSize={mvs(16)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </ModalWrapper>

      {/* Future Contact modal */}
      <ModalWrapper
        visible={selectedInfoBadge === 'FUTURE'}
        onBackdropPress={() => setSelectedInfoBadge(null)}
        onBackButtonPress={() => setSelectedInfoBadge(null)}
        style={styles.infoModalWrapper}>
        <View style={styles.infoModalCard}>
          <Row style={styles.infoModalHeader}>
            {/* <Icon name="camera-outline" size={mvs(20)} color={colors.primary} />
             */}
             <IMG.CameraModal width={mvs(18)} height={mvs(18)}/>
            <Medium
              label="Future Contact"
              fontSize={mvs(14)}
              color={colors.textColor || colors.black}
              style={{marginLeft: mvs(8)}}
            />
          </Row>
          <Regular
            label="Indicates the donor agrees to the release of their identity once the child turns 18."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.infoModalDescription}
          />
          <TouchableOpacity
            style={styles.infoModalButton}
            onPress={() => setSelectedInfoBadge(null)}>
            <Medium
              label="Dismiss"
              fontSize={mvs(16)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </ModalWrapper>

      {/* Biological Offspring modal */}
      <ModalWrapper
        visible={selectedInfoBadge === 'BIO'}
        onBackdropPress={() => setSelectedInfoBadge(null)}
        onBackButtonPress={() => setSelectedInfoBadge(null)}
        style={styles.infoModalWrapper}>
        <View style={styles.infoModalCard}>
          <Row style={styles.infoModalHeader}>
            {/* <Icon name="leaf-outline" size={mvs(20)} color={colors.primary} /> */}
             <IMG.BiologicalModal width={mvs(18)} height={mvs(18)}/>
            <Medium
              label="Biological Offspring"
              fontSize={mvs(14)}
              color={colors.textColor || colors.black}
              style={{marginLeft: mvs(8)}}
            />
          </Row>
          <Regular
            label="Indicates the donor has biological    offspring or that one or more     clients has reported a pregnancy            and/or birth."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.infoModalDescription}
          />
          <TouchableOpacity
            style={styles.infoModalButton}
            onPress={() => setSelectedInfoBadge(null)}>
            <Medium
              label="Dismiss"
              fontSize={mvs(16)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default SearchResultFilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F5F9',
    backgroundColor:colors.helixBackground
  },
  searchContainer: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),
    paddingBottom: mvs(12),
    backgroundColor: colors.white,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: mvs(24),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: mvs(46),
  },
  searchInput: {
    flex: 1,
    marginLeft: mvs(12),
    fontSize: mvs(14),
    color: colors.inputText,
  },
  searchDivider: {
    width: 1,
    height: mvs(20),
    backgroundColor: '#E5E5E5',
    marginHorizontal: mvs(12),
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  filtersSection: {
    paddingLeft: mvs(20),
    paddingTop: mvs(16),
    paddingBottom: mvs(12),
    backgroundColor: "#f2f2f7",
  },
  filtersTitle: {
    marginBottom: mvs(12),
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingRight: mvs(20),
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(6),
    borderRadius: mvs(16),
    marginRight: mvs(8),
    // zIndex: 1,
  },
  resultsCount: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(12),
    paddingBottom: mvs(8),
    // backgroundColor: "",
  },
  profilesList: {
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(20),
  },
  matchesSection: {
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(20),
    // backgroundColor: colors.white,
    marginBottom:mvs(30)
  },
  matchesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: mvs(12),
  },
  matchesList: {
    paddingRight: mvs(20),
    marginVertical:mvs(10)
  },
  profileCard: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: mvs(24),
    padding: mvs(12),
    marginBottom: mvs(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    width: mvs(100),
    height: mvs(151),
    borderRadius: mvs(14),
    // backgroundColor:"red",
    // overflow: 'hidden',
    marginRight: mvs(12),
  },
  profileTopRow: {
    flexDirection: 'row',
  },
  profileContent: {
    flex: 1,
    // backgroundColor:"red"
  },
  profileHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileHeaderLeft: {
    flex: 1,
  },
  nameRow: {
    alignItems: 'center',
  },
  attributesContainer: {
    marginTop: mvs(8),
  },
  attributeBlock: {
    flex: 1,
  },
  physicalRow: {
    marginTop: mvs(8),
    alignItems: 'center',
    paddingHorizontal:mvs(10),
    paddingVertical:mvs(4)
  },
  metricItem: {
    paddingHorizontal: mvs(4),
  },
  metricDivider: {
    width: 1,
    height: mvs(14),
    backgroundColor: '#D4D4D4',
    marginHorizontal: mvs(8),
  },
  occupationRow: {
    alignItems: 'center',
    marginTop: mvs(8),
    justifyContent:"flex-start"
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: mvs(12),
    gap: mvs(6),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(6),
    borderRadius: mvs(16),
    marginRight: mvs(6),
  },
  infoModalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:mvs(24)
  },
  infoModalCard: {
    // width: SCREEN_WIDTH - mvs(40),
    width:mvs(273),
    backgroundColor: colors.white,
    borderRadius: mvs(24),
    paddingVertical: mvs(24),
    paddingHorizontal: mvs(20),
  },
  infoModalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: mvs(12),
  },
  infoModalDescription: {
    textAlign: 'center',
    marginTop: mvs(8),
    marginBottom: mvs(24),
    lineHeight:mvs(16.8),
  },
  infoModalButton: {
    alignSelf: 'center',
    paddingHorizontal: mvs(32),
    paddingVertical: mvs(12),
    borderRadius: mvs(24),
    borderWidth: 1.8,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  matchCard: {
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    padding: mvs(12),
    marginRight: mvs(12),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  matchTopRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  matchImageContainer: {
    width: mvs(100),
    height: mvs(128),
    borderRadius: mvs(14),
    overflow: 'hidden',
    marginRight: mvs(12),
  },
  matchInfoContainer: {
    flex: 1,
    marginTop:mvs(2)
  },
  matchOccupationRow: {
    marginTop: mvs(6),
    alignItems: 'center',
    justifyContent:"flex-start"
  },
  matchXytexButton: {
    marginTop: mvs(10),
    backgroundColor: '#34862E',
    borderRadius: mvs(20),
    paddingVertical: mvs(8),
    width:"40%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: mvs(32),
    paddingVertical: mvs(60),
  },
  emptyTitle: {
    marginTop: mvs(24),
    marginBottom: mvs(8),
    textAlign: 'center',
  },
  emptyDescription: {
    textAlign: 'center',
    marginTop: mvs(4),
  },
  emptyClearButton: {
    marginTop: mvs(24),
    paddingHorizontal: mvs(40),
    paddingVertical: mvs(12),
    borderRadius: mvs(24),
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  showMapWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: mvs(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: mvs(40),
    paddingVertical: mvs(10),
    borderRadius: mvs(24),
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
