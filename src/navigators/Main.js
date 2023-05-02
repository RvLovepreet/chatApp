import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Constent } from '../theme';
import { Profile } from '../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeNavigation from './HomeNavigation';
const Tab = createBottomTabNavigator();
// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={Constent.navigationScreens.HomeNavigation}
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Constent.navigationScreens.Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" color={color} size={size} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
