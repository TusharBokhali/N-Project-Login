import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Addquestion() {
  const [question,setQuestions] = useState("");
  const [answer,setAnswer] = useState("");
  const [data,setData] = useState("")

  const getQuestions = () =>{
    if(question!=="" && answer!==""){
      try {
        axios.post('https://interviewhub-3ro7.onrender.com/questions/create')
        
      } catch (error) {
        console.log(error);
      }
    }else{
      Alert.alert('Enter The Questions!')
    }
  }


  const getData = async() =>{
      try {
        const pro = await AsyncStorage.getItem('User');
        const Data = JSON.parse(pro || "");
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

  // useEffect(()=>{
  //   getQuestions();
  // },[])
  return (

      <View style={styles.container}>
        <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',marginTop:10,}}>Questions:</Text>
          <View style={{marginVertical:10,}}>
              <Text style={{marginVertical:10}}>Question</Text>
              <TextInput placeholder='Enter Question' value={question} onChangeText={setQuestions} style={styles.Input}/>
          </View>
          <View style={{marginVertical:5,}}>
              <Text style={{marginVertical:10}}>Answer:</Text>
              <TextInput placeholder='Enter Answer' value={answer} onChangeText={setAnswer}  style={styles.Input}/>
          </View>
          <TouchableOpacity style={styles.BTN} onPress={()=>getQuestions()}>
            <Text style={{fontSize:18,fontWeight:'600',textAlign:'center',}}>Add</Text>
          </TouchableOpacity>
      </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:15,
  },
  Input:{
    borderWidth:1,
    borderColor:'#ada8a8bd',
    borderRadius:10,
    paddingLeft:10,
  },
  BTN:{
    backgroundColor:'#edd30b',
    paddingVertical:15,
    borderRadius:15,
    marginTop:20,
  }
})