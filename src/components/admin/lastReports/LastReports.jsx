import React, { useState } from 'react'
import Navbar from '../../../utils/Navbar'
import filter from "/filter.png"
import searchIcon from "/searchIcon.png"
import { Link } from 'react-router-dom'


function LastReports() {
  const [chosenCategory, setChosenCategory] = useState("last-report")
  return (
    <div>
      <Navbar />
      <div className='min-h-[85vh] flex items-center'>
        <div className='w-[100vw] px-5 mt-5'>
          <div className='flex justify-between pb-4 items-center'>
            <Link to={"/advanceSearch"}>
              <span className='border font-normal px-2 bg-[#E6E6E6]' ><button >עריכה מרובה</button></span>
            </Link>
            <span className='font-bold' >מיין משתמשים</span>
          </div>
          <div className='flex'>
            <div className='border-gray-300 rounded-lg border flex w-[90%] items-center'>
              <input dir='rtl' placeholder='  חיפוש משתמשים   ' className='ml-1 p-1 outline-none  w-[90%]' type="text" />
              <span ><img className='max-w-4' src={searchIcon} alt="" /></span>
            </div>
            <button className='ml-auto px-2 bg-[#E6E6E6]'><img className='max-w-4' src={filter} alt="" /></button>
          </div>

          <div className='flex w-full justify-evenly items-center p-1 rounded-lg mt-4 bg-[#E6E6E6] '>
            <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "search-advance" && "bg-white"} p-1 rounded-lg`} id='search-advance'>חיפוש מתקדם</div>
            <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "last-report" && "bg-white"} p-1 rounded-lg`} id='last-report'>דיווחו לאחרונה</div>
            <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "not-report" && "bg-white"} p-1 rounded-lg`} id='not-report'>לא דיווחו</div>
          </div>

          <div className=' grid grid-cols-12 gap-3 px-1 mt-5 '>
            <div className="flex w-full col-span-2 items-center justify-center font-semibold">עושה</div>
            <div className="flex w-full  col-span-3 items-center justify-center font-semibold">נמצא</div>
            <div className="flex w-full col-span-4 items-center justify-center font-semibold">דיווח אחרון</div>
            <div className="flex w-full col-span-3 items-center  justify-center font-semibold">משתמש</div>
          </div>
          <div className='divide-solid divide-y border mt-1 ' ></div>
          <div className='max-h-64 overflow-y-auto'>
            {new Array(15).fill(0).map((_, i) =>
              <div key={i} >
                <div className=' grid grid-cols-12 gap-3  p-1'>
                  <div className="flex w-full col-span-2 items-center justify-center ">עושה</div>
                  <div className="flex w-full  col-span-3 items-center justify-center ">חדר אוכל</div>
                  <div className="flex w-full col-span-4 items-center justify-center ">דיווח אחרון</div>
                  <div className="flex w-full col-span-3 items-center  justify-center ">משתמש</div>
                </div>
                <div className='divide-solid divide-y border mt-1 ' ></div>
              </div>
            )}
          </div>



        </div>
      </div>



    </div>
  )
}

export default LastReports