import React, { useContext, useState } from 'react'
import { ContextStore } from '../context/ContextStore'
import axios from 'axios';
import { data } from 'autoprefixer';
import useUser from './useUser';
import { useNavigate } from 'react-router-dom';

function useReports() {

    const { setCurrentUser, setReportDeatile } = useContext(ContextStore)
    const [historyReports, setHistoryReports] = useState([])
    const { isEdit } = useUser();
    const navigate = useNavigate()



    const newReport = async ({ startTime, team, mode, username, course, endTime, content, location, completed, userId }) => {
        //TODO change user course

        console.log(userId, mode, course);
        if (!startTime || !content || !location || !userId) {

            return
        }
        try {

            axios.post(`http://localhost:5000/report/newReport`, {
                startTime,
                team,
                mode,
                username,
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
                    setReportDeatile(res?.data)
                    navigate(isEdit ? `/startReport` : `/endReport?s=${location}&location=${content}`)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
            return
        }

    }

    const endReport = async ({ userId, reportId, endTime }) => {
        console.log(userId, reportId, endTime);
        try {
            axios.post(`http://localhost:5000/report/closeReport`, {
                userId, reportId, endTime
            })
                .then(res => {
                    if (!res) {
                        console.log("the request failed");
                        return
                    }
                    alert("the request finish!")
                    navigate(`/startReport`)
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }

    const editReport = async ({ pathname, userId, reportId, startTime, endTime, content, location }) => {
        console.log(userId, reportId, startTime, endTime, content, location);
        try {
            axios.post(`http://localhost:5000/report/updateReport`, {
                userId, reportId, startTime, endTime, content, location
            })
                .then(res => {
                    if (!res) {
                        console.log("the request update failed");
                        return
                    }
                    console.log(res);
                    alert("the request updated sucefully !")
                    navigate(`/startReport`)
                })
                .catch(err => console.log(err))
        } catch (error) {
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