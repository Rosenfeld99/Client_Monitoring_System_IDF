import React, { useEffect, useState } from 'react'
import UsersDisplay from './UsersDisplay'
import { reportListUsers } from '../../../db/reportsList';
import SoldiersClassReport from './SolidersReports';
import { useSearchParams } from 'react-router-dom';
import ChooseLocatin from './ChooseLocatin';

//usersToDisplay: are the users to display after serch input,
//setChosenCategory: is to toggle to location choose screen,
//usersSelected: are the users that the manger selected them,
function SolidersSample({ usersToDisplay, usersSelected, setUsersSelected }) {
    const [userArray, setUserArray] = useState()
    const [toggleSend, setToggleSend] = useState(false)

    const [searchParams] = useSearchParams()
    

    useEffect(() => {
        if (usersToDisplay) {

            console.log(usersToDisplay);
            const temp = usersToDisplay?.map((userDisplay, i) => {
            
                const lastReport = userDisplay?.reports[0]
                console.log(lastReport);
                return { id: lastReport?._id, date: lastReport?.endTime, name: lastReport?.userId, lastsReports: lastReport.location + "_" + lastReport.content }
            })
            setUserArray(temp)
        }
    }, [usersToDisplay])
    return (
        <div dir='rtl'> {toggleSend ? <ChooseLocatin usersSelected={usersSelected} /> : <UsersDisplay usersSelected={usersSelected} setUsersSelected={setUsersSelected} setToggleSend={setToggleSend} arrayUserDisplay={userArray} />}</div>
    )
}

export default SolidersSample