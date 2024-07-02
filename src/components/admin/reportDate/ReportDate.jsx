import React, { useEffect, useRef } from 'react'
import TransitionPage from '../../../animation/TransitionPage'
import { LuClipboardEdit } from "react-icons/lu";
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';
import Navbar from '../../Menu/Navbar';
import ButtonAction from '../../../utils/ButtonAction';
import { useSearchParams } from 'react-router-dom';

function ReportDate() {
    const names = ["אבי אברמי", "יוסי קמון", "תומר שבקי", "ניב גלבוע"];
    const displayedNames = names?.slice(0, 3);
    const [searchParams] = useSearchParams()


    return (
        <TransitionPage>

            <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full min-h-screen flex-1">
                <Navbar />
                <div className='h-full w-full gap-5 flex flex-col items-center'>
                    <div className='flex m-5 w-80 items-center justify-center'>
                        <div className='items-center justify-center flex flex-col'>
                            <h1 className='font-bold text-xl'> דיווח מדגם</h1>
                            <p className='p-1'>
                                {displayedNames.join(', ')}
                                {names.length > 3 && '...'}
                            </p>
                        </div>
                        <div>
                            <LuClipboardEdit size={50} />
                        </div>
                    </div>
                    {/* hours inputs */}
                    <div className='w-80 gap-5 flex items-center' >
                        {/* <div className=' border-gray-300 pr-3 rounded-lg border flex w-full '>
                            <input placeholder=' שעת התחלה  ' className='ml-1 p-1 outline-none bg-transparent  w-full' type="text" />
                        </div> */}
                        <CustomTimePicker title={"שעת התחלה"} btnInnerTime={"זמן נוכחי"} />
                        <CustomTimePicker title={"שעת סיום"} btnInnerTime={"אוטומטי"} />
                        {/* <div className='border-gray-300 pr-3 rounded-lg border flex w-full '>
                            <input placeholder=' שעת סיום ' className='ml-1 p-1 outline-none bg-transparent  w-full' type="text" />
                        </div> */}
                    </div>
                    {/* choose date */}
                    <div >
                        <CustomDatePicker />
                    </div>
                </div>

                {/* checking for if is auto start the manager to end repo */}
                <div className=" backdrop-blur-sm right-0 w-full p-5 px-9 z-50 fixed bottom-0 ">
                    <ButtonAction title="דיווח מדגם" route={searchParams.get('endTime') == "אוטומטי" ? "/endReport" : "/startReport"} />
                </div>

            </div>
        </TransitionPage>

    )
}

export default ReportDate