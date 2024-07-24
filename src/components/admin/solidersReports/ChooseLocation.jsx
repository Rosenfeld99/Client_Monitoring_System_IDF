import React from 'react'
import { SYSTEMSTRACT } from '../../../db/systemStract'
import { useNavigate } from 'react-router-dom'

function ChooseLocation({type,access,userId}) {
    const navigation=useNavigate()
  return (
    
    <div className=" flex flex-wrap items-center justify-center gap-y-20 gap-x-7">
        {SYSTEMSTRACT?.map((item, index) => (
        <button
            onClick={() => navigation(`/startReport/${item?.value}?&access=manager&report=${type}&users=${userId}`)}
            key={index} className=" flex w-32 flex-col items-center justify-center gap-2">
            <div className="gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
            <div className="text-lg font-bold">{item?.name}</div>
        </button>
    ))}</div>
  )
}

export default ChooseLocation