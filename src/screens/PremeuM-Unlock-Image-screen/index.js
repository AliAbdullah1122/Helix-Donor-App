
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

const plans = [
  {
    id: '1',
    title: 'WEEKLY',
    price: '$29.99',
    sub: '/ week',
    popular: false,
    best: false,
  },
  {
    id: '2',
    title: 'MONTHLY',
    price: '$79.99',
    sub: '/ month',
    popular: true,
    best: false,
  },
  {
    id: '3',
    title: 'BEST',
    price: '$66',
    sub: '/ month',
    popular: false,
    best: true,
  },
];

const features = [
  {
    id: '1',
    text: 'View Adult/Current Photos',
    description: 'See what donors look like today.',
    icon: IMG.FilterResultCamera,
  },
  {
    id: '2',
    text: 'Global Travel Mode Search',
    description: 'Search globally (Dubai, London, NYC).',
    icon: IMG.searchNavigate,
  },
  {
    id: '3',
    text: 'Direct Messaging (No Match Req)',
    description: 'Message anyone, anytime.',
    icon: IMG.chatSvg,
  },
  {
    id: '4',
    text: 'Advanced Genetic Filters',
    description: 'Education, Height, Genetic History.',
    icon: IMG.ResourcesDna,
  },
  {
    id: '5',
    text: 'Second Look (Unlimited)',
    description: 'Second Look (Unlimited).',
    icon: IMG.preimumrotateleft,
  },
];

const PremiumUnlockImageScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('1');

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
  const subscribeText = `Subscribe for ${selectedPlanData?.price} ${selectedPlanData?.sub}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <Medium
          label="Helix Premium"
          fontSize={mvs(18)}
          color={"#404040"}
          style={styles.headerTitle}
        />
        <TouchableOpacity style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Chat Icon and Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.iconWrapper}>
            <IMG.PremiumCamera width={mvs(40)} height={mvs(40)} />
          </View>
          <View style={styles.titleTextWrapper}>
            <Medium
              label="Don't Wait to Match"
              fontSize={mvs(24)}
              color={colors.black}
              style={styles.titleText}
            />
            <Regular
              label="Unlock Direct Messaging to slide into anyone's DMs instantly."
              fontSize={mvs(13)}
              numberOfLines={10}
              color={colors.subteXTcOLOR}
              style={styles.subtitle}
            />
          </View>
        </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Choose Your Plan Title */}
      <Bold
        label="Choose Your Plan"
        fontSize={mvs(16)}
        color={colors.black}
        style={styles.planTitle}
      />

      {/* Plan List */}
      <FlatList
        horizontal
        data={plans}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.planList}
        renderItem={({item}) => {
          const isSelected = selectedPlan === item.id;
          return (
            <View
              style={[
                styles.planCardWrapper,
                isSelected && styles.planCardWrapperActive,
              ]}>
              {item.popular && (
                <View style={styles.popularBadge}>
                  <View style={styles.popularBadgeInner}>
                    <Text style={styles.popularText}>MOST POPULAR</Text>
                  </View>
                </View>
              )}
              {item.best && (
                <View style={styles.bestBadge}>
                  <View style={styles.bestBadgeInner}>
                    <Text style={styles.bestText}>BEST</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity
                onPress={() => setSelectedPlan(item.id)}
                style={styles.planCard}>
                <View style={styles.planCardInner}>
                  <Medium
                    label={item.title}
                    fontSize={mvs(14)}
                    color={colors.black}
                  />
                  <Bold
                    label={item.price}
                    fontSize={mvs(20)}
                    color={colors.black}
                    style={{marginTop: mvs(6)}}
                  />
                  <Regular
                    label={item.sub}
                    fontSize={mvs(12)}
                    color={colors.subteXTcOLOR}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* Features */}
      <View style={styles.featuresBox}>
        <Bold
          label="Unlock Everything Else:"
          fontSize={mvs(16)}
          color={colors.black}
          style={styles.featuresTitle}
        />
        {features.map(feature => {
          const IconComponent = feature.icon;
          return (
            <View key={feature.id} style={styles.featureItem}>
              <View style={styles.featureIconWrapper}>
                <IconComponent width={mvs(20)} height={mvs(20)} />
              </View>
              <View style={styles.featureTextWrapper}>
                <Regular
                  label={`• ${feature.text}`}
                  fontSize={mvs(13)}
                  color={colors.black}
                />
                <Regular
                  label={feature.description}
                  fontSize={mvs(11)}
                  color={colors.subteXTcOLOR}
                  style={styles.featureDescription}
                />
              </View>
            </View>
          );
        })}
      </View>

        {/* Subscribe Button */}
        <TouchableOpacity style={styles.subscribeBtn}>
          <Bold
            label={subscribeText}
            fontSize={mvs(15)}
            color={colors.white}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PremiumUnlockImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
    paddingHorizontal: mvs(20),
    paddingTop: mvs(40),
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: mvs(20),
    position: 'relative',
  },

  headerTitle: {
    textAlign: 'center',
  },

  closeBtn: {
    position: 'absolute',
    right: 0,
    width: mvs(30),
    height: mvs(30),
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    fontSize: mvs(20),
    color: colors.black,
    fontWeight: '300',
  },

  scrollContent: {
    paddingBottom: mvs(20),
  },

  titleSection: {
    width: '100%',
    // alignItems: 'center',
    marginTop: mvs(12),
  },

  iconWrapper: {
    width: mvs(72),
    height: mvs(72),
    borderRadius: mvs(36),
    // backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: mvs(12),
  },

  titleTextWrapper: {
    width: '100%',
    alignItems: 'flex-start',
  },

  titleText: {
    textAlign: 'left',
  },

  subtitle: {
    marginTop: mvs(6),
    textAlign: 'left',
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: mvs(10),
    // marginBottom: mvs(20),
  },

  planTitle: {
    width: '100%',
    // marginBottom: mvs(12),
  },

  planList: {
    marginTop: mvs(24),
    paddingTop: mvs(15),
    paddingBottom: mvs(10),
  },

  planCardWrapper: {
    marginRight: mvs(12),
    position: 'relative',
    padding: mvs(10),
    paddingHorizontal: mvs(10),
    width: mvs(140),
    height: mvs(150),
    borderRadius: mvs(20),
    borderColor: '#E5E7EB',
    alignItems: 'center',
    borderWidth: 1,
  },

  planCardWrapperActive: {
    borderColor: colors.primary,
  },

  planCard: {
    width: mvs(120),
    height: mvs(130),
    borderRadius: mvs(16),
    overflow: 'hidden',
  },

  planCardInner: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mvs(16),
  },

  popularBadge: {
    position: 'absolute',
    top: -mvs(10),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },

  popularBadgeInner: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(18),
    paddingVertical: mvs(8),
    borderRadius: mvs(12),
  },

  popularText: {
    fontSize: mvs(9),
    color: colors.white,
    fontWeight: '600',
  },

  bestBadge: {
    position: 'absolute',
    top: -mvs(6),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },

  bestBadgeInner: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(4),
    borderRadius: mvs(12),
  },

  bestText: {
    fontSize: mvs(9),
    color: colors.white,
    fontWeight: '600',
  },

  featuresBox: {
    // marginTop: mvs(20),
    // width: '100%',
  },

  featuresTitle: {
    marginBottom: mvs(12),
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: mvs(12),
  },

  featureIconWrapper: {
    width: mvs(24),
    height: mvs(24),
    marginRight: mvs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  featureTextWrapper: {
    flex: 1,
  },

  featureDescription: {
    marginTop: mvs(2),
  },

  subscribeBtn: {
    marginTop: mvs(30),
    marginBottom: mvs(30),
    width: '100%',
    height: mvs(50),
    borderRadius: mvs(25),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
