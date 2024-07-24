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
    const updateCommandSingleReport = (newReport, type, userId) => {
        console.log("in update ");
        if (currentUser?.counterEdit > 0) {
            const updatedUser = { ...currentUser, counterEdit: currentUser?.counterEdit - 1 };

            if (type === "tests") {
              
                const changeUserIndex=currentUser?.userTests?.findIndex((user) => user.id == userId);
                if (changeUserIndex==-1) {
                    console.log("not found user");
                    return 
                }
                const foundUser = currentUser?.userTests[changeUserIndex]
                foundUser.reportsList = foundUser?.reportsList?.map((report) =>
                    report.id == newReport?.id ? { ...report, location: newReport?.location, content: newReport?.content } : report
                );
               foundUser.lastReport={ ...foundUser?.lastReport, location: newReport?.location, content: newReport?.content }
               updatedUser.userTests[changeUserIndex]=foundUser;
               console.log(updatedUser);
            }
            else if (type === "grup") {
                const allGrupReports = currentUser?.reportsClass[0].reportsList || [];
                const updatedHistory = allGrupReports?.map((report) =>
                    report.id == newReport?.id ? { ...report, location: newReport?.location, content: newReport?.content } : report
                );
                updatedUser.reportsClass[0].reportsList = updatedHistory;
                console.log(updatedUser);
            }
            setCurrentUser(updatedUser);
            saveToLocalStorage(updatedUser);
            inActiveIsEdit()
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

    const createNewReportForGrupOrSingle = (newReport, accessType, userId) => {
        console.log("in create ");
        const tempCurrentUser = { ...currentUser }

        const createObj = {
            ...newReport,
            isComplited: false,
            endTime: getCurrentTime()
        }
        if (accessType == "grup") {
            tempCurrentUser.reportsClass[0].lastReport = { ...createObj };
        }
        else if (accessType == "tests") {
            for (let index = 0; index < tempCurrentUser?.userTests?.length; index++) {
                if (tempCurrentUser.userTests[index].id == userId) {
                    console.log(tempCurrentUser.userTests[index]);
                    tempCurrentUser.userTests[index].reportsList.push({ ...createObj });
                    tempCurrentUser.userTests[index].lastReport = createObj;
                }
            }
        }

        console.log(createObj);

        setCurrentUser(tempCurrentUser);
        saveToLocalStorage(tempCurrentUser);
    };

    const endProcessReport = (reportId, endTime) => {

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
    const endManagerProcessReport = (reportId, accessType, userId) => {
console.log( accessType, userId);
        const tempCurrentUser = { ...currentUser };

        if (accessType === "grup") {
            const lastClassReport = tempCurrentUser.reportsClass[0].lastReport;
            lastClassReport.isComplited=true;
            tempCurrentUser.reportsClass[0].lastReport = null;
            tempCurrentUser?.reportsClass[0]?.reportsList.push(lastClassReport);
        }
        else if (accessType == "tests") {
                console.log();
            for (let index = 0; index < tempCurrentUser?.userTests?.length; index++) {
                if (tempCurrentUser.userTests[index].id == userId) {
                    const reportList = tempCurrentUser.userTests[index].reportsList;
                    tempCurrentUser.userTests[index].reportsList[reportList.length - 1].isComplited = true;
                    tempCurrentUser.userTests[index].lastReport.isComplited = true;
                    tempCurrentUser.userTests[index].lastReport.endTime = getCurrentTime();
                }
            }
            console.log(tempCurrentUser.userTests);
        }
        setCurrentUser(tempCurrentUser);
        saveToLocalStorage(tempCurrentUser);
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
        createNewReportForGrupOrSingle,
        endManagerProcessReport,
        updateCommandSingleReport
    }
}

export default useUser