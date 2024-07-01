import React, { useContext } from 'react'
import Navbar from '../../../utils/Navbar'
import UsersDisplay from '../solidersReports/UsersDisplay'
import TransitionPage from '../../../animation/TransitionPage'
import { BsCalendarDate, BsListTask } from 'react-icons/bs'
import { LiaPlaceOfWorshipSolid } from 'react-icons/lia'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { UserContextProvider } from '../../../context/UserContext'
import useUser from '../../../hooks/useUser'
import { ContextStore } from '../../../context/ContextStore'

function SearchResult() {
    const { advanceSearchResults } = useUser()
    const { searchInputs } = useContext(ContextStore);
    console.log(searchInputs);

    return (
        <TransitionPage  >
            <div dir='rtl'>
                <Navbar />
            </div>
            <div className='min-h-[85vh]  flex-col flex justify-center items-center'>
                <div className='w-full flex mr-1  flex-col items-center justify-center'>
                    <h1 className='font-bold text-xl'>תוצאות חיפוש מתקדם</h1>
                    <p>
                        לפי
                    </p>
                    <div className='w-[90vw] items-end flex flex-col'>
                        <div className='mb-1 font-bold'>
                            <span dir='rtl' className='font-normal mr-1'>{searchInputs?.date + " "}</span>
                            :תאריך
                            <BsCalendarDate className='ml-2 inline-block' />
                        </div>
                        <div className='mb-1 font-bold'>
                            <span dir='rtl' className='font-normal mr-1'>  {searchInputs?.place + " "}</span>
                            :מקומות
                            <LiaPlaceOfWorshipSolid className=' inline-block' />
                        </div>
                        <div className='mb-1 font-bold'>
                            <span dir='rtl' className='font-normal mr-1'>{searchInputs?.missions.length > 4 ? <details className='relative inline-block'> <summary>{searchInputs.missions.slice(0, 4).join(",") + "..."}</summary><span className='absolute p-1 bg-white right-full'>{searchInputs.missions.slice(4).join(",")}</span> </details> : searchInputs?.missions + " "}</span>

                            :משימות
                            <BsListTask className='ml-[1px] inline-block' />
                        </div>
                        <div className='mb-1 font-bold'>
                            <span dir='rtl' className='font-normal mr-1'>{searchInputs?.users.length > 3 ? <details className='relative inline-block'> <summary>{searchInputs.users.slice(0, 3).join(",") + "..."}</summary><span className='absolute p-1 bg-white right-full'>{searchInputs.users.slice(4).join(",")}</span> </details> : searchInputs?.users + " "}</span>
                            :אנשים
                            <MdOutlinePeopleAlt className='ml-2 inline-block' />
                        </div>
                    </div>
                </div>
                <div className='m-4 w-[90vw] px-3 border '>
                    <UsersDisplay />
                </div>

            </div>
        </TransitionPage>
    )
}

export default SearchResult