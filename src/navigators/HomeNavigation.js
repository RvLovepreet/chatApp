import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Constent } from '../theme';
import { Home, ChatScreen } from '../screens';
const Stack = createStackNavigator();
// @refresh reset
const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Constent.navigationScreens.Home} component={Home} />
      <Stack.Screen
        name={Constent.navigationScreens.ChatScreen}
        component={ChatScreen}
        options={() => ({
          tabBarVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigation;
