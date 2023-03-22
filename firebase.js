import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

export const auth = firebase.auth();
export const db = firebase.firestore();


export const signUpWithEmail = async (email, password) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log('User account created successfully:', userCredential.user);
    } catch (error) {
        console.error('Error creating user account:', error);
    }
}



export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await auth.signInWithEmailAndPassword(email, password);
}


export const signOutUser = async () => await auth.signOut();



export const getCategoriesAndDocuments = async () => {
    const studentsRef = db.collection('students');
    const studentsSnapshot = await studentsRef.get();

    const studentsMap = {};

    studentsSnapshot.forEach(doc => {
        const studentData = doc.data();
        const studentId = doc.id;
        studentsMap[studentId] = studentData;
    });

    return studentsMap;
};



export const onAuthStateChangedListener = (callback) => auth.onAuthStateChanged(callback);

