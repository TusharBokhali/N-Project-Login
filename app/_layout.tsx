import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import Home from './Home';
import Login from './Login';
import SingUp from './SingUp';
import Welcome from './Welcome';
import ProfileInfo from './ProfileInfo';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text } from 'react-native';



export default function RootLayout() {


  const Stack = createStackNavigator();
  const [user,setUser] = useState("");
  async function Data(){
    const res = await AsyncStorage.getItem("User")
    const value = res ? JSON.parse(res) : null;
    setUser(value)
  }
  useEffect(()=>{
    Data();
  },[])
  
  return (
    <NavigationContainer independent={true}>
      <StatusBar style='auto' />
      <Stack.Navigator initialRouteName={(user!==null && user !== " ") ? 'Home' : 'Welcome'}>
        <Stack.Screen name="ProfileInfo" options={{ headerShown: false }} component={ProfileInfo} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="SingUp" options={{ headerShown: false }} component={SingUp} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
