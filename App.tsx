import React, { useState } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './home.component'
import Register from './register.component'
import Login from './log-in.component'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Log in" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

