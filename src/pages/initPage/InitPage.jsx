import React, { useState } from 'react'
import ButtonAction from '../../utils/ButtonAction'
import useUser from '../../hooks/useUser'
import { FaUserGraduate, FaUsers, FaUserShield } from 'react-icons/fa'

const InitPage = () => {
    const [selectAccess, setSelectAccess] = useState("")
    const { currentUser, setCurrentUser, saveToLocalStorage } = useUser()

    const accessOPtions = [
        { value: "admin", name: 'מ"מ', icon: <FaUserShield />},
        { value: "manager", name: 'מ"כ', icon: <FaUsers /> },
        { value: "user", name: "חייל", icon:<FaUserGraduate /> },
    ]

    const handleInitialAccess = () => {
        const updateUser = {
            ...currentUser,
            role: selectAccess,
            isInit: false
        }
        setCurrentUser(updateUser)
        saveToLocalStorage(updateUser)
    }


    return (
        <div className=' w-full h-screen items-center flex flex-col gap-10 relative justify-center '>
            {/* <div className={`" border-4 absolute -top-20  overflow-hidden border-light_accent_content"} gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] dark:shadow-[#000000] w-[500px] h-56 rounded-full flex items-center justify-center text-white text-4xl`}/> */}
            <div className=" text-2xl font-bold text-light_neutral dark:text-dark_accent_content z-40">ברוכים הבאים לגלים</div>
            <div className="">הגדרת משתמש</div>
            <div className=" flex flex-wrap items-center justify-center gap-x-24 gap-y-20">
                {accessOPtions?.map((item, index) => (
                    <button onClick={() => setSelectAccess(item?.value)} key={index} className=" flex flex-col items-center justify-center gap-2">
                        <div className={`${selectAccess == item?.value && " border-4 border-light_accent_content"} gradient-bg-dark gradient-bg-light shadow-md shadow-[#0000003d] dark:shadow-[#000000] w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl`}>{item?.icon}</div>
                        <div className="text-lg font-bold">{item?.name}</div>
                    </button>
                ))}
            </div>
            <div className="px-10 pt-0 pb-10 backdrop-blur-sm z-50 fixed bottom-0 w-full">
                <ButtonAction disabledBtn={!true} doAPI={handleInitialAccess} title={'הגדרה ואתחול'} route={'/startReport'} />
            </div>
        </div>
    )
}

export default InitPage