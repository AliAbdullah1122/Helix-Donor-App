import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useState} from 'react';
import {TouchableOpacity, View, ScrollView, StatusBar, Text, Image, TextInput} from 'react-native';
import styles from './styles';
import {colors} from 'config/colors';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {Row} from 'components/atoms/row';
import {ModalWrapper} from 'components/atoms/modal-wrapper';

const AuctionScreen = props => {
  const [offerValue, setOfferValue] = useState('');
  const [showCharityModal, setShowCharityModal] = useState(false);
  const navigation = useNavigation();

  const handlePlaceOffer = () => {
    // Add your place offer logic here
  };

  const handleBuyNow = () => {
    // Add your buy now logic here
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={mvs(24)} color={"#8C8C8C"} />
          </TouchableOpacity>
          <Bold
            label="Item"
            fontSize={mvs(18)}
            color={colors.black}
            style={styles.headerTitle}
          />
          <View style={{width: mvs(24)}} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Row style={styles.profileCardContent}>
            {/* Profile Image */}
            <Image
              source={IMG.HomeImageOng}
              style={styles.profileImage}
              resizeMode="cover"
            />
            
            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Row style={{alignItems: 'center', marginBottom: mvs(6)}}>
                <Bold
                  label="Nathan, 32"
                  fontSize={mvs(18)}
                  color={colors.black}
                />
                <View style={{marginLeft: mvs(8)}}>
                  <IMG.HomeFlags width={mvs(20)} height={mvs(20)} />
                </View>
              </Row>
              <Regular
                label="Denver, Colorado"
                fontSize={mvs(14)}
                color={colors.textColorSecondary || '#8C8C8C'}
                style={{marginBottom: mvs(8)}}
              />
              
              {/* Charity Badge */}
              <TouchableOpacity 
                style={styles.charityBadge}
                onPress={() => setShowCharityModal(true)}>
                <IMG.AuctionLogo height={mvs(12)} width={mvs(12)}/>
                <Regular
                  label="Donating to Charity"
                  fontSize={mvs(12)}
                  color={colors.primary}
                  style={{marginLeft: mvs(6)}}
                />
              </TouchableOpacity>
              
              {/* Offering Details */}
              <Row style={{justifyContent: 'space-between', marginTop: mvs(12), width: '100%'}}>
                <Bold
                  label="Offering"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <Regular
                  label="Sperm Vial"
                  fontSize={mvs(14)}
                  color={colors.textColorSecondary || '#8C8C8C'}
                />
              </Row>
            </View>
          </Row>
        </View>

        <View style={{width:"100%",height:mvs(1),backgroundColor:"#D9D9D9",marginVertical:mvs(2),marginBottom:mvs(18)}}>

        </View>

        {/* Pricing Details */}
        <View style={styles.pricingContainer}>
          <Row style={styles.pricingRow}>
            <Regular
              label="Buy Now Price"
              fontSize={mvs(16)}
              color={colors.primary}
            />
            <Regular
              label="$1,000.00"
              fontSize={mvs(16)}
              color={"#333333"}
            />
          </Row>
           <View style={{width:"100%",height:mvs(1),backgroundColor:"#D9D9D9",marginVertical:mvs(12),marginBottom:mvs(8)}}>

        </View>
          
          <Row style={[styles.pricingRow, {marginTop: mvs(16)}]}>
             <Regular
                label="Current Highest Offer"
                 fontSize={mvs(16)}
              color={colors.primary}
              />
            <Regular
              label="$850.00"
                  fontSize={mvs(16)}
              color={"#333333"}
            />
            
            
          </Row>
          <View style={{flex: 1}}>
             
              <Regular
                label="(4 offers total)"
                fontSize={mvs(14)}
                color={"#333333"}
                style={{marginTop: mvs(4)}}
              />
            </View>
        </View>
         <View style={{width:"100%",height:mvs(1),backgroundColor:"#D9D9D9",marginVertical:mvs(12),marginBottom:mvs(8)}}>

        </View>

        {/* Your Offer Section */}
        <View style={styles.offerSection}>
          <Medium
            label="YOUR OFFER"
            fontSize={mvs(14)}
            color={colors.textColorSecondary}
            style={styles.offerLabel}
          />
          <TextInput
            style={styles.offerInput}
            placeholder="Enter Offer"
            placeholderTextColor={"#D9D9D9" || '#8C8C8C'}
            value={offerValue}
            onChangeText={setOfferValue}
            keyboardType="numeric"
          />
          <Regular
            label="(Min. offer must be $860)"
            fontSize={mvs(14)}
            color={"333333" || '#8C8C8C'}
            style={"#333333"}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.placeOfferButton}
            onPress={handlePlaceOffer}>
            <Medium
              label="Place Your Offer"
              fontSize={mvs(16)}
              color={colors.white}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buyNowButton}
            onPress={handleBuyNow}>
            <Medium
              label="Buy Now for $1,000"
              fontSize={mvs(16)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Charity Modal */}
      <ModalWrapper
        visible={showCharityModal}
        onBackdropPress={() => setShowCharityModal(false)}
        onBackButtonPress={() => setShowCharityModal(false)}
        style={styles.charityModalContainer}>
        <View style={styles.charityModalContent}>
          {/* Header */}
          <Row style={styles.charityModalHeader}>
            <IMG.AuctionLogo width={mvs(24)} height={mvs(24)} />
            <Bold
              label="Donating to Charity"
              fontSize={mvs(18)}
              color={colors.textColor}
              style={{marginLeft: mvs(12)}}
            />
          </Row>

          {/* Body Text */}
          <Regular
            label="This individual has indicated they intend to donate all proceeds from this arrangement to a registered charity."
            fontSize={mvs(14)}
            numberOfLines={10}
            color={colors.textColorSecondary || '#8C8C8C'}
            style={styles.charityModalText}
          />

          {/* Dismiss Button */}
          <TouchableOpacity 
            style={styles.charityModalDismissButton}
            onPress={() => setShowCharityModal(false)}>
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

export default AuctionScreen;
