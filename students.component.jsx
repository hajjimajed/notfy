import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { useContext, useState, useEffect } from 'react';
import { StudentsContext } from './students.context';
import '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import PushNotification from 'react-native-push-notification';

export default Students = () => {

    const { studentsMap } = useContext(StudentsContext);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [statusInput, setStatusInput] = useState('');

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        PushNotification.configure({
            onNotification: function (notification) {
                console.log(notification);
            },
            requestPermissions: true,
        });
    }, []);



    const updateStudentStatus = async (studentId, status) => {
        await firestore().collection('students').doc(studentId).update({ status });
        const currentUser = firebase.auth().currentUser;
        if (currentUser && currentUser.uid === studentId) {
            PushNotification.localNotification({
                title: 'Status Updated',
                message: `Your status has been updated to ${status}.`,
            });
        }
    };



    const handleStatusSubmit = async () => {
        if (selectedStudent && statusInput !== '') {
            await updateStudentStatus(selectedStudent.uid, statusInput);
            setStatusInput('');
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Students</Text>
            {Object.values(studentsMap).map((student) => (
                <TouchableOpacity key={student.email} onPress={() => setSelectedStudent(student)}>
                    <Text>{student.name}</Text>
                </TouchableOpacity>
            ))}
            {selectedStudent && (
                <>
                    <TextInput
                        placeholder="Enter new status"
                        value={statusInput}
                        onChangeText={(text) => setStatusInput(text)}
                    />
                    <TouchableOpacity onPress={handleStatusSubmit}>
                        <Text>Press me</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};
