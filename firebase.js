import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

export const auth = firebase.auth();

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
