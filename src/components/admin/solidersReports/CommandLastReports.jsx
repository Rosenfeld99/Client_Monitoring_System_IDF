import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GrAddCircle, GrDocumentTest } from 'react-icons/gr'
import { CgMoreVerticalO } from 'react-icons/cg'
import { getSingleSystemStract, SYSTEMSTRACT } from '../../../db/systemStract'
import { FaEdit } from 'react-icons/fa'
import useUser from '../../../hooks/useUser'
import ChooseLocation from './ChooseLocation'
import { ImPause } from 'react-icons/im'
import { getCurrentDateFormaterHebrew } from '../../../utils/func/generateId'
import { SiGoogleclassroom } from 'react-icons/si'

function CommandLastReports({ setChosenCategory }) {
    const navigation = useNavigate()
    // const usersName = usersSelected?.map((user) => user?.name)
    const [isOpen, setIsOpen] = useState("");
    const dropdownRef = useRef(null);
    const [searchParams] = useSearchParams()
    const { currentUser, activeIsEdit, endManagerProcessReport } = useUser()
    const [createReport, setCreateReport] = useState({ userId: "", type: "" })

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




    const handeleEdit = (report) => {
        console.log(report);
        const params = new URLSearchParams({
            s: report?.content,
            location: report?.location,
            startTime: report?.startTime,
            endTime: report?.endTime,
            id: report?.id,
            report: report.type === "User" ? "tests" : "grup",
            userId: report?.userId
        }).toString();
        navigation(`/ReportEdit/reportId?${params}`);
        activeIsEdit()
    }

    const handeleFinishReport = (report) => {
        console.log(report);
        endManagerProcessReport(report?.id, report.type === "User" ? "tests" : "grup", report?.userId)
        navigation(`/lastReports?end=complate`)
    }

    const getComanndHistory = () => {
        const currentDate = getCurrentDateFormaterHebrew()
        const currentDayReports = currentUser?.reportsClass[0]?.reportsList?.filter((report) => report?.date === currentDate)
        console.log(currentDate);
        let history = [...currentDayReports ?? []];
        const tempUser = currentUser?.userTests;
        for (let index = 0; index < tempUser?.length; index++) {
            for (let j = 0; j < tempUser[index]?.reportsList?.length; j++) {
                if (tempUser[index]?.reportsList[j].date === currentDate) {
                    history = [...history, { ...tempUser[index]?.reportsList[j], type: "User", userId: tempUser[index].id, name: tempUser[index]?.name }]
                }
            }
        }
        return history
    }

    // console.log(getComanndHistory() );

    return (
        <div dir='rtl' className=' w-full h-full flex flex-col flex-1'>
            <div className=' h-[100vh]  overflow-y-auto mt-6 px-1 '>
                <div className=" flex flex-col w-full items-center justify-center gap-5">
                    {createReport?.type ? <ChooseLocation type={createReport?.type} access={"manager"} userId={createReport?.userId} />
                        : getComanndHistory()?.map((item, index) => (
                            <button
                                key={index} className="relative overflow-hidden shadow-md shadow-[#0000003d] p-3 flex gap-2 flex-col items-center justify-center border rounded-xl w-full ">
                                <div className=" flex items-center justify-between w-full">
                                    <h1 className=' text-sm font-bold text-start w-full'>דיווח אחרון</h1>
                                    <div className="text-xs text-nowrap text-gray-400">
                                        {item?.date}
                                        {" " + (item?.endTime || item?.startTime)}
                                    </div>
                                </div>

                                <div className=" flex items-center justify-between w-full">
                                    <div className=" w-full rounded-3xl flex flex-row gap-2 items-center justify-strat text-4xl">
                                        <div className="gradient-bg-dark text-white z-30 text-4xl gradient-bg-light w-16 h-16 flex items-center justify-center rounded-full">
                                            {/* {innerIcon(item?.value)} */}
                                            {item.type === "User" ? <GrDocumentTest /> : <SiGoogleclassroom />}
                                        </div>
                                        <div className="max-w-[60%] flex flex-col items-start">
                                            <div className="text-lg font-bold">{item.type ? item?.name : (currentUser?.reportsClass[0]?.nameClass || "מחלקה")}</div>
                                            <div className="text-sm font-bold">דיווח {item?.content} ב{item.location}</div>
                                        </div>
                                    </div>

                                    {item.isComplited ?
                                        <div
                                            onClick={() => { toggleDropdown(item?.id) }}
                                            className="relative py-3">
                                            <CgMoreVerticalO className='top-0 left-0 absolute text-5xl w-10 h-10  text-light_primary_content dark:text-dark_primary_content rounded-full z-40' />
                                        </div>
                                        : <div onClick={() => handeleFinishReport(item)} className='relative'>
                                            <div className=" top-0 left-0 absolute z-20 w-8 h-8 ml-1 mt-1 bg-red-200 rounded-full animate-ping flex flex-col items-center justify-center"></div>
                                            <ImPause className='top-0 left-0 absolute text-5xl w-10 h-10 text-light_primary_content dark:text-dark_primary_content rounded-full z-40' />
                                        </div>}

                                    {item?.id == isOpen && <div ref={dropdownRef} className="absolute left-16 bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content border shadow-lg rounded-lg w-48 z-50">
                                        <div className=" absolute w-4 h-4 bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content border bottom-4 rotate-45 -ml-1.5 left-0 z-20" />
                                        <ul className=' flex-col flex relative items-start pr-2 w-full rounded-lg overflow-hidden z-40'>
                                            <li onClick={() => { handeleEdit(item), scrollTo({ top: 0, behavior: 'smooth' }) }} className="py-1 hover:bg-gray-100 bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content w-full justify-end cursor-pointer flex items-center gap-4 flex-row-reverse">עדכון דיווח <FaEdit className=' text-xl' /></li>
                                            <li onClick={() => { setCreateReport({ userId: item.type === "User" ? item?.userId : "", type: item.type ? "tests" : "grup" }), setChosenCategory(item.type === "User" ? `soldiers` : `class-of-soldiers`), scrollTo({ top: 0, behavior: 'smooth' }) }} className="py-1 hover:bg-gray-100 bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content w-full justify-end cursor-pointer flex items-center gap-4 flex-row-reverse">דיווח חדש <GrAddCircle className=' text-2xl' /></li>
                                        </ul>
                                    </div>}
                                </div>

                                <div className=' absolute top-10 -left-14 text-7xl w-40 h-40 rotate-6 opacity-5'>
                                    {SYSTEMSTRACT?.find((location) => location?.name === item.location)?.icon}
                                </div>
                            </button>
                        ))}
                </div>



            </div>

        </div >
    )
}

export default CommandLastReports