import React, { useEffect, useState } from 'react'
import UsersDisplay from './UsersDisplay'
import { reportListUsers } from '../../../db/reportsList';

//usersToDisplay: are the users to display after serch input,
//setChosenCategory: is to toggle to location choose screen,
//usersSelected: are the users that the manger selected them,
function SolidersSample({ usersToDisplay, setChosenCategory, usersSelected, setUsersSelected }) {
    const [userArray, setUserArray] = useState()

    useEffect(() => {
        const temp = usersToDisplay?.map((userDisplay, i) => {
            const dateKeys = Object?.keys(userDisplay.reports[0].dates);
            const lastDayKey = dateKeys[dateKeys.length - 1];
            return { id: i, date: lastDayKey, name: userDisplay.username, lastsReports: userDisplay.reports[0].dates[lastDayKey] }
        })
        setUserArray(temp)
    }, [usersToDisplay])

    return (
        <div dir='rtl'><UsersDisplay usersSelected={usersSelected} setUsersSelected={setUsersSelected} arrayUserDisplay={userArray} setChosenCategory={setChosenCategory} /></div>
    )
}

export default SolidersSample