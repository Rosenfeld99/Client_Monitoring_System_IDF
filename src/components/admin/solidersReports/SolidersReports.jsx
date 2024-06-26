import React, { useState } from 'react'
import Navbar from '../../../utils/Navbar'
import filter from "/filter.png"
import searchIcon from "/searchIcon.png"
import { Link } from 'react-router-dom'
import UsersDisplay from './UsersDisplay'
import TransitionPage from '../../../animation/TransitionPage'
import SoldiersClassReport from './SoldiersClassReport'


function LastReports() {
  const [chosenCategory, setChosenCategory] = useState("class-of-soldiers")
  return (
    <TransitionPage>
      <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full bg-white min-h-screen flex-1  ">

        <Navbar />
        <div className='h-full flex-1 flex items-center'>
          <div className='w-[100vw] px-5 mt-5'>
            <div className='flex justify-center pb-4 items-center'>
              <span className='font-bold' >מיין משתמשים</span>
            </div>
            <div className='flex flex-row-reverse'>
              <div className='border-gray-300 pr-3 rounded-lg border flex w-[90%] '>
                <input placeholder='  חיפוש משתמשים   ' className='ml-1 p-1 outline-none  w-[90%]' type="text" />
                <span className='flex items-center' ><img className='max-w-4' src={searchIcon} alt="" /></span>
              </div>
              <Link className=' ml-1 flex rounded-lg overflow-hidden' to={"/advanceSearch"}>
                <button className='ml-auto px-2 bg-[#E6E6E6]'><img className='max-w-4' src={filter} alt="" /></button>
              </Link>
            </div>

            <div className='flex w-full justify-evenly items-center p-1 flex-1 rounded-lg mt-4 bg-[#E6E6E6] '>
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "class-of-soldiers" && "bg-white"} w-1/2 text-center p-1 rounded-lg `} id='class-of-soldiers'>דיווח מחלקתי</div>
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "soldiers" && "bg-white"} w-1/2  text-center p-1 rounded-lg `} id='soldiers'>עריכת מדגם</div>
            </div>
            {chosenCategory === "soldiers" ? <UsersDisplay /> : <SoldiersClassReport />}
          </div>
        </div>



      </div>
    </TransitionPage>
  )
}

export default LastReports