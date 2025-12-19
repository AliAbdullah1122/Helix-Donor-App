import { Platform, StyleSheet, Dimensions } from 'react-native';
import { colors } from 'config/colors';
import { mvs, width } from 'config/metrices';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  landscapeScrollContainer: {
    paddingHorizontal: mvs(20),
  },
  
  // Top Section (Logo + Title)
  topSection: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: mvs(35),
  },
  landscapeTopSection: {
    flex: 2,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(10),
    paddingTop: mvs(20),
  },
  
  imglogo: {
    width: mvs(80),
    height: mvs(80),
    alignSelf: 'center',
    marginBottom: mvs(10),
  },
  landscapeImgLogo: {
    width: mvs(60),
    height: mvs(60),
    alignSelf: 'center',
    marginBottom: 0,
  },
  
  titleview: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: mvs(20),
  },
  landscapeTitleView: {
    flex: 1,
    paddingHorizontal: mvs(10),
    marginLeft: mvs(20),
  },
  
  // Middle Section (Image)
  middleSection: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  landscapeMiddleSection: {
    flex: 5,
    justifyContent: 'center',
  },
  
  imgStyle: {
    // width: '100%',
    // height: '100%',
    width:mvs(370),
    height:mvs(150),
    resizeMode: 'cover',
  },
  landscapeImgStyle: {
    width: mvs(300),
    height: mvs(300),
    resizeMode: 'contain',
  },
  
  // Bottom Section (Buttons)
  buttonView: {
    flex: 2,
    paddingHorizontal: mvs(20),
    gap: mvs(12),
    paddingBottom: mvs(15),
    justifyContent: 'flex-end',
  },
  landscapeButtonView: {
    flex: 2,
    // flexDirection: 'row',
    gap: mvs(15),
    paddingBottom: mvs(20),
    // justifyContent: 'space-between',
  },
  
  button: {
    width: '100%',
    borderColor: colors.white,
    borderWidth: 1,
    height: mvs(50),
    borderRadius: mvs(60),
  },
  button2: {
    width: '100%',
    backgroundColor: colors.white,
    // borderWidth: 1,
    height: mvs(50),
    borderRadius: mvs(60),
    marginBottom:mvs(50)
  },
  
  buttonText: { 
    color: colors.white,
    fontSize: mvs(16),
  },
  buttonText2: { 
    color: colors.primary,
    fontSize: mvs(16),
  },
});

// Add landscape-specific button styles
const landscapeStyles = StyleSheet.create({
  button: {
    flex: 1,
    borderColor: colors.white,
    borderWidth: 1,
    height: mvs(50),
    borderRadius: mvs(60),
  },
  button2: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    height: mvs(50),
    borderRadius: mvs(60),
  },
});

// Merge landscape button styles
styles.landscapeButton = landscapeStyles.button;
styles.landscapeButton2 = landscapeStyles.button2;

export default styles;