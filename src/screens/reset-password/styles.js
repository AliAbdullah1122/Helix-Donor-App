import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    // paddingTop: '50%',
    // paddingHorizontal: mvs(20),
    // marginVertical: mvs(30),
  },
  button: {
    width: '100%',
    paddingHorizontal: mvs(20),
    position: 'absolute',
    bottom: 0,
    paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40),
  },
  input:{
    marginTop: mvs(15),
    height: mvs(50),
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
    // paddingBottom: mvs(150),
  },

  forgottext: {
    marginTop: mvs(15),
    // marginBottom: mvs(20),
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: mvs(10),
  },
});
export default styles;
