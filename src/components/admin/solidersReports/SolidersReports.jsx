import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TransitionPage from '../../../animation/TransitionPage'

import { LuSearch } from 'react-icons/lu'
import { LiaFilterSolid } from 'react-icons/lia'
import SolidersSample from './SolidersSample'
import { reportListUsers } from '../../../db/reportsList'
import CommandLastReports from './CommandLastReports'
import Navbar from '../../Menu/Navbar'
import ChooseLocatin from './ChooseLocatin'
import useUser from '../../../hooks/useUser'


function LastReports() {
  const [chosenCategory, setChosenCategory] = useState("class-of-soldiers")
  const [usersSelected, setUsersSelected] = useState([]);
  const [usersSearch, setUsersSearch] = useState(reportListUsers.users);
  const { currentUser } = useUser();


  const handleSearch = (e) => {
    const temp = reportListUsers.users.filter((user) => user.username.includes(e.target.value))
    setUsersSearch(temp)
  }


  return (
    <TransitionPage>
      <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full min-h-screen flex-1  ">

        <Navbar />
        <div className='h-full flex-1 flex items-center'>
          <div className='w-[100vw] px-5 mt-5'>
            <div className='flex justify-center pb-4 items-center'>
              <span className='font-bold' >מיין משתמשים</span>
            </div>
            <div className='flex flex-row-reverse gap-2'>
              <div className='border-b-2 border-[#ebebeb] dark:border-[#686868] pr-3 rounded-lg border flex w-[90%] '>
                <span className='flex items-center' ><LuSearch className='text-2xl' /></span>
                <input onChange={handleSearch} placeholder='  חיפוש משתמשים   ' className='ml-1 p-1 bg-transparent outline-none  w-[90%]' type="text" />
              </div>
              <Link className=' items-center justify-center flex border-b-2 border-[#ebebeb] dark:border-[#686868] border rounded-lg overflow-hidden' to={"/advanceSearch"}>
                <button className=' p-2 '><LiaFilterSolid className='text-2xl' /></button>
              </Link>
            </div>

            <div className='flex w-full justify-evenly items-center p-1 flex-1 rounded-lg mt-4  bg-[#e9e9e9] dark:bg-[#131313]'>
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "class-of-soldiers" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"}  text-center rounded-lg  cursor-pointer flex-1 p-1`} id='class-of-soldiers'>דיווח מחלקתי</div>
              {currentUser?.role === "מכ" && <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "soldiers" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"}   text-center   rounded-lg cursor-pointer flex-1 p-1 `} id='soldiers'>דיווח מדגם</div>}
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "historyReports" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"}   text-center   rounded-lg  cursor-pointer flex-1 p-1`} id='historyReports'>היסטוריה</div>
            </div>

            {chosenCategory === "soldiers" ? <SolidersSample usersToDisplay={usersSearch} usersSelected={usersSelected} setUsersSelected={setUsersSelected} setChosenCategory={setChosenCategory} /> : chosenCategory === "historyReports" ? <CommandLastReports /> : <ChooseLocatin />}
          </div>
        </div>

      </div>
    </TransitionPage>
  )
}

export default LastReports