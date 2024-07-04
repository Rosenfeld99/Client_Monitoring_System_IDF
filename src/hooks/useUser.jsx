import React, { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'
import axios from 'axios'

const useUser = () => {
    const { currentUser, setCurrentUser, isEdit, setIsEdit, subUsers, setSubUsers } = useContext(ContextStore)

    const activeIsEdit = () => {
        setIsEdit(true)
    }
    const inActiveIsEdit = () => {
        setIsEdit(false)
    }
    const getUser = async (userId) => {
        try {
            axios.get(`http://localhost:5000/user/getUser`, { params: { userId } })
                .then(res => {
                    if (!res?.data) {
                        console.log("user not found");
                        return
                    }
                    setCurrentUser(res.data)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }
    const getSubUsers = async () => {
        const mode = currentUser.role;
        try {
            axios.get(`http://localhost:5000/report/getUserHistory`, { params: { userId: currentUser?.userId, mode } })
                .then(res => {
                    if (!res?.data) {
                        console.log("user not found");
                        return
                    }
                    setSubUsers(res?.data)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }
    return { currentUser, setCurrentUser, isEdit, getSubUsers, getUser, activeIsEdit, inActiveIsEdit, subUsers }
}

export default useUser