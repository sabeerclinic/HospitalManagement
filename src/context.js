import React, { createContext, useState} from "react";


const UserContext = createContext({});

const ContextProvider = ({ children }) => {

 const [cam,setCam]=useState(false);

    return (
        <UserContext.Provider
            value={{ cam,setCam}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, ContextProvider };