import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import prompt from 'react-native-prompt-android';
import { style } from 'twrnc'
import { useNavigation } from '@react-navigation/native';


export default function ProfileInfo() {

  const [datas,setData] = useState("")
  const navigation = useNavigation();
  

  const getData = async() =>{
    try {
       const pro = await AsyncStorage.getItem('User');
       const Data = JSON.parse(pro );
       if(Data){
         setData(Data)
        }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    getData();
  },[])

  const LogOut = () =>{
    Alert.alert('Log Out', 'Sure Logout Account!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async() => {
        await AsyncStorage.clear();
        navigation.navigate('Login');
      }},
    ]);
 
  }
  

  return (
    <View style={{flex:1,padding:15,}}>
     <View style={{marginTop:50,alignItems:'center'}}>
      <Image source={{uri:'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'}} 
      style={{width:100,height:100,borderRadius:50,}}
      />  
     </View>
      <View style={{marginTop:20}}>
          <Text style={{fontSize:18,}}>User Account:</Text>
          {datas ? (
              <TextInput value={`Email: ${datas.data.email}`} style={styles.Input}/>
          ):''}
          
          <TextInput value={`Password: ******`} style={styles.Input}/>
          <View style={{flexDirection:'row',justifyContent:'space-around',}}>


          <TouchableOpacity style={styles.BTN} onPress={()=>{LogOut()}}>
          
            <Text style={{fontSize:18,fontWeight:'600',textAlign:'center',}}>Log Out</Text>
          </TouchableOpacity>
          </View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  Input:{
    padding:10,
    borderWidth:1,
    borderColor:'#c3bdbdb1',
    borderRadius:10,
    marginVertical:10,
  },
  BTN:{
    backgroundColor:'#edd30b',
    paddingVertical:15,
    borderRadius:15,
    marginTop:20,
    width:'45%',
    marginHorizontal:10,
  }
})