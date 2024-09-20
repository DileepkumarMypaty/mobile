
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MainTab from './navigation/MainTab';

const Stack = createStackNavigator();

const AppJS = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          ...TransitionPresets.ModalFadeTransition,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 600,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 600,
              },
            },
          },
        }}
      >
        <Stack.Screen name="Dashboard" component={MainTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppJS;
