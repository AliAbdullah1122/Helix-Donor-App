
type RootStackParamList = {
  Splash: undefined;
  HelixWelcome: undefined;
  TabBar: undefined;
  RenewPassword: undefined;
  ForgotPassword: undefined;
  BottomTab: undefined;
  Signup: undefined;
  AddAvailability: undefined;
  AvailabilityList: undefined;
  AvailabilityDetails: undefined;
  DoctorStack: undefined;

  Home: undefined;
  Login: undefined;
  Hotels: undefined;
  SearchTab: undefined;
  UserTab: undefined;
  UpdatePassword: undefined;
  LanguageScreen: undefined;
  UpdateProfile: undefined;
  AuthValidation:
    | undefined
    | {
        title?: string;
        message?: string;
        from?: 'login' | 'otp';
      };
};
export default RootStackParamList;
