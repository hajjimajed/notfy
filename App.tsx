import React, { useState, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging'; // import the messaging module

import HomeScreen from './home.component'
import Register from './register.component'
import Login from './log-in.component'
import Students from './students.component'

import { StudentsProvider } from "./students.context";
import { UserProvider } from "./user.context";

export default function App() {

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Handling background message:', remoteMessage);
    });
  }, []);

  useEffect(() => {
    messaging().requestPermission();
    messaging().onMessage((message) => {
      console.log('Received FCM message:', message);
    });
  }, []);

  return (
    <StudentsProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Log in" component={Login} />
            <Stack.Screen name="Students" component={Students} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </StudentsProvider>

  );
}

