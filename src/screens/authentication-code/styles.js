import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  forgottext: {
    marginTop: mvs(8),
    fontWeight: '600',
    textAlign: 'center',
  },
  otpContainer: {
    marginTop: mvs(24),
    marginHorizontal: mvs(32),
    marginBottom: mvs(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(15),
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: mvs(24),
    paddingTop: mvs(40),
  },
  subtitleWrapper: {
    marginTop: mvs(12),
    alignItems: 'center',
  },
  subtitleText: {
    fontSize: mvs(13),
    color: colors.subText,
    textAlign: 'center',
  },
  subtitleEmail: {
    fontSize: mvs(13),
    color: colors.subText,
    textAlign: 'center',
    fontWeight: '600',
  },
  continueButton: {
    borderRadius: mvs(50),
    marginTop: mvs(24),
    marginBottom: mvs(16),
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mvs(12),
  },
  resendText: {
    fontSize: mvs(12),
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: mvs(12),
    color: colors.subText,
  },
  backToLogin: {
    marginTop: mvs(40),
    fontSize: mvs(12),
    color: colors.subText,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default styles;