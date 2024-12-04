import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dialog from 'react-native-dialog';
import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import Entypo from '@expo/vector-icons/Entypo';
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
  const [choice, setChoice] = useState('')
  const [on, off] = useState(false)
  const [animation] = useState(new Animated.Value(0));
  // const [currentActivce, setCurrentActive] = useState([0,5])

  useEffect(() => {
    const Fetch = async () => {
      await getData();
      GetSubCategory();
      getAllQuestion();
    }
    Fetch();
  }, [])
  useEffect(() => {
    getAllQuestion();
    GetSubCategory();
    getInfo();
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
    try {
      axios.get('https://interviewhub-3ro7.onrender.com/questions/', {
        'headers': {
          "Authorization": user
        }
      }).then((res) => {
        if (res.data) {
          setGetquestion(res.data.data)
          setLoading(false)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const deletes = (Id: any) => {
    try {
      axios.delete(`https://interviewhub-3ro7.onrender.com/questions/${Id}`, {
        'headers': {
          "Authorization": user
        }
      }).then((res) => {
        Alert.alert('Questions Successfully Delete!');
        getAllQuestion();
      }).catch((e) => {
        console.log(e);
        Alert.alert('Question Already Delete!');
      })
    } catch (error) {
      console.log(error);

    }
  }

  const onCheck = (change: any) => {
    setCheck(true);
    // console.log(change);

    setId(change._id)
    // console.log(change._id);

    setNew(change.subcatagoryID.catagoryID.catagoryName)
    // console.log(change.subcatagoryID.catagoryID.catagoryName);
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
            setValue('')
            getAllQuestion();
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
  const UpdateQ = () => {
    try {
      axios.patch(`https://interviewhub-3ro7.onrender.com/questions/${id}`, {
        "catagoryName": choice.catagoryName,
      }, {
        'headers': {
          'Authorization': user
        }
      }).then((res) => {
        if (res.data) {
          Alert.alert('SubCategory Update!')
          setId(null)
          setCheck(false)
          setNew('')
          getAllQuestion();
        }
      }).catch((e) => {
        Alert.alert(`${choice.catagoryName} Category Already Set!`)
      })
    } catch (error) {
      console.log(error);

    }

  }

  const Changes = () => {
    if (!on) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }).start()
    }
    off(!on)
  }


  const heightAnimation = animation.interpolate({
    inputRange: [0, 0],
    outputRange: [0, [getQuestion.answer / 2.66] * 100]
  });
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ width: '85%', }}>
            <TextInput value={search} onChangeText={setSearch} placeholder='Search' style={styles.Search} />
          </View>
          <TouchableOpacity style={{ marginTop: 3, marginLeft: 8, }} onPress={() => setAdd(true)}>
            <MaterialIcons name="add" size={24} color="white" style={{ backgroundColor: 'black', padding: 5, borderRadius: 8, }} />
            <Dialog.Container visible={Add}>
              <Dialog.Title style={{ color: 'black', }}>Add Question</Dialog.Title>
              <Dialog.Input
                placeholder='Enter Question'
                value={question}
                onChangeText={setQuestion}
                style={{ color: 'black', }}
              />
              <Dialog.Input
                placeholder='Enter Answer'
                value={answer}
                onChangeText={setAnswer}
                maxLength={500}
                style={{ color: 'black', }}
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
                  return (
                    <View key={inx}>
                      {/* chevron-down */}
                      <TouchableWithoutFeedback onPress={Changes}>
                        {/* chevron-small-down */}
                        <View key={inx} style={[styles.Build, { flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', paddingRight: 28, }]}>
                          <Text style={styles.TextCate}>{`${inx + 1}.${e.questions}`}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.BTNCR]} >
                              <Feather name={on ? 'chevron-down' : 'chevron-right'} size={18} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.BTNCR, { backgroundColor: 'red', }]} onPress={() => deletes(e._id)}>
                              {/* <Text style={{ color: 'white', }}>Delete</Text> */}
                              <MaterialCommunityIcons name="delete" size={18} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.BTNCR, { backgroundColor: '#01fa01', }]} onPress={() => onCheck(e)}>
                              <AntDesign name="edit" size={18} color="black" />
                            </TouchableOpacity>
                            <Dialog.Container visible={check}>
                              <Dialog.Title>Question Category Update</Dialog.Title>
                              <Dialog.Input
                                placeholder="Enter category"
                                value={value !== "" ? value : choice.catagoryName !== "" ? choice.catagoryName : New}
                                onChangeText={setNew}
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
                                placeholder={value !== '' ? value : 'Select Category'}
                                searchPlaceholder="Search..."
                                value={choice}
                                onChange={async (item) => {

                                  setChoice(item)
                                }}
                                renderLeftIcon={() => (

                                  <AntDesign
                                    style={styles.icon}
                                    name="Safety"
                                    size={20} />
                                )} labelField={'catagoryName'} valueField={'_id'} />
                              <Dialog.Button label="Cancel" onPress={() => setCheck(false)} />
                              <Dialog.Button label="Save" onPress={() => UpdateQ()} />
                            </Dialog.Container>

                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                      <Animated.View style={[styles.Builds, { height: heightAnimation }]}>
                        <Text style={{ color: 'white', fontSize: 15 }}>{e.answer}</Text>
                      </Animated.View>
                    </View>
                  )
                })

              )
          }
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
    padding: 5,
  },

  Build: {
    backgroundColor: '#505050',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  Builds: {
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
  TextCate: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color: 'white',
    width: '70%',
  },
  BTNCR: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
})