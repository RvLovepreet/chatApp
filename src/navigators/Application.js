import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { SignUp, SignIn } from '../screens';
import { useTheme } from '../hooks';
import { Constent } from '../theme';
import MainNavigator from './Main';
import { useFlipper } from '@react-navigation/devtools';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();
// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
  const key = useSelector(data => data.user);
  console.log(key, 'for key ');
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!key ? (
            <>
              <Stack.Screen
                name={Constent.navigationScreens.SignUp}
                component={SignUp}
              />
              <Stack.Screen
                name={Constent.navigationScreens.SignIn}
                component={SignIn}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={Constent.navigationScreens.Main}
                component={MainNavigator}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default ApplicationNavigator;
