import React, { useEffect } from 'react'
import BACKPAPER from "/backPaper.png"
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { useNavigate } from 'react-router-dom'
import { SYSTEMSTRACT } from '../../db/systemStract'
import useUser from '../../hooks/useUser'
import Navbar from '../../components/Menu/Navbar'

const ReportStart = ({ }) => {
    const navigation = useNavigate()
    const { inActiveIsEdit } = useUser()
    const { currentUser } = useUser()
    console.log(currentUser);

    useEffect(() => {
        inActiveIsEdit()
    }, [])


    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col overflow-hidden relative pb-20 mx-auto w-full h-screen flex-1">

                <Navbar />
                {currentUser?.history?.length == 0 ? <div className=" text-md text-light_neutral dark:text-dark_accent_content mt-20 text-center "></div> :
                    <div className="flex self-center px-5 mt-20 leading-5 text-center ">
                        <IoCheckmarkCircleOutline className='text-xl w-8 h-8' />
                        <div className="grow my-auto text-md text-light_neutral dark:text-dark_accent_content">
                            דיווח אחרון היום הייתם ב {" "}
                            <span className="font-bold text-light_primary_content dark:text-dark_primary_content">{currentUser?.lastReport?.content}</span> בשעה{" "}
                            <span className="font-bold text-light_primary_content dark:text-dark_primary_content">{currentUser?.lastReport?.endTime}</span>{" "}
                        </div>
                    </div>}
                <div className=" mx-auto">
                    <img
                        loading="lazy"
                        srcSet={BACKPAPER}
                        className="mt-20 md:mt-[6vw] dark:opacity-15 sm:mr-[8vw] max-w-[550px] max-h-[800px] object-cover w-[100vw] absolute right-0 stroke-neutral-200 "
                    />
                </div>
                <div className=" z-40 flex flex-col pt-14 text-sm items-center leading-5 h-full flex-1 text-right mx-auto w-full ">
                    <div className="flex flex-col text-center leading-[150%] pb-20">
                        <div className="self-center text-lg font-bold ">
                            שלום {currentUser?.username}
                            {/* , איפה את/ה ? */}
                        </div>
                        <div className="w-full text-sm ">
                            הזן את המשימה הקרובה שלך :)
                        </div>
                    </div>

                    {/* List option */}
                    <div className=" flex flex-wrap items-center justify-center gap-x-24 gap-y-20">
                        {SYSTEMSTRACT?.map((item, index) => (
                            <button onClick={() => navigation(`/startReport/${item?.value}`)} key={index} className=" flex flex-col items-center justify-center gap-2">
                                <div className="gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] dark:shadow-[#000000] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
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