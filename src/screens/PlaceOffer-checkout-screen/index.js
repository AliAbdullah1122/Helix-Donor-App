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

const PlaceofferCheckoutScreen = props => {
  const [offerValue, setOfferValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [showCharityModal, setShowCharityModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const navigation = useNavigation();

  // Static data - can be made dynamic later
  const currentHighestOffer = 870.00; // Can be 860 or 870 based on state
  const yourHighestOffer = 860.00;
  const totalOffers = currentHighestOffer > yourHighestOffer ? 6 : 5;
  const minOffer = currentHighestOffer > yourHighestOffer ? 880 : 870;
  const isOutbid = currentHighestOffer > yourHighestOffer;

  const numericOffer = parseFloat(offerValue.replace(/[^0-9.]/g, '')) || 0;
  const isOfferValid = numericOffer >= minOffer;
  const isButtonEnabled = offerValue.trim() !== '' && isOfferValid;

  const handlePlaceOffer = () => {
    // if (isButtonEnabled) {
    //   setShowSubmitModal(true);
    // }
    navigate("ResourcesScreen")
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
          <Medium
            label="Checkout"
            fontSize={mvs(18)}
            color={colors.textColor}
            style={styles.headerTitle}
          />
          <View style={{width: mvs(24)}} />
        </View>

        {/* ORDER SUMMARY Section */}
        <View style={styles.orderSummarySection}>
          <Medium
            label="ORDER SUMMARY"
            fontSize={mvs(14)}
            color={colors.primary}
            style={styles.sectionTitle}
          />
          <Row style={styles.orderRow}>
            <Regular
              label="Helix Premium Weekly"
              fontSize={mvs(14)}
              color={colors.textColor}
            />
            <Regular
              label="$29.99 / week"
              fontSize={mvs(14)}
              color={colors.textColor}
            />
          </Row>
          <View style={styles.separator} />
          <Row style={styles.orderRow}>
            <Bold
              label="Total"
              fontSize={mvs(14)}
              color={colors.textColor}
            />
            <Bold
              label="$29.99 / week"
              fontSize={mvs(14)}
              color={colors.textColor}
            />
          </Row>
        </View>

        {/* PAYMENT METHOD Section */}
        <View style={styles.paymentMethodSection}>
          <Bold
            label="PAYMENT METHOD"
            fontSize={mvs(14)}
            color={colors.primary}
            style={styles.sectionTitle}
          />
          
          {/* Google Pay and Apple Pay Buttons */}
          <Row style={styles.paymentButtonsRow}>
            <TouchableOpacity style={styles.paymentButton}>
              <Row style={styles.paymentButtonContent}>
                {IMG.google && (
                  <Image
                    source={IMG.google}
                    resizeMode="contain"
                    style={styles.paymentIcon}
                  />
                )}
                {!IMG.google && (
                  <Bold label="G" fontSize={mvs(20)} color={colors.textColor} />
                )}
                <Regular
                  label="Pay"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentButton}>
              <Row style={styles.paymentButtonContent}>
                {IMG.apple && (
                  <Image
                    source={IMG.apple}
                    resizeMode="contain"
                    style={styles.paymentIcon}
                  />
                )}
                {!IMG.apple && (
                  <Icon name="logo-apple" size={mvs(20)} color={colors.textColor} />
                )}
                <Regular
                  label="Pay"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
            </TouchableOpacity>
          </Row>

          {/* Credit Card Button */}
          <TouchableOpacity style={{...styles.creditCardButton,marginTop:mvs(20)}}>
            <Row style={styles.creditCardRow}>
              <Medium
                label="Credit Card (Ending in 4242)"
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Icon style={{marginLeft:mvs(10)}} name="chevron-down" size={mvs(20)} color={colors.white} />
            </Row>
          </TouchableOpacity>
        </View>
      
      </ScrollView>

      {/* Pay Button */}
      <View style={{...styles.actionButtonsContainer,width:"90%",alignSelf:'center'}}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePlaceOffer}>
          <Medium
            label="Pay $29.99"
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
            onPress={() => setShowSubmitModal(false)}>
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

export default PlaceofferCheckoutScreen;
