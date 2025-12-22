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

const PrivateOfferScreen = props => {
  const [offerValue, setOfferValue] = useState('');
  const [showCharityModal, setShowCharityModal] = useState(false);
  const navigation = useNavigation();

  const handlePlaceOffer = () => {
    navigate("PlacePrivateOfferScreen")
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
            label="Donor Benefit"
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
              label="Asking Compensations"
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
          
          <View style={[styles.pricingRow, {marginTop: mvs(16)}]}>
             <Regular
                label="The donor is open to private proposals. Your offer will be sent directly for the review"
                 fontSize={mvs(14)}
                 numberOfLines={10}
              color={colors.textColorSecondary}
              />
           
            
            
          </View>
         
        </View>
        



        {/* Your Offer Section */}
     

        {/* Action Buttons */}
       
      </ScrollView>
       <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.placeOfferButton}
            onPress={handlePlaceOffer}>
            <Medium
              label="Make a Private Proposal"
              fontSize={mvs(16)}
              color={colors.white}
            />
          </TouchableOpacity>
          
         
        </View>

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

export default PrivateOfferScreen;
