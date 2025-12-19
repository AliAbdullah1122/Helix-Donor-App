

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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {navigate} from 'navigation/navigation-ref';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

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
        image: IMG.HomeImageOng, // PNG image
        badge: 'Xytex',
        price:"$800.00 USD",
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
        price:"$800.00 USD",

      },
    ],
    [],
  );

  const renderProfileCard = useCallback(({item}) => {
    return (
      <TouchableOpacity onPress={()=>navigate("ProfileDetailsHomeScreen")} style={styles.profileCardContainer}>
        {/* Profile Card */}
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
              <Bold
                label={`${item.name}, ${item.age}`}
                fontSize={mvs(28)}
                color={colors.white}
              />
              {item.badge && (
              <View style={styles.badgeContainer}>
                <IMG.HomeBankCard width={mvs(12)} height={mvs(12)} />
                <Regular
                  label={item.badge}
                  fontSize={mvs(12)}
                  color={colors.white}
                  style={{marginLeft: mvs(6)}}
                />
              </View>
            )}
              <Row style={{alignItems: 'center',justifyContent:"flex-start", marginTop: mvs(4)}}>
                <IMG.HomeFlags width={mvs(20)} height={mvs(20)} />
                <Medium
                  label={` ${item.location}`}
                  fontSize={mvs(24)}
                  color={colors.white}
                  style={{marginLeft: mvs(4)}}
                />
              </Row>
              <Medium
                label={item.donorType}
                fontSize={mvs(16)}
                color={colors.white}
                style={{marginTop: mvs(4)}}
              />
              <Regular
                label={item.options}
                fontSize={mvs(14)}
                color={colors.white}
                style={{marginTop: mvs(2)}}
              />

              <Row style={{marginTop:mvs(10), justifyContent: 'space-between', width: '100%'}}>
                <Medium
                label={'PRICE PER VIAL'}
                fontSize={mvs(16)}
                color={colors.white}
                style={{marginTop: mvs(4)}}
              />
                <Medium
                label={item.price}
                fontSize={mvs(16)}
                color={colors.white}
                style={{marginTop: mvs(4)}}
              />
              </Row>

              {/* Bid Now and Buy Now Buttons */}
              <Row style={styles.bidBuyButtonsContainer}>
                <TouchableOpacity style={styles.bidBuyButton}>
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
                <TouchableOpacity style={styles.bidBuyButton}>
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
            </LinearGradient>

            {/* Badge - Bottom Right, over profile info */}
            
          </View>

          {/* Action Buttons - Half on card, half below */}
          <Row style={styles.actionButtonsContainer}>
            <TouchableOpacity 
            // style={styles.actionButton}
            >
              <IMG.HomeCardCross width={mvs(54)} height={mvs(54)} />
            </TouchableOpacity>
            <TouchableOpacity
            //  style={styles.actionButtonPrimary}
             >
              <IMG.HomeCardIcon width={mvs(120)} height={mvs(120)} />
            </TouchableOpacity>
            <TouchableOpacity 
            // style={styles.actionButton}
            >
              <IMG.HomeCardMessage width={mvs(54)} height={mvs(54)} />
            </TouchableOpacity>
          </Row>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Row style={styles.headerRow}>
          <IMG.HomeLogo width={mvs(100)} height={mvs(30)} />
          <Row style={{alignItems: 'center'}}>
            <TouchableOpacity style={{marginRight: mvs(16)}}>
              <IMG.Homenotification width={mvs(24)} height={mvs(24)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <IMG.HomeFilter width={mvs(24)} height={mvs(24)} />
            </TouchableOpacity>
          </Row>
        </Row>
      </View>

      {/* Profile Cards List / Empty State */}
      {profiles && profiles.length > 0 ? (
        <FlatList
          data={profiles}
          renderItem={renderProfileCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.profileListContainer}
          removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          windowSize={5}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          showsVerticalScrollIndicator={false}>
          <View 
          // style={styles.emptyCard}
          >
            <IMG.HoneNoData width={mvs(129)} height={mvs(151)} />
            <Medium
              label="No More Matches"
              fontSize={mvs(16)}
              color={"#333333"}
              style={{marginTop: mvs(20)}}
            />
          </View>
<View style={{marginTop:mvs(100)}}>
          <Regular
            label="You've gone through all the profiles currently matching your preferences."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={colors.textColor}
            style={styles.emptyParagraph}
          />
          <Regular
            label="Don't worry, someone great could be just around the corner."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={colors.textColor}
            style={[styles.emptyParagraph, {marginTop: mvs(8)}]}
          />
            </View>

          <TouchableOpacity style={styles.primaryEmptyButton}>
            <Medium
              label="Take a Second Look"
              fontSize={mvs(16)}
              color={colors.white}
            />
          </TouchableOpacity>
          <Regular
            label="(Reloads profiles you passed on)"
            fontSize={mvs(12)}
            color={colors.placeholder}
            style={{marginTop: mvs(6)}}
          />

          <TouchableOpacity style={styles.secondaryEmptyButton}>
            <Medium
              label="Adjust Your Filters"
              fontSize={mvs(16)}
              color={colors.helixPrimary || colors.primary}
            />
          </TouchableOpacity>
          <Regular
            label="(Broaden your search criteria)"
            fontSize={mvs(12)}
            color={colors.placeholder}
            style={{marginTop: mvs(6)}}
          />
        
        </ScrollView>
      )}
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(15),
    paddingBottom: mvs(10),
    backgroundColor: colors.white,
  },
  headerRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileListContainer: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),
    paddingBottom: mvs(100),
  },
  profileCardContainer: {
    marginBottom: mvs(50),
    overflow: 'visible',
  },
  profileCard: {
    borderRadius: mvs(20),
    overflow: 'visible',
    position: 'relative',
  },
  profileImageContainer: {
    width: '100%',
    height: mvs(600),
    position: 'relative',
    borderRadius: mvs(20),
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  rotateIcon: {
    position: 'absolute',
    top: mvs(15),
    left: mvs(15),
    width: mvs(40),
    height: mvs(40),
    borderRadius: mvs(20),
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: mvs(238),
    right: mvs(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34862E',
    borderRadius: mvs(8),
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(6),
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
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: mvs(-55),
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    gap: mvs(0),
    zIndex: 10,
    paddingHorizontal: mvs(20),
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
  bidBuyButtonsContainer: {
    marginTop: mvs(20),
    justifyContent: 'space-between',
    gap: mvs(12),
    marginBottom:mvs(50)
    // width: '100%',
  },
  bidBuyButton: {
    // flex: 1,
    height: mvs(30),
    width:mvs(86),
    borderRadius: mvs(20),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
    paddingHorizontal: mvs(0),
    paddingTop: mvs(60),
    paddingBottom: mvs(40),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyCard: {
    width: '70%',
    height: mvs(180),
    borderRadius: mvs(24),
    // borderWidth: 1,
    // borderColor: '#E2E2F0',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.white,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.06,
    // shadowRadius: 8,
    // elevation: 2,
    marginBottom: mvs(24),
  },
  emptyParagraph: {
    // textAlign: 'center',
    marginHorizontal: mvs(10),
  },
  primaryEmptyButton: {
    marginTop: mvs(40),
    width: '90%',
    height: mvs(50),
    borderRadius: mvs(25),
    backgroundColor:colors.primary,
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
