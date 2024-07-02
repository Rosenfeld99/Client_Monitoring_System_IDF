import React, { useEffect, useState } from 'react'
import UsersDisplay from './UsersDisplay'
import { reportListUsers } from '../../../db/reportsList';
import ChooseLocatin from './ChooseLocatin';

//usersToDisplay: are the users to display after serch input,
//setChosenCategory: is to toggle to location choose screen,
//usersSelected: are the users that the manger selected them,
function SolidersSample({ usersToDisplay, usersSelected, setUsersSelected }) {
    const [userArray, setUserArray] = useState();
    const [sendReport, setSendReport] = useState(false);


    useEffect(() => {
        const temp = usersToDisplay?.map((userDisplay, i) => {
            const dateKeys = Object?.keys(userDisplay.reports[0].dates);
            const lastDayKey = dateKeys[dateKeys.length - 1];
            return { id: i, date: lastDayKey, name: userDisplay.username, lastsReports: userDisplay.reports[0].dates[lastDayKey] }
        })
        setUserArray(temp)
        setSendReport(false)
    }, [usersToDisplay])

    return (
        <div dir='rtl'>
            {sendReport ? <ChooseLocatin usersSelected={usersSelected} /> : <UsersDisplay usersSelected={usersSelected} setSendReport={setSendReport} setUsersSelected={setUsersSelected} arrayUserDisplay={userArray} />}
        </div>
    )
}

export default SolidersSample