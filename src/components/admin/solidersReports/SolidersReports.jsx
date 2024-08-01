import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TransitionPage from '../../../animation/TransitionPage'
import SoldiersClassReport from './SoldiersClassReport'
import SolidersSample from './SolidersSample'
import { reportListUsers } from '../../../db/reportsList'
import CommandLastReports from './CommandLastReports'
import Navbar from '../../Menu/Navbar'
import useUser from '../../../hooks/useUser'


function LastReports() {
  const [chosenCategory, setChosenCategory] = useState("class-of-soldiers")
  const [usersSelected, setUsersSelected] = useState([]);
  const [usersSearch, setUsersSearch] = useState(reportListUsers?.users);
  const [searchParams] = useSearchParams()
  const { currentUser } = useUser()


  const handleSearch = (e) => {
    const temp = reportListUsers.users.filter((user) => user.username.includes(e.target.value))
    setUsersSearch(temp)
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  return (
    <TransitionPage>
      <div dir='rtl' className="flex flex-col  mx-auto w-full min-h-screen flex-1  ">

        <Navbar />
        <div className='w-[100vw] px-5 mt-20'>
          <div className='flex justify-center pb-4 items-center flex-col '>
            <div className=" text-lg font-bold whitespace-nowrap">
              שלום {currentUser?.username}
            </div>
            <div className=" text-sm whitespace-nowrap">
              {(currentUser?.role == "manager") ? "דיווח כיתה/מדגם" : "דיווח מחלקה"}
            </div>
          </div>
          <div className='flex w-full justify-evenly items-center p-1 flex-1 rounded-lg mt-4  bg-[#e9e9e9] dark:bg-[#131313]'>
            <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "class-of-soldiers" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"} w-1/2 text-center py-1 rounded-lg  cursor-pointer`} id='class-of-soldiers'>{currentUser?.role == "admin" ? "דיווח מחלקתי" : "דיווח כיתה"}</div>
            {(currentUser?.role == "manager") && <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "soldiers" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"} w-1/2  text-center py-1 rounded-lg cursor-pointer `} id='soldiers'>דיווח מדגם</div>}
            <div onClick={(e) => setChosenCategory(e.target.id)} className={`${chosenCategory === "historyReports" && "bg-light_primary dark:bg-dark_accent_content text-light_primary_content dark:text-dark_primary font-semibold"} w-1/2  text-center py-1 rounded-lg  cursor-pointer`} id='historyReports'>היסטוריה</div>
          </div>

          {chosenCategory === "soldiers" ? <SolidersSample usersToDisplay={usersSearch} usersSelected={usersSelected} setUsersSelected={setUsersSelected} setChosenCategory={setChosenCategory} /> : chosenCategory === "historyReports" ? <CommandLastReports setChosenCategory={setChosenCategory}/> : <SoldiersClassReport usersSelected={usersSelected} />}
        </div>
      </div>
    </TransitionPage>
  )
}

export default LastReports