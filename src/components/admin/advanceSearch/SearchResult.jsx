import React from 'react'
import Navbar from '../../../utils/Navbar'
import UsersDisplay from '../solidersReports/UsersDisplay'
import TransitionPage from '../../../animation/TransitionPage'
import { BsCalendarDate } from 'react-icons/bs'
import { LiaPlaceOfWorshipSolid } from 'react-icons/lia'
import { MdOutlinePeopleAlt } from 'react-icons/md'

function SearchResult() {
    return (
        <TransitionPage  >
            <div dir='rtl'>
                <Navbar />
            </div>
            <div className='min-h-[85vh]  flex-col flex justify-center items-center'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-xl'>תוצאות חיפוש מתקדם</h1>
                    <p>
                        לפי
                    </p>
                    <div className='ml-auto'>
                        <div className='items-center flex'>

                            :תאריך
                            <BsCalendarDate className='ml-2' />

                        </div>
                        <div className='items-center flex'>

                            :מקומות
                            <LiaPlaceOfWorshipSolid />

                        </div>
                        <div className='items-center flex'>


                            :אנשים
                            <MdOutlinePeopleAlt className='ml-2' />
                        </div>
                    </div>
                </div>
                <div className='mx-1'>

                    <UsersDisplay />
                </div>

            </div>
        </TransitionPage>
    )
}

export default SearchResult