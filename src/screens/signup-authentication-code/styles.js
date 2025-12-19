import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  forgottext: {
    marginTop: mvs(15),
    fontWeight: '400',
  },
  otpContainer: {
    marginTop: mvs(30),
    marginHorizontal: mvs(20),
    marginBottom: mvs(10),
  },
  // Custom Keyboard Styles
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: mvs(10),
    paddingHorizontal: mvs(10),
    backgroundColor:colors.background,
    paddingTop:mvs(20)

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(15),
    backgroundColor: colors.white,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: mvs(15),
  },
  keyButton: {
    width: '29%',
    height: mvs(47),
    borderRadius: mvs(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    // borderWidth: 1,
    borderColor: colors.background,
  },
  emptyKey: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  keyNumber: {
    fontSize: mvs(24),
    fontWeight: 'bold',
    color: colors.black,
  },
  keyLetters: {
    fontSize: mvs(10),
    color: colors.grey,
    marginTop: mvs(2),
    fontWeight: '400',
  },
});

export default styles;