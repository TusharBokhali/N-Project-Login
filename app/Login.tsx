import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigation = useNavigation();

    const Logins = () => {

        try {
            if (email !== "" && password != "") {

                axios.post('https://interviewhub-3ro7.onrender.com/admin/login', {
                    "email": email,
                    "password": password
                })
                    .then((res => {
                        if (res.data) {
                            Alert.alert("Successfully Login");
                            alert("Successfully Login");
                            navigation.navigate('Home');
                           (async function (){
                           await AsyncStorage.setItem("User", JSON.stringify({
                                "email": email,
                                "password": password
                            }))
                           })();
                            setemail("")
                            setpassword("")

                        }


                    })).catch((e) => {
                        console.log(e);
                        alert('Account not found ! Please Create The Account !');
                        Alert.alert('Account not found ! Please Create The Account !');

                    })
            } else {
                Alert.alert('Enter The email Or Password !');
                alert('Enter The email Or Password !');

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.Back}>
            <SafeAreaView style={styles.Back}>
                <View>
                    <TouchableOpacity style={styles.BackBtn} onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{textAlign:'center',}}/>
                    </TouchableOpacity>
                    <View style={tw`flex-row justify-center`}>
                        <Image source={require('../assets/images/newcookie.png')} style={{ width: 200, height: 200 }} />
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.Set}>
                <View style={{ marginTop: 8, }}>
                    <Text style={tw`text-gray-700 ml-4`}>Email Address</Text>
                    <TextInput style={[tw`p-4 bg-gray-100 text-gray-700  mb-3`, { borderRadius: 16, }]} value={email} onChangeText={setemail} placeholder='Enter Email' />

                    <Text style={tw`text-gray-700 ml-4`}>Password</Text>
                    <TextInput style={[tw`p-4 bg-gray-100 text-gray-700 `, { borderRadius: 16, }]} value={password} onChangeText={setpassword} placeholder='Enter Password' secureTextEntry />

                    <TouchableOpacity style={tw`flex items-end mb-5 pr-5`}>
                        <Text style={tw`text-gray-700 `}>Forgot Passwords ?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`py-3 bg-yellow-400 rounded-xl`} onPress={() => { Logins() }}>
                        <Text style={tw`font-xl font-bold text-center text-gray-700`}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={tw`text-xl text-gray-700 font-bold text-center py-5`}>
                    Or
                </Text>
                <View style={tw`flex-row justify-center`}>
                    <TouchableOpacity style={tw`p-2 bg-gray-100 rounded-2xl m-2`}>
                        <Image source={require('../assets/images/Google.png')} style={tw`w-10 h-10`} />
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 bg-gray-100 rounded-2xl m-2`}>
                        <Image source={require('../assets/images/apple (1).png')} style={tw`w-10 h-10`} />
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 bg-gray-100 rounded-2xl m-2`}>
                        <Image source={require('../assets/images/Facebook.png')} style={tw`w-10 h-10`} />
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-center mt-2`}>
                    <Text style={tw`text-gray-500 font-semibold`}>Don't have an account ?</Text>
                    <TouchableOpacity style={tw`ml-2`} onPress={() => { navigation.navigate('SingUp') }}>
                        <Text style={tw`font-semibold text-yellow-500`}>Sing Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    Back: {
        flex:1,
        backgroundColor: '#6262df',
        // paddingTop: ,
    },
    Set: {
        width: '100%',
        borderTopLeftRadius: 50,
        paddingTop: 30,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        paddingLeft: 30,
        padding: 30,
    },
    BackBtn:{
        // p-2 rounded-tr-2xl rounded-bl-2xl ml-4 w-10
        backgroundColor:'#ffff00',
        padding:2,
        borderTopRightRadius:15,
        borderBottomLeftRadius:15,
        marginLeft:20,
        width: 40,
        height:40,
        justifyContent:'center',
    }
})