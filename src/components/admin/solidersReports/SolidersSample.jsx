import React, { useEffect, useState } from 'react'
import UsersDisplay from './UsersDisplay'
import SoldiersClassReport from './SoldiersClassReport';
import { useSearchParams } from 'react-router-dom';

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
                return { id: lastReport?._id, date: lastReport?.endTime||lastReport?.startTime, name: lastReport?.userId, lastsReports: lastReport.location + "_" + lastReport.content }
            })
            setUserArray(temp)
        }
    }, [usersToDisplay])

    return (
        <div dir='rtl'> {toggleSend
            ? <SoldiersClassReport />
            : <UsersDisplay usersSelected={usersSelected} setUsersSelected={setUsersSelected} setToggleSend={setToggleSend} arrayUserDisplay={userArray} />}</div>
    )
}

export default SolidersSample