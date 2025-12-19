import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(20),
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    paddingBottom: mvs(30),
  },
  closeButton: {
    marginTop: mvs(20),
    alignSelf: 'flex-start',
  },
  title: {
    textAlign: 'center',
    // marginBottom: mvs(16),
  },
  headerSection: {
    marginTop: mvs(80),
    alignItems: 'center',
  },
  sparkleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: mvs(12),
  },
  matchTitle: {
    marginHorizontal: mvs(8),
  },
  subTitle: {
    marginTop: mvs(8),
    textAlign: 'center',
  },
  imagesRow: {
    marginTop: mvs(120),
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: mvs(0),
  },
  profileCard: {
    width: mvs(120),
    height: mvs(150),
    borderRadius: mvs(24),
    backgroundColor: 'transparent',
    // borderWidth: mvs(1),
    borderColor: colors.helixPrimary || colors.primary, // dark blue border
    overflow: 'hidden',
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 4}, // control shadow height
    shadowOpacity: 0.9,
    shadowRadius: 6, // smaller spread for a tighter glow
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartContainer: {
    marginHorizontal: mvs(-16), // pull heart in so edges touch both images
  },
  connectedTextContainer: {
    marginTop: mvs(24),
    alignItems: 'center',
  },
  messagingText: {
    // marginTop: mvs(40),
    // textAlign: 'center',
    marginLeft:mvs(10),
    textAlign:"left"
  },
  messageBar: {
    marginTop: mvs(20),
    marginHorizontal: mvs(4),
    height: mvs(50),
    borderRadius: mvs(25),
    backgroundColor: '#F5F5FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(20),
  },
  messagePlaceholder: {
    flex: 1,
  },
  sendIconWrapper: {
    width: mvs(32),
    height: mvs(32),
    borderRadius: mvs(16),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
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
