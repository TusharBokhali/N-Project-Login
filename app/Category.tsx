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
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [value, setValue] = useState(null);
  const isFocused = useIsFocused();

  // const pro = AsyncStorage.getItem('User');
  // // const Data = JSON.parse(pro || "");
  // console.log("Data ===> ", pro);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   getData();
  //   getInfo()
  // }, [])

  const getData = async () => {
    try {
      const pro = await AsyncStorage.getItem('User');

      const Data = JSON.parse(pro || "");


      if (Data.token) {
        setData(Data.token)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (data) {
      getInfo();
    }
  }, [data]);
  // console.log("tokentokentokentokentoken ==> ", data);


  const getInfo = async () => {


    // getData() 
    try {
      await axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
        'headers': {
          "Authorization": data,
        }
      })
        .then((res) => {
          if (res.data) {
            setFinal(res.data.data)
            setLoading(false)
          }

        })
    } catch (error) {
      console.log(error);

    }
  }



  const Categories = async () => {
    if (New !== "") {


      try {
        axios.post('https://interviewhub-3ro7.onrender.com/catagory/create', {
          "catagoryName": New
        }, {
          'headers': {
            "Authorization": data,
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
    } else {
      Alert.alert('Enter Category!')
    }
  }

  const checkFunction = (el) => {
    console.log(el);
    setEditId(el._id)
    setCategorys(el.catagoryName)
    setDialogVisible(true)
  }


  const Delete = (id) => {

    try {
      axios.delete(`https://interviewhub-3ro7.onrender.com/catagory/${id}`, {
        'headers': {
          "Authorization": data,
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

    try {
      if (editId !== "") {
        await axios.patch(`https://interviewhub-3ro7.onrender.com/catagory/${editId}`, {
          "catagoryName": categorys,
          // "status": "off"
        }, {
          'headers': {
            "Authorization": data,
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
                <View key={inx} style={[styles.Build, { flexDirection: 'row', width: '99%', justifyContent: 'space-between', alignItems: 'center', }]}>
                  <Text style={styles.TextCate}>{`${inx + 1}.  ${el.catagoryName}`}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                    <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'red', }]} onPress={() => Delete(el._id)}>
                      {/* <Text style={{ color: 'white', }}>Delete</Text> */}
                      <MaterialCommunityIcons name="delete" size={18} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.BTNCR, { backgroundColor: '#02fc02', }]} onPress={() => checkFunction(el)}>
                      {/* <Text style={{ color: 'white', }}>Update</Text> */}
                      <AntDesign name="edit" size={18} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>

              )
            })) : (
              <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
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
    backgroundColor: 'lightgray',
  },
  Input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#c3bdbdb1',
    borderRadius: 10,
    marginVertical: 10,
  },
  Build: {
    backgroundColor: '#505050',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
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
    color: 'white',

  },
  BTNCR: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})