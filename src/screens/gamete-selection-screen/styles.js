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
    // marginBottom: mvs(32),
    // marginTop:mvs(40),
    color: '#404040',
  },
  optionsContainer: {
    marginTop: mvs(100),
    borderRadius: mvs(16),
    flex: 1,
    gap: mvs(16),
    marginBottom: mvs(40),
  },
  serviceCardGradient: {
    borderRadius: mvs(16),
  },
  serviceCardOuter: {
    borderRadius: mvs(16),
    padding: mvs(10),
    height: mvs(123),
  },
  serviceCardOuterSelected: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  serviceCardInner: {
    backgroundColor: colors.white,
    borderRadius: mvs(9),
    padding: mvs(16),
    height: '100%',
    width: '100%',
  },
  serviceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceCardContentReverse: {
    flexDirection: 'row-reverse',
  },
  serviceIconContainer: {
    marginRight: mvs(16),
  },
  serviceIconContainerRight: {
    marginRight: 0,
    marginLeft: mvs(16),
  },
  serviceIcon: {
    width: mvs(60),
    height: mvs(60),
  },
  serviceTextContainer: {
    flex: 1,
  },
  serviceTitle: {
    marginBottom: mvs(8),
    color: '#404040',
  },
  serviceDescription: {
    lineHeight: mvs(20),
    color: '#8C8C8C',
  },
  continueButton: {
    borderRadius: mvs(28),
    width: '48%',
    height: mvs(45),
    backgroundColor: colors.helixPrimary,
    marginTop: mvs(20),
  },
 BackButton: {
    borderRadius: mvs(28),
    width: '48%',
    height: mvs(45),
    backgroundColor: colors.transparent,
    marginTop: mvs(20),
    borderWidth:1,
    borderColor:colors.primary
  },
});

export default styles;
