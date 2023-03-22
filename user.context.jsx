import { createContext, useState, useEffect } from "react";
import { auth, db } from './firebase.js';

export const UserContext = createContext({
    currentUser: null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDoc = await db.collection(user.title === "student" ? "students" : "teachers").doc(user.uid).get();
                setCurrentUser({ uid: user.uid, email: user.email, title: user.title, ...userDoc.data() });
            } else {
                setCurrentUser(null);
            }
        });

        return unsubscribe;
    }, []);


    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

