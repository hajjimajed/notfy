import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { useContext } from 'react';
import { UserContext } from './user.context';

import { signOutUser } from './firebase';

export default HomeScreen = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const navigation = useNavigation();

    const handleRegisterPress = () => {
        navigation.navigate("Register");
    };
    const handleLogInPress = () => {
        navigation.navigate("Log in");
    };
    const handleStudentsPress = () => {
        navigation.navigate("Students");
    };


    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

    return (
        <>
            {
                currentUser ? (


                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={handleStudentsPress}>
                            <Text>Students</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={signOutHandler}><Text>Sign Out</Text></TouchableOpacity>

                    </View>

                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={handleRegisterPress} >
                            <Text>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogInPress}>
                            <Text>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleStudentsPress}>
                            <Text>Students</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </>
    )


}