import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <TouchableOpacity>
            <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg' }} style={{ width: 50, height: 50, borderRadius: 50, }} />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 15, }}>
            <Text>Welcome</Text>
            <Text>Harry!</Text>
          </View>
        </View>
        <TouchableOpacity>
        <Ionicons name="notifications" size={24} color="black" />   
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
        <Text style={{ fontSize: 32, }}>Home</Text>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  }
})