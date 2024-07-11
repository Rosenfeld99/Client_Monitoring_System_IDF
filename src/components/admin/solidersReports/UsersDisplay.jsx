import React, { useContext, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ButtonAction from '../../../utils/ButtonAction';
import { ContextStore } from '../../../context/ContextStore';
import useUser from '../../../hooks/useUser';
import { TranslateStruct } from '../../../db/systemStract';


const DisplayUser = ({ setUsersSelected, userDisplay }) => {
    const [chooseReport, setChooseReport] = useState(false)
    const splitMission = userDisplay?.lastsReports.split("_")
    console.log(splitMission);
    const date=new Date( userDisplay?.date)
    
    return (<>
        {/* TODO: save the users selected on click */}
        <>
            <div onClick={() => { !chooseReport? setUsersSelected((prev) => [...prev, userDisplay]) : setUsersSelected((prev) => prev?.filter((user) => user?.id != userDisplay?.id)); setChooseReport(!chooseReport); }} className={` ${chooseReport && 'bg-slate-100 dark:bg-[#121212] border-[1px] border-[#62bcee] rounded-lg'} min-h-10 grid grid-cols-12 my-1 gap-3 py-1 `} >
                <div className="flex w-full h-full overflow-y-auto col-span-3 items-center  justify-center ">{userDisplay?.userName||"משתמש"}</div>
                <div className="flex w-full h-full overflow-y-auto col-span-4 items-center justify-center ">{date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}</div>
                <div className="flex w-full h-full overflow-y-auto  col-span-2 items-center justify-center ">{TranslateStruct[splitMission[0]] }</div>
                <div className="flex w-full h-full overflow-y-auto col-span-3 items-center justify-center ">{splitMission[1]}</div>
            </div>
            <div className='divide-solid divide-y border-b-2 border-[#ebebeb] dark:border-[#686868]  ' ></div>
        </>


    </>)
}




function UsersDisplay({ arrayUserDisplay, setToggleSend, usersSelected, setUsersSelected }) {
    const { advanceSearchResults } = useUser()
    const navigation = useNavigate()
    // console.log(usersSelected);

    // check who use this component to result search or just show users
    const usersToDisplays = arrayUserDisplay || advanceSearchResults;

    //check if sample users table is display or results table
    const isSampleSoliders = arrayUserDisplay ? true : false;

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


                {usersToDisplays?.map((userDisplay, i) => {
                    return <div key={i}>
                        <DisplayUser userDisplay={userDisplay} setUsersSelected={setUsersSelected}  />
                    </div>
                })}

            </div>
            { usersSelected[0] &&
                <div onClick={() => { navigation(`/startReport/base?&access=manager&report=tests&users=${JSON.stringify(usersSelected.map((user)=>user.id) )}`), setToggleSend(true) }} className=" backdrop-blur-sm right-0 w-full p-5 z-50 fixed bottom-0 ">
                    <ButtonAction title="דיווח מדגם" />
                </div>
            }
        </div >
    )
}

export default UsersDisplay