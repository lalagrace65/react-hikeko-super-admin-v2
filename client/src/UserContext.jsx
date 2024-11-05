//UserContext is para sa name besides the user icon pag successful login

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "./Url";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
     const [user, setUser] = useState(null);    // Store the user info here
     const [ready, setReady] = useState(false); // Track if data is fetched

    useEffect( () => {
     if(!user){
        axios.get(`${baseURL}/dashboard`).then(({data}) => {
            setUser(data);
        });     
    }
    }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}

