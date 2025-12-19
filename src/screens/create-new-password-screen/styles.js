import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(15),
    backgroundColor: colors.white,
  },
  backButton: {
    padding: mvs(5),
    marginRight: mvs(10),
  },
  headerTitle: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  contentContainerStyleNew: {
    flexGrow: 1,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(20),
    backgroundColor: colors.white,
  },
  keyboradscrollcontent: {
    paddingHorizontal: mvs(0),
    flexGrow: 1,
  },
  forgottext: {
    marginTop: mvs(15),
  },
});

export default styles;

