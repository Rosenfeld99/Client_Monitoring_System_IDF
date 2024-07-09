import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SYSTEMSTRACT } from '../../../db/systemStract'

function ChooseLocatin({ usersSelected }) {
    const navigation = useNavigate()
    const usersId = usersSelected?.map((user) => user?.id)
    const [searchParams] = useSearchParams()
    console.log(usersSelected);
    return (
        <div dir='rtl' className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' border-b-2  border-transparent ' ></div>
            <div className='  h-[45vh] overflow-y-auto mt-6 px-1 '>
                <div className=" flex flex-wrap items-center justify-center gap-y-14 gap-x-7">
                    {SYSTEMSTRACT?.map((item, index) => (
                        <button onClick={() => navigation(`/startReport/${item?.value}?&access=manager&report=${searchParams.get("report")}&users=${JSON.stringify(usersId)}`)} key={index} className=" flex flex-col w-32 items-center justify-center gap-2">
                            <div className="gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
                            <div className="text-lg font-bold">{item?.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div >

    )
}

export default ChooseLocatin