import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getSingleSystemStract, SYSTEMSTRACT } from '../../../db/systemStract'
import ReportEnd from '../../../pages/doc/ReportEnd'
import UserCardList from './UserCardPrcess/UserCardList'
import { ImPause } from 'react-icons/im'
import { CgFileDocument } from 'react-icons/cg'
import { GrDocumentTest } from 'react-icons/gr'

function SoldiersClassReport({ usersSelected }) {
    const navigation = useNavigate()
    const usersName = usersSelected?.map((user) => user?.name)
    console.log(usersName);
    const [searchParams] = useSearchParams()


    const innerIcon = (val) => {
        return getSingleSystemStract(val || searchParams.get('s'))?.icon
    }

    const usersTests = [
        {
            username: "אליהו מאיר", id: "njckdnckjcn", report: "מטווחים", name: "בסיס", value: "base",
        },
        { username: "נהוראי", id: "njckdnckjcn", report: "תפילה", name: "שטח", value: "area" },
    ]
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
                </div> :
                    <div className="">
                        {!false ?
                            <div className=" flex flex-col w-full items-center justify-center gap-5">
                                {usersTests?.map((item, index) => (
                                    <button
                                        onClick={() => navigation(`/startReport/${item?.value}?&access=manager&report=grup&users=${encodeURIComponent(JSON.stringify(usersName))}`)}
                                        key={index} className="relative overflow-hidden shadow-md shadow-[#0000003d] p-3 flex gap-2 flex-col items-center justify-center border rounded-xl w-full ">
                                        <div className=" flex items-center justify-between w-full">
                                            <h1 className=' text-sm font-bold text-start w-full'>משימה בתהליך</h1>
                                            <div className="text-xs text-nowrap text-gray-400">
                                                בתאריך 22/05/2024 , 10:20
                                            </div>

                                        </div>
                                        <div className=" flex items-center justify-between w-full">
                                            <div className=" w-full rounded-3xl flex flex-row gap-2 items-center justify-strat text-4xl">
                                                <div className="gradient-bg-dark text-white z-50 text-4xl gradient-bg-light w-16 h-16 flex items-center justify-center rounded-full">
                                                    {/* {innerIcon(item?.value)} */}
                                                    <GrDocumentTest />
                                                </div>
                                                <div className=" flex flex-col items-start">
                                                    <div className="text-lg font-bold">{item?.username}</div>
                                                    <div className="text-sm font-bold">דיווח {item?.report} ב{item.name}</div>
                                                </div>
                                            </div>
                                            <div className="relative py-3">
                                                <div className=" top-0 left-0 absolute z-20 w-8 h-8 ml-1 mt-1 bg-red-200 rounded-full animate-ping flex flex-col items-center justify-center"></div>
                                                <ImPause className='top-0 left-0 absolute text-5xl w-10 h-10 bg-white rounded-full z-40' />
                                            </div>
                                        </div>
                                        <div className=' absolute top-10 -left-14 text-7xl w-40 h-40 rotate-6 opacity-5'>
                                            {innerIcon(item?.value)}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            : <div className=" z-40 flex flex-col text-sm items-center leading-5 h-full flex-1 text-right mx-auto w-full ">
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
                    </div>}
            </div>
        </div >

    )
}

export default SoldiersClassReport