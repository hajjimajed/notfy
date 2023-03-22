import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "./firebase";


export const StudentsContext = createContext({
    studentsMap: {}
})

export const StudentsProvider = ({ children }) => {


    const [studentsMap, setStudentsMap] = useState({});

    useEffect(() => {
        const fetchStudentsMap = async () => {
            const fetchedStudentsMap = await getCategoriesAndDocuments();
            setStudentsMap(fetchedStudentsMap);
        };

        fetchStudentsMap();
    }, []);



    const value = { studentsMap };

    return (
        <StudentsContext.Provider value={value}>
            {children}
        </StudentsContext.Provider>
    )


}