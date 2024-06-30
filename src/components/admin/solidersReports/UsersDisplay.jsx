import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonAction from '../../../utils/ButtonAction';
import { reportListUsers } from '../../../db/reportsList';
import { UserContextProvider } from '../../../context/UserContext';


const DisplayUser = ({ setUsersSelected, userDisplay }) => {
    const [chooseReport, setChooseReport] = useState(false)
    console.log(userDisplay);

    const oneLastReport = userDisplay?.lastsReports
    return (<>
        {/* TODO: save the users selected on click */}
        <div onClick={() => { !chooseReport ? setUsersSelected(["has users"]) : setUsersSelected([]); setChooseReport(!chooseReport); }} className={` ${chooseReport && 'bg-slate-100 dark:bg-[#121212] border-[1px] border-[#62bcee] rounded-lg'} min-h-10 grid grid-cols-12 my-1 gap-3 py-1 `} >
            <div className="flex w-full h-full overflow-y-auto col-span-2 items-center justify-center ">עושה</div>
            <div className="flex w-full h-full overflow-y-auto  col-span-3 items-center justify-center ">חדר  hh jjj nn jjj אוכל</div>
            <div className="flex w-full h-full overflow-y-auto col-span-4 items-center justify-center ">דיווח אחרון</div>
            <div className="flex w-full h-full overflow-y-auto col-span-3 items-center  justify-center ">משתמש</div>
        </div>
        <div className='divide-solid divide-y border-b-2 border-[#ebebeb] dark:border-[#686868]  ' ></div>
    </>)
}




function UsersDisplay({ arrayUserDisplay }) {
    const { advanceSearchResults } = UserContextProvider()
    const usersToDisplays = arrayUserDisplay || advanceSearchResults;
    console.log(advanceSearchResults);
    const formattObjToDate = (objDate) => {
        const date = new Date(objDate)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

    }

    const [usersSelected, setUsersSelected] = useState([])


    return (
        <div className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' grid grid-cols-12 gap-3 px-1   '>
                <div className="flex w-full col-span-3 items-center justify-center font-semibold">עושה</div>
                <div className="flex w-full  col-span-2 items-center justify-center font-semibold">נמצא</div>
                <div className="flex w-full col-span-4 items-center justify-center font-semibold">דיווח אחרון</div>
                <div className="flex w-full col-span-3 items-center  justify-center font-semibold">משתמש</div>
            </div>
            <div className='divide-solid divide-y border-b-2 border-[#ebebeb] dark:border-[#686868]  ' ></div>
            <div className='  h-[45vh] overflow-y-auto'>


                {usersToDisplays.map((userDisplay, i) => {
                    return <div key={i}>
                        <DisplayUser userDisplay={userDisplay} setUsersSelected={setUsersSelected} />
                    </div>
                })}

            </div>
            {usersSelected[0] &&
                <Link Link to={"/startReport"}>
                    <div className=" backdrop-blur-sm right-0 w-full p-5 z-50 fixed bottom-0 ">
                        <ButtonAction title="שלח דיווח" route={`/endReport`} />
                    </div>
                </Link>}
        </div >
    )
}

export default UsersDisplay