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
   <Drawer.Navigator initialRouteName='Home' drawerContent={props=>{
  const {routeNames, index} = props.state;
  const focused = routeNames[index];

     
     return 
     (<DrawerContentScrollView {...props}>
        <Text style={{textAlign:'center',fontWeight:'600',fontSize:18,}}>Menu</Text>
        <DrawerItem label={'Home'} onPress={()=>props.navigation.navigate('Home')}
          focused={focused === 'Home'}
          activeBackgroundColor='orange'
          inactiveBackgroundColor='gray'
          inactiveTintColor='black'
          activeTintColor='white'
          />
        <DrawerItem label={'Category'} onPress={()=>props.navigation.navigate('Category')}
            focused={focused === 'Category'}
          activeBackgroundColor='orange'
          inactiveBackgroundColor='gray'
          inactiveTintColor='black'
          activeTintColor='white'
          />
        <DrawerItem label={'Question'} onPress={()=>props.navigation.navigate('Question')}
          focused={focused === 'Question'}
          activeBackgroundColor='orange'
          inactiveBackgroundColor='#812323'
          inactiveTintColor='black'
          activeTintColor='white'
          />
      </DrawerContentScrollView>
     );
}}>
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