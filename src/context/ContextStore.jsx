import React, { createContext, useState } from 'react'
export const ContextStore = createContext()

export const ContextStoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [advanceSearchResults, setAdvanceSearchResults] = useState([]);
  const [reportDeatile, setReportDeatile] = useState(null)

  const [subUsers, setSubUsers] = useState([])
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
    searchInputs, setSearchInputs,
    subUsers, setSubUsers, reportDeatile, setReportDeatile
  }

  return (
    <ContextStore.Provider value={contextValue}>
      {children}
    </ContextStore.Provider>
  )
}