import React from 'react'
import { SYSTEMSTRACT } from '../../../db/systemStract'
import { useNavigate } from 'react-router-dom'
import { user } from '../../../db/reportsList'
import { GoPeople, GoPerson } from 'react-icons/go'

function CommandLastReports() {
    const navigation = useNavigate()
    return (
        <div dir='rtl' className='mt-7 w-full h-full flex flex-col flex-1'>
            <div className=' border-b-2  border-transparent ' ></div>
            <div className='  h-[45vh] overflow-y-auto mt-6 px-1 '>
                {console.log(user)}
                {user?.lastDayReports?.map((item, index) => (
                    // adding start and last time

                    <div key={index}
                        className="p-2 my-1 rounded-lg text-md w-full border-2 border-gray-200 dark:border-dark_accent_content font-normal text-gray-500">
                        <div className=" grid grid-cols-12 items-center w-full  justify-center">
                            <div className='col-span-2' >{item?.location}</div>
                            <div className='col-span-3' >{item?.content}</div>
                            <div className='col-span-3' >נהוראי</div>
                            <div className="col-span-2 flex items-center text-sm text-gray-500 gap-2">
                                <div >{item?.startTime}</div>{"-"}
                                <div >{item?.endTime}</div>
                            </div>
                            <div className='col-span-2 mr-auto'><GoPeople /> <GoPerson /></div>
                        </div>
                    </div>
                ))}



            </div>

        </div >
    )
}

export default CommandLastReports