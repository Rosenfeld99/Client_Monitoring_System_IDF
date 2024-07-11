import React, { useContext, useState } from 'react'
import { ContextStore } from '../context/ContextStore'
import axios from 'axios';
import { data } from 'autoprefixer';
import useUser from './useUser';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../utils/Toasttify/ToastManager';

function useReports() {

    const [historyReports, setHistoryReports] = useState([])
    const { isEdit,currentUser } = useUser();
    const navigate = useNavigate()
    const showToast = useToast();

   

    const newReport = async ({ startTime, team, mode, usersId, course, endTime, content, location, completed, userId,navigatePage }) => {
        //TODO change user course

        console.log(userId, mode, course,navigatePage);
        if (!startTime || !content || !location || !userId) {

            return
        }
        try {

            axios.post(`http://localhost:5000/report/newReport`, {
                startTime,
                team,
                mode,
                usersId,
                course: course || "קמב",
                endTime,
                content,
                location,
                completed,
                userId
            })
                .then(res => {
                    if (!res) {
                        console.log("the request failed");
                        return
                    }
                   console.log(res?.data);
                    showToast('success', 'המשימה נוצרה בהצלחה')
                    
                    navigate(navigatePage+"&reportId="+res?.data?._id)
                    // navigate(isEdit ? `/startReport` : `/endReport?s=${location}&location=${content}`)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
            showToast('error', 'בעיה ביצירת המשימה')
            return
        }

    }

    const endReport = async ({ userId, reportId, endTime,manager }) => {
        console.log(userId, reportId, endTime);
        console.log("in end report");
        try {
            axios.post(`http://localhost:5000/report/closeReport`, {
                userId, reportId, endTime
            })
                .then(res => {
                    if (!res) {
                        console.log("the request failed");
                        return
                    }
                    showToast('success',"המשימה הסתיימה בהצלחה")
                    console.log("end");
                    if (!manager) {
                        navigate(`/startReport`)     
                    }

                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
            showToast('error', 'בעיה בסיום המשימה')

        }
    }

    const editReport = async ({ pathname, userId, reportId, startTime, endTime, content, location }) => {
        console.log(userId, reportId, startTime, endTime, content, location);
        try {
            axios.post(`http://localhost:5000/report/updateReport`, {
                userId, reportId, startTime, endTime, content, location
            })
                .then(res => {
                    console.log(res);
                    if (!res||res?.data?.msg==="Exceeds the number of authorized edits") {
                        alert("עדכון משימה נכשל");
                        return
                    }
                    
                    currentUser.dailyEdit=res.data.dailyEdit;
                    showToast('success', 'המשימה עודכנה בהצלחה')
                    navigate(`/startReport`)
                })
                .catch(err => console.log(err))
        } catch (error) {
            showToast('error', 'בעיה בעדכון המשימה')

            console.log(error);
        }
    }
    const getHistoryReports = async ({ userId, mode }) => {
        console.log(userId, mode);
        try {

            axios.get(`http://localhost:5000/report/getUserHistory`, {
                params: { userId, mode }
            })
                .then(res => {
                    if (res?.data) {

                        setHistoryReports(res?.data)
                        console.log("sucsses");

                        console.log(historyReports);
                    }

                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }
    return { newReport, endReport, editReport, getHistoryReports, historyReports }
}

export default useReports