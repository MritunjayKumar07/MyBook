import React, { useState, useEffect } from 'react';
import { StatusBar, Keyboard, Platform  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/components/Page';
import Home from './src/screens/Home';
import Page from './src/components/Page';
import SideBar from './src/components/SideBar';
import Search from './src/components/Search';

// Components
import BottomNavigation from './src/components/BottomNavigation';
import TopBar from './src/components/TopBar';
import colors from './assets/colors';
import Transaction from './src/components/EditDeletTransaction';

const Stack = createStackNavigator();

function ScreensStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Page" component={Page} options={{ headerShown: false }} />
      <Stack.Screen name="SideBar" component={SideBar} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Stack.Screen name="Transaction" component={Transaction} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAppReady(true);
    };
    initializeApp();

    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    // Clean up listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };


  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={colors.primary} color={colors.text} />
      <TopBar />
      <ScreensStack />
      {isKeyboardOpen ?  null:<BottomNavigation />}
    </NavigationContainer>
  );
}
