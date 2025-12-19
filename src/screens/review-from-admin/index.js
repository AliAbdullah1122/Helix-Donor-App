import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import * as IMG from 'assets/images';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import RatingOverview from 'components/molecules/rating-overview-card';
import styles from './styles';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { Row } from 'components/atoms/row';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

const ReviewFromAdminScreen = () => {
  const bottomSheetRef = useRef(null);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const snapPoints = useMemo(() => ['52%', '75%'], []);

  const handleSheetChange = useCallback((index) => {
    setIsSheetExpanded(index === 1);
  }, []);

  const [activeFilter, setActiveFilter] = useState('All');
  
  const reviewsData = [
    {
      id: 1,
      orderNumber: 'Order#12433',
      comment: 'Overall great performance. Just ensure that delivery photos are clearer and more consistent. Keep up the good punctuality and positive attitude.',
      rating: 'Good',
      stars: 5,
    },
    {
      id: 2,
      orderNumber: 'Order#12437',
      comment: 'Deliveries are mostly good, but the last 2 shifts had missed status updates. Please improve the response time and follow proper drop-off SOP.',
      rating: 'Excellent',
      stars: 5,
    },
    {
      id: 3,
      orderNumber: 'Order#12432',
      comment: 'Delivery attempt was unsuccessful. The delivery agent did not complete the task.',
      rating: '',
      stars: 2,
    },
    {
      id: 4,
      orderNumber: 'Order#12437',
      comment: 'Deliveries are mostly good, but the last 2 shifts had missed status updates. Please improve the response time and follow proper drop-off SOP.',
      rating: 'Excellent',
      stars: 4,
    },
    {
      id: 5,
      orderNumber: 'Order#12437',
      comment: 'Average performance. Room for improvement in communication.',
      rating: 'Average',
      stars: 3,
    },
    {
      id: 6,
      orderNumber: 'Order#12437',
      comment: 'Poor performance. Multiple issues reported.',
      rating: 'Poor',
      stars: 1,
    },
  ];

  // Filter function based on active filter
  const filteredReviews = useMemo(() => {
    if (activeFilter === 'All') {
      return reviewsData;
    }
    
    const starNumber = parseInt(activeFilter.charAt(0)); // Extract number from "5 Star", "4 Star", etc.
    return reviewsData.filter(review => review.stars === starNumber);
  }, [activeFilter, reviewsData]);

  // const RatingStars = ({ count }) => (
  //   <View style={{ flexDirection: 'row', marginTop: mvs(4) }}>
  //     {Array.from({ length: count }).map((_, i) => (
  //       <Image
  //         key={i}
  //         source={IMG.ratingstar}
  //         style={{
  //           width: mvs(18),
  //           height: mvs(18),
  //           marginRight: mvs(10),
  //         }}
  //       />
  //     ))}
  //   </View>
  // );
  const RatingStars = ({ count }) => (
  <View style={{ flexDirection: 'row', marginTop: mvs(4) }}>
    {[1, 2, 3, 4, 5].map((star) => {
      const StarIcon =
        star <= count
          ? IMG.starfilledSvg
          : IMG.starUnfilledSvg;

      return (
        <StarIcon
          key={star}
          width={mvs(18)}
          height={mvs(18)}
          style={{ marginRight: mvs(10) }}
        />
      );
    })}
  </View>
);


  const FilterButton = ({ title }) => {
    const isActive = activeFilter === title;
    return (
      <TouchableOpacity
        onPress={() => setActiveFilter(title)}
        style={[
          styles.filterButton,
          isActive && styles.activeFilterButton,
        ]}>
        <Text
          style={[
            styles.filterButtonText,
            isActive && styles.activeFilterButtonText,
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
      <Header1x2x title={'Reviews from Admin'} />

      {/* Top Card */}
      <View style={styles.topCard}>
        <RatingOverview isExpanded={isSheetExpanded} />
      </View>

      {/* Gorhom Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backgroundStyle={{
          backgroundColor: colors.white,
          borderTopLeftRadius: mvs(20),
          borderTopRightRadius: mvs(20),
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: mvs(15) }}
          showsVerticalScrollIndicator={false}>
          <Bold
            label={'All Reviews'}
            fontSize={mvs(15)}
            color={colors.titleTextColor}
            style={{ fontWeight: '700', marginBottom: mvs(10) }}
          />
          
          {/* Filter Buttons */}
          <BottomSheetView>
  <BottomSheetScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      flexDirection: 'row',
      paddingVertical: mvs(5),
      paddingRight: mvs(20),
    }}
  >
    {['All', '5 Star', '4 Star', '3 Star', '2 Star', '1 Star'].map(item => (
      <FilterButton key={item} title={item} />
    ))}
  </BottomSheetScrollView>
</BottomSheetView>


          {/* Display count of filtered results */}
          <Regular
            label={`Showing ${filteredReviews.length} review${filteredReviews.length !== 1 ? 's' : ''}`}
            fontSize={mvs(12)}
            color={colors.textGray}
            style={{ marginVertical: mvs(8) }}
          />

          {/* Filtered Reviews */}
          {filteredReviews.map(item => (
            <View key={item.id} style={styles.reviewCard}>
              <Medium
                fontSize={mvs(15)}
                style={styles.orderText}
                label={item.orderNumber}
              />
              <Regular
                style={styles.commentText}
                label={item.comment}
                numberOfLines={100}
              />
              {item.rating ? (
                <Row style={{ marginTop: mvs(10) }}>
                  <View style={styles.ratingTag}>
                    <Medium
                      fontSize={mvs(13)}
                      style={styles.ratingTagText}
                      label={item.rating}
                    />
                  </View>
                  <RatingStars count={item.stars} />
                </Row>
              ) : null}
            </View>
          ))}
          
          {/* Show message when no reviews match filter */}
          {filteredReviews.length === 0 && (
            <View style={styles.noResults}>
              <Regular
                label="No reviews found for this filter"
                fontSize={mvs(14)}
                color={colors.textGray}
                style={{ textAlign: 'center', marginTop: mvs(20) }}
              />
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default ReviewFromAdminScreen;