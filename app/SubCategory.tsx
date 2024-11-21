import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function SubCategory() {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Sub Category:</Text>
      <TextInput
            placeholder="Type Comment"
            // value={this.state.comment.value}
            // onChangeText={value => this.onChangeComment(value)}
            // onPress={() => this.uploadComment()}
            multiline={true}
            maxLength={200}
            numberOfLines={5}
          />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
    },
    Title:{
        fontSize:18,
        fontWeight:'600',

    }
})