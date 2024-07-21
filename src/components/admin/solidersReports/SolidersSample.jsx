import React, { useEffect, useState } from 'react'
import UsersDisplay from './UsersDisplay'
import { reportListUsers } from '../../../db/reportsList';
import SoldiersClassReport from './SoldiersClassReport';
import { useSearchParams } from 'react-router-dom';
import useUser from '../../../hooks/useUser';

//usersToDisplay: are the users to display after serch input,
//setChosenCategory: is to toggle to location choose screen,
//usersSelected: are the users that the manger selected them,
function SolidersSample({ usersToDisplay, setChosenCategory, usersSelected, setUsersSelected }) {
    const [userArray, setUserArray] = useState()
    const {currentUser} = useUser()
    const [toggleSend, setToggleSend] = useState(false)

    const [searchParams] = useSearchParams()


    useEffect(() => {
        const temp = usersToDisplay?.map((userDisplay, i) => {
            const dateKeys = Object?.keys(userDisplay.reports[0].dates);
            const lastDayKey = dateKeys[dateKeys.length - 1];
            return { id: i, date: lastDayKey, name: userDisplay.username, lastsReports: userDisplay.reports[0].dates[lastDayKey] }
        })
        setUserArray(temp)
    }, [usersToDisplay])

    return (
        <div dir='rtl'> {toggleSend
            ? <SoldiersClassReport />
            : <UsersDisplay usersSelected={usersSelected} setUsersSelected={setUsersSelected} setToggleSend={setToggleSend} arrayUserDisplay={userArray} />}</div>
    )
}

export default SolidersSample