import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import ProfileInfo from './ProfileInfo';
import Category from './Category';
import Question from './Addquestion';
import { useNavigation } from '@react-navigation/native';
import Addquestion from './Addquestion';
import Questionans from './Questionans';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubCategory from './SubCategory';

const Home = () => {
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator>
      <Drawer.Screen name='Category' component={Category}/>
      <Drawer.Screen name='SubCategory' component={SubCategory}/>
      <Drawer.Screen name='Questionans' component={Questionans}/>
      <Drawer.Screen name='Profile' component={ProfileInfo}/>
      
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