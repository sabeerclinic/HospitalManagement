import React, { createContext, useState, useEffect } from "react";


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