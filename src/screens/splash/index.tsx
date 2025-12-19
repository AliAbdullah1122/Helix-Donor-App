import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as IMG from 'assets/images';
import React from 'react';
import {View, StatusBar, Image} from 'react-native';
import RootStackParamList from '../../types/navigation-types/root-stack';
import {useAppDispatch} from 'hooks/use-store';
import styles from './styles';
import {mvs} from 'config/metrices';
import {UTILS} from 'utils';
import {STORAGEKEYS} from 'config/constants';

type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const {navigation} = props;

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
              screen = 'Drawer';
            }
            
          });
        } else {
          await UTILS.setItem('hasLaunched', 'true');
          screen = 'HelixWelcome';
        }
        setTimeout(() => {
              navigation?.replace(screen);
            }, 2000);
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={styles.container.backgroundColor}
        barStyle="light-content"
      />
      <Image
        source={IMG.helixLogo}
        resizeMode="contain"
        style={{width: mvs(200), height: mvs(80)}}
      />
    </View>
  );
};
export default Splash;
