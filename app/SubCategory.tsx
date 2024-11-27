import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';

export default function SubCategory() {
  const [value, setValue] = useState("");
  // const [isFocus, setIsFocus] = useState(false);
  const [cate, setCate] = useState('')
  const [user, setUser] = useState('')
  const [Data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [Categorys, setCategories] = useState([])
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const [Add, setAdd] = useState(false);
  const [check, setCheck] = useState(false)
  const [New, setNew] = useState('')
  const [id, setId] = useState(null)
  useEffect(() => {
    const Fetch = async () => {
      await getData();
      GetSubCategory();
    }
    Fetch();
  }, [])

  useEffect(() => {
    getInfo();
  }, [Data])
  const getData = async () => {
    try {
      const pro = await AsyncStorage.getItem('User');
      const Data = JSON.parse(pro);

      if (Data) {
        setUser(Data.token)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetSubCategory();
  }, [user])
  // useEffect(() => {
  //   getInfo();
  // }, [])

  const SubCategory = (Id: any) => {
    console.log(Id !== null && cate !== "");

    if (Id !== null && cate !== "" && value!="") {
      try {
        axios.post('https://interviewhub-3ro7.onrender.com/subcatagory/create', {
          "subCatagoryname": cate,
          "catagoryID": Id
        }, {
          'headers': {
            "Authorization": user,
          }
        }).then((res) => {
          Alert.alert('Category Added!');
          setAdd(false);
          setCate('')
          GetSubCategory();
          setValue("")
        }).catch((e) => {
          console.log(e);
          Alert.alert('Already Category Added!')
        })
      } catch (error) {
        console.log(error);

      }
    } else {
      Alert.alert('Enter SubCategory and Select Category!')
    }
  }
  const GetSubCategory = async () => {
    try {
      await axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
        'headers': {
          "Authorization": user
        }
      })
        .then((res) => {
          setData(res.data.data)
          setLoading(false)
        }).catch((e) => {
          console.log(e);
        })
    } catch (error) {
      console.log(error);
    }

  }

  const getInfo = async () => {
    try {
      await axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
        'headers': {
          "Authorization": user,
        }
      })
        .then((res) => {
          if (res.data) {
            setCategories(res.data.data)
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  const SubUpdate = () => {
    try {
      axios.patch(`https://interviewhub-3ro7.onrender.com/subcatagory/${id}`, {
        "catagoryName": New,
      }, {
        "headers": {
          "Authorization": user,
        }
      })
        .then((res) => {
          if (res.data) {
            Alert.alert('Successfully Updated!')
            console.log(res.data);

            setNew('')
            setCheck(false)
            GetSubCategory();
            setId(null)
          }
        }).catch((e) => {
          console.log(e);
          Alert.alert('Data not Update!')
        })
    } catch (error) {
      console.log(error);
    }
  }

  const deletes = (Id: any) => {
    try {
      axios.delete(`https://interviewhub-3ro7.onrender.com/subcatagory/${Id}`, {
        "headers": {
          "Authorization": user,
        }
      })
        .then((res) => {
          if (res.data) {
            Alert.alert('Delete Success!')
            GetSubCategory();
          }
        }).catch((e) => {
          console.log(e);
          Alert.alert('Data Already Deleted!')
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <View style={{ width: '90%', }}>
          <TextInput value={search} onChangeText={setSearch} onChange={() => { GetSubCategory() }} placeholder='Search' style={styles.Search} />
        </View>
        <TouchableOpacity style={{ marginTop: 3, marginLeft: 8, }} onPress={() => setAdd(true)}>
          <MaterialIcons name="add" size={24} color="white" style={{ backgroundColor: 'black', padding: 5, borderRadius: 8, }} />
          <Dialog.Container visible={Add}>
            <Dialog.Title>Add Category</Dialog.Title>
            <Dialog.Input
              placeholder='Enter SubCategory'
              value={cate}
              onChangeText={setCate}
            />
            <Dropdown
              style={[styles.dropdown, { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Categorys}
              search
              maxHeight={300}
              placeholder={value !== null ? value : 'Select Category'}
              searchPlaceholder="Search..."
              value={value}
              onChange={async (item) => {
                setValue(item);
              }}
              renderLeftIcon={() => (

                <AntDesign
                  style={styles.icon}
                  name="Safety"
                  size={20} />
              )} labelField={'catagoryName'} valueField={'_id'} />
            <Dialog.Button label="Cancel" onPress={() => setAdd(false)} />
            <Dialog.Button label="Add" onPress={() => SubCategory(value._id)} />
          </Dialog.Container>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>

      {
        isLoading ? (
          <Loading />)
          : (
            <ScrollView>{
              Data.length ? (Data.filter((e, inx) => {
                return e.subCatagoryname.toLocaleLowerCase().includes(search.toLocaleLowerCase());
              }).map((e, inx) => {
                return (
                  <View key={inx} style={[styles.Build, { flexDirection: 'row', width: '99%', justifyContent: 'space-between', alignItems: 'center', }]}>
                    <Text style={styles.TextCate}>{`${inx + 1}.  ${e.subCatagoryname}`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                      <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'red', }]} onPress={() => deletes(e._id)}>
                        <Text style={{ color: 'white', }}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'green', }]} onPress={() => {
                        setCheck(true)
                        setId(e._id)
                        setNew(e.subCatagoryname)
                      }}>
                        <Text style={{ color: 'white', }}>Update</Text>
                      </TouchableOpacity>
                      <Dialog.Container visible={check}>
                        <Dialog.Title>Add Category</Dialog.Title>
                        <Dialog.Input
                          placeholder="Enter category"
                          value={New}
                          onChangeText={setNew}
                          />
                        <Dialog.Button label="Cancel" onPress={() => setCheck(false)} />
                        <Dialog.Button label="Save" onPress={() => SubUpdate()} />
                      </Dialog.Container>
                    </View>
                  </View>
                )
              })) : (
                <View>
                  <Text>No Data Found</Text>
                </View>
              )
            }
            </ScrollView>
          )
        }
        </View>
        </View>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white', // Ensures proper visibility
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    top: -10,
    left: 10,
    zIndex: 999,
    paddingHorizontal: 5,
    fontSize: 12,
    color: 'gray',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray', // Placeholder text color
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black', // Selected value text color
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  Input: {
    borderWidth: 1,
    borderColor: '#a5a4a4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 17,
  },
  BTN: {
    backgroundColor: '#edd30b',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
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
});
