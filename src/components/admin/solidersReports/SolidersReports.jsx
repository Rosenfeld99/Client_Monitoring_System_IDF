import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UsersDisplay from './UsersDisplay'
import TransitionPage from '../../../animation/TransitionPage'
import SoldiersClassReport from './SoldiersClassReport'
import { LuSearch } from 'react-icons/lu'
import { LiaFilterSolid } from 'react-icons/lia'
import Navbar from '../../Menu/Navbar'


function LastReports() {
  const [chosenCategory, setChosenCategory] = useState("class-of-soldiers")
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
                <input placeholder='  חיפוש משתמשים   ' className='ml-1 p-1 bg-transparent outline-none  w-[90%]' type="text" />
              </div>
              <Link className=' items-center justify-center flex border-b-2 border-[#ebebeb] dark:border-[#686868] border rounded-lg overflow-hidden' to={"/advanceSearch"}>
                <button className=' p-2 '><LiaFilterSolid className='text-2xl' /></button>
              </Link>
            </div>

            <div className='flex w-full justify-evenly items-center p-1 flex-1 rounded-lg mt-4  bg-[#e9e9e9] dark:bg-[#131313]'>
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "class-of-soldiers" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"} w-1/2 text-center p-1 rounded-lg `} id='class-of-soldiers'>דיווח מחלקתי</div>
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "soldiers" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"} w-1/2  text-center p-1 rounded-lg `} id='soldiers'>דיווח מדגם</div>
            </div>
            {chosenCategory === "soldiers" ? <UsersDisplay /> : <SoldiersClassReport />}
          </div>
        </div>



      </div>
    </TransitionPage>
  )
}

export default LastReports