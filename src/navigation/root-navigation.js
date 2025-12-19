// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginScreen from 'screens/login-screen';
import Notifications from 'screens/notifications';
import Onboarding from 'screens/on-boarding';
import Splash from 'screens/splash';
import HelixWelcomeScreen from 'screens/helix-welcome';
import {horizontalAnimation} from '../utils';
import DrawerNavigation from './drawer-navigation/drawer-navigation';
import UserTab from 'screens/user-tab';
import SignUpScreen from 'screens/sign-up-screen';
import MpinScreen from 'screens/mpin-screen';
import CustomAlertScreen from 'screens/custom-alert';
import SubscriptionScreen from 'screens/subscription';
import AddCustomAlertScreen from 'screens/add-custom-alert-screen';
import CustomAlertScreen2 from 'screens/custome-alert-screen';
import AlertScreen from 'screens/alert-screen';
import ActivityScreen from 'screens/activity';
import RecentactivityScreen from 'screens/recent-activity';
import ProfileScreen from 'screens/profile-screen';
import PortfolioScreen from 'screens/portfolio-screen';
import AddPortfolioScreen from 'screens/add-portfolio-screen';
import JobsHomeScreen from 'screens/jobs-home-screen';
import JobsScreen from 'screens/jobs-screen';
import JobDetailScreen from 'screens/job-detail-screen';
import AiMentorScreen from 'screens/ai-mentor-screen';
import ChatScreen from 'screens/ai-mentor-chat-screen';
import JobsListScreen from 'screens/jobs-list-screen';
import ForgotPasswordScreen from 'screens/forgot-password';
import ResetPasswordScreen from 'screens/reset-password';
import AuthenticationCodeScreen from 'screens/authentication-code';
import GetStartedScreen from 'screens/get-started-screen';
import DriverRegistrationPart1Screen from 'screens/driver-Registration-part1';
import DriverRegistrationPart2Screen from 'screens/driver-Registration-part2';
import DriverRegistrationPart3Screen from 'screens/driver-Registration-part3';
import DriverRegistrationPart4Screen from 'screens/driver-Registration-part4';
import DriverRegistrationPart5Screen from 'screens/driver-Registration-part5';
import DriverRegistrationPart6Screen from 'screens/driver-Registration-part6';
import DriverRegistrationPart7Screen from 'screens/driver-Registration-part7';
import SubmitScreen from 'screens/submit-screen';
import DeelievryDetailsScreen from 'screens/delivery-details';
import DeliveryParcelDetailsScreen from 'screens/delivery-parcel-pickup-details';
import WareHouseMapGuideScreen from 'screens/warehouse-map-guide';
import WareHouseMapRouteScreen from 'screens/warehouse-map-route';
import DeliveryParcelPickupScreen from 'screens/delivery-parcelpack-details';
import DeliveryParcelDelieveredScreen from 'screens/delivery-parcelDelievred-details';
import CustomerDeliveryNavigateScreen from 'screens/customer-delivery-navigate';
import CustomerDeliveryStartNavigateScreen from 'screens/customer-delivery-start-navigate';
import DeliveryParcelDeliveryDetailsScreen from 'screens/delivery-parcel-delievery-details';
import ProofParcelDetailsScreen from 'screens/proof-parcel-details';
import GeoLocationTrackScreen from 'screens/geo-location-track';
import ReviewFromAdminScreen from 'screens/review-from-admin';
import QRScreen from 'screens/QR-Screen';
import CameraScreen from 'screens/Camera-Screen';
import ParcelReturnProofScreen from 'screens/parcelReturn-proof-parcel';
import GeoLocationTrackProofScreen from 'screens/geo-location-track-proof';
import DeliveryParcelReturnDetailsScreen from 'screens/delivery-parcel-return-failed';
import DeliveryParcelCompletedDetailsScreen from 'screens/delivery-parcel-completed';
import ChatInboxScreen from 'screens/chatInbox-screen';
import OverviewScreen from 'screens/overview-screen';
import RestrictScreen from 'screens/restrcit-screen';
import NotificationPrefernceScreen from 'screens/notification-prefernce';
import NavigationPreferenceScreen from 'screens/navigation-prefernce';
import ChatWithAdminScreen from 'screens/chat-with-admin';
import ChatAdminInboxScreen from 'screens/chatInbox-admin-screen';
import ChatUploadScreen from 'screens/chat-upload-screen';
import ChatLocationScreen from 'screens/chat-location-screen';
import HelpCenterScreen from 'screens/help-center-screen';
import PrivacyPolicyScreen from 'screens/privacy-policy-screen';
import CreateNewPasswordScreen from 'screens/create-new-password-screen';
import AuthValidationScreen from 'screens/auth-validation';
import DriverUpdateRegistrationPart1Screen from 'screens/driverUpdate-Registration-part1';
import DriverUpdateVehicleRegistrationScreen from 'screens/driverUpdate-VehicleRegistration';
import DriverUpdateLicenseScreen from 'screens/driverUpdate-LicenseRegistration';
import DriverUpdateWorkPermitScreen from 'screens/driverUpdate-WorkPermit';
import DriverUpdateVehicleImageScreen from 'screens/driverUpdate-VehicleImage';
import SignUpAuthenticationCodeScreen from 'screens/signup-authentication-code';
import OtpScreen from 'screens/otp-screen';
import GenderIdentityScreen from 'screens/gender-Identity-screen';
import ServiceTypeScreen from 'screens/service-type-screen';
import RoleSelectionScreen from 'screens/role-selection';
import GameteSelectionScreen from 'screens/gamete-selection-screen';
import IntentConnectiontypeScreen from 'screens/inten-connectionType-Screen';
import ContactInformationScreen from 'screens/contact-information';
import VerificationScreen from 'screens/verification-screen';
import PrimaryPhotoScreen from 'screens/primary-photo-screen';
import PhysicalAtttributeScreen from 'screens/Physical-attribute-screen';
import BackgroundLifeStyleScreen from 'screens/background-lifestle-screen';
import MyOwnWordsScreen from 'screens/myOwn-words-screen';
import ReproductiveHistoryScreen from 'screens/Reproductive-history-screen';
import InfectionDiseaseScreen from 'screens/Infection-Disease-Screen';
import GeneticGatewayScreen from 'screens/Genetic-gateway-screen';
import DonorBenefitsScreen from 'screens/Donor-Benefits-screen';
import VerificationCompletionScreen from 'screens/Verification-Completion-screen';
import ResourcesScreen from 'screens/Resources-screen';
import MatchMakingScreen from 'screens/Match-Making-screen';
import ProfileDetailsHomeScreen from 'screens/profile-detailshome-screen';
import SearchScreen from 'screens/search-screen';
import SearchFilterScreen from 'screens/search-filter-screen';
import SearchResultFilterScreen from 'screens/search-ResultFilterscreen';
import ChatMainScreen from 'screens/chatMain-screen';
import MainProfileScreen from 'screens/MainProfile-screen';
import PremiumUnlockChatScreen from 'screens/PremeuM-Unlock-chat-screen';
import PremiumUnlockSearchScreen from 'screens/PremeuM-Unlock-Search-screen';
import PremiumUnlockFilterScreen from 'screens/PremeuM-Unlock-Filter-screen';
import PremiumUnlockImageScreen from 'screens/PremeuM-Unlock-Image-screen';
import AuctionScreen from 'screens/Auction-screen';
import PrivateOfferScreen from 'screens/Private-Offer-scree';
import PlacePrivateOfferScreen from 'screens/PlacePrivate-Offer-screen';
import PlaceNormalOfferScreen from 'screens/PlaceNormal-Offer-screen copy';
import PlaceIncreaseOfferScreen from 'screens/PlaceIncrease-Offer-screen';
import PlaceofferCheckoutScreen from 'screens/PlaceOffer-checkout-screen';
import SearchScreenTap from 'screens/search-screen-tap';
import SearchOccupationScreen from 'screens/search-Occupation-screen';
import SearchEthnicityScreen from 'screens/search-Ethnicity-screen';
import SearchReligionScreen from 'screens/search-Religion-screen';
import SearchNationlaityScreen from 'screens/search-Nationality-screen';
import SearchGeneticScreen from 'screens/search-Genetic-screen';
import SearchFromFilterScreen from 'screens/search-fromfilter-screen';
import AccountRoleScreen from 'screens/Account-role-screen';
import RecordAudioScreen from 'screens/Record-Audio-screen';
import UploadPhotoScreen from 'screens/Upload-Photo-screen';
import AboutScreen from 'screens/About-screen';
import PhysicalAttributeEditScreen from 'screens/Physical-attributeEdit-screen';
import HealthSummaryScreen from 'screens/Health-summary-screen';
import EducationCareerScreen from 'screens/Education-carreer-screen';
import GeneticProfileScreen from 'screens/genetic-profile-screen';
import ManageSusbcriptionScreen from 'screens/Mnage-subscription-screen';
import SettingsScreen from 'screens/Setting-screen';
import BlockedContactsScreen from 'screens/Blocked-Contacts-screen';
import MainNotificationScreen from 'screens/MainNotification-screen';
import MainInboxScreen from 'screens/MainInbox-screen';
import ArchiveChatScreen from 'screens/Archive-caht-screen';



