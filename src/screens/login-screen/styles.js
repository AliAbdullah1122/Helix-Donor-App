import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import { login } from 'services/api/auth-api-actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.helixBackground,
    paddingHorizontal: mvs(10), 
  },
  scrollContainer:{
    flexGrow: 1,
    backgroundColor: colors.helixBackground,
    paddingBottom: mvs(0),
    justifyContent: 'space-between',
  },
  imgView:{
    alignItems: 'center',
    justifyContent:"center",
    height:"40%",
    // backgroundColor:'red',
    // marginTop: mvs(70),
    alignSelf:'center',
    // marginBottom: mvs(0),
    // paddingBottom: mvs(10),
  },
  centerSection: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom:mvs(180),
  },
  imglogo:{
    width: mvs(140),
    height: mvs(140),
    // alignSelf: 'center',
    // marginTop: mvs(35),
  },
  logintext:{
    marginTop: mvs(20),
  },
  waveimg:{
    width: mvs(30),
    height: mvs(30),
  },
  titleview:{
    width: '100%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: mvs(10),
    gap: mvs(4),
  },
  contentContainerStyle: {
    marginTop: mvs(0),
    width: '100%',
    justifyContent: 'center',
  },

  contentContainerStyleNew: {
    flexGrow: 0,
    paddingVertical: mvs(0),
    justifyContent: 'flex-start',
    borderRadius: mvs(6),
  },
  input:{
    borderRadius: mvs(10),
    borderColor: colors.bluecolor,
    height: mvs(50),
    alignItems: 'center',
  },
  txt: {marginBottom: mvs(10), fontSize: mvs(20)},
  button: {
    width: '100%',
    paddingHorizontal: mvs(20),
    position: 'absolute',
    bottom: 0,
    paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40),
  },
  googlebutton: {
    width: '48%',
    height: mvs(50),
    backgroundColor: colors.white,
    borderRadius: mvs(10),
    alignItems: 'center',
    justifyContent: 'center',
   shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
  },
  imagebackground: {
    height: mvs(400),
    width: width,
    position: 'absolute',
  },
  loginlogoview: {
    alignSelf: 'center',
    marginTop: mvs(20),
  },
  lottieview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboradscrollcontent: {
    paddingHorizontal: mvs(0),
    flexGrow: 0,
    paddingBottom: mvs(0),
  },
  loginmoverstext: {
    marginTop: mvs(10),
    marginBottom: mvs(20),
  },
  forgotpasswordview: {
    alignSelf: 'flex-end',
    marginBottom: mvs(15),
  },
  createaccountview: {
    alignSelf: 'center',
    marginTop: mvs(30),
    marginBottom: mvs(10),
  },
  signupbuttoncontainer: {
    backgroundColor: colors.bluecolor,
    marginTop: mvs(20),
    borderRadius: mvs(10),
  },
  googlefacebookview: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: mvs(10),
  },
  loginview:{
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: mvs(5),
    // marginVertical: mvs(60),
    position: 'absolute',
    bottom: mvs(100),
    alignSelf:'center',
    // backgroundColor:'red'
  },
    checkView: {
    width: mvs(20),
    height: mvs(20),
    borderRadius: mvs(10),
    borderColor: colors.secondary,
    borderWidth: mvs(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    fontWeight:'400',
  }
  ,
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width:"100%",
    marginTop: mvs(20),
    marginBottom: mvs(16),
    justifyContent: 'center',
  },
  divider: {
    // width: mvs(80),
    height: 1,
    backgroundColor: colors.black,
    flex:1
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: mvs(0),
    marginTop: mvs(0),
  },
  socialButton: {
    flex: 1,
    height: mvs(43),
    backgroundColor: '#D9D9D9',
    borderRadius: mvs(24),
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: mvs(6),
    flexDirection: 'row',
  },
  socialIcon: {
    width: mvs(18),
    height: mvs(18),
  },
  termsContainer: {
    paddingBottom: mvs(70),
    paddingHorizontal: mvs(10),
    // marginTop: mvs(0),
    alignItems: 'flex-start',
    // paddingTop: mvs(10),
  },
  continueButton: {
    borderRadius: mvs(24),
    width:"100%",
    height: mvs(43),
    marginTop: mvs(16),
    backgroundColor: colors.helixPrimary,
  },
  emailInputContainer: {
    borderRadius: mvs(24),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor:colors.white,
    marginBottom: mvs(4),
    marginTop: mvs(0),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(12),
    paddingHorizontal: mvs(0),
  },
  errorIconContainer: {
    width: mvs(18),
    height: mvs(18),
    borderRadius: mvs(9),
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mvs(6),
  },
  errorText: {
    flex: 0,
  },
});
export default styles;
