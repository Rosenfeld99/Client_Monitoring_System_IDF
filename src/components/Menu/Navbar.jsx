import React, { useState } from 'react'
import { IoClose, IoDocumentTextOutline } from 'react-icons/io5'
import { HiOutlineMenu, HiUserCircle } from 'react-icons/hi'
import { RiHistoryFill } from 'react-icons/ri'
import { MdOutlineLogout } from 'react-icons/md'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { LuMoonStar } from 'react-icons/lu'
import useTheme from '../../hooks/useTheme'
import { FiSun } from 'react-icons/fi'
import '../../App.css'
import { appName } from '../../constant/constant'
import { PiUserCircleCheckFill, PiUserCirclePlusFill, PiUsersThreeFill } from 'react-icons/pi'
import { BsClipboard2Data } from 'react-icons/bs'
import useUser from '../../hooks/useUser'

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [theme, toggleTheme] = useTheme();
    const [searchParams] = useSearchParams()
    const { pathname } = useLocation()
    const { currentUser } = useUser();


    const navigate = useNavigate()

    const menu = [
        { show:true, route: "/startReport", title: "דיווח חדש", icon: <IoDocumentTextOutline className='text-3xl text-black' /> },
        { show:currentUser?.role==="Admin"||currentUser?.role==="Manager", route: "/lastReports", title: " כניסת מפקד", icon: <PiUserCircleCheckFill className='text-3xl text-black' /> },
        { show:true, route: "/todayReportsList", title: "היסטוריה דיווחים", icon: <RiHistoryFill className='text-3xl text-black' /> },
        { show:currentUser?.role==="Admin", route: "/manageUsers", title: "הוספת משתמש", icon: <PiUserCirclePlusFill className='text-3xl text-black' /> },
        { show:true, route: "/", title: "התנתקות", icon: <MdOutlineLogout className='text-3xl text-black' /> },
    ]


    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setOpen(false);
            setIsExiting(false);
        }, 1000); // Duration should match the slideOutUp animation duration
    };

    // console.log(searchParams.get('last'));

    return (
        <React.Fragment>
            <div className=" flex-row-reverse flex gap-5 items-center px-2.5 py-2 w-full text-2xl font-semibold tracking-tight leading-9 text-center z-50 text-white gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] ">
                {(pathname?.substring(1) != "endReport" && searchParams.get('last') != "end") ? <FaArrowLeft onClick={() => navigate(-1)} /> : <div className='w-8 h-8' />}
                <div className="flex-auto self-stretch my-auto">{appName}</div>
                {pathname?.substring(1) != "endReport" ? <HiOutlineMenu className='text-3xl' onClick={() => setOpen(true)} /> : <div className='w-8 h-8' />}
            </div>
            {open && (
                <div className={`flex overflow-hidden min-h-screen fixed max-w-[680px] w-full flex-col gap-8 items-start p-8 z-50 bg-[#00000089] ${isExiting && "animate__fadeOut"}`}>
                    <div className={`bg-gradient-to-t gradient-bg-dark gradient-bg-light shadow-lg ${isExiting ? 'animate__slideOutUp' : 'animate__slideInDown'} shadow-[#02020256] dark:shadow-[#000000] w-[780px] aspect-square rounded-l-full rounded-r-[80px] z-50 rotate-45 absolute top-0 right-0 -mt-32 -mr-52`} />
                    <div onClick={handleClose} className={`z-50 text-3xl pt-8 ${isExiting ? "animate__slideOutUp_after" : "animate__slideInDown_after"}`}>
                        <IoClose />
                    </div>
                    {menu.map((item, index) => item.show && (
                        <div onClick={() => { navigate(`${item.route}`), handleClose() }} key={index} className={`flex flex-row-reverse text-2xl items-center gap-5 text-white z-50 ${isExiting ? 'animate__slideOutUp_after' : 'animate__slideInDown_after'}`}>
                            {item.title} {item.icon}
                        </div>
                    ))}
                   {currentUser?.role==="Admin"&&<div onClick={() => { navigate('/analytics'), handleClose() }} className={`flex flex-row-reverse text-2xl items-center gap-5 text-white z-50 ${isExiting ? 'animate__slideOutUp_after' : 'animate__slideInDown_after'}`}>
                        נתונים <BsClipboard2Data className='text-3xl text-black' />
                    </div>}
                    <div onClick={toggleTheme} className={`flex flex-row-reverse text-2xl items-center gap-5 text-white z-50 ${isExiting ? 'animate__slideOutUp_after' : 'animate__slideInDown_after'}`}>
                        ערכת נושא {theme == "light" ? <LuMoonStar className='text-3xl text-black' /> : <FiSun className='text-3xl text-black' />}
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Navbar