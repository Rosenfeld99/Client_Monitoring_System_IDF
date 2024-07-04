import React, { useEffect, useState } from 'react'
import { LiaFilterSolid } from 'react-icons/lia'
import { BiSolidEdit } from 'react-icons/bi'
import BACKPAPER from "/backPaper.png"
import { useNavigate } from 'react-router-dom'
import "../../App.css"
import TransitionPage from '../../animation/TransitionPage'
import { user } from '../../db/reportsList'
import useUser from '../../hooks/useUser'
import Navbar from '../../components/Menu/Navbar'
import useReports from '../../hooks/useReports'

const HistoryLastDay = ({ }) => {
    const [chooseOption, setChooseOption] = useState(null)
    const navigation = useNavigate()
    const { activeIsEdit, currentUser } = useUser()
    const { getHistoryReports, historyReports } = useReports()


    useEffect(() => {
        getHistoryReports({ userId: currentUser?.userId, mode: "User" })
    }, [])
    console.log(historyReports);

    const handleNavigation = () => {
        if (chooseOption !== null) {
            const params = new URLSearchParams({
                s: chooseOption?.content,
                location: chooseOption?.location,
                startTime: chooseOption?.startTime,
                endTime: chooseOption?.endTime,
                reportId: chooseOption?._id
            }).toString();
            navigation(`/ReportEdit/reportId?${params}`);
            activeIsEdit()
        }
    }

    // console.log(chooseOption);

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col pb-20 mx-auto w-full relative min-h-screen flex-1 ">
                <Navbar />
                {/* title */}
                <div className=" flex-row-reverse gap-3 flex items-center justify-center py-10">
                    <LiaFilterSolid className='w-10 h-10' />
                    <div className=' flex-col flex items-center justify-center'>
                        <div className=" text-xl font-semibold">היסטוריית דיווחים</div>
                        <div className=" text-sm text-gray-400">יום אחרון</div>
                    </div>
                </div>
                {/* back image */}
                <img
                    loading="lazy"
                    srcSet={BACKPAPER}
                    className=" mt-20 w-full opacity-15 max-w-[700px] max-h-[700px] z-10 absolute top-20 aspect-[0.72] stroke-[5px] stroke-neutral-200 stroke-opacity-40"
                />
                {/* list last day */}
                <div className="mx-8 flex-col flex items-center justify-center gap-3 z-30">
                    {console.log(historyReports?.data)}
                    {historyReports?.data?.map((item, index) => (
                        // adding start and last time
                        <div key={index} onClick={() => setChooseOption(item)}
                            className={`p-2 rounded-lg text-md w-full 
                        ${chooseOption?._id === item?._id ? "font-bold dark:text-light_primary border-2 border-[#0996E5] bg-slate-100 dark:bg-[#121212] text-light_primary_content flex items-center justify-between"
                                    : "border-2 border-gray-200 dark:border-dark_accent_content font-normal text-gray-500"}`}>
                            <div className=" flex items-center w-full gap-5 justify-between">
                                <div >{item?.location}</div>
                                <div className={`${chooseOption?.id === item?.id && "dark:text-dark_accent_content text-light_accent_content"} flex items-center text-sm text-gray-500 gap-2`}>
                                    <div >{item?.startTime}</div>{"-"}
                                    <div >{item?.endTime}</div>
                                    {chooseOption?.id === item?.id && <BiSolidEdit onClick={handleNavigation} className='text-2xl text-[#0996E5]' />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </TransitionPage>
    )
}

export default HistoryLastDay