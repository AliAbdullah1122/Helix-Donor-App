import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import fonts from 'assets/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  top: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: mvs(28),
    fontWeight: '700',
    fontFamily:fonts.bold,
    color: colors.black,
    letterSpacing:0,
    marginTop:mvs(50)
  },
  middle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBlock: {
    width: '100%',
    height: mvs(220),
    // backgroundColor: colors.helixPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helixLogo: {
    width: mvs(259),
    height: mvs(64),
  },
  bottom: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: mvs(24),
  },
  tagline: {
    fontSize: mvs(24),
    color: colors.black,
    fontFamily:fonts.medium,
    fontWeight:"500",
    letterSpacing:0

  },
});

export default styles;


