import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppSelector} from 'hooks/use-store';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import HomeTab from 'screens/home-tab';
import CustomAlertScreen from 'screens/custom-alert';
import JobsScreen from 'screens/jobs-screen';
import PortfolioScreen from 'screens/portfolio-screen';
import * as IMG from 'assets/images';
import React from 'react';
import Medium from 'typography/medium-text';
import ChatScreen from 'screens/chat-screen';
import OverviewScreen from 'screens/overview-screen';
import ReviewFromAdminScreen from 'screens/review-from-admin';
import DriverProfileScreen from 'screens/driver-profile';
import SearchScreen from 'screens/search-screen';
import ChatMainScreen from 'screens/chatMain-screen';
import MainProfileScreen from 'screens/MainProfile-screen';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{backgroundColor: colors.primary}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.primary,
          height: mvs(75),
          justifyContent: 'space-around',
          alignItems: 'center',
          // borderTopLeftRadius: mvs(25),
          // borderTopRightRadius: mvs(25),
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          // Map routes to new icons
          const Icon =
            route.name === 'Home'
              ? IMG.HelixBottomTab
              : route.name === 'SearchScreen'
              ? IMG.searchBootmTab
              : route.name === 'ChatMainScreen'
              ? IMG.messagesBootmTab
              : route.name === 'MainProfileScreen'
              ? IMG.userBootmTab
              : null;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: mvs(50),
                height: mvs(50),
              }}>
              <View
                style={{
                  width: mvs(40),
                  height: mvs(40),
                  borderRadius: mvs(10),
                  backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {Icon && <Icon width={mvs(32)} height={mvs(32)} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export const TabBar = () => {
  const {user} = useAppSelector(s => s);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{tabBarLabel: 'Orders'}}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{tabBarLabel: 'Overview'}}
      />
      <Tab.Screen
        name="ChatMainScreen"
        component={ChatMainScreen}
        options={{tabBarLabel: 'Chat'}}
      />
      
      <Tab.Screen
        name="MainProfileScreen"
        component={MainProfileScreen}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};
