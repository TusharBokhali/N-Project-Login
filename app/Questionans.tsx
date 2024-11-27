import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dialog from 'react-native-dialog';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from './Loading';

export default function Questionans() {
  const [Categorys, setCategories] = useState([])
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState(false)
  const [New, setNew] = useState('')
  const [id, setId] = useState(null)
  const [Add, setAdd] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [value, setValue] = useState('')
  const [user, setUser] = useState("")
  const [Data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [getQuestion, setGetquestion] = useState([])

  useEffect(() => {
    const Fetch = async () => {
      await getData();
      getAllQuestion();
    }
    Fetch();
  }, [])
  useEffect(() => {
    GetSubCategory();
    getAllQuestion();
  }, [user])

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

  const GetSubCategory = async () => {
    try {
      await axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
        'headers': {
          "Authorization": user
        }
      })
        .then((res) => {
          setData(res.data.data)
        }).catch((e) => {
          console.log(e);
        })
    } catch (error) {
      console.log(error);
    }
  }
  const AddQuestion = (Id: any) => {
    if (question != "" && answer !== "") {
      try {
        axios.post('https://interviewhub-3ro7.onrender.com/questions/create', {
          "questions": question,
          "answer": answer,
          "subcatagoryID": Id,
        }, {
          'headers': {
            "Authorization": user
          }
        }).then((res) => {
          Alert.alert('Question successfully added!')
          setAdd(false)
          setAnswer('')
          setQuestion('')
          getAllQuestion();
          setValue("")
        }).catch((e) => {
          console.log(e);
          Alert.alert('Question Alredy Added !')
          setAnswer('')
          setQuestion('')
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Enter The Question Or Answer')
    }
  }

  const getAllQuestion = async () => {

    console.log("users ", user);

    try {
      axios.get('https://interviewhub-3ro7.onrender.com/questions/', {
        'headers': {
          "Authorization": user
        }
      }).then((res) => {
        if (res.data) {
          console.log("Collection Data ", res.data.data);
          setGetquestion(res.data.data)
          setLoading(false)
          setAdd(false)
        }
      })
    } catch (error) {
      console.log(error);
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
            <Dialog.Title>Add Question</Dialog.Title>
            <Dialog.Input
              placeholder='Enter Question'
              value={question}
              onChangeText={setQuestion}
            />
            <Dialog.Input
              placeholder='Enter Answer'
              value={answer}
              onChangeText={setAnswer}
              maxLength={500}
            />
            <Dropdown
              style={[styles.dropdown, { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Data}
              search
              maxHeight={200}
              placeholder={value !== "" ? value : 'Select Category'}
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
              )} labelField={'subCatagoryname'} valueField={'subcatagoryID'} />
            <Dialog.Button label="Cancel" onPress={() => setAdd(false)} />
            <Dialog.Button label="Add" onPress={() => AddQuestion(value._id)} />
          </Dialog.Container>
        </TouchableOpacity>
      </View>

      <View>
        {
          isLoading ?
            (
              <Loading />
            ) : (
              getQuestion.map((e, inx) => {
                console.log(e);

                return (
                  <View key={inx} style={[styles.Build, { flexDirection: 'row', width: '99%', justifyContent: 'space-between', alignItems: 'center', }]}>
                    <Text style={styles.TextCate}>{`${inx + 1}.${e.questions}`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                      <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'red', }]} onPress={() => deletes(e._id)}>
                        <Text style={{ color: 'white', }}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'green', }]} >
                        <Text style={{ color: 'white', }}>Update</Text>
                      </TouchableOpacity>
                      <Dialog.Container visible={check}>
                        <Dialog.Title>Add Category</Dialog.Title>
                        <Dialog.Input
                          placeholder="Enter category"
                          value={New}
                          onChangeText={setNew}
                        />
                        <Dialog.Button label="Cancel" onPress={() => ''} />
                        <Dialog.Button label="Save" onPress={() => ''} />
                      </Dialog.Container>

                    </View>
                  </View>
                )
              })

            )
        }
      </View>
    </View>
  )
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
  Search: {
    padding: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#bfb6b6c9',
    borderRadius: 10,
    marginBottom: 20,

  },
  BTN: {
    backgroundColor: '#edd30b',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
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
})