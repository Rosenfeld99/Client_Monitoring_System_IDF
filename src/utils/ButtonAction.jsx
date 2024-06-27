import React from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonAction = ({ title, route, disabledBtn }) => {
    const navigation = useNavigate()

    return (
        <button disabled={disabledBtn} onClick={() => navigation(route)} className={`justify-center w-full items-center self-stretch px-4 py-1.5 text-xl font-medium leading-7 text-center text-white rounded-lg bg-stone-700 ${disabledBtn && "opacity-50 cursor-not-allowed"}`}>
            {title}
        </button>)
}

export default ButtonAction