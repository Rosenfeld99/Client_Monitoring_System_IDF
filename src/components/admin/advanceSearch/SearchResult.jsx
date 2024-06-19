import React from 'react'
import Navbar from '../../../utils/Navbar'
import UsersDisplay from '../solidersReports/UsersDisplay'

function SearchResult() {
    return (
        <  >
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

                        <p>
                            :תאריך
                        </p>
                        <p>
                            :מקומות
                        </p>
                        <p>
                            :אנשים
                        </p>
                    </div>
                </div>

                <UsersDisplay />

            </div>
        </>
    )
}

export default SearchResult