import React, { useState } from 'react'
import Navbar from '../../utils/Navbar'
import { LiaFilterSolid } from 'react-icons/lia'
import { BiSolidEdit } from 'react-icons/bi'
import BACKPAPER from "/backPaper.png"
import { useNavigate } from 'react-router-dom'
import "../../App.css"
import TransitionPage from '../../animation/TransitionPage'

const HistoryLastDay = ({ }) => {
    const reportsList = ["מטווחים", "מד'ס", "אוכל", "הכשרה X"]
    const [chooseOption, setChooseOption] = useState(null)
    const navigation = useNavigate()

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col pb-20 mx-auto w-full relative bg-white min-h-screen flex-1 ">
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
                    className=" mt-20 w-full max-w-[700px] max-h-[700px] z-10 absolute top-20 aspect-[0.72] stroke-[5px] stroke-neutral-200 stroke-opacity-40"
                />
                {/* list last day */}
                <div className="mx-8 flex-col flex items-center justify-center gap-3 z-30">
                    {reportsList.map((item, index) => (
                        <div key={index} onClick={() => setChooseOption(index)}
                            className={` bg-white  p-2 rounded-lg text-md w-full 
                        ${chooseOption === index ? "font-bold border-2 border-[#0996E5] text-black flex items-center justify-between"
                                    : "border-2 border-gray-200 font-normal text-gray-500"}`}>
                            {item} {chooseOption === index && <BiSolidEdit onClick={() => navigation(`/ReportEdit/${'reportId'}`)} className='text-2xl text-[#0996E5]' />}
                        </div>
                    ))}
                </div>
            </div>
        </TransitionPage>
    )
}

export default HistoryLastDay