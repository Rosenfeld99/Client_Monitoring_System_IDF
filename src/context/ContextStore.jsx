import React, { createContext, useState } from 'react'
export const ContextStore = createContext()

export const ContextStoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const contextValue = {
    currentUser, setCurrentUser,
    isEdit, setIsEdit
  }

  return (
    <ContextStore.Provider value={contextValue}>
      {children}
    </ContextStore.Provider>
  )
}