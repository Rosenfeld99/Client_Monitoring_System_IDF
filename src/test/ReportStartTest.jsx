import React, { useState } from 'react'
import BACKPAPER from "/backPaper.png"

import ButtonAction from '../utils/ButtonAction'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../animation/TransitionPage'
import FloatingLabelInput from '../utils/floatingLabelInput/FloatingLabelInput'
import Navbar from '../components/Menu/Navbar'

const ReportStart = ({ }) => {
    const [valueWWd, setValueWWd] = useState('')
    const [valueWMI, setValueWMI] = useState('')

    const handleStartReport = (e) => {
        console.log(e.target.value);
    }
    console.log("aa");

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col overflow-hidden pb-20 mx-auto w-full bg-white min-h-screen flex-1">

                <Navbar />
                <div className="flex gap-3 self-center px-5 mt-8 text-xs leading-5 text-center text-black">
                    <IoCheckmarkCircleOutline className='text-xl' />
                    <div className="grow my-auto">
                        הגש את הדיווח שלך :){" "}
                        <span className="font-semibold text-black">מטווחים</span> בשעה{" "}
                        <span className="font-semibold text-black">8:00</span>{" "}
                    </div>
                </div>
                <img
                    loading="lazy"
                    srcSet={BACKPAPER}
                    className="mt-20 max-w-[700px] max-h-[700px] object-cover w-full absolute top-20 aspect-[0.72] stroke-[5px] stroke-neutral-200 stroke-opacity-40"
                />
                <div className=" z-40 flex flex-col justify-center text-sm items-center leading-5 h-full flex-1 text-right max-w-[327px] mx-auto w-full text-zinc-500">
                    <div className="flex flex-col text-center leading-[150%] pb-20">
                        <div className="self-center text-lg font-semibold text-black">
                            הזנת דיווח
                        </div>
                        <div className="w-full text-sm text-zinc-500">
                            הזן את המשימה הקרובה שלך :)
                        </div>
                    </div>
                    {/*  */}
                    <div className="w-full">
                        <FloatingLabelInput label={"איפה אני נמצא"} placeholder={"איפה אני נמצא"} setState={setValueWMI} state={valueWMI} />

                        <FloatingLabelInput label={"מה אני עושה?"} placeholder={"מה אני עושה?"} setState={setValueWWd} state={valueWWd} />
                    </div>

                    {/*  */}
                    <div className="w-full pt-10 ">
                        <div className="text-xs leading-5 py-2 text-center text-black mx-auto max-w-[286px]">
                            לאחר לחיצה על <span className="font-bold text-black">הוסף דיווח</span>{" "}
                            תינתן אפשרות של סיום דיווח
                        </div>
                        {/*  */}
                        <span onClick={handleStartReport}>

                            <ButtonAction title="שלח דיווח" route={'/endReport'} />
                        </span>
                    </div>
                </div>
            </div>
        </TransitionPage>
    )
}

export default ReportStart