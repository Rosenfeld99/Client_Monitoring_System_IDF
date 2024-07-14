import React, { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'
import { KEY_WAVES_SYSTEM } from '../constant/constant'

const useUser = () => {
    const { currentUser, setCurrentUser, isEdit, setIsEdit, advanceSearchResults, setAdvanceSearchResults } = useContext(ContextStore)

    const saveToLocalStorage = (value) => {
        console.log(value);
        localStorage.setItem(KEY_WAVES_SYSTEM, JSON.stringify(value))
    }

    const getAllReports = () => {

    }
    const getSingleReport = () => {

    }
    const getLastReport = () => {

    }

    const createNewReportPersonale = (newReport) => {
        const allReport = currentUser?.history || [];

        const updatedUser = {
            ...currentUser,
            history: [...allReport, newReport],
            isProcess: true,
        };

        setCurrentUser(updatedUser);
        saveToLocalStorage(updatedUser);
    };


    const endProcessReport = (reportId,endTime) => {
        console.log(reportId,endTime);
        const allReport = currentUser?.history || [];

        const updatedHistory = allReport.map((report) =>
            report.id == reportId ? { ...report, endTime: endTime } : report
        );

        const updatedReport = updatedHistory.find(report => report.id == reportId);

        const updatedUser = {
            ...currentUser,
            history: updatedHistory,
            isProcess: false,
            lastReport: updatedReport
        };

        setCurrentUser(updatedUser);
        saveToLocalStorage(updatedUser);
    };

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
        getSingleReport, getLastReport,
        createNewReportPersonale, endProcessReport
    }
}

export default useUser