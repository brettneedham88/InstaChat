import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat",
            headerBackTitle: "Chats",

        })
    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error))
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter name for new chat" 
                value={input} 
                onChangeText={(text) => setInput(text)} 
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="#FDD100" /> 
                }
            />
            <Button buttonStyle={styles.button} disabled={!input} onPress={createChat} title='Create new Chat' /> 
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",      
    },
    button: {
        backgroundColor: "#FDD100",
        color: "black"
    },
})
