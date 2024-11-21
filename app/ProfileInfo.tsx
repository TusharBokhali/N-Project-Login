import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { style } from 'twrnc'

export default function ProfileInfo() {

  const [data,setData] = useState("")
  AsyncStorage.clear();

  const getData = async() =>{
    try {
       const pro = await AsyncStorage.getItem('User');
       const Data = JSON.parse(pro || "");
       if(Data){
        console.log(Data);
        
         setData(Data)
        }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <View style={{flex:1,padding:15,}}>
     <View style={{marginTop:50,alignItems:'center'}}>
      <Image source={{uri:'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'}} 
      style={{width:100,height:100,borderRadius:50,}}
      />  
     </View>
      <View style={{marginTop:20}}>
          <Text style={{fontSize:18,}}>User Account:</Text>
          <TextInput value={`Email: ${data.email}`} style={styles.Input}/>
          <TextInput value={`Password: ${data.password}`} style={styles.Input}/>
          <TouchableOpacity style={styles.BTN}>
            <Text style={{fontSize:18,fontWeight:'600',textAlign:'center',}}>Edit</Text>
          </TouchableOpacity>
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
  }
})