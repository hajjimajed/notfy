import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'



export default HomeScreen = () => {

    const navigation = useNavigation();

    const handleRegisterPress = () => {
        navigation.navigate("Register");
    };
    const handleLogInPress = () => {
        navigation.navigate("Log in");
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={handleRegisterPress} >
                <Text>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogInPress}>
                <Text>Log In</Text>
            </TouchableOpacity>
        </View>
    )


}