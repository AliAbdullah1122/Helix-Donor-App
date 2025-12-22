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
    // backgroundColor: colors.white,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(10),
    // backgroundColor: colors.white,
    justifyContent: 'center', 
    borderRadius: mvs(6),
  },
  input:{
    borderRadius: mvs(40),
    borderColor: colors.borderColor,
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
  sectionContainer: {
    marginBottom: mvs(20),
  },
  labelStyle: {
    marginBottom: mvs(8),
    fontSize: mvs(14),
    color: colors.textColor,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mvs(8),
  },
  tag: {
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(8),
    borderRadius: mvs(20),
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: colors.helixPrimary,
    borderColor: colors.helixPrimary,
  },
  header: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),
    paddingBottom: mvs(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(100),
  },
  description: {
    marginBottom: mvs(24),
    lineHeight: mvs(20),
  },
  section: {
    marginBottom: mvs(24),
  },
  sectionTitle: {
    marginBottom: mvs(16),
    textTransform: 'uppercase',
  },
  inputContainer: {
    backgroundColor: colors.white,
    marginBottom: mvs(12),
  },
  addressInputContainer: {
    minHeight: mvs(100),
    borderRadius:mvs(20),
    width: '100%',
  },
  recordAudioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mvs(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  dropdownContainer: {
    position: 'relative',
  },
  pinkDot: {
    position: 'absolute',
    right: mvs(12),
    top: mvs(40),
    width: mvs(8),
    height: mvs(8),
    borderRadius: mvs(4),
    backgroundColor: '#EC4899',
  },
  saveButton: {
    borderRadius: mvs(25),
    height: mvs(50),
    backgroundColor: colors.primary || '#3A3E90',
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mvs(20),
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    paddingHorizontal: mvs(24),
    paddingVertical: mvs(24),
    width: '100%',
    maxWidth: mvs(340),
  },
  modalTitle: {
    marginBottom: mvs(12),
    textAlign: 'center',
  },
  modalMessage: {
    marginBottom: mvs(24),
    textAlign: 'center',
    lineHeight: mvs(20),
  },
  modalButtonsRow: {
    justifyContent: 'space-between',
    gap: mvs(12),
  },
  modalCancelButton: {
    flex: 1,
    height: mvs(44),
    borderRadius: mvs(22),
    borderWidth: 1,
    borderColor: colors.primary || '#3A3E90',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmButton: {
    flex: 1,
    height: mvs(44),
    borderRadius: mvs(22),
    backgroundColor: colors.primary || '#3A3E90',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
