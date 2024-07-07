import React, { useEffect } from 'react'
import ChartPei from '../../utils/Charts/ChartPei'
import Navbar from '../../components/Menu/Navbar'
import TransitionPage from '../../animation/TransitionPage'
import { RiArrowLeftWideFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { SYSTEMSTRACT } from '../../db/systemStract'

const AnalyticsStract = () => {
    const option = [
        { name: "בסיס", color: "bg-[#c0504e]" },
        { name: "שטח", color: "bg-[#9bbb58]" },
        { name: "מחוץ לבסיס", color: "bg-[#4f81bc]" },
    ]

    const navigation = useNavigate()

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col overflow-hidden relative pb-20 mx-auto w-full min-h-screen flex-1">
                <Navbar />
                {/* <h1>AnalyticsStract</h1> */}
                <div className="my-auto h-full">
                    <div className=" shadow-md border-[1px] rounded-2xl p-5 m-5 overflow-hidden">
                        <ChartPei />
                    </div>
                    <div className=" flex items-center gap-5 justify-center m-5 text-nowrap font-semibold">{SYSTEMSTRACT?.map((item, index) => (
                        <button onClick={()=>{navigation(`/analytics/${item?.value}`)}} key={index} className={` w-full p-3 rounded-lg flex items-center flex-row-reverse ${item.color}`}><RiArrowLeftWideFill /> {item?.name}</button>
                    ))}</div>
                </div>
            </div>
        </TransitionPage>
    )
}

export default AnalyticsStract