import React from 'react'
import LEFTMENU from "/Left.png"
import MENUHUM from "/Menu.png"
import { appName } from '../constant/constant'

const Navbar = () => {
    return (
        <div className="flex gap-5 items-center px-2.5 py-2 w-full text-2xl font-semibold tracking-tight leading-9 text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500">
            <img
                loading="lazy"
                srcSet={LEFTMENU}
                className="shrink-0 w-10 aspect-square"
            />
            <div className="flex-auto self-stretch my-auto">{appName}</div>
            <img
                loading="lazy"
                srcSet={MENUHUM}
                className="shrink-0 w-10 aspect-square"
            />
        </div>)
}

export default Navbar