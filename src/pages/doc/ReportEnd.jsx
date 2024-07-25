import React, { useEffect, useState } from 'react'
import BACKPAPER from "/backPaper.png"
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Menu/Navbar'
import { getSingleSystemStract } from '../../db/systemStract'
import { userStatic } from '../../db/userStatic'
import useUser from '../../hooks/useUser'
import { formatDateToNumber, getCurrentDateFormaterHebrew, getCurrentTime } from '../../utils/func/generateId'

const ReportEnd = () => {
    const navigation = useNavigate()
    const [searchParams] = useSearchParams()
    const { currentUser, endProcessReport } = useUser()


    console.log(searchParams.get('id'));

    const handleEndReport = () => {
        endProcessReport(searchParams.get('id'), getCurrentTime())
        navigation(`/startReport?last=end`)
    }

    const innerIcon = () => {
        return getSingleSystemStract(searchParams.get('s'))?.icon
    }

    useEffect(() => {
        console.log(searchParams.get('id'), searchParams.get('s'), searchParams.get('location'))
        if (!searchParams.get('s') && !searchParams.get('location') && !searchParams.get('id')) {
            navigation(`/endReport?s=${currentUser?.process?.place}&location=${currentUser?.process?.location}&id=${currentUser?.process?.id}`)
        }
        if ((formatDateToNumber(getCurrentDateFormaterHebrew()) > formatDateToNumber(currentUser?.process?.date)) && currentUser?.process?.id == searchParams.get('id')) {
            console.log("in case");
            endProcessReport(searchParams.get('id'), "00:00")
            navigation(`/startReport?last=end`)
        }
    }, [])


    return (
        <TransitionPage>
            <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full  min-h-screen flex-1  ">

                <Navbar />
                {currentUser?.history?.length == 0 || (currentUser?.history?.length == 1 && currentUser?.lastReport == null) ? <div className=" text-md text-light_neutral dark:text-dark_accent_content mt-20 text-center "></div> :
                    <div className="flex self-center px-5 mt-20 leading-5 text-center ">
                        <IoCheckmarkCircleOutline className='text-2xl w-10 h-10' />
                        <div className="grow my-auto text-md text-light_neutral dark:text-dark_accent_content">
                            דיווח אחרון היום הייתם ב {" "}
                            <span className="font-bold text-light_primary_content dark:text-dark_primary_content">{currentUser?.lastReport?.content}</span> בשעה{" "}
                            <span className="font-bold text-light_primary_content dark:text-dark_primary_content">{currentUser?.lastReport?.endTime}</span>{" "}
                        </div>
                    </div>
                }
                <img
                    loading="lazy"
                    srcSet={BACKPAPER}
                    className="mt-20 max-w-[800px] dark:opacity-15 max-h-[800px] object-cover w-full absolute top-[33vw]  "
                />
                <div className=" z-40 flex flex-col pt-14 text-sm items-center leading-5 h-full flex-1 text-right mx-auto w-full ">
                    <div className="flex flex-col text-center  pb-20">
                        <div className="self-center text-lg font-semibold ">
                            סיימו דיווח!
                        </div>
                        <div className="w-full text-sm text-light_neutral dark:text-dark_accent_content">
                            הגש את הדיווח שלך :)
                        </div>
                    </div>
                    <div className="  mt-[6.5rem] w-[9.5rem] h-[9.5rem] bg-blue-500 rounded-full animate-ping flex flex-col items-center justify-center"></div>
                    <button onClick={handleEndReport} className=" absolute w-64 h-64 mt-44 text-2xl font-semibold gap-3 gradient-bg-dark gradient-bg-light flex flex-col items-center justify-center rounded-full shadow-xl shadow-[#0000003d] dark:shadow-[#000000]">
                        <div className='text-7xl text-white'>
                            {innerIcon()}
                        </div>
                        <div className='text-black'>
                            <div >סיום</div>
                            <div className=' w-56 mx-auto flex items-center justify-center'>{searchParams.get('location')?.substring(0, 31)}{searchParams.get('location')?.length > 31 && "..."}</div>
                        </div>
                    </button>
                </div>
            </div>
        </TransitionPage>
    )
}

export default ReportEnd