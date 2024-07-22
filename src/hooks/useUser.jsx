import React, { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'
import { KEY_WAVES_SYSTEM, timeToupdatedCounterEdit } from '../constant/constant'
import { getCurrentTime } from '../utils/func/generateId'

const useUser = () => {
    const { currentUser, setCurrentUser, isEdit, setIsEdit, advanceSearchResults, setAdvanceSearchResults } = useContext(ContextStore)

    const saveToLocalStorage = (value) => {
        console.log(value);
        localStorage.setItem(KEY_WAVES_SYSTEM, JSON.stringify(value))
    }

    const getAllReports = () => {

    }
    const getSingleReport = (id) => {
        return currentUser.history.find((item) => item.id == id) || null
    }
    const patchCounterEditReport = () => {
        currentUser.counterEdit = 3
        saveToLocalStorage(currentUser)
    }

    const updateSingleReport = (oldReport) => {
        console.log(oldReport);
        if (currentUser?.counterEdit > 0) {
            const allReport = currentUser?.history || [];

            const updatedHistory = allReport.map((report) =>
                report.id == oldReport?.id ? { ...report, location: oldReport?.location, content: oldReport?.content } : report
            );

            const updatedUser = {
                ...currentUser,
                history: updatedHistory,
                isProcess: false,
                counterEdit: currentUser?.counterEdit - 1
            };

            setCurrentUser(updatedUser);
            saveToLocalStorage(updatedUser);
        }
    }

    const createNewReportPersonale = (newReport, place) => {
        const allReport = currentUser?.history || [];

        const updatedUser = {
            ...currentUser,
            history: [...allReport, newReport],
            isProcess: true,
            process: {
                id: newReport?.id,
                content: newReport?.content,
                location: newReport?.location,
                date: newReport?.date,
                endTime: newReport?.endTime,
                startTime: newReport?.startTime,
                place
            }
        };

        setCurrentUser(updatedUser);
        saveToLocalStorage(updatedUser);
    };

    const createNewReportForGrupOrSingle = (newReport, place, accessType, userId) => {
        console.log(newReport, place, accessType);
        // return
        const allReport = currentUser?.userGrup?.historyList || [];

        const createObj = {
            id: newReport?.id,
            content: newReport?.content,
            location: newReport?.location,
            date: newReport?.date,
            endTime: newReport?.endTime,
            startTime: newReport?.startTime,
            isCompited: false,
            place
        }

        const updatedUser = {
            ...currentUser,
            userGrup: {
                ...currentUser.userGrup,
                reportsList: [...allReport, newReport],
                lastReportGrup: accessType == "grup" ? createObj : currentUser?.userGrup?.lastReportGrup,
                lastReportTests: accessType == "tests" ? createObj : currentUser?.userGrup?.lastReportTests
            },
            
    };

    setCurrentUser(updatedUser);
    saveToLocalStorage(updatedUser);
};

const endProcessReport = (reportId, endTime) => {
    console.log(reportId, endTime);
    const allReport = currentUser?.history || [];

    const updatedHistory = allReport.map((report) =>
        report.id == reportId ? { ...report, endTime: endTime } : report
    );

    const updatedReport = updatedHistory.find(report => report.id == reportId);

    const updatedUser = {
        ...currentUser,
        history: updatedHistory,
        isProcess: false,
        process: null,
        lastReport: updatedReport
    };

    setCurrentUser(updatedUser);
    saveToLocalStorage(updatedUser);
};

const handleManageUsers = (newGrup) => {
    console.log("newGrup :", newGrup);
    const allUsers = newGrup || [];

    const updatedUser = {
        ...currentUser,
        userGrup: allUsers
    };

    setCurrentUser(updatedUser);
    saveToLocalStorage(updatedUser);

}

const activeIsEdit = () => {
    setIsEdit(true)
}
const inActiveIsEdit = () => {
    setIsEdit(false)
}
return {
    currentUser, setCurrentUser,
    isEdit, activeIsEdit
    , inActiveIsEdit,
    advanceSearchResults, setAdvanceSearchResults,
    getSingleReport, patchCounterEditReport,
    createNewReportPersonale, endProcessReport,
    updateSingleReport, handleManageUsers,
    createNewReportForGrupOrSingle
}
}

export default useUser