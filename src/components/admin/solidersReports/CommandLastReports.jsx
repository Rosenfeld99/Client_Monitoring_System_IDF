import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GrAddCircle, GrDocumentTest } from 'react-icons/gr'
import { CgMoreVerticalO } from 'react-icons/cg'
import { getSingleSystemStract } from '../../../db/systemStract'
import { FaEdit } from 'react-icons/fa'
import useUser from '../../../hooks/useUser'

function CommandLastReports() {
    const navigation = useNavigate()
    // const usersName = usersSelected?.map((user) => user?.name)
    const [isOpen, setIsOpen] = useState("");
    const dropdownRef = useRef(null);
    const [searchParams] = useSearchParams()
    const { currentUser} = useUser()

    const innerIcon = (val) => {
        return getSingleSystemStract(val || searchParams.get('s'))?.icon
    }


    const toggleDropdown = (userId) => {
        setIsOpen(userId);
    };

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

    const usersTests = [
        {
            username: "אליהו מאיר", id: "vfdnkjvnfdjk", report: "מטווחים", name: "בסיס", value: "base",
        },
        { username: "נהוראי", id: "njckdnckjcn", report: "תפילה", name: "שטח", value: "area" },
    ]
    return (
        <div dir='rtl' className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' border-b-2  border-transparent ' ></div>
            <div className='  h-[50vh] overflow-y-auto mt-6 px-1 '>
                <div className=" flex flex-col w-full items-center justify-center gap-5">
                    {currentUser?.userGrup?.historyList?.map((item, index) => (
                        <button
                            key={index} className="relative overflow-hidden shadow-md shadow-[#0000003d] p-3 flex gap-2 flex-col items-center justify-center border rounded-xl w-full ">
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
                                    <div className=" flex flex-col items-start">
                                        <div className="text-lg font-bold">{item?.username}</div>
                                        <div className="text-sm font-bold">דיווח {item?.report} ב{item.name}</div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => { toggleDropdown(item?.id) }}
                                    className="relative py-3">
                                    <CgMoreVerticalO className='top-0 left-0 absolute text-5xl w-10 h-10 bg-white rounded-full z-40' />
                                </div>
                                {item?.id == isOpen && <div ref={dropdownRef} className="absolute left-16 bg-white border shadow-lg rounded-lg w-48 z-50">
                                    <div className=" absolute w-4 h-4 bg-white border bottom-4 rotate-45 -ml-1.5 left-0 z-20" />
                                    <ul className=' flex-col flex relative items-start pr-2 w-full rounded-lg overflow-hidden z-40'>
                                        <li onClick={() => console.log("Edit report")} className="py-1 hover:bg-gray-100 bg-white w-full justify-end cursor-pointer flex items-center gap-4 flex-row-reverse">עדכון דיווח <FaEdit className=' text-xl' /></li>
                                        <li onClick={() => console.log("New report")} className="py-1 hover:bg-gray-100 bg-white w-full justify-end cursor-pointer flex items-center gap-4 flex-row-reverse">דיווח חדש <GrAddCircle className=' text-2xl' /></li>
                                    </ul>
                                </div>}
                            </div>
                            <div className=' absolute top-10 -left-14 text-7xl w-40 h-40 rotate-6 opacity-5'>
                                {innerIcon(item?.value)}
                            </div>
                        </button>
                    ))}
                </div>



            </div>

        </div >
    )
}

export default CommandLastReports