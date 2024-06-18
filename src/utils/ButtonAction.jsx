import React from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonAction = ({ title, route }) => {
    const navigation = useNavigate()

    return (
        <div onClick={() => navigation(route)} className="justify-center items-center self-stretch px-4 py-1.5 text-xl font-medium leading-7 text-center text-white rounded-lg bg-stone-700 max-w-[427px]">
            {title}
        </div>)
}

export default ButtonAction