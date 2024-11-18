import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={tw`flex-1`,styles.Back}>
        <View style={tw`flex-1 flex justify-around my-4`}>
            <Text style={tw`text-white font-bold text-4xl text-center`}>
                Let's Get Started!
            </Text>
            <View style={tw`flex-row justify-center`}>
                <Image source={require("../assets/images/Welcome.webp")} style={{width:350 , height:350}}/>
            </View>
            <View style={tw`space-y-4`}>
                <TouchableOpacity style={tw`py-3 bg-yellow-400 max-7 rounded-xl mb-5`} onPress={()=>{navigation.navigate('SingUp')}}>
                    <Text style={tw`text-xl font-bold text-center text-gray-700`}>
                        Sing Up
                    </Text>
                </TouchableOpacity>
                <View style={tw`flex-row justify-center`}>
                    <Text style={tw`text-white font-semibold`}>Already have an account ?</Text>
                    <TouchableOpacity style={tw`ml-2`} onPress={()=>{navigation.navigate('Login')}}>
                        <Text style={tw`font-semibold text-yellow-400`}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
    Back:{
        backgroundColor:'#6262df',
        width: '100%',
        height:'100%',
        padding:20,
    }
})