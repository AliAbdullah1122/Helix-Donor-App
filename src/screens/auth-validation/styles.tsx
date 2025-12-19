import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: mvs(24),
  },
  logoContainer: {
    marginBottom: mvs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: mvs(12),
  },
  message: {
    textAlign: 'center',
    marginBottom: mvs(32),
  },
  button: {
    width: '100%',
    borderRadius: mvs(50),
    height: mvs(50),
  },
});

export default styles;


