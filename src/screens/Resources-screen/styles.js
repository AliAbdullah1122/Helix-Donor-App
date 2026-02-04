import { Platform, StyleSheet } from 'react-native';
import { colors } from 'config/colors';
import { mvs, width } from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.helixBackground,
    paddingHorizontal: mvs(12),
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.helixBackground,
    paddingBottom: mvs(20),
  },
  backButton: {
    marginTop: mvs(20),
    marginBottom: mvs(20),
    alignSelf: 'flex-start',
    // padding: mvs(8),
  },
  title: {
    textAlign: 'center',
    // marginBottom: mvs(16),
  },
  // Resources list
  resourcesContainer: {
    marginTop: mvs(10),
    paddingBottom: mvs(20),
    borderRadius: mvs(24),
    gap: mvs(16),

  },
  resourceCard: {
    borderRadius: mvs(24),
    padding: mvs(10),
    minHeight: mvs(140),
    // backgroundColor: '#f4f4f4ff', // outer light grey container
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.04,
    // shadowRadius: 10,
    // elevation: 3,
  },
  resourceInnerCard: {
    // paddingVertical: mvs(25),
    // paddingHorizontal: mvs(18),
    padding: mvs(20),
    borderRadius: mvs(14),
    minHeight: mvs(120),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  resourceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  resourceIconContainer: {
    width: mvs(44),
    height: mvs(44),
    // borderRadius: mvs(22),
    // backgroundColor: '#F4F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mvs(12),
    marginTop: mvs(10),
  },
  resourceTextContainer: {
    flex: 1,
  },
  expandIcon: {
    marginLeft: mvs(8),
    marginTop: mvs(10),
  },
  expandedContent: {
    width: '100%',
    paddingTop: mvs(20),
    // paddingBottom: mvs(24),
  },
  expandedText: {
    marginBottom: mvs(16),
    lineHeight: mvs(20),
    fontWeight: "400",
    color: '#404040',
  },
  keyFactsTitle: {
    marginTop: mvs(12),
    marginBottom: mvs(12),
    fontWeight: '500',
    color: '#404040',
  },
  bulletItemContainer: {
    marginBottom: mvs(12),
  },
  bulletLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(4),
  },
  bulletValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: mvs(20),
    paddingRight: mvs(10),
  },
  bulletDot: {
    marginRight: mvs(8),
    fontSize: mvs(14),
  },
  keyFactItem: {
    marginBottom: mvs(12),
  },
  searchButton: {
    borderRadius: mvs(40),
    marginTop: mvs(24),
    marginBottom: mvs(16),
    backgroundColor: colors.primary,
    height: mvs(50),
  },
  sourceText: {
    marginTop: mvs(8),
    fontWeight: '400',
    fontSize: mvs(12),
    color: '#8C8C8C',
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
    alignSelf: "center",
    backgroundColor: colors.helixPrimary,
  },
});

export default styles;
