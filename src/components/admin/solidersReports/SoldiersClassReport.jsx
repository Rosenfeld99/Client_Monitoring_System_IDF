import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SYSTEMSTRACT } from '../../../db/systemStract'

function SoldiersClassReport() {
    const navigation = useNavigate()

    return (
        <div className=' mt-7 w-full h-full flex flex-col flex-1'>

            <div className='mt-[26px]  h-[45vh] overflow-y-auto'>
                <div className="  grid grid-cols-2 gap-7">
                    {SYSTEMSTRACT?.map((item, index) => (
                        <button onClick={() => navigation(`/startReport/${item?.value}?report=grup`)} key={index} className=" flex flex-col items-center justify-center gap-2">
                            <div className="gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
                            <div className="text-lg font-bold">{item?.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SoldiersClassReport