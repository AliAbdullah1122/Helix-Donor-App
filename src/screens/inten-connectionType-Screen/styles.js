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
    marginTop: mvs(50),
    // borderRadius: mvs(16),
     borderRadius: mvs(20),
    // flex: 1,
    gap: mvs(16),
    marginBottom: mvs(20),
  },
  serviceCardGradient: {
    // borderRadius: mvs(16),
     borderRadius: mvs(20),
    
  },
  serviceCardOuter: {
    borderRadius: mvs(20),
    padding: mvs(10),
    minHeight: mvs(64),
  },
  serviceCardOuterSelected: {
    borderWidth: 1,
    borderColor: colors.primary,
    
  },
  serviceCardInner: {
    backgroundColor: colors.white,
     borderRadius: mvs(20),
    padding: mvs(10),
    height:mvs(64),
    alignItems:'center',
    // height: '100%',
    width: '100%',
  },
  serviceCardContent: {
    justifyContent:"center",
    marginTop:mvs(10),
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
    width: mvs(24),
    height: mvs(24),
  },
  serviceTextContainer: {
    flex: 1,
    
    // height:mvs(20)
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
