import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.helixBackground,
    paddingHorizontal: mvs(20),
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.helixBackground,
    // paddingBottom: mvs(20),
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: mvs(20),
    marginBottom: mvs(20),
    alignSelf: 'flex-start',
    // padding: mvs(8),
  },
  title: {
    textAlign: 'center',
    // marginBottom: mvs(8),
  },
  message: {
    textAlign: 'center',
    // marginBottom: mvs(24),
    paddingHorizontal: mvs(20),
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: mvs(4),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: mvs(16),
    // paddingHorizontal: mvs(0),
  },
  errorIconContainer: {
    width: mvs(18),
    height: mvs(18),
    borderRadius: mvs(9),
    // backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mvs(6),
  },
  errorText: {
    flex: 0,
  },
  codeFieldRoot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellRoot: {
    width: mvs(50),
    height: mvs(50),
    marginHorizontal: mvs(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.borderColor || '#E0E0E0',
    borderWidth: 1,
    borderRadius: mvs(50),
    backgroundColor: colors.white,
  },
  cellText: {
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors.helixPrimary,
    borderWidth: 2,
  },
  continueButton: {
    borderRadius: mvs(28),
    width: '100%',
    height: mvs(43),
    marginTop: mvs(0),
    // marginBottom: mvs(16),
    backgroundColor: colors.helixPrimary,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mvs(0),
    paddingHorizontal: mvs(0),
    width: '100%',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: mvs(4),
    flexWrap: 'wrap',
  },
  resendLink: {
    // textDecorationLine: 'underline',
    marginLeft: mvs(4),
  },
  timerText: {
    textAlign: 'right',
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: mvs(0),
    marginBottom: mvs(30),
    alignSelf: 'center',
  },
  backToLoginLink: {
    textDecorationLine: 'underline',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: mvs(20),
    backgroundColor: colors.white,
    padding: 0,
  },
  modalContent: {
    padding: mvs(24),
    paddingBottom: mvs(30),
  },
  modalIconContainer: {
    alignItems: 'center',
    marginBottom: mvs(24),
  },
  modalIcon: {
    width: mvs(80),
    height: mvs(80),
  },
  sectionTitle: {
    marginBottom: mvs(12),
    marginTop: mvs(8),
  },
  sectionText: {
    marginBottom: mvs(12),
    lineHeight: mvs(20),
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: mvs(20),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: mvs(16),
    marginBottom: mvs(24),
    width: '100%',
    flexWrap: 'wrap',
  },
  checkbox: {
    width: mvs(20),
    height: mvs(20),
    borderWidth: 2,
    borderColor: colors.helixPrimary,
    borderRadius: mvs(4),
    marginRight: mvs(12),
    marginTop: mvs(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    // backgroundColor: '#E6E8FF',
  },
  checkboxTextContainer: {
    flex: 1,
    flexShrink: 1,
  },
  checkboxText: {
    lineHeight: mvs(18),
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  agreeButton: {
    borderRadius: mvs(28),
    width: '70%',
    height: mvs(43),
    marginTop: mvs(0),
    alignSelf:"center",
    backgroundColor: colors.helixPrimary,
  },
});

export default styles;
