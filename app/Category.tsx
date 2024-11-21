import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios';
export default function Category() {

  const [data, setData] = useState("");
  const [category,setCategory] = useState("");
  const [final,setFinal] = useState([])
  const getData = async () => {
    try {
      const pro = await AsyncStorage.getItem('User');
      const Data = JSON.parse(pro || "");
      if (Data) {
        
        setData(Data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getInfo = async() =>{
      try {
      await axios.get('https://interviewhub-3ro7.onrender.com/catagory/',{
          'headers':{
            "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2FjODRkOGI0YmZjNWIxYmRhODRlYSIsImlhdCI6MTczMjAwNzUwN30.BFQ3pbZhffqm516GeDGyPODxUUpKafMq721K-hKrKCQ",
          }
        })
        .then((res)=>{
          if(res.data){
          // console.log(res.data.data);
          let set = res.data.data;
          let datas = set.map((el,inx)=>{
            return el.catagoryName
          })
            setFinal(datas.join(',').slice(0,35))
          }
          
        })
      } catch (error) {
        console.log(error);
        
      }
  }

  useEffect(() => {
    getData();
    getInfo();
  }, [])

  const Categories = async() =>{
      try {
        axios.post('https://interviewhub-3ro7.onrender.com/catagory/create',{
              "catagoryName" : category
          },{
              'headers':{
                "Authorization":data.token,
              }
          }).then((res =>{
            if(res.data){
                Alert.alert("Successfuly Added !")
            }
          }))
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Image source={{ uri: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg' }}
          style={{ width: 100, height: 100, borderRadius: 50, }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, }}>User Account:</Text>
        <Text>{console.log(data.data.email)}</Text>
        <TextInput value={`Email: ${data.data.email}`} style={styles.Input} />
        <TextInput value={`Password: *********`} style={styles.Input} />
        <TextInput value={`Category: ${final}`} style={styles.Input} />
        
      </View>
      <View>
        <Text style={styles.Title}>Category</Text>
        <TextInput value={category} onChangeText={setCategory} placeholder='Add Category' style={styles.Input} />
        <TouchableOpacity style={styles.BTN} onPress={()=>Categories()}>
          <Text style={{fontSize:18,fontWeight:'600',textAlign:'center',}}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  Input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#c3bdbdb1',
    borderRadius: 10,
    marginVertical: 10,
  },
  Title:{
    textAlign:'center',
    marginTop:20,
    fontSize:20,
    fontWeight:'600',
  },
  BTN:{
    backgroundColor:'#edd30b',
    paddingVertical:15,
    borderRadius:15,
    marginTop:20,
  }
})