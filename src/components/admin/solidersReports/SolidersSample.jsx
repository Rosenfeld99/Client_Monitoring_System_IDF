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

    console.log(usersToDisplay);
    useEffect(() => {
        if (usersToDisplay) {

            console.log(usersToDisplay);
            const temp = usersToDisplay?.map((userDisplay, i) => {
                // const dateKeys = Object?.keys(userDisplay?.reports[0]?.dates);
                // const lastDayKey = dateKeys[dateKeys?.length - 1];
                console.log(userDisplay?.reports[0]);
                const lastReport = userDisplay?.reports[0]
                return { id: lastReport?._id, date: lastReport?.endTime, name: lastReport?.userId, lastsReports: lastReport.location + "_" + lastReport.content }
            })
            setUserArray(temp)
            setSendReport(false)
        }
    }, [usersToDisplay])

    return (
        <div dir='rtl'>
            {sendReport ? <ChooseLocatin usersSelected={usersSelected} /> : <UsersDisplay usersSelected={usersSelected} setSendReport={setSendReport} setUsersSelected={setUsersSelected} arrayUserDisplay={userArray} />}
        </div>
    )
}

export default SolidersSample