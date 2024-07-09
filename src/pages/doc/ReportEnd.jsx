import React, { useState } from 'react'
import BACKPAPER from "/backPaper.png"
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Menu/Navbar'
import { getSingleSystemStract } from '../../db/systemStract'

const ReportEnd = () => {
    const navigation = useNavigate()
    const [searchParams] = useSearchParams()

    const handleEndReport = () => {
    }

    const innerIcon = () => {
        return getSingleSystemStract(searchParams.get('s'))?.icon
    }


    return (
        <TransitionPage>
            <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full  min-h-screen flex-1  ">

                <Navbar />
                <div className="flex gap-3 self-center px-5 mt-10 leading-5 text-center ">
                    <IoCheckmarkCircleOutline className='text-xl' />
                    <div className="grow my-auto text-md text-light_neutral dark:text-dark_accent_content">
                        דיווח אחרון היום הייתם ב {" "}
                        <span className="font-bold text-light_primary_content dark:text-dark_primary_content">מטווחים</span> בשעה{" "}
                        <span className="font-bold text-light_primary_content dark:text-dark_primary_content">8:00</span>{" "}
                    </div>
                </div>
                <img
                    loading="lazy"
                    srcSet={BACKPAPER}
                    className="mt-20 max-w-[800px] dark:opacity-15 max-h-[800px] object-cover w-full absolute top-[33vw]  "
                />
                <div className=" z-40 flex flex-col pt-24 text-sm items-center leading-5 h-full flex-1 text-right mx-auto w-full ">
                    <div className="flex flex-col text-center  pb-20">
                        <div className="self-center text-lg font-semibold ">
                            סיימו דיווח!
                        </div>
                        <div className="w-full text-sm text-light_neutral dark:text-dark_accent_content">
                            הגש את הדיווח שלך :)
                        </div>
                    </div>
                    <div className="  mt-[6.5rem] w-[9.5rem] h-[9.5rem] bg-blue-500 rounded-full animate-ping flex flex-col items-center justify-center"></div>
                    <button onClick={() => navigation(`/startReport?last=end`)} className=" absolute w-64 h-64 mt-44 text-2xl font-semibold gap-3 gradient-bg-dark gradient-bg-light flex flex-col items-center justify-center rounded-full shadow-xl shadow-[#0000003d] dark:shadow-[#000000]">
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