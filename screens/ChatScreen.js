import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Ionicons } from "@expo/vector-icons"
import { ScrollView } from 'react-native-gesture-handler'
import { db, auth } from '../firebase'
import * as firebase from "firebase"

const ChatScreen = ({ navigation, route }) => {
    const [input, SetInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerStyle: { backgroundColor: "#8B0D32" },
            headerTitleStyle: { color: '#FDD100' },
            headerTintColor: "black",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }} 
                >
                    <Avatar 
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL
                        }} 
                    />
                    <Text
                    style={{ color: "#FDD100", marginLeft: 10, fontWeight: "700" }}
                    >{route.params.chatName}</Text>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        SetInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => 
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))  
                )
            ) 
        return unsubscribe
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}> 
                            {messages.map(({id, data}) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar 
                                            position="absolute"
                                            rounded
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        /> 
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ): (
                                    <View key={id} style={styles.sender}>
                                        <Avatar 
                                            position="absolute"
                                            rounded
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                left: -5,
                                            }}
                                            bottom={-15}
                                            left={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        /> 
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )    
                            ))}
                        </ScrollView>
                            <View style={styles.footer}>
                                <TextInput
                                    value={input}
                                    onChangeText={(text) => SetInput(text)} 
                                    onSubmitEditing={sendMessage} 
                                    placeholder="InstaChat Message" 
                                    style={styles.textInput} 
                                />
                                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                    <Ionicons name="send" size={24} color="#FDD100" />
                                </TouchableOpacity>
                            </View>
                        </>
                    </TouchableWithoutFeedback>  
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#FDD100",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#8B0D32",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 0,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 12,
        color: "white"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15, 
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30, 
    },
})
