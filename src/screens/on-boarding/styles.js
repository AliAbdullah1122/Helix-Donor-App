import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topView: {
    flex: 0.65,

  },
  bottomView: {
    flex: 0.35,
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(40),
    // justifyContent: 'space-between',
    backgroundColor:'white',
    borderTopRightRadius:mvs(20),
    borderTopLeftRadius:mvs(20),
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 11,
},
shadowOpacity: 0.55,
shadowRadius: 14.78,

elevation: 22,

  },
  skipContainer: {
    position: 'absolute',
    // top: mvs(50),
    right: mvs(0),
    zIndex: 1,
  },
  skipButton: {
    backgroundColor: 'transparent',
    width: mvs(60),
    height: mvs(30),
  },
  skipText: {
    color: colors.primary,
    fontSize: mvs(14),
    fontWeight:'500',
    fontFamily:'Satoshi-Medium'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSlide: {
    // alignItems: 'center',
  },
  image: {
    width: mvs(300),
    height: mvs(300),
    // width: '100%',
    // height: '100%',
  },
  customPagination: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: mvs(28),
    // marginLeft:mvs(12)
  },
  dot: {
    width: mvs(8),
    height: mvs(8),
    borderRadius: mvs(4),
    marginHorizontal: mvs(4),
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: mvs(30),
    height: mvs(6),
  },
  inactiveDot: {
    backgroundColor: '#EBECEF',
    width: mvs(18),
    height: mvs(6),
  },
  title: {
    // textAlign: 'center',
    marginVertical: mvs(16),
    fontWeight:"500",
    lineHeight: mvs(34),
  },
  description: {
    textAlign: 'center',
    lineHeight: mvs(22),
    color: colors.subteXTcOLOR,
    fontWeight:"400"
  },
  nextButton: {
    height: mvs(50),
    borderRadius: mvs(25),
    width: '100%',
  },
});

export default styles;
