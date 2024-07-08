import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SYSTEMSTRACT } from '../../../db/systemStract'

function SoldiersClassReport({ usersSelected }) {
    const navigation = useNavigate()
    const usersName = usersSelected?.map((user) => user?.name)
    console.log(usersName);
    return (
        <div dir='rtl' className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' border-b-2  border-transparent ' ></div>
            <div className='  h-[45vh] overflow-y-auto mt-6 px-1 '>
                <div className=" flex flex-wrap items-center justify-center gap-y-20 gap-x-7">
                    {SYSTEMSTRACT?.map((item, index) => (
                        <button onClick={() => navigation(`/startReport/${item?.value}?&access=manager&report=grup&users=${encodeURIComponent(JSON.stringify(usersName))}`)} key={index} className=" flex w-32 flex-col items-center justify-center gap-2">
                            <div className="gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
                            <div className="text-lg font-bold">{item?.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div >

    )
}

export default SoldiersClassReport