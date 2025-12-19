import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  topCard: {
    // marginHorizontal: mvs(16),
    // marginTop: mvs(10),
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(30),
    borderTopRightRadius: mvs(30),
    paddingHorizontal: mvs(10),
    paddingTop: mvs(20),
    marginTop: mvs(5),
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: mvs(16),
  },
  filterButton: {
    borderRadius: mvs(35),
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: mvs(15),
    // paddingVertical: mvs(10),
    marginRight: mvs(8),
    marginBottom: mvs(8),
    alignContent: 'center',
    justifyContent: 'center',
height:mvs(40)
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    color: colors.primary,
    fontSize: mvs(12),
  },
  activeFilterButtonText: {
    color: colors.white,
  },
  reviewCard: {
    // borderBottomWidth: 1,
    // borderColor: colors.border,
    paddingBottom: mvs(12),
    marginBottom: mvs(10),
  },
  orderText: {
    color: colors.grey,
    marginBottom: mvs(4),
  },
  commentText: {
    fontSize: mvs(14),
    color: colors.subteXTcOLOR,
    fontWeight: '400'
   },
  ratingTag: {
    // alignSelf: 'flex-start',
    backgroundColor: colors.barbg,
    borderRadius: mvs(12),
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(4),
  },
  ratingTagText: {
    color: colors.primary,
  },
  
});
export default styles;