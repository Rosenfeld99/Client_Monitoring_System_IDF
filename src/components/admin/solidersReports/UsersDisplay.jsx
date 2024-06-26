import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonAction from '../../../utils/ButtonAction';


const DisplayUser = ({ setUsersSelected }) => {
    const [chooseReport, setChooseReport] = useState(false)

    return (<>
        {/* TODO: save the users selected on click */}
        <div onClick={() => { !chooseReport ? setUsersSelected(["has users"]) : setUsersSelected([]); setChooseReport(!chooseReport); }} className={` ${chooseReport && 'bg-[#e9f6fd] border-[1px]  border-[#62bcee] rounded-lg'} min-h-10 grid grid-cols-12 my-1 gap-3 py-1 `} >
            <div className="flex w-full h-full overflow-y-auto col-span-2 items-center justify-center ">עושה</div>
            <div className="flex w-full h-full overflow-y-auto  col-span-3 items-center justify-center ">חדר  hh jjj nn jjj אוכל</div>
            <div className="flex w-full h-full overflow-y-auto col-span-4 items-center justify-center ">דיווח אחרון</div>
            <div className="flex w-full h-full overflow-y-auto col-span-3 items-center  justify-center ">משתמש</div>
        </div>
        <div className='divide-solid divide-y border  ' ></div>
    </>)
}




function UsersDisplay() {
    const [usersSelected, setUsersSelected] = useState([])
    return (
        <div className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' grid grid-cols-12 gap-3 px-1   '>
                <div className="flex w-full col-span-2 items-center justify-center font-semibold">עושה</div>
                <div className="flex w-full  col-span-3 items-center justify-center font-semibold">נמצא</div>
                <div className="flex w-full col-span-4 items-center justify-center font-semibold">דיווח אחרון</div>
                <div className="flex w-full col-span-3 items-center  justify-center font-semibold">משתמש</div>
            </div>
            <div className='divide-solid divide-y border  ' ></div>
            <div className='  h-[45vh] overflow-y-auto'>
                {new Array(15).fill(0).map((_, i) =>
                    <div key={i}>
                        <DisplayUser setUsersSelected={setUsersSelected} />
                    </div>
                )}
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