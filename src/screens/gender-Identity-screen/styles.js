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
    paddingTop: mvs(20),
    paddingBottom: mvs(30),
  },
  backButton: {
    marginBottom: mvs(24),
    alignSelf: 'flex-start',
  },
  heading: {
    marginBottom: mvs(32),
    marginTop:mvs(40),
    color: '#404040',
  },
  optionsContainer: {
    marginTop:mvs(50),
    borderRadius:mvs(16),
    flex: 1,
    gap: mvs(16),
    marginBottom: mvs(40),
  },
  optionCardOuter: {
    borderRadius: mvs(16),
    padding: mvs(10),
    height: mvs(123),
  },
  optionCardOuterSelected: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  optionCardGradient: {
    borderRadius: mvs(16),
    // height: '100%',
    // width: '100%',
  },
  optionCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: mvs(9),
    padding: mvs(16),
    height: '100%',
    width: '100%',
  },
  optionIconContainer: {
    marginRight: mvs(16),
  },
  optionLabel: {
    flex: 1,
    color: '#404040',
  },
  continueButton: {
    borderRadius: mvs(28),
    width: '100%',
    height: mvs(50),
    backgroundColor: colors.helixPrimary,
    marginTop: mvs(20),
  },
});

export default styles;
