import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { useContext } from 'react';
import { StudentsContext } from './students.context';


export default Students = () => {

    const { studentsMap } = useContext(StudentsContext);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>students</Text>

            {Object.values(studentsMap).map((student) => (
                <Text key={student.email}>{student.name}</Text>
            ))}

        </View>
    )

}