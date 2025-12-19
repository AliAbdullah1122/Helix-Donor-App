import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,    
    // paddingHorizontal:mvs(5)

  },
  imglogo:{
    width: '80%',
    height: mvs(40),
    alignSelf: 'center',
    // marginTop: mvs(25),
  },
  waveimg:{
    width: mvs(30),
    height: mvs(30),
  },
  titleview:{
    width: '70%',
    justifyContent:'flex-start',
    marginTop: mvs(20),
    gap: mvs(10),
    paddingHorizontal: mvs(20),
    alignSelf:'center',
  },
  contentContainerStyle: {
    // marginTop: mvs(10),
  },
  contentContainerStyleNew: {
    flexGrow: 1,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(10),
    // backgroundColor: colors.white,
    justifyContent: 'flex-start',
    borderRadius: mvs(6),
  },
  input:{
    borderRadius: mvs(40),
    borderColor: colors.borderColor,
    height: mvs(50),
    alignItems: 'center',
  },
  inputContainer: {
    borderRadius: mvs(30),
    // backgroundColor: colors.white,
    borderWidth: 1,
    // borderColor: '#E5E5E5',
    height: mvs(52),
    // marginTop: mvs(12),
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
    paddingBottom: mvs(150),
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
    marginTop: mvs(25),
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: mvs(10),
    marginTop: mvs(20),
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: mvs(20),
    marginTop: mvs(10),
    marginBottom: mvs(20),
    paddingHorizontal: 0,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: mvs(12),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: mvs(20),
    marginBottom: mvs(8),
  },
  radioCircle: {
    height: mvs(20),
    width: mvs(20),
    borderRadius: mvs(10),
    borderWidth: 2,
    borderColor: colors.helixPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.helixPrimary,
  },
  radioInner: {
    height: mvs(10),
    width: mvs(10),
    borderRadius: mvs(5),
    backgroundColor: colors.helixPrimary,
  },
  customCheckbox: {
    width: mvs(20),
    height: mvs(20),
    borderWidth: 2,
    borderColor: colors.helixPrimary,
    borderRadius: mvs(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(2),
  },
  customCheckboxChecked: {
    backgroundColor: colors.helixPrimary,
    borderColor: colors.helixPrimary,
  },
  largeTextInput: {
    borderRadius: mvs(16),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: colors.white,
    minHeight: mvs(120),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(12),
    fontSize: mvs(14),
    color: colors.textColor,
  },
  modalButtonContainer: {
    alignItems: 'center',
    // marginTop: mvs(10),
  },
});
export default styles;
