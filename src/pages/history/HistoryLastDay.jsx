import React, { useState } from 'react'
import { LiaFilterSolid } from 'react-icons/lia'
import { BiSolidEdit } from 'react-icons/bi'
import BACKPAPER from "/backPaper.png"
import { useNavigate } from 'react-router-dom'
import "../../App.css"
import TransitionPage from '../../animation/TransitionPage'
import { user } from '../../db/reportsList'
import useUser from '../../hooks/useUser'
import Navbar from '../../components/Menu/Navbar'
import { getCurrentDateFormaterHebrew } from '../../utils/func/generateId'
import { userStatic } from '../../db/userStatic'

const HistoryLastDay = ({ }) => {
    const { activeIsEdit, currentUser } = useUser()
    const [chooseOption, setChooseOption] = useState(null)
    const navigation = useNavigate()
    const [selectOption, setSelectOPtion] = useState(currentUser?.reportsClass[0]?.nameClass ? { name: currentUser?.reportsClass[0]?.nameClass, index: -1 } : currentUser?.userTests[0]?.name ? { name: currentUser?.userTests[0]?.name, index: 0 } : null)

    const handleNavigation = (e,type,userId) => {
        if (chooseOption !== null) {
            const params = new URLSearchParams({
                s: chooseOption?.content,
                location: chooseOption?.location,
                startTime: chooseOption?.startTime,
                endTime: chooseOption?.endTime,
                id: chooseOption?.id,
                report:type,
                userId
            }).toString();
            navigation(`/ReportEdit/reportId?${params}`);
            activeIsEdit()
        }
    }
    console.log(currentUser?.userTests[0]?.reportsList[0]);

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col pb-20 mx-auto w-full relative min-h-screen flex-1 ">
                <Navbar />
                {/* title */}
                <div className=" flex-row-reverse gap-3 flex items-center justify-center py-10 pt-20">
                    <LiaFilterSolid className='w-10 h-10' />
                    <div className=' flex-col flex items-center justify-center'>
                        <div className=" text-xl font-semibold">היסטוריית דיווחים</div>
                        <div className=" text-sm text-gray-400">{getCurrentDateFormaterHebrew()}</div>
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
                
                    {currentUser?.role == "user" && currentUser?.history?.map((item, index) => (
                        // adding start and last time
                        <>
                            {getCurrentDateFormaterHebrew() == item?.date && <div key={index} onClick={() => setChooseOption(item)}
                                className={`p-2 rounded-lg text-md w-full 
                        ${chooseOption?.id === item?.id ? "font-bold dark:text-light_primary border-2 border-[#0996E5] bg-slate-100 dark:bg-[#121212] text-light_primary_content flex items-center justify-between"
                                        : "border-2 border-gray-200 dark:border-dark_accent_content font-normal text-gray-500"}`}>
                                <div className=" flex items-center w-full gap-5 justify-between">
                                    <div >{item?.content}</div>
                                    <div className={`${chooseOption?.id === item?.id && "dark:text-dark_accent_content text-light_accent_content"} flex items-center text-sm text-gray-500 gap-2`}>
                                        <div >{item?.startTime}</div>{"-"}
                                        <div >{item?.endTime}</div>
                                        {chooseOption?.id === item?.id && <BiSolidEdit onClick={(e)=>handleNavigation(e,null)} className='text-2xl text-[#0996E5]' />}
                                    </div>
                                </div>
                            </div>}
                        </>
                    ))}

                    {currentUser?.role == "admin" && currentUser?.reportsClass[0] && currentUser?.reportsClass[0]?.reportsList && currentUser?.reportsClass[0]?.reportsList?.map((item, index) => (
                        // adding start and last time
                        <>
                            {getCurrentDateFormaterHebrew() == item?.date && <div key={index} onClick={() => setChooseOption(item)}
                                className={`p-2 rounded-lg text-md w-full 
                        ${chooseOption?.id === item?.id ? "font-bold dark:text-light_primary border-2 border-[#0996E5] bg-slate-100 dark:bg-[#121212] text-light_primary_content flex items-center justify-between"
                                        : "border-2 border-gray-200 dark:border-dark_accent_content font-normal text-gray-500"}`}>
                                <div className=" flex items-center w-full gap-5 justify-between">
                                    <div >{item?.content}</div>
                                    <div className={`${chooseOption?.id === item?.id && "dark:text-dark_accent_content text-light_accent_content"} flex items-center text-sm text-gray-500 gap-2`}>
                                        <div >{item?.startTime}</div>{"-"}
                                        <div >{item?.endTime}</div>
                                        {chooseOption?.id === item?.id && <BiSolidEdit onClick={(e)=>handleNavigation(e,"grup")} className='text-2xl text-[#0996E5]' />}
                                    </div>
                                </div>
                            </div>}
                        </>
                    ))}

                    {currentUser?.role == "manager" && currentUser?.userTests &&
                        <React.Fragment>
                            <div className=' p-1 flex-1 rounded-lg mt-4 flex items-center justify-center w-full overflow-x-scroll gap-2 bg-[#e9e9e9] dark:bg-[#131313]'>
                                <div onClick={() => { setSelectOPtion({ name: currentUser?.reportsClass[0]?.nameClass, index: -1 }) }} className={`${selectOption?.name == currentUser?.reportsClass[0]?.nameClass && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"} whitespace-nowrap rounded px-5 py-1 w-full text-center`}>{currentUser?.reportsClass[0]?.nameClass}</div>
                                {currentUser?.userTests?.map((option, indexName) => (
                                    <div onClick={() => setSelectOPtion({ name: option.name, index: indexName })} className={`${selectOption?.name == option?.name && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"} text-center py-1 px-5 rounded-lg w-full whitespace-nowrap`}>{option?.name}</div>
                                ))}
                            </div>

                            {currentUser?.userTests && currentUser?.userTests[selectOption?.index] && currentUser?.userTests[selectOption?.index]?.reportsList?.length > 0 ?
                                <React.Fragment>
                                    {currentUser?.userTests[selectOption?.index]?.reportsList?.map((item, index) => (
                                        <>
                                        {console.log(item?.isComplited)}
                                            {getCurrentDateFormaterHebrew() == item?.date &&
                                             <div key={index} onClick={() => item?.isComplited&&setChooseOption(item)}
                                                className={`p-2 rounded-lg text-md w-full 
                                                ${chooseOption?.id === item?.id ? "font-bold dark:text-light_primary border-2 border-[#0996E5] bg-slate-100 dark:bg-[#121212] text-light_primary_content flex items-center justify-between"
                                                        : "border-2 border-gray-200 dark:border-dark_accent_content font-normal text-gray-500"}
                                                        ${!item.isComplited&&"bg-slate-300" }
                                                        `}>
                                                <div className=" flex items-center w-full gap-5 justify-between">
                                                    <div >{item?.content}</div>
                                                    {!item.isComplited&&<div className='font-black'>בתהליך</div>}
                                                    <div className={`${chooseOption?.id === item?.id && "dark:text-dark_accent_content text-light_accent_content"} flex items-center text-sm text-gray-500 gap-2`}>
                                                        <div >{item?.startTime}</div>{"-"}
                                                        <div >{item?.endTime}</div>
                                                        {chooseOption?.id === item?.id && <BiSolidEdit onClick={(e)=>handleNavigation(e,"tests",currentUser?.userTests[selectOption?.index].id)}className='text-2xl text-[#0996E5]' />}
                                                    </div>
                                                </div>
                                            </div>}
                                        </>
                                    ))}

                                </React.Fragment> :
                                <React.Fragment>
                                    {currentUser?.reportsClass[0]?.nameClass == selectOption?.name && currentUser?.reportsClass[0]?.reportsList ?
                                        <>
                                            {currentUser?.reportsClass[0]?.nameClass == selectOption?.name && currentUser?.reportsClass[0]?.reportsList?.map((item, index) => (
                                                <>
                                                    {getCurrentDateFormaterHebrew() == item?.date && <div key={index} onClick={() => setChooseOption(item)}
                                                        className={`p-2 rounded-lg text-md w-full 
                                                        ${chooseOption?.id === item?.id ? "font-bold dark:text-light_primary border-2 border-[#0996E5] bg-slate-100 dark:bg-[#121212] text-light_primary_content flex items-center justify-between"
                                                                : "border-2 border-gray-200 dark:border-dark_accent_content font-normal text-gray-500"}`}>
                                                        <div className=" flex items-center w-full gap-5 justify-between">
                                                            <div >{item?.content}</div>
                                                            <div className={`${chooseOption?.id === item?.id && "dark:text-dark_accent_content text-light_accent_content"} flex items-center text-sm text-gray-500 gap-2`}>
                                                                <div >{item?.startTime}</div>{"-"}
                                                                <div >{item?.endTime}</div>
                                                                {chooseOption?.id === item?.id && <BiSolidEdit onClick={(e)=>handleNavigation(e,"grup")} className='text-2xl text-[#0996E5]' />}
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </>
                                            ))}
                                        </> :
                                        <div className=' py-10 text-md'>אין נתונים להצגה</div>
                                    }
                                </React.Fragment>

                            }

                        </React.Fragment>
                    }

                </div>
            </div>
        </TransitionPage>
    )
}

export default HistoryLastDay