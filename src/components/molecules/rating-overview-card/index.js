import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import * as IMG from 'assets/images';
import Regular from 'typography/regular-text';


const RatingOverview = ({isExpanded}) => {
  const ratingData = {
    overallRating: '4.7',
    totalReviews: '40 admin reviews',
    starDistribution: [
      { stars: 5, percentage: 89 },
      { stars: 4, percentage: 89 },
      { stars: 3, percentage: 22 },
      { stars: 2, percentage: 37 },
      { stars: 1, percentage: 15 },
    ]
  };

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // const renderStars = () => {
  //   const stars = [];

  //   // full stars
  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <Image
  //         key={`full-${i}`}
  //         source={IMG.ratingstar}
  //         style={styles.star}
  //   resizeMode = {'contain'}

  //       />
  //     );
  //   }

  //   // half star
  //   if (hasHalfStar) {
  //     stars.push(
  //       <Image
  //         key="half"
  //         source={IMG.ratinghalfstar}
  //         style={styles.star}
  //   resizeMode = {'contain'}

  //       />
  //     );
  //   }

  //   // empty stars
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(
  //       <Image
  //         key={`empty-${i}`}
  //         source={IMG.ratinghalfstar} // 👈 make sure you have this image in your assets
  //         style={styles.star}
  //       />
  //     );
  //   }

  //   return stars;
  // };


  const renderStars = () => {
  const stars = [];

  // full stars
  for (let i = 0; i < fullStars; i++) {
    const Filled = IMG.starfilledSvg;
    stars.push(
      <Filled
        key={`full-${i}`}
        width={mvs(17)}
        height={mvs(17)}
        style={styles.star}
      />
    );
  }

  // half star
  if (hasHalfStar) {
    const Half = IMG.starUnfilledSvg;
    stars.push(
      <Half
        key="half"
        width={mvs(17)}
        height={mvs(17)}
        style={styles.star}
      />
    );
  }

  // empty stars
  for (let i = 0; i < emptyStars; i++) {
    const Empty = IMG.starUnfilledSvg;
    stars.push(
      <Empty
        key={`empty-${i}`}
        width={mvs(17)}
        height={mvs(17)}
        style={styles.star}
      />
    );
  }

  return stars;
};

  return (
    <View style={styles.starContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' ,backgroundColor:colors.starbg, padding: mvs(10), borderRadius: mvs(10),marginVertical:mvs(5)}}>
        {renderStars()}
      </View>
      <Regular style={{fontWeight:'400'}} fontSize={mvs(12)} label={"4.7 out of 5"} color={colors.grey} />
    </View>
  );
};

  const ProgressBar = ({ percentage }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill,
              { width: `${percentage}%` }
            ]} 
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Medium style={styles.title} fontSize={mvs(18)} label='Rating Overview' color={colors.titleTextColor} />
      
      {/* Overall Rating Section */}
      <View style={styles.overallRatingContainer}>
        <StarRating rating={4.7} />
        <Regular style={styles.reviewCount} label={ratingData.totalReviews} />
      </View>

      {/* Star Distribution */}
     {/* Star Distribution (Hide when bottom sheet expanded) */}
{!isExpanded && (
  <View style={styles.distributionContainer}>
    {ratingData.starDistribution.map((item, index) => (
      <View key={item.stars} style={styles.distributionRow}>
        <Medium style={styles.starLabel} label={`${item.stars} Star`} />
        <ProgressBar percentage={item.percentage} />
        <Medium style={styles.percentageText} label={`${item.percentage}%`} />
      </View>
    ))}
  </View>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(10),
    borderRadius: mvs(12),
    marginHorizontal: mvs(16),
    marginVertical: mvs(10)
  },
  title: {
    fontSize: mvs(20),
    textAlign: 'center',
  },
  overallRatingContainer: {
    alignItems: 'center',
    // marginBottom: 24,
    paddingBottom: mvs(20),
    // borderBottomWidth: 1,
    // borderBottomColor: '#e6e6e6',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 8,
  },
  overallRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginRight: 4,
  },
  outOfText: {
    fontSize: 16,
    color: '#666666',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    fontSize: 20,
    color: colors.primary,
    marginRight: 8,
    letterSpacing: 1,
  },
  ratingText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: mvs(12),
    color: colors.subteXTcOLOR,
    fontweight: '400',
  },
  distributionContainer: {
    width: '100%',
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    height: 24,
  },
  starLabel: {
    width: mvs(50),
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  progressBarContainer: {
    flex: 1,
    // marginHorizontal: 3,
  },
  progressBarBackground: {
    height: mvs(13),
    backgroundColor: colors.barbg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: mvs(13),
  },
  percentageText: {
    width: mvs(40),
    fontSize: 13,
    color: colors.titleTextColor,
    fontWeight: '500',
    textAlign: 'right',
  },
    starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: mvs(17),
    height: mvs(17),
    marginLeft: mvs(4),
  },
  ratingText: {
    marginLeft: mvs(8),
    fontSize: mvs(14),
    color: '#000',
  },
});

export default RatingOverview;