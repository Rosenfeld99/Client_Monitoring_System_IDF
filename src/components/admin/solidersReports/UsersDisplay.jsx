import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonAction from '../../../utils/ButtonAction';

import useUser from '../../../hooks/useUser';


const DisplayUser = ({ setUsersSelected, userDisplay, sampleUsers }) => {
    const [chooseReport, setChooseReport] = useState(false)
    console.log(userDisplay);
    return (<>
        {/* TODO: save the users selected on click */}
        {userDisplay?.lastsReports.map((requsts, i) =>
            <>
                <div key={i} onClick={() => { !chooseReport && sampleUsers ? setUsersSelected((prev) => [...prev, userDisplay]) : setUsersSelected((prev) => prev?.filter((user) => user?.id != userDisplay?.id)); setChooseReport(!chooseReport); }} className={` ${chooseReport && 'bg-slate-100 dark:bg-[#121212] border-[1px] border-[#62bcee] rounded-lg'} min-h-10 grid grid-cols-12 my-1 gap-3 py-1 `} >
                    <div className="flex w-full h-full overflow-y-auto col-span-3 items-center  justify-center ">{userDisplay?.name}</div>
                    <div className="flex w-full h-full overflow-y-auto col-span-4 items-center justify-center ">{userDisplay?.date}</div>
                    <div className="flex w-full h-full overflow-y-auto  col-span-2 items-center justify-center ">{requsts?.location}</div>
                    <div className="flex w-full h-full overflow-y-auto col-span-3 items-center justify-center ">{requsts?.content}</div>
                </div>
                <div className='divide-solid divide-y border-b-2 border-[#ebebeb] dark:border-[#686868]  ' ></div>
            </>

        )}
    </>)
}




function UsersDisplay({ arrayUserDisplay, setToggleSend, usersSelected, setUsersSelected }) {
    const { advanceSearchResults } = useUser()
    // check who use this component to result search or just show users
    const usersToDisplays = arrayUserDisplay || advanceSearchResults;

    //check if sample users table is display or results table
    const isSampleSoliders = arrayUserDisplay ? true : false;

    const formattObjToDate = (objDate) => {
        const date = new Date(objDate)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;

    }

    return (
        <div dir='rtl' className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' grid grid-cols-12 gap-3 px-1   '>
                <div className="flex w-full col-span-3 items-center  justify-center font-semibold">משתמש</div>
                <div className="flex w-full col-span-4 items-center justify-center font-semibold">דיווח אחרון</div>
                <div className="flex w-full  col-span-2 items-center justify-center font-semibold">נמצא</div>
                <div className="flex w-full col-span-3 items-center justify-center font-semibold">עושה</div>
            </div>
            <div className='divide-solid divide-y border-b-2 border-[#ebebeb] dark:border-[#686868]  ' ></div>
            <div className='  h-[45vh] overflow-y-auto'>


                {usersToDisplays.map((userDisplay, i) => {
                    return <div key={i}>
                        <DisplayUser userDisplay={userDisplay} setUsersSelected={setUsersSelected} sampleUsers={isSampleSoliders} />
                    </div>
                })}

            </div>
            {isSampleSoliders && usersSelected[0] &&
                <Link >
                    <div onClick={() => setToggleSend(true)} className=" backdrop-blur-sm right-0 w-full p-5 z-50 fixed bottom-0 ">
                        <ButtonAction title="דיווח מדגם" />
                    </div>
                </Link>}
        </div >
    )
}

export default UsersDisplay