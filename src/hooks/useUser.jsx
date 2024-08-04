import React, { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'
import { KEY_WAVES_SYSTEM, timeToupdatedCounterEdit } from '../constant/constant'
import { formatDateToNumber, getCurrentDateFormaterHebrew, getCurrentTime } from '../utils/func/generateId'

const useUser = () => {
    const { currentUser, setCurrentUser, isEdit, setIsEdit, advanceSearchResults, setAdvanceSearchResults } = useContext(ContextStore)

    const saveToLocalStorage = (value) => {
        localStorage.setItem(KEY_WAVES_SYSTEM, JSON.stringify(value))
    }


    const getSingleReport = (id) => {
        return currentUser.history.find((item) => item.id == id) || null
    }
    const patchCounterEditReport = () => {
        currentUser.counterEdit = 3
        currentUser.commandCounterEdit = 3
        saveToLocalStorage(currentUser)
    }

    const updateSingleReport = (oldReport) => {
        if (currentUser?.counterEdit > 0) {
            const allReport = currentUser?.history || [];

            const updatedHistory = allReport.map((report) =>
                report.id == oldReport?.id ?
                    {
                        ...report,
                         location: oldReport?.location,
                        content: oldReport?.content,
                        startTime:oldReport.startTime?oldReport.startTime:report?.startTime,
                        endTime:oldReport.endTime?oldReport.endTime:report?.endTime,
                    }
                    : report
            );

            const updatedUser = {
                ...currentUser,
                history: updatedHistory,
                isProcess: false,
                counterEdit: currentUser?.counterEdit - 1
            };
            inActiveIsEdit()
            setCurrentUser(updatedUser);
            saveToLocalStorage(updatedUser);
        }
    }
    
    const updateCommandSingleReport = (newReport, type, userId) => {
      
        inActiveIsEdit()
        if (currentUser?.commandCounterEdit > 0) {
            const updatedUser = { ...currentUser, commandCounterEdit: currentUser?.commandCounterEdit - 1 };

            if (type === "tests") {
                const changeUserIndex = currentUser?.userTests?.findIndex((user) => user.id == userId);
                if (changeUserIndex == -1) {
                    return
                }
                const foundUser = currentUser?.userTests[changeUserIndex]
                foundUser.reportsList = foundUser?.reportsList?.map((report) =>
                    report.id == newReport?.id ?
                 { ...report, location: newReport?.location, content: newReport?.content,
                     startTime:newReport.startTime?newReport.startTime:report?.startTime,
                     endTime:newReport.endTime?newReport.endTime:report?.endTime
                     } : report
                );
                    if (newReport.id==foundUser?.lastReport?.id) {
                        foundUser.lastReport = { ...foundUser?.lastReport, 
                            location: newReport?.location,
                             content: newReport?.content,
                             startTime:newReport?.startTime?newReport.startTime:foundUser?.lastReport?.startTime,
                             endTime:newReport?.endTime?newReport.endTime:foundUser?.lastReport?.endTime }
                    }

                    updatedUser.userTests[changeUserIndex] = foundUser;
            }
            else if (type === "grup") {
                const allGrupReports = currentUser?.reportsClass[0].reportsList || [];
                const updatedHistory = allGrupReports?.map((report) =>
                    report.id == newReport?.id ?
                 { ...report,
                     location: newReport?.location,
                      content: newReport?.content,
                      startTime:newReport.startTime?newReport.startTime:report?.startTime,
                      endTime:newReport.endTime?newReport.endTime:report?.endTime 
                    } : report
                );
                updatedUser.reportsClass[0].reportsList = updatedHistory;
            }
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

    const createNewReportForGrupOrSingle = (newReport, accessType, userId) => {
        const tempCurrentUser = { ...currentUser }
        const createObj = {
            ...newReport,
            isComplited: false,
            endTime: "00:00"
        }
        if (accessType == "grup") {
            if (tempCurrentUser.reportsClass[0]) {
                tempCurrentUser.reportsClass[0].lastReport = { ...createObj };
            }
            else {
                alert("אין מחלקה קיימת")
            }
        }
        else if (accessType == "tests") {
            for (let index = 0; index < tempCurrentUser?.userTests?.length; index++) {
                if (tempCurrentUser.userTests[index].id == userId) {
                    tempCurrentUser.userTests[index].reportsList.push({ ...createObj });
                    tempCurrentUser.userTests[index].lastReport = createObj;
                }
            }
        }

        setCurrentUser(tempCurrentUser);
        saveToLocalStorage(tempCurrentUser);
    };

    const endProcessReport = (reportId, endTimePress) => {
         
        const allReport = currentUser?.history || [];

        const updatedHistory = allReport.map((report) =>
            report.id == reportId ? {
                ...report, endTime: endTimePress, isComplited: true
            } : report
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

        const tempCurrentUser = { ...currentUser };

        if (accessType === "grup") {
            if (tempCurrentUser.reportsClass && tempCurrentUser.reportsClass[0]) {
                const lastClassReport = tempCurrentUser.reportsClass[0].lastReport || [];
                lastClassReport.isComplited = true;
                const changeDate=formatDateToNumber(getCurrentDateFormaterHebrew()) > formatDateToNumber(lastClassReport?.date);
                
                lastClassReport.endTime =changeDate? "00:00":getCurrentTime();
                tempCurrentUser.reportsClass[0].lastReport = null;

                if (tempCurrentUser.reportsClass[0].reportsList) {
                    tempCurrentUser.reportsClass[0].reportsList.push(lastClassReport);
                } else {
                    tempCurrentUser.reportsClass[0].reportsList = [lastClassReport];
                }
            }
        } else if (accessType === "tests") {
            if (tempCurrentUser.userTests) {
                for (let index = 0; index < tempCurrentUser.userTests.length; index++) {
                    if (tempCurrentUser.userTests[index].id === userId) {
                        const reportList = tempCurrentUser.userTests[index].reportsList.map((repo) =>
                            repo.id === reportId ? { ...repo, 
                                endTime:formatDateToNumber(getCurrentDateFormaterHebrew()) > formatDateToNumber(repo?.date)?"00:00":getCurrentTime(), 
                                isComplited: true } : repo
                        );
                        tempCurrentUser.userTests[index].lastReport.isComplited = true;
                        tempCurrentUser.userTests[index].lastReport.endTime = getCurrentTime();
                        tempCurrentUser.userTests[index].reportsList = reportList;
                    }
                }
            }
        }
        setCurrentUser(tempCurrentUser);
        saveToLocalStorage(tempCurrentUser);
    };


    const handleManageUsers = (newGrup) => {
        const updatedUser = {
            ...currentUser,
            userTests:newGrup?.userTests,
            reportsClass:newGrup?.reportsClass,
            username: newGrup?.systemUsername || "",
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
        updateCommandSingleReport,
        saveToLocalStorage
    }
}

export default useUser