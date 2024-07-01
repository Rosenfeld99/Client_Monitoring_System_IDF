import React, { useState } from 'react'
import BACKPAPER from "/backPaper.png"
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { GiWatchtower } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Menu/Navbar'

const ReportEnd = () => {
    const navigation = useNavigate()

    const [valueWWd, setValueWWd] = useState('')
    const [valueWMI, setValueWMI] = useState('')

    const handleEndReport = () => {
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
                    className="mt-20 max-w-[800px] opacity-15 max-h-[800px] object-cover w-full absolute top-[33vw]  "
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
                    <button onClick={() => navigation(`/startReport`)} className=" w-64 h-64 text-2xl font-semibold gap-3 gradient-bg-dark gradient-bg-light flex flex-col items-center justify-center rounded-full shadow-xl shadow-[#0000003d] dark:shadow-[#000000]">
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