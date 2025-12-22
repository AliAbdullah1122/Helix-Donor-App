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

const PlaceNormalOfferScreen = props => {
  const [offerValue, setOfferValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [showCharityModal, setShowCharityModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const navigation = useNavigation();

  const handlePlaceOffer = () => {
    navigate("PlaceIncreaseOfferScreen")
    // setShowSubmitModal(true);
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
            label="Place Your Offer"
            fontSize={mvs(18)}
            color={colors.black}
            style={styles.headerTitle}
          />
          <View style={{width: mvs(24)}} />
        </View>

     

        {/* <View style={{width:"100%",height:mvs(1),backgroundColor:"#D9D9D9",marginVertical:mvs(2),marginBottom:mvs(18)}}>

        </View> */}

        {/* Pricing Details */}
        <View style={styles.pricingContainer}>
        
          
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
        



        {/* Your Compensation Offer Section */}
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
            color={"#333333" || '#8C8C8C'}
            // style={"#333333"}
          />
        </View>
        {/* Optional Message Section */}
      
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.placeOfferButton}
          onPress={handlePlaceOffer}>
          <Medium
            label="Confirm Offer"
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

      {/* Submit Modal */}
      <ModalWrapper
        visible={showSubmitModal}
        onBackdropPress={() => setShowSubmitModal(false)}
        onBackButtonPress={() => setShowSubmitModal(false)}
        style={styles.submitModalContainer}>
        <View style={styles.submitModalContent}>
          {/* Header with Checkmark */}
          <Row style={styles.submitModalHeader}>
            {/* <Icon name="checkmark-circle" size={mvs(24)} color={colors.primary || '#1E40AF'} /> */}
            <IMG.PrivateCheckMark width={mvs(17)} height={mvs(17)}/>
            <Medium
              label="Proposal Submitted!"
              fontSize={mvs(14)}
              color={colors.textColor}
              style={{marginLeft: mvs(12)}}
            />
          </Row>

          {/* Body Text */}
          <View style={styles.submitModalBody}>
            <Regular
              label={`Your private proposal of ${offerValue || '$900.00'} has been sent to Nathan.`}
              fontSize={mvs(14)}
              numberOfLines={10}
              color={colors.textColorSecondary || '#8C8C8C'}
              style={styles.submitModalText}
            />
            <Regular
              label="You will be notified in your chat list if they accept your arrangement."
              fontSize={mvs(14)}
              numberOfLines={10}
              color={colors.textColorSecondary || '#8C8C8C'}
              style={[styles.submitModalText, {marginTop: mvs(12)}]}
            />
          </View>

          {/* Done Button */}
          <TouchableOpacity 
            style={styles.submitModalDismissButton}
            onPress={() => {setShowSubmitModal(false); navigate("Drawer")} }
            >
            <Medium
              label="Done"
              fontSize={mvs(16)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default PlaceNormalOfferScreen;
