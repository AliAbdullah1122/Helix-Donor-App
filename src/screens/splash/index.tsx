import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as IMG from 'assets/images';
import React from 'react';
import { View, StatusBar } from 'react-native';
import Video from 'react-native-video';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import { UTILS } from 'utils';
import { STORAGEKEYS } from 'config/constants';

type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const { navigation } = props;

  React.useEffect(() => {
    (async () => {
      try {
        let screen: any = 'HelixWelcome';
        const isAppLaunched = await UTILS.getItem('hasLaunched');
        if (isAppLaunched) {
          await UTILS.getItem(STORAGEKEYS.user).then((data: any) => {
            if (data) {
              const user = JSON.parse(data);
              console.log('user', user);
              screen = 'TabBar';
            }

          });
        } else {
          await UTILS.setItem('hasLaunched', 'true');
          screen = 'HelixWelcome';
        }
        setTimeout(() => {
          navigation?.replace(screen);
        }, 8000); // Increased timeout to allow video to play a bit
      } catch (error) { }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={styles.container.backgroundColor}
        barStyle="dark-content"
      />
      <Video
        source={IMG.SplashVideo}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        shutDownOnDeactivate={true}
      // controls={false}
      />
    </View>
  );
};
export default Splash;
