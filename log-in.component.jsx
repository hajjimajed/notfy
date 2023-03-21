import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { signInAuthWithEmailAndPassword } from './firebase';


export default Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthWithEmailAndPassword(email, password);
            alert("welcome back")
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password': alert("incorrect password");
                    break
                case 'auth/user-not-found': alert("incorrect email");
                    break
                default: console.log(error);
            }
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TextInput
                style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: "blue",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 20,
                }}
                onPress={handleSubmit}
            >
                <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
            </TouchableOpacity>
        </View>
    )

}