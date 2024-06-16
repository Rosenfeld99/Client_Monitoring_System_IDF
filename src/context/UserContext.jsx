import React from 'react'

import { createContext, useContext, useState } from "react";

const createAppContext = createContext();

export const UserContextProvider = () => {
  return useContext(createAppContext);
};

export const UserContext = ({ children }) => {
    const [currentUser,setCurrentUser]=useState()
 
  return (
    <createAppContext.Provider
      value={{currentUser,setCurrentUser }}
    >
      {children}
    </createAppContext.Provider>
  );
};



export default UserContext