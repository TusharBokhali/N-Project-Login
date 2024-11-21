import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios';
import { style } from 'twrnc';
export default function Category() {

  const [data, setData] = useState("");
  const [category, setCategory] = useState("");
  const [final, setFinal] = useState([])
  const [search, setSearch] = useState("");
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

  const getInfo = async () => {
    try {
      await axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
        'headers': {
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2FjODRkOGI0YmZjNWIxYmRhODRlYSIsImlhdCI6MTczMjAwNzUwN30.BFQ3pbZhffqm516GeDGyPODxUUpKafMq721K-hKrKCQ",
        }
      })
        .then((res) => {
          if (res.data) {
            // console.log(res.data.data);
            let set = res.data.data;
            let datas = set.map((el, inx) => {
              return el.catagoryName
            })
            setFinal(datas)
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

  const Categories = async () => {
    try {
      axios.post('https://interviewhub-3ro7.onrender.com/catagory/create', {
        "catagoryName": category
      }, {
        'headers': {
          "Authorization": data.token,
        }
      }).then((res => {
        if (res.data) {
          Alert.alert("Successfuly Added !")
        }
      }))
    } catch (error) {
      console.log(error)
    }
  }
  let Searchs = () => {


  }
  return (
    <View style={styles.container}>

      <TextInput value={search} onChangeText={setSearch} onChange={() => Searchs()} placeholder='Search' style={styles.Search} />
      {
        final.map((el, inx) => {
          return (
            <Text key={inx} style={styles.TextCate}>{`${inx + 1}.  ${el}`}</Text>
          )
        })
      }
      {/* <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, }}>Category Field:</Text>

        <TextInput value={`Category: ${final}`} style={styles.Input} />
        
      </View> */}
      {/* <View>
        <Text style={styles.Title}>Category</Text>
        <TextInput value={category} onChangeText={setCategory} placeholder='Add Category' style={styles.Input} />
        <TouchableOpacity style={styles.BTN} onPress={()=>Categories()}>
          <Text style={{fontSize:18,fontWeight:'600',textAlign:'center',}}>Add</Text>
        </TouchableOpacity>
      </View> */}
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
  Title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  BTN: {
    backgroundColor: '#edd30b',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  Search: {
    padding: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#bfb6b6c9',
    borderRadius: 10,
    marginBottom: 20,
  },
  TextCate: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  }
})