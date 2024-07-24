import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ButtonAction from '../../../utils/ButtonAction';
import useUser from '../../../hooks/useUser';
import { GrAddCircle, GrDocumentTest } from 'react-icons/gr';
import { CgMoreVerticalO } from 'react-icons/cg';
import { FaEdit } from 'react-icons/fa';
import { ImPause } from 'react-icons/im';
import ChooseLocation from './ChooseLocation';
import { SYSTEMSTRACT } from '../../../db/systemStract';


const DisplayUser = ({userDisplay,setCreateReport }) => {
    const [chooseReport, setChooseReport] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null);
    const navigation=useNavigate()
    const {activeIsEdit,currentUser,endManagerProcessReport}=useUser()

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen("");
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handeleEdit = () => {
            const params = new URLSearchParams({
                s: userDisplay?.lastReport?.content,
                location: userDisplay?.lastReport?.location,
                startTime: userDisplay?.lastReport?.startTime,
                endTime: userDisplay?.lastReport?.endTime,
                id: userDisplay?.lastReport?.id,
                userId: userDisplay?.id,
                report:"tests",

            }).toString();
            navigation(`/ReportEdit/reportId?${params}`);
            activeIsEdit()  
    }
    const handeleFinishReport=()=>{
        endManagerProcessReport(currentUser?.reportsClass[0].lastReport?.id,"tests",userDisplay?.id)
        navigation(`/lastReports?end=complate`)
    }

    return (<>
        {/* TODO: save the users selected on click */}
        
            <>
                <button
                    className="relative overflow-hidden shadow-md shadow-[#0000003d] p-3 flex gap-2 flex-col items-center justify-center border rounded-xl w-full ">
                    <div className=" flex items-center justify-between w-full">
                        <h1 className=' text-sm font-bold text-start w-full'>דיווח אחרון</h1>
                        <div className="text-xs text-nowrap text-gray-400">

                            בתאריך 22/05/2024 , 10:20
                        </div>
                    </div>
                    <div className=" flex items-center justify-between w-full">
                        <div className=" w-full rounded-3xl flex flex-row gap-2 items-center justify-strat text-4xl">
                            <div className="gradient-bg-dark text-white z-30 text-4xl gradient-bg-light w-16 h-16 flex items-center justify-center rounded-full">
                                {/* {innerIcon(item?.value)} */}
                                <GrDocumentTest />
                            </div>
                            <div className="max-w-[60%] flex flex-col items-start">
                                <div className="text-lg font-bold">{userDisplay?.name}</div>
                                <div className="text-sm font-bold">דיווח {userDisplay?.lastReport?.content} ב{userDisplay?.lastReport?.location}</div>
                            </div>
                        </div>
                        <div
                            className="relative py-3">
                                {userDisplay?.lastReport?.isComplited?
                            <CgMoreVerticalO  onClick={() => setIsOpen(userDisplay?.id) }  className='top-0 left-0 absolute text-5xl w-10 h-10 bg-white rounded-full z-40' />
                                :
                                <div onClick={()=>handeleFinishReport()}>
                                <div   className=" top-0 left-0 absolute z-20 w-8 h-8 ml-1 mt-1 bg-red-200 rounded-full animate-ping flex flex-col items-center justify-center"></div>
                                <ImPause className='top-0 left-0 absolute text-5xl w-10 h-10 bg-white rounded-full z-40' />
                                </div>    }
                        </div>
                        {userDisplay?.id == isOpen && <div ref={dropdownRef} className="absolute left-16 bg-white border shadow-lg rounded-lg w-48 z-50">
                            <div className=" absolute w-4 h-4 bg-white border bottom-4 rotate-45 -ml-1.5 left-0 z-20" />
                            <ul className=' flex-col flex relative items-start pr-2 w-full rounded-lg overflow-hidden z-40'>
                                <li onClick={() => handeleEdit()} className="py-1 hover:bg-gray-100 bg-white w-full justify-end cursor-pointer flex items-center gap-4 flex-row-reverse">עדכון דיווח <FaEdit className=' text-xl' /></li>
                                <li onClick={() => setCreateReport(userDisplay?.id)} className="py-1 hover:bg-gray-100 bg-white w-full justify-end cursor-pointer flex items-center gap-4 flex-row-reverse">דיווח חדש <GrAddCircle className=' text-2xl' /></li>
                            </ul>
                        </div>}
                    </div>
                    <div className=' absolute top-10 -left-14 text-7xl w-40 h-40 rotate-6 opacity-5'>
                    {SYSTEMSTRACT?.find((location) => location?.name === userDisplay?.lastReport?.location)?.icon}
                    </div>
                </button>


                {/* </div> */}
                <div className='divide-solid divide-y border-b-2 border-[#ebebeb] dark:border-[#686868]  ' ></div>
            </>

        
    </>)
}




function UsersDisplay({ setToggleSend, usersSelected, setUsersSelected }) {
    const navigation = useNavigate()
    const { currentUser } = useUser()
    const [createReport,setCreateReport]=useState("")


    return (
        <div dir='rtl' className='mt-7 w-full h-full flex flex-col flex-1'>
          <div className='  h-[45vh] overflow-y-auto'>
            {createReport?<ChooseLocation type={"tests"} access={"manager"} userId={createReport}/>  :currentUser?.userTests?.map((item, i) =>
                <DisplayUser key={item?.id} userDisplay={item} setCreateReport={setCreateReport}  />
            )}
            </div>
            {/* {usersSelected[0] &&
                <div onClick={() => { navigation(`/startReport/base?&access=manager&report=tests&users=undefined`), setToggleSend(true) }} className=" backdrop-blur-sm right-0 w-full p-5 z-50 fixed bottom-0 ">
                    <ButtonAction title="דיווח מדגם" />
                </div>
            } */}
        </div >
    )
}
export default UsersDisplay