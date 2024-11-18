import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import tw from 'twrnc';

 const ProfileInfo = () => (
    <SafeAreaView>
        <View style={tw`p-4 android:pt-2 bg-white dark:bg-black `}>
            <Text style={tw`text-md text-black dark:text-white`}>Hello World</Text>
        </View>
    </SafeAreaView>
);
export default ProfileInfo