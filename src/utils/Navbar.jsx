import React, { useState } from 'react'
import LEFTMENU from "/Left.png"
import MENUHUM from "/Menu.png"
import { appName } from '../constant/constant'
import { IoClose, IoDocumentTextOutline } from 'react-icons/io5'
import { HiOutlineMenu, HiUserCircle } from 'react-icons/hi'
import { RiHistoryFill } from 'react-icons/ri'
import { MdOutlineLogout } from 'react-icons/md'
import '.././App.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { CgMenuRightAlt } from 'react-icons/cg'

const Navbar = () => {
    const menu = [
        { route: "/startReport", title: "דיווח חדש", icon: <IoDocumentTextOutline className='text-3xl text-black' /> },
        { route: "/#", title: "כניסת", icon: <HiUserCircle className='text-3xl text-black' /> },
        { route: "/todayReportsList", title: "היסטוריה דיווחים", icon: <RiHistoryFill className='text-3xl text-black' /> },
        { route: "/", title: "התנתקות", icon: <MdOutlineLogout className='text-3xl text-black' /> },
    ]

    const [open, setOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setOpen(false);
            setIsExiting(false);
        }, 1000); // Duration should match the slideOutUp animation duration
    };

    return (
        <React.Fragment>
            <div className=" flex-row-reverse flex gap-5 items-center px-2.5 py-2 w-full text-2xl font-semibold tracking-tight leading-9 text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500">
                <FaArrowLeft onClick={() => navigate(-1)} />
                <div className="flex-auto self-stretch my-auto">{appName}</div>
                <HiOutlineMenu className='text-3xl' onClick={() => setOpen(true)} />
            </div>
            {open && (
                <div className={`flex overflow-hidden min-h-screen fixed w-full flex-col gap-8 items-start p-8 z-50 bg-[#00000062] ${isExiting && "animate__fadeOut"}`}>
                    <div className={`bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg ${isExiting ? 'animate__slideOutUp' : 'animate__slideInDown'} shadow-[#bbb] w-[700px] aspect-square rounded-l-full rounded-r-[8000px] z-50 rotate-45 absolute top-0 right-0 -mt-52 -mr-52`} />
                    <div onClick={handleClose} className={`z-50 text-3xl pt-8 ${isExiting ? "animate__slideOutUp_after" : "animate__slideInDown_after"}`}>
                        <IoClose />
                    </div>
                    {menu.map((item, index) => (
                        <div onClick={() => navigate(`${item.route}`)} key={index} className={`flex flex-row-reverse text-2xl items-center gap-5 text-white z-50 ${isExiting ? 'animate__slideOutUp_after' : 'animate__slideInDown_after'}`}>
                            {item.title} {item.icon}
                        </div>
                    ))}
                </div>
            )}
        </React.Fragment>
    )
}

export default Navbar