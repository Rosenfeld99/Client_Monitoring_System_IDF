import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getSingleSystemStract, SYSTEMSTRACT } from '../../../db/systemStract'
import ReportEnd from '../../../pages/doc/ReportEnd'

function ChooseLocatin({ usersSelected }) {
    const navigation = useNavigate()
    const usersName = usersSelected?.map((user) => user?.name)
    console.log(usersName);
    const [searchParams] = useSearchParams()


    const innerIcon = () => {
        return getSingleSystemStract(searchParams.get('s'))?.icon
    }
    return (
        <div dir='rtl' className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' border-b-2  border-transparent ' ></div>
            <div className='  min-h-[45vh] overflow-y-auto mt-6 px-1 '>
                {searchParams.get('end') !== "process" ? <div className=" flex flex-wrap items-center justify-center gap-y-20 gap-x-7">
                    {SYSTEMSTRACT?.map((item, index) => (
                        <button
                             onClick={() => navigation(`/startReport/${item?.value}?&access=manager&report=grup&users=${encodeURIComponent(JSON.stringify(usersName))}`)} 
                            key={index} className=" flex w-32 flex-col items-center justify-center gap-2">
                            <div className="gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
                            <div className="text-lg font-bold">{item?.name}</div>
                        </button>
                    ))}
                </div> : <div className=" z-40 flex flex-col text-sm items-center leading-5 h-full flex-1 text-right mx-auto w-full ">
                    <div className="flex flex-col text-center ">
                        <div className="self-center text-lg font-semibold ">
                            סיימו דיווח!
                        </div>
                        <div className="w-full text-sm text-light_neutral dark:text-dark_accent_content">
                            הגש את הדיווח שלך :)
                        </div>
                    </div>
                    <div className="  mt-[6.5rem] w-[9.5rem] h-[9.5rem] bg-blue-500 rounded-full animate-ping flex flex-col items-center justify-center"></div>
                    <button onClick={() => navigation(`/lastReports?end=complate`)} className=" absolute top-56 w-64 h-64 mt-44 text-2xl font-semibold gap-3 gradient-bg-dark gradient-bg-light flex flex-col items-center justify-center rounded-full shadow-xl shadow-[#0000003d] dark:shadow-[#000000]">
                        <div className='text-7xl text-white'>
                            {innerIcon()}
                        </div>
                        <div className='text-black'>
                            <div >סיום</div>
                            <div className=' w-56 mx-auto flex items-center justify-center'>{searchParams.get('location')?.substring(0, 31)}{searchParams.get('location')?.length > 31 && "..."}{searchParams.get('report') == "grup" && "דיווח מחלקה"}{searchParams.get('report') == "tests" && "דיווח מדגם"}</div>
                        </div>
                    </button>
                </div>}
            </div>
        </div >

    )
}

export default ChooseLocatin