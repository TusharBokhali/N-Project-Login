import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Category() {

  const [data, setData] = useState("")

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

  useEffect(() => {
    getData();
  }, [])
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Image source={{ uri: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg' }}
          style={{ width: 100, height: 100, borderRadius: 50, }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, }}>User Account:</Text>
        <TextInput value={`Email: ${data.email}`} style={styles.Input} />
        <TextInput value={`Password: ${data.password}`} style={styles.Input} />
      </View>
      <View>
        <Text>Category</Text>
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
})