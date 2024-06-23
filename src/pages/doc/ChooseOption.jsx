import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { useNavigate } from 'react-router-dom'
import { LiaHomeSolid } from 'react-icons/lia'
import { FaArrowRight } from 'react-icons/fa'
import ButtonAction from '../../utils/ButtonAction'

const ReportStart = ({ }) => {
    const navigation = useNavigate()


    const handleStartReport = () => {

    }

    // <GiTowerFlag />
    const LIST_OPTION = [
        { name: "בית", value: "home", },
        { name: "בסיס", value: "base", },
        { name: "שטח", value: "area", },
        { name: "שונות", value: "others", },
    ]

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col overflow-hidden pb-10 mx-auto w-full bg-white min-h-screen flex-1">
                <div className=" fixed top-0 right-0 min-h-8 flex-row-reverse flex gap-5 items-center justify-between px-4 py-2 w-full text-2xl font-semibold tracking-tight leading-9 text-center z-50 text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md shadow-[#0000003d]">
                    <button>
                        <IoClose className='text-4xl' onClick={() => navigation('/startReport')} />
                    </button>
                    <button>
                        <FaArrowRight className='text-2xl' onClick={() => navigation(-1)} />
                    </button>
                </div>
                <div className="flex w-full p-12 h-62 fixed top-0 right-0 pt-20 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md shadow-slate-400 flex-col text-center gap-3">
                    <div className="mx-auto w-fit">
                        <LiaHomeSolid className='text-4xl text-white' />
                    </div>
                    <div className="self-center text-lg font-bold text-black">
                        איפה תהיו היום בשעה 11:00
                    </div>
                    <div className="w-full text-sm text-zinc-700">
                        הזן את המשימה הקרובה שלך :)
                    </div>
                </div>


                {/* List option */}
                <div className=" flex flex-col items-center w-full justify-center mt-60 ">
                    {LIST_OPTION?.map((item, index) => (
                        <button key={index} className=" flex w-full flex-col items-center justify-center gap-2 border-b-2">
                            <div className="text-lg font-bold flex items-start justify-start w-full p-4 px-6">{item?.name}</div>
                        </button>
                    ))}
                </div>
                <div className="px-10 pt-0 pb-10 backdrop-blur-sm z-50 fixed bottom-0 w-full">
                    <ButtonAction title="שלח דיווח" route={`/endReport`} />
                </div>
            </div>
        </TransitionPage>
    )
}

export default ReportStart