const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
         initialRouteName="ChatMainScreen"
        //  initialRouteName="PlaceofferCheckoutScreen"
        //  initialRouteName="QRScreen"
        //  initialRouteName="ReviewFromAdminScreen"
        // initialRouteName="UserTab"
      //  initialRouteName="Drawer"
        screenOptions={horizontalAnimation}>
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="HelixWelcome" component={HelixWelcomeScreen} />
          <Stack.Screen name="UserTab" component={UserTab} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
           <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="AuthenticationCode" component={AuthenticationCodeScreen} />
          <Stack.Screen name="SignUpAuthenticationCode" component={SignUpAuthenticationCodeScreen} />
          <Stack.Screen name="AuthValidation" component={AuthValidationScreen} />

          <Stack.Screen name="CustomAlert" component={CustomAlertScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="AddCustomAlert" component={AddCustomAlertScreen} />
          <Stack.Screen name="CustomAlert2" component={CustomAlertScreen2} />
          <Stack.Screen name="AlertScreen" component={AlertScreen} />
          <Stack.Screen name="Activity" component={ActivityScreen} />
          <Stack.Screen name="Recentactivity" component={RecentactivityScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Portfolio" component={PortfolioScreen} />
          <Stack.Screen name="AddPortfolio" component={AddPortfolioScreen} />
          <Stack.Screen name="JobsHome" component={JobsHomeScreen} />
          <Stack.Screen name="JobsList" component={JobsListScreen} />
          <Stack.Screen name="Jobs" component={JobsScreen} />
          <Stack.Screen name="JobDetail" component={JobDetailScreen} />
          <Stack.Screen name="AiMentor" component={AiMentorScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="DriverRegistrationPart1Screen" component={DriverRegistrationPart1Screen} />
          <Stack.Screen name="DriverRegistrationPart2Screen" component={DriverRegistrationPart2Screen} />
          <Stack.Screen name="DriverRegistrationPart3Screen" component={DriverRegistrationPart3Screen} />
          <Stack.Screen name="DriverRegistrationPart4Screen" component={DriverRegistrationPart4Screen} />
          <Stack.Screen name="DriverRegistrationPart5Screen" component={DriverRegistrationPart5Screen} />
          <Stack.Screen name="DriverRegistrationPart6Screen" component={DriverRegistrationPart6Screen} />
          <Stack.Screen name="DriverRegistrationPart7Screen" component={DriverRegistrationPart7Screen} />
          <Stack.Screen name="SubmitScreen" component={SubmitScreen} />
          <Stack.Screen name="DeelievryDetailsScreen" component={DeelievryDetailsScreen} />
          <Stack.Screen name="DeliveryParcelDetailsScreen" component={DeliveryParcelDetailsScreen} />
          <Stack.Screen name="DeliveryParcelPickupScreen" component={DeliveryParcelPickupScreen} />
          <Stack.Screen name="DeliveryParcelDelieveredScreen" component={DeliveryParcelDelieveredScreen} />
          <Stack.Screen name="CustomerDeliveryNavigateScreen" component={CustomerDeliveryNavigateScreen} />
          <Stack.Screen name="WareHouseMapGuideScreen" component={WareHouseMapGuideScreen} />
          <Stack.Screen name="WareHouseMapRouteScreen" component={WareHouseMapRouteScreen} />
          <Stack.Screen name="CustomerDeliveryStartNavigateScreen" component={CustomerDeliveryStartNavigateScreen} />
          <Stack.Screen name="DeliveryParcelDeliveryDetailsScreen" component={DeliveryParcelDeliveryDetailsScreen} />
          <Stack.Screen name="ProofParcelDetailsScreen" component={ProofParcelDetailsScreen} />
          <Stack.Screen name="GeoLocationTrackScreen" component={GeoLocationTrackScreen} />
          <Stack.Screen name="ReviewFromAdminScreen" component={ReviewFromAdminScreen} />
          <Stack.Screen name="QRScreen" component={QRScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="ParcelReturnProofScreen" component={ParcelReturnProofScreen} />
          <Stack.Screen name="GeoLocationTrackProofScreen" component={GeoLocationTrackProofScreen} />
          <Stack.Screen name="DeliveryParcelReturnDetailsScreen" component={DeliveryParcelReturnDetailsScreen} />
          <Stack.Screen name="DeliveryParcelCompletedDetailsScreen" component={DeliveryParcelCompletedDetailsScreen} />
          <Stack.Screen name="ChatInboxScreen" component={ChatInboxScreen} />
          <Stack.Screen name="OverviewScreen" component={OverviewScreen} />
          <Stack.Screen name="RestrictScreen" component={RestrictScreen} />
          <Stack.Screen name="NotificationPrefernceScreen" component={NotificationPrefernceScreen} />
          <Stack.Screen name="NavigationPreferenceScreen" component={NavigationPreferenceScreen} />
          <Stack.Screen name="ChatWithAdminScreen" component={ChatWithAdminScreen} />
          <Stack.Screen name="ChatAdminInboxScreen" component={ChatAdminInboxScreen} />
          <Stack.Screen name="ChatUploadScreen" component={ChatUploadScreen} />
          <Stack.Screen name="ChatLocationScreen" component={ChatLocationScreen} />
          <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
          <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
          <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen} />
          <Stack.Screen name="DriverUpdateRegistrationPart1Screen" component={DriverUpdateRegistrationPart1Screen} />
          <Stack.Screen name="DriverUpdateVehicleRegistrationScreen" component={DriverUpdateVehicleRegistrationScreen} />
          <Stack.Screen name="DriverUpdateLicenseScreen" component={DriverUpdateLicenseScreen} />
          <Stack.Screen name="DriverUpdateWorkPermitScreen" component={DriverUpdateWorkPermitScreen} />
          <Stack.Screen name="DriverUpdateVehicleImageScreen" component={DriverUpdateVehicleImageScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
          <Stack.Screen name="GenderIdentityScreen" component={GenderIdentityScreen} />
          <Stack.Screen name="ServiceTypeScreen" component={ServiceTypeScreen} />
          <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} />
          <Stack.Screen name="GameteSelectionScreen" component={GameteSelectionScreen} />
          <Stack.Screen name="IntentConnectiontypeScreen" component={IntentConnectiontypeScreen} />
          <Stack.Screen name="ContactInformationScreen" component={ContactInformationScreen} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          <Stack.Screen name="PrimaryPhotoScreen" component={PrimaryPhotoScreen} />
          <Stack.Screen name="PhysicalAtttributeScreen" component={PhysicalAtttributeScreen} />
          <Stack.Screen name="BackgroundLifeStyleScreen" component={BackgroundLifeStyleScreen} />
          <Stack.Screen name="MyOwnWordsScreen" component={MyOwnWordsScreen} />
          <Stack.Screen name="ReproductiveHistoryScreen" component={ReproductiveHistoryScreen} />
          <Stack.Screen name="InfectionDiseaseScreen" component={InfectionDiseaseScreen} />
          <Stack.Screen name="GeneticGatewayScreen" component={GeneticGatewayScreen} />
          <Stack.Screen name="DonorBenefitsScreen" component={DonorBenefitsScreen} />
          <Stack.Screen name="VerificationCompletionScreen" component={VerificationCompletionScreen} />
          <Stack.Screen name="ResourcesScreen" component={ResourcesScreen} />
          <Stack.Screen name="MatchMakingScreen" component={MatchMakingScreen} />
          <Stack.Screen name="ProfileDetailsHomeScreen" component={ProfileDetailsHomeScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="SearchFilterScreen" component={SearchFilterScreen} />
          <Stack.Screen name="SearchResultFilterScreen" component={SearchResultFilterScreen} />
          <Stack.Screen name="ChatMainScreen" component={ChatMainScreen} />
          <Stack.Screen name="MainProfileScreen" component={MainProfileScreen} />
          <Stack.Screen name="PremiumUnlockChatScreen" component={PremiumUnlockChatScreen} />
          <Stack.Screen name="PremiumUnlockSearchScreen" component={PremiumUnlockSearchScreen} />
          <Stack.Screen name="PremiumUnlockFilterScreen" component={PremiumUnlockFilterScreen} />
          <Stack.Screen name="PremiumUnlockImageScreen" component={PremiumUnlockImageScreen} />
          <Stack.Screen name="AuctionScreen" component={AuctionScreen} />
          <Stack.Screen name="PrivateOfferScreen" component={PrivateOfferScreen} />
          <Stack.Screen name="PlacePrivateOfferScreen" component={PlacePrivateOfferScreen} />
          <Stack.Screen name="PlaceNormalOfferScreen" component={PlaceNormalOfferScreen} />
          <Stack.Screen name="PlaceIncreaseOfferScreen" component={PlaceIncreaseOfferScreen} />
          <Stack.Screen name="PlaceofferCheckoutScreen" component={PlaceofferCheckoutScreen} />
          <Stack.Screen name="SearchScreenTap" component={SearchScreenTap} />
          <Stack.Screen name="SearchOccupationScreen" component={SearchOccupationScreen} />
          <Stack.Screen name="SearchEthnicityScreen" component={SearchEthnicityScreen} />
          <Stack.Screen name="SearchReligionScreen" component={SearchReligionScreen} />
          <Stack.Screen name="SearchNationlaityScreen" component={SearchNationlaityScreen} />
          <Stack.Screen name="SearchGeneticScreen" component={SearchGeneticScreen} />
          <Stack.Screen name="SearchFromFilterScreen" component={SearchFromFilterScreen} />
          <Stack.Screen name="AccountRoleScreen" component={AccountRoleScreen} />
          <Stack.Screen name="RecordAudioScreen" component={RecordAudioScreen} />
          <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="PhysicalAttributeEditScreen" component={PhysicalAttributeEditScreen} />
          <Stack.Screen name="HealthSummaryScreen" component={HealthSummaryScreen} />
          <Stack.Screen name="EducationCareerScreen" component={EducationCareerScreen} />
          <Stack.Screen name="GeneticProfileScreen" component={GeneticProfileScreen} />
          <Stack.Screen name="ManageSusbcriptionScreen" component={ManageSusbcriptionScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="BlockedContactsScreen" component={BlockedContactsScreen} />
          <Stack.Screen name="MainNotificationScreen" component={MainNotificationScreen} />
          <Stack.Screen name="MainInboxScreen" component={MainInboxScreen} />
          <Stack.Screen name="ArchiveChatScreen" component={ArchiveChatScreen} />

        </Stack.Group>
        <Stack.Group>
        </Stack.Group>
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
