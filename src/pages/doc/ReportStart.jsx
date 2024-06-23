import React, { useState } from 'react'
import BACKPAPER from "/backPaper.png"
import Navbar from '../../utils/Navbar'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { LiaHomeSolid, LiaMapMarkedAltSolid } from 'react-icons/lia'
import { GiWatchtower } from 'react-icons/gi'
import { CiCircleMore } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const ReportStart = ({ }) => {
    const navigation = useNavigate()


    const handleStartReport = () => {

    }

    // <GiTowerFlag />
    const LIST_OPTION = [
        { name: "בית", value: "home", icon: <LiaHomeSolid /> },
        { name: "בסיס", value: "base", icon: <GiWatchtower /> },
        { name: "שטח", value: "area", icon: <LiaMapMarkedAltSolid /> },
        { name: "שונות", value: "others", icon: <CiCircleMore /> },
    ]

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col overflow-hidden pb-20 mx-auto w-full bg-white min-h-screen flex-1">

                <Navbar />
                <div className="flex gap-3 self-center px-5 mt-10 leading-5 text-center text-black">
                    <IoCheckmarkCircleOutline className='text-xl' />
                    <div className="grow my-auto text-md">
                        דיווח אחרון היום הייתם ב {" "}
                        <span className="font-bold text-black">מטווחים</span> בשעה{" "}
                        <span className="font-bold text-black">8:00</span>{" "}
                    </div>
                </div>
                <img
                    loading="lazy"
                    srcSet={BACKPAPER}
                    className="mt-20 max-w-[800px] max-h-[800px] object-cover w-full absolute top-[33vw] stroke-neutral-200 "
                />
                <div className=" z-40 flex flex-col pt-24 text-sm items-center leading-5 h-full flex-1 text-right mx-auto w-full text-zinc-500">
                    <div className="flex flex-col text-center leading-[150%] pb-20">
                        <div className="self-center text-lg font-bold text-black">
                            איפה אתם ?
                        </div>
                        <div className="w-full text-sm text-zinc-500">
                            הזן את המשימה הקרובה שלך :)
                        </div>
                    </div>

                    {/* List option */}
                    <div className=" grid grid-cols-2 gap-x-24 gap-y-20">
                        {LIST_OPTION?.map((item, index) => (
                            <button onClick={() => navigation(`/startReport/${item?.value}`)} key={index} className=" flex flex-col items-center justify-center gap-2">
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md shadow-[#0000003d] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
                                <div className="text-lg font-bold">{item?.name}</div>
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </TransitionPage>
    )
}

export default ReportStart