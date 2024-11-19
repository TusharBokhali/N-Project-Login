import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import ProfileInfo from './ProfileInfo';
import Category from './Category';
import Question from './Question';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator>
      <Drawer.Screen name='Home' component={ProfileInfo}/>
      <Drawer.Screen name='Category' component={Category}/>
      <Drawer.Screen name='Question' component={Question}/>
   </Drawer.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  }
})