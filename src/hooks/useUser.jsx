import React, { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'

const useUser = () => {
    const { currentUser, setCurrentUser, isEdit, setIsEdit, advanceSearchResults, setAdvanceSearchResults } = useContext(ContextStore)

    const activeIsEdit = () => {
        setIsEdit(true)
    }
    const inActiveIsEdit = () => {
        setIsEdit(false)
    }
    return { currentUser, setCurrentUser, isEdit, activeIsEdit, inActiveIsEdit, advanceSearchResults, setAdvanceSearchResults }
}

export default useUser