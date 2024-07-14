import React, { createContext, useState } from 'react'
import { KEY_WAVES_SYSTEM } from '../constant/constant'
export const ContextStore = createContext()

export const ContextStoreProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem(KEY_WAVES_SYSTEM)) || null)
  const [isEdit, setIsEdit] = useState(false)
  const [advanceSearchResults, setAdvanceSearchResults] = useState([])
  const [searchInputs, setSearchInputs] = useState({
    date: "",
    place: [],
    missions: [],
    users: []
  })
  const contextValue = {
    currentUser, setCurrentUser,
    isEdit, setIsEdit,
    advanceSearchResults, setAdvanceSearchResults,
    searchInputs, setSearchInputs
  }

  return (
    <ContextStore.Provider value={contextValue}>
      {children}
    </ContextStore.Provider>
  )
}