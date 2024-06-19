import React, { useState } from 'react'
import Navbar from '../../../utils/Navbar'
import filter from "/filter.png"
import searchIcon from "/searchIcon.png"
import { Link } from 'react-router-dom'
import UsersDisplay from './UsersDisplay'
import NotReports from './NotReport'
import TransitionPage from '../../../animation/TransitionPage'


function LastReports() {
  const [chosenCategory, setChosenCategory] = useState("last-report")
  return (
    <TransitionPage>
      <div>
        <div dir='rtl'>

          <Navbar />
        </div>
        <div className='min-h-[85vh] flex items-center'>
          <div className='w-[100vw] px-5 mt-5'>
            <div className='flex justify-center pb-4 items-center'>
              <span className='font-bold' >מיין משתמשים</span>
            </div>
            <div className='flex'>
              <div className='border-gray-300 rounded-lg border flex w-[90%] items-center'>
                <input dir='rtl' placeholder='  חיפוש משתמשים   ' className='ml-1 p-1 outline-none  w-[90%]' type="text" />
                <span ><img className='max-w-4' src={searchIcon} alt="" /></span>
              </div>
              <Link className=' ml-1  flex' to={"/advanceSearch"}>
                <button className='ml-auto px-2 bg-[#E6E6E6]'><img className='max-w-4' src={filter} alt="" /></button>
              </Link>
            </div>

            <div className='flex w-full justify-evenly items-center p-1 rounded-lg mt-4 bg-[#E6E6E6] '>
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "last-report" && "bg-white"} px-4 p-1 rounded-lg `} id='last-report'
              >דיווחו לאחרונה</div>
              <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "not-report" && "bg-white"} px-4 p-1 rounded-lg `} id='not-report'>לא דיווחו</div>
            </div>
            {chosenCategory === "not-report" ? <NotReports /> : <UsersDisplay />}
          </div>
        </div>



      </div>
    </TransitionPage>
  )
}

export default LastReports