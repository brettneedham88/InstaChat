# InstaChat
> The newest and greatest Instant messaging app!!!



## General info
InstaChat is an app that allows you to have instant conversations and create custom chat rooms with a wide variety of topics.

## Intro Video
[InstaChat Demo](https://youtu.be/uPWHA8tUvj4)

## Technologies
* React Native
* Firebase
* Expo 
* React Native Elements
* React Navigation

## LoginScreen Component
```
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace('Home')
            }
        })

        return unsubscribe
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="dark" />
            <Image 
                source={require('./instachat-logo.png')}
                style={{ width: 400, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn} />
            </View> 
                <Button buttonStyle={styles.button}  onPress={signIn} title="Login" />
                <Button buttonStyle={styles.button} onPress={() => navigation.navigate("Register")} title="Register" />
                <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor: "#8B0D32",
    },
    
})
```


To-do list:
* Refactor code
* Add Private Chat Rooms
* Make Users Profile More Unigue
* Add More To Chat Functionality, things like Gifs, Pictures, Videos, Code Snippets. 


## Status
Project functions as intended, Definitely room for improvement 


## Inspiration
My whole life I've always used some sort of messaging app to communicate with other so I wanted to see what it takes to create such a thing.


## Contact
* Created by [Brett Needham](https://github.com/brettneedham88)
* [LinkedIn](https://www.linkedin.com/in/brettneedham88/)



