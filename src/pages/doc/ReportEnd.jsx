import React, { useState } from 'react'
import BACKPAPER from "/backPaper.png"
import Navbar from '../../utils/Navbar'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { GiWatchtower } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

const ReportEnd = () => {
    const navigation = useNavigate()

    const [valueWWd, setValueWWd] = useState('')
    const [valueWMI, setValueWMI] = useState('')

    const handleEndReport = () => {
    }

    return (
        <TransitionPage>
            <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full bg-white min-h-screen flex-1  ">

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
                    <div className="flex flex-col text-center  pb-20">
                        <div className="self-center text-lg font-semibold text-black">
                            סיימו דיווח!
                        </div>
                        <div className="w-full text-sm text-zinc-500">
                            הגש את הדיווח שלך :)
                        </div>
                    </div>
                    <button onClick={() => navigation(`/startReport`)} className=" w-64 h-64 text-2xl font-semibold gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center rounded-full shadow-xl shadow-[#0000003d]">
                        <GiWatchtower className='w-20 h-20 text-white' />
                        <div className='text-black'>
                            <div >סיום</div>
                            <div >מטווחים</div>
                        </div>
                    </button>
                </div>
            </div>
        </TransitionPage>
    )
}

export default ReportEnd