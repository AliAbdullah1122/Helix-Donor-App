import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import { mvs } from 'config/metrices';
import { navigate } from 'navigation/navigation-ref';
import React, { useState } from 'react';
import { TouchableOpacity, View, ScrollView, StatusBar, Text, Image, TextInput, Platform } from 'react-native';
import styles from './styles';
import { colors } from 'config/colors';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';
import { Row } from 'components/atoms/row';
import { ModalWrapper } from 'components/atoms/modal-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setSubscribed } from 'store/reducers/user-reducer';
import Light from 'typography/light-text';

const GeneticCheckoutScreen = props => {
  const [offerValue, setOfferValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [showCharityModal, setShowCharityModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showPaymentFailedModal, setShowPaymentFailedModal] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
    // Show payment failed modal (change to setShowPaymentSuccessModal for success)
    setShowPaymentFailedModal(true);

    // Uncomment below to also dispatch and navigate after modal is closed
    // dispatch(setSubscribed(true));
    // navigation.goBack()
  };

  const handleBuyNow = () => {
    // Add your buy now logic here
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginBottom: Platform.OS === 'ios' ? mvs(-34) : 0 }} />
      <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" />

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
          <View style={{ width: mvs(24) }} />
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
            <Regular
              label="Total"
              fontSize={mvs(14)}
              color={colors.textColor}
            />
            <Regular
              label="$29.99 / week"
              fontSize={mvs(14)}
              color={colors.textColor}
            />
          </Row>
        </View>

        {/* PAYMENT METHOD Section */}
        <View style={styles.paymentMethodSection}>
          <Regular
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
                  // <Image
                  //   source={IMG.google}
                  //   resizeMode="contain"
                  //   style={styles.paymentIcon}
                  // />
                  <IMG.GoogleSvg width={mvs(18)} height={mvs(18)} />
                )}
                {!IMG.google && (
                  <Bold label="G" fontSize={mvs(20)} color={colors.textColor} />
                  // <IMG.GoogleSvg width={mvs(18)} height={mvs(18)}/>
                )}
                <Regular
                  label="Pay"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                  style={{ marginLeft: mvs(8) }}
                />
              </Row>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentButton}>
              <Row style={styles.paymentButtonContent}>
                {IMG.apple && (
                  // <Image
                  //   source={IMG.apple}
                  //   resizeMode="contain"
                  //   style={styles.paymentIcon}
                  // />
                  <IMG.AppleSvg width={mvs(18)} height={mvs(18)} />
                )}
                {!IMG.apple && (
                  <Icon name="logo-apple" size={mvs(20)} color={colors.textColor} />
                )}
                <Regular
                  label="Pay"
                  fontSize={mvs(14)}
                  color={colors.textColor}
                  style={{ marginLeft: mvs(8) }}
                />
              </Row>
            </TouchableOpacity>
          </Row>

          {/* Credit Card Button */}
          <TouchableOpacity style={{ ...styles.creditCardButton, marginTop: mvs(20) }}>
            <Row style={styles.creditCardRow}>
              <Medium
                label="Credit Card (Ending in 4242)"
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Icon style={{ marginLeft: mvs(10), marginTop: mvs(3) }} name="chevron-down" size={mvs(20)} color={colors.white} />
            </Row>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Pay Button */}
      <View style={{ ...styles.actionButtonsContainer, width: "90%", alignSelf: 'center' }}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePlaceOffer}
        >
          <Medium
            label="Pay $29.99"
            fontSize={mvs(16)}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>


      {/* Payment Success Modal */}
      <ModalWrapper
        visible={showSubmitModal}
        onBackdropPress={() => setShowSubmitModal(false)}
        onBackButtonPress={() => setShowSubmitModal(false)}
        style={styles.paymentModalContainer}>
        <View style={styles.paymentModalContent}>
          <Row style={styles.paymentModalHeader}>
            {/* <Icon name="partly-sunny" size={mvs(24)} color="#FFD700" /> */}
            {/* Using a generic icon as placeholder for party popper if unavailable, or IMG.PrivateCheckMark */}
            {/* <IMG.PrivateCheckMark width={mvs(20)} height={mvs(20)} /> */}
            <Bold
              label="🎉   Payment Successful!"
              fontSize={mvs(16)}
              color={colors.textColor}
              style={styles.paymentModalTitle}
            />
          </Row>

          <View style={styles.paymentModalBody}>
            <Bold
              label="Your order for the CGT Plus kit has been confirmed."
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.paymentModalText}
              numberOfLines={2}
            />
            <Regular
              label="We have secured your iGenomix test slot."
              fontSize={mvs(14)}
              color={colors.textColorSecondary || '#8C8C8C'}
              style={styles.paymentModalText}
            />
            <Regular
              label="Next Step: You must obtain a Physician Requisition to proceed."
              fontSize={mvs(14)}
              color={colors.textColorSecondary || '#8C8C8C'}
              style={styles.paymentModalText}
            />
          </View>

          <TouchableOpacity
            style={styles.paymentModalButtonOutline}
            onPress={() => setShowSubmitModal(false)}>
            <Medium
              label="Request your Physician Requisition"
              fontSize={mvs(14)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Regular
            label="Powered by TeleDoc healthcare"
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.poweredByText}
          />
        </View>
      </ModalWrapper>

      {/* Payment Failed Modal */}
      <ModalWrapper
        visible={showCharityModal} // Using existing state variable for demo, or rename standard
        onBackdropPress={() => setShowCharityModal(false)}
        onBackButtonPress={() => setShowCharityModal(false)}
        style={styles.paymentModalContainer}>
        <View style={styles.paymentModalContent}>
          <Row style={styles.paymentModalHeader}>
            <Icon name="alert-circle" size={mvs(24)} color={colors.textColor} />
            <Bold
              label="Payment Failed"
              fontSize={mvs(16)}
              color={colors.textColor}
              style={styles.paymentModalTitle}
            />
          </Row>

          <View style={styles.paymentModalBody}>
            <Bold
              label="We couldn't process your payment."
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.paymentModalText}
            />
            <Regular
              label="Please check your card details or try a different payment method."
              fontSize={mvs(14)}
              color={colors.textColorSecondary || '#8C8C8C'}
              style={styles.paymentModalText}
            />
            <Regular
              label="Credit Card ending in 4242 [Declined]"
              fontSize={mvs(14)}
              color={'#FF4D4D'}
              style={styles.paymentModalText}
            />
          </View>

          <TouchableOpacity
            style={styles.paymentModalButtonPrimary}
            onPress={() => setShowCharityModal(false)}>
            <Medium
              label="Try Another Method"
              fontSize={mvs(14)}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentModalButtonOutline}
            onPress={() => setShowCharityModal(false)}>
            <Medium
              label="Cancel"
              fontSize={mvs(14)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </ModalWrapper>

      {/* Payment Success Modal */}
      <ModalWrapper
        visible={showPaymentSuccessModal}
        onBackdropPress={() => setShowPaymentSuccessModal(false)}
        onBackButtonPress={() => setShowPaymentSuccessModal(false)}
        style={styles.paymentModalContainer}>
        <View style={styles.paymentModalContent}>
          <Row style={styles.paymentModalHeader}>
            {/* Start Icon */}
            {/* {IMG.PrivateCheckMark && <IMG.PrivateCheckMark width={mvs(24)} height={mvs(24)} />}
            {!IMG.PrivateCheckMark && <Icon name="checkmark-circle" size={mvs(24)} color={colors.primary} />} */}
            <Medium
              label="🎉   Payment Successful!"
              fontSize={mvs(16)}
              color={colors.textColor}

              style={styles.paymentModalTitle}
            />
          </Row>

          <View style={styles.paymentModalBody}>
            <Medium
              label="Your order for the CGT Plus kit has been confirmed."
              fontSize={mvs(14)}
              color={colors.textColor}
              numberOfLines={2}
              style={styles.paymentModalText}
            />
            <Light
              label="We have secured your iGenomix test slot."
              fontSize={mvs(14)}
              color={colors.textColor}
              numberOfLines={2}
              style={{ ...styles.paymentModalText, fontWeight: "300" }}
            />
            <Light
              label="Next Step: You must obtain a Physician Requisition to proceed."
              fontSize={mvs(14)}
              numberOfLines={2}
              color={colors.textColor}
              style={{ ...styles.paymentModalText, width: "100%", fontWeight: "300" }}
            />
          </View>

          <TouchableOpacity
            style={styles.paymentModalButtonOutline}
            onPress={() => setShowPaymentSuccessModal(false)}>
            <Medium
              label="Request your Physician Requisition"
              fontSize={mvs(16)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Light
            label="Powered by TeleDoc healthcare"
            fontSize={mvs(12)}
            color={colors.textColorSecondary}
            style={styles.poweredByText}
          />
        </View>
      </ModalWrapper>

      {/* Payment Failed Modal */}
      <ModalWrapper
        visible={showPaymentFailedModal}
        onBackdropPress={() => setShowPaymentFailedModal(false)}
        onBackButtonPress={() => setShowPaymentFailedModal(false)}
        style={styles.paymentModalContainer}>
        <View style={styles.paymentModalContent}>
          <Row style={styles.paymentModalHeader}>
            <Icon2 name="alert" size={mvs(24)} color={colors.textColor} />
            <Medium
              label="Payment Failed"
              fontSize={mvs(16)}
              color={colors.textColor}
              style={styles.paymentModalTitle}
            />
          </Row>

          <View style={styles.paymentModalBody}>
            <Medium
              label="We couldn't process your payment."
              fontSize={mvs(14)}
              color={colors.textColor}
              style={{...styles.paymentModalText,fontWeight:"500"}}
            />
            <Light
              label="Please check your card details or try a different payment method."
              fontSize={mvs(14)}
              numberOfLines={2}
              color={colors.textColor || '#8C8C8C'}
  style={{...styles.paymentModalText,fontWeight:"300"}}
            />
            <Light
              label="Credit Card ending in 4242 [Declined]"
              fontSize={mvs(14)}
              color={'#FF383C'}
              style={{...styles.paymentModalText,fontWeight:"300"}}
            />
          </View>

          <TouchableOpacity
            style={styles.paymentModalButtonPrimary}
            onPress={() => setShowPaymentFailedModal(false)}>
            <Medium
              label="Try Another Method"
              fontSize={mvs(16)}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentModalButtonOutline}
            onPress={() => setShowPaymentFailedModal(false)}>
            <Medium
              label="Cancel"
              fontSize={mvs(16)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default GeneticCheckoutScreen;
