import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { useContext, useState } from 'react';
import { StudentsContext } from './students.context';

export default Students = () => {
    const { studentsMap } = useContext(StudentsContext);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const sendNotification = async (student) => {
        console.log('Sending notification to', student.name);
        try {
            const studentRef = firestore().collection('students').doc(student.uid);
            const studentDoc = await studentRef.get();
            const studentData = studentDoc.data();
            const fcmToken = studentData.fcmToken;
            const message = {
                data: {
                    title: 'New notification',
                    body: 'You have a new notification from your teacher',
                },
                notification: {
                    title: 'New notification',
                    body: 'You have a new notification from your teacher',
                },
                token: fcmToken,
            };
            await messaging().sendMessage(message);
            console.log('Notification sent successfully');
        } catch (error) {
            console.log('Error sending notification:', error);
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
                <TouchableOpacity onPress={() => sendNotification(selectedStudent)}>
                    <Text>Send Notification to {selectedStudent.name}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
