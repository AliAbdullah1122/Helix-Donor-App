import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {colors} from 'config/colors';
import {Row} from 'components/atoms/row';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const UploadPhotoScreen = props => {
  const navigation = useNavigation();
  
  // Sample photo data - in real app, this would come from props or state
  const currentPhotos = [
    {id: 1, image: IMG.HomeImageOng},
    {id: 2, image: IMG.HomeImageOng},
    {id: 3, image: IMG.HomeImageOng},
  ];

  const handleUploadCurrentPhoto = () => {
    // In real app, open image picker
  };

  const handleUploadBabyPhoto = () => {
    // In real app, open image picker
  };

  const handleDone = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      {/* Header */}
      <Row style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={mvs(24)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="My Photos" fontSize={mvs(18)} color={colors.textColor} />
        <View style={{width: mvs(24)}} />
      </Row>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Description Text */}
        <Regular
          label="Manage your public gallery. Drag to reorder. Tap a photo to replace or delete it."
          fontSize={mvs(14)}
          numberOfLines={10}
          color={colors.textColorSecondary || '#8C8C8C'}
          style={styles.descriptionText}
        />

        {/* CURRENT PHOTOS Section */}
        <View style={styles.section}>
          <Bold
            label="CURRENT PHOTOS"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.sectionTitle}
          />
          <Regular
            label="Visible to Premium users."
            fontSize={mvs(14)}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.sectionSubtitle}
          />
          
          {/* Photo Gallery */}
          <View style={styles.photoGallery}>
            {currentPhotos.map((photo, index) => (
              <TouchableOpacity
                key={photo.id}
                style={styles.photoThumbnail}
                activeOpacity={0.8}>
                <Image
                  source={photo.image}
                  style={styles.photoImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Upload Current Photo Button */}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadCurrentPhoto}
            activeOpacity={0.8}>
            <View style={styles.uploadButtonContent}>
              <IMG.UploadPhotoCloud width={mvs(52)} height={mvs(52)} />
              <Regular
                label="Upload Current Photo"
                fontSize={mvs(14)}
                color={colors.textColor}
                style={styles.uploadButtonText}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* BABY PHOTOS Section */}
        <View style={styles.section}>
          <Bold
            label="BABY PHOTOS"
            fontSize={mvs(14)}
            color={colors.black}
            style={styles.sectionTitle}
          />
          <Regular
            label="Visible to all users."
            fontSize={mvs(14)}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.sectionSubtitle}
          />

          {/* Upload Baby Photo Button */}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadBabyPhoto}
            activeOpacity={0.8}>
            <View style={styles.uploadButtonContent}>
              <IMG.UploadPhotoCloud width={mvs(24)} height={mvs(24)} />
              <Regular
                label="Upload Baby Photo"
                fontSize={mvs(14)}
                color={colors.black}
                style={styles.uploadButtonText}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Done Button */}
      <View style={styles.doneButtonContainer}>
        <PrimaryButton
          containerStyle={styles.doneButton}
          onPress={handleDone}
          title="Done"
        />
      </View>
    </View>
  );
};

export default UploadPhotoScreen;
