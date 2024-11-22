import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { style } from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import Loading from './Loading';
import Dialog from 'react-native-dialog';
export default function Category() {

  const [data, setData] = useState("");
  // const [category, setCategory] = useState("");
  const [final, setFinal] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [Add, setAdd] = useState(false);
  const [categorys, setCategorys] = useState('');
  const [New, setNew] = useState('')
  const [editId, setEditId] = useState(null)
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

            setFinal(set)
            setLoading(false)
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
        "catagoryName": New
      }, {
        'headers': {
          "Authorization": data.token,
        }
      }).then((res => {
        if (res.data) {
          Alert.alert("Successfuly Added !")
          setNew('')
          getInfo();
          setAdd(false);
        }
      })).catch((e) => {
        console.log(e);
        Alert.alert('Category Already Added !')

      })
    } catch (error) {
      console.log(error)
    }
  }

  const checkFunction = (el) => {
    console.log(el);
    setEditId(el._id)
    setCategorys(el.catagoryName)
    setDialogVisible(true)
  }

  console.log("categorys", categorys);


  const Delete = (id) => {

    try {
      axios.delete(`https://interviewhub-3ro7.onrender.com/catagory/${id}`, {
        'headers': {
          "Authorization": data.token,
        }
      })
        .then((res) => {
          Alert.alert('Successfully Delete!')
          getInfo();
        })
    } catch (error) {
      console.log(error)
    }
  }

  const Updates = async () => {
    console.log("el ==> ", editId);
    console.log("categorys ==> ", categorys);

    try {
      if (editId !== "") {
        await axios.patch(`https://interviewhub-3ro7.onrender.com/catagory/${editId}`, {
          "catagoryName": categorys,
          // "status": "off"
        }, {
          'headers': {
            "Authorization": data.token,
          }
        })
          .then((res) => {
            Alert.alert('Successfully Updated!')
            setCategorys('')
            setEditId(null)
            setDialogVisible(false);
            getInfo();
          }).catch((e) => {
            console.log(e);

            Alert.alert('Category Already Available!');
          })
      } else {
        Alert.alert('Enter The Category!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <View style={{ width: '90%', }}>
          <TextInput value={search} onChangeText={setSearch} placeholder='Search' style={styles.Search} />
        </View>
        <TouchableOpacity style={{ marginTop: 3, marginLeft: 8, }} onPress={() => setAdd(true)}>
          <MaterialIcons name="add" size={24} color="white" style={{ backgroundColor: 'black', padding: 5, borderRadius: 8, }} />
          <Dialog.Container visible={Add}>
            <Dialog.Title>Add Category</Dialog.Title>
            <Dialog.Input
              placeholder="Enter category"
              value={New}
              onChangeText={setNew}
            />
            <Dialog.Button label="Cancel" onPress={() => setAdd(false)} />
            <Dialog.Button label="Save" onPress={() => Categories()} />
          </Dialog.Container>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>

          {
            isLoading ? (
              <Loading />
            ) : (final.length) ? (final.filter((el, inx) => {

              return el.catagoryName.toLocaleLowerCase().includes(search.toLocaleLowerCase());
            }).map((el, inx) => {

              return (
                <View key={inx} style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-between', alignItems: 'center', }}>
                  <Text style={styles.TextCate}>{`${inx + 1}.  ${el.catagoryName}`}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                    <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'red', }]} onPress={() => Delete(el._id)}>
                      <Text style={{ color: 'white', }}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'green', }]} onPress={() => checkFunction(el)}>
                      <Text style={{ color: 'white', }}>Update</Text>
                    </TouchableOpacity>
                  </View>




                </View>

              )
            })) : (
              <View style={{ width: '98%', height: '80%', justifyContent: 'center', alignItems: 'center', }}>
                <Text>No data found!</Text>
              </View>
            )



          }

          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Update Category</Dialog.Title>
            <Dialog.Input
              placeholder="Enter name"
              value={categorys}
              onChangeText={setCategorys}
            />
            <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
            <Dialog.Button label="Save" onPress={() => Updates()} />
          </Dialog.Container>






        </View>
      </ScrollView>
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
  },
  BTNCR: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  }
})