import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens:-
import Page from './src/components/Page';
import Home from './src/screens/Home';
import SideBar from './src/components/SideBar';


const Stack = createNativeStackNavigator();

function ScreensStack() {
  return (
    <Stack.Navigator initialRouteName='Page'>
      <Stack.Screen name="Page" component={Page} options={{headerShown: false,}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
      <Stack.Screen name='SideBar' component={SideBar} options={{headerShown:false,}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <StatusBar style='dark'/>
      <ScreensStack />
    </NavigationContainer>
  )
}
