import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';

export default function SubCategory() {
  const [value, setValue] = useState(null);
  // const [isFocus, setIsFocus] = useState(false);
  const [cate, setCate] = useState('')
  const [user, setUser] = useState('')
  const [Data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)


  const getData = async () => {
    try {
      const pro = await AsyncStorage.getItem('User');
      const Data = JSON.parse(pro);

      if (Data) {
        setUser(Data)
      }
    } catch (error) {
      console.log(error)
    }
  }




  const SubCategory = () => {
    try {
      axios.post('https://interviewhub-3ro7.onrender.com/subcatagory/create', {
        "subCatagoryname": cate,
      }, {
        'headers': {
          "Authorization": user.token,
        }
      }).then((res) => {
        Alert.alert('Category Added!');
        setCate('')
        getData();
      }).catch((e) => {
        console.log(e);
        Alert.alert('Already Category Added!')
      })
    } catch (error) {
      console.log(error);

    }

  }

  const GetSubCategory = () => {

    console.log(user);

    try {
      axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
        'headers': {
          "Authorization": user.token
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


  useEffect(() => {
    getData();
  }, [Data])
  useEffect(() => {
    GetSubCategory();
  }, [])


  return (
    <View style={styles.container}>
      {
        isLoading ? (
          <Loading />)
          : (
            Data.map((e, inx) => {
              return (
                <Text key={inx}>{e.subCatagoryname}</Text>

              )
            })

          )

      }
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <TextInput placeholder='Enter The SubCategory' style={styles.Input} value={cate} onChangeText={setCate} />
        <TouchableOpacity style={styles.BTN} onPress={() => SubCategory()}>
          <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Add</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // justifyContent:'space-between',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white', // Ensures proper visibility
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
  }
});
