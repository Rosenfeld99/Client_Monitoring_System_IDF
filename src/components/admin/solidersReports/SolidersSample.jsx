import React, { useState } from 'react'
import UsersDisplay from './UsersDisplay'
import { reportListUsers } from '../../../db/reportsList';

function SolidersSample() {
    const [userArray, setUserArray] = useState(
        reportListUsers.users.map((userDisplay, i) => {
            const dateKeys = Object?.keys(userDisplay.reports[0].dates);
            const lastDayKey = dateKeys[dateKeys.length - 1];
            return { date: lastDayKey, name: userDisplay.username, lastsReports: userDisplay.reports[0].dates[lastDayKey] }
        })

    )
    return (
        <div><UsersDisplay arrayUserDisplay={userArray} /></div>
    )
}

export default SolidersSample