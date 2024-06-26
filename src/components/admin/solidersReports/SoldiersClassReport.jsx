import React from 'react'
import UsersDisplay from './UsersDisplay'
import { LiaHomeSolid, LiaMapMarkedAltSolid } from 'react-icons/lia'
import { GiWatchtower } from 'react-icons/gi'
import { CiCircleMore } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

function SoldiersClassReport() {
    const navigation = useNavigate()

    const LIST_OPTION = [
        { name: "בית", value: "home", icon: <LiaHomeSolid /> },
        { name: "בסיס", value: "base", icon: <GiWatchtower /> },
        { name: "שטח", value: "area", icon: <LiaMapMarkedAltSolid /> },
        { name: "שונות", value: "others", icon: <CiCircleMore /> },
    ]
    return (
        <div className=' mt-7 w-full h-full flex flex-col flex-1'>

            <div className='mt-[26px]  h-[45vh] overflow-y-auto'>
                <div className="  grid grid-cols-2 gap-x-20 gap-y-7">
                    {LIST_OPTION?.map((item, index) => (
                        <button onClick={() => navigation(`/startReport/${item?.value}`)} key={index} className=" flex flex-col items-center justify-center gap-2">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md shadow-[#0000003d] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">{item?.icon}</div>
                            <div className="text-lg font-bold">{item?.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SoldiersClassReport