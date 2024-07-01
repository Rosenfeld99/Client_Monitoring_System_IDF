import React from 'react'
import UsersDisplay from '../solidersReports/UsersDisplay'
import TransitionPage from '../../../animation/TransitionPage'
import { BsCalendarDate } from 'react-icons/bs'
import { LiaPlaceOfWorshipSolid } from 'react-icons/lia'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import Navbar from '../../Menu/Navbar'

function SearchResult() {
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
                            <span dir='rtl' className='font-normal mr-1'>יחדחגח</span>
                            :תאריך
                            <BsCalendarDate className='ml-2 inline-block' />
                        </div>
                        <div className='mb-1 font-bold'>
                            <span dir='rtl' className='font-normal mr-1'>ידגבחדג</span>
                            :מקומות
                            <LiaPlaceOfWorshipSolid className=' inline-block' />
                        </div>
                        <div className='mb-1 font-bold'>
                            <span dir='rtl' className='font-normal mr-1'>יחח</span>
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