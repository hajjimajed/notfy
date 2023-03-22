import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper'
import React, { useState, useContext } from "react";
import firestore from '@react-native-firebase/firestore';
import { signUpWithEmail, auth, signOutUser } from './firebase';

import { UserContext } from './user.context';

export default Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verification, setVerification] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState('student');

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };


    const { currentUser, setCurrentUser } = useContext(UserContext);


    const handleRegister = async () => {
        if (verification === 'a123bcd') {
            if (title === 'student') {
                try {
                    await signUpWithEmail(email, password);
                    const newStudentRef = await firestore()
                        .collection('students')
                        .add({
                            name: username,
                            email: email,
                            title: title,
                            uid: auth.currentUser.uid
                        });
                    const newStudentDoc = await newStudentRef.get();
                    const newStudentData = { ...newStudentDoc.data(), id: newStudentDoc.id };
                    const updatedCurrentUser = { uid: auth.currentUser.uid, email, title, ...newStudentData };
                    setCurrentUser(updatedCurrentUser);
                    console.log('Student added!');
                } catch (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('email is already exist')
                    }
                    else {
                        console.log("user creation encountered an error", error);
                    }
                }
            }
            else {
                try {
                    await signUpWithEmail(email, password);
                    const newStudentRef = await firestore()
                        .collection('teachers')
                        .add({
                            name: username,
                            email: email,
                            title: title,
                            uid: auth.currentUser.uid
                        });
                    const newStudentDoc = await newStudentRef.get();
                    const newStudentData = { ...newStudentDoc.data(), id: newStudentDoc.id };
                    const updatedCurrentUser = { uid: auth.currentUser.uid, email, title, ...newStudentData };
                    setCurrentUser(updatedCurrentUser);
                    console.log('Student added!');
                } catch (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('email is already exist')
                    }
                    else {
                        console.log("user creation encountered an error", error);
                    }
                }
            }
        }
        else {
            alert('Verify the verification code please !')
        }
    };


    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

    return (

        <>

            {
                currentUser ? (
                    <View>
                        <Text>
                            connected
                        </Text>
                        <Text>{currentUser.title}</Text>

                        <TouchableOpacity onPress={signOutHandler}><Text>Sign Out</Text></TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 24 }}>Register</Text>
                        <TextInput
                            style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                            placeholder="Verification Code"
                            value={verification}
                            onChangeText={setVerification}
                        />
                        <RadioButton.Group onValueChange={handleTitleChange} value={title}>
                            <View>
                                <Text>Student</Text>
                                <RadioButton value="student" />
                            </View>
                            <View>
                                <Text>Teacher</Text>
                                <RadioButton value="teacher" />
                            </View>
                        </RadioButton.Group>
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
                            onPress={handleRegister}
                        >
                            <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </>


    )



}