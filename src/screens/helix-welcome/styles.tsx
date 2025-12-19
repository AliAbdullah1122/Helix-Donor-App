import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  top: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: mvs(24),
    fontWeight: '700',
    color: colors.black,
  },
  middle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBlock: {
    width: '100%',
    height: mvs(220),
    backgroundColor: colors.helixPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helixLogo: {
    width: mvs(200),
    height: mvs(80),
  },
  bottom: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: mvs(24),
  },
  tagline: {
    fontSize: mvs(18),
    color: colors.black,
  },
});

export default styles;


