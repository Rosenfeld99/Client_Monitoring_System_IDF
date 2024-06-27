import React, { useEffect, useRef } from 'react'
import Navbar from '../../../utils/Navbar'
import TransitionPage from '../../../animation/TransitionPage'
import { LuClipboardEdit } from "react-icons/lu";

function ReportDate() {
    const names = ["אבי אברמי", "יוסי קמון", "תומר שבקי", "ניב גלבוע"]
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus()

    }, [])
    const input = document?.getElementById('myDateInput'); // Replace with your input ID
    if (input) {
        input.click(); // or input.focus()
    }

    return (
        <TransitionPage>

            <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full bg-white min-h-screen flex-1  ">
                <Navbar />
                <div className='h-full w-full flex flex-col items-center'>
                    <div className='flex m-10 '>
                        <div className='items-center justify-center flex flex-col'>
                            <h1 className='font-bold text-xl'> דיווח מדגם</h1>
                            <p className='p-1'>{names.map((name, index) => `${name}  ${index != names.length - 1 ? "," : ""}`)}</p>
                        </div>
                        <div>
                            <LuClipboardEdit size={50} />
                        </div>
                    </div>
                    {/* hours inputs */}
                    <div className='w-3/4' >
                        <div className='my-8 border-gray-300 pr-3 rounded-lg border flex w-full '>
                            <input placeholder=' שעת התחלה  ' className='ml-1 p-1 outline-none  w-full' type="text" />
                        </div>
                        <div className='mt-8 border-gray-300 pr-3 rounded-lg border flex w-full '>
                            <input placeholder=' שעת סיום ' className='ml-1 p-1 outline-none  w-full' type="text" />
                        </div>
                    </div>
                    {/* choose date */}
                    <div >
                        <input ref={inputRef} type="datetime-local" name="" id="myDateInput" />
                    </div>
                </div>



            </div>
        </TransitionPage>

    )
}

export default ReportDate