import React, { useState } from 'react'
import BACKPAPER from "/backPaper.png"
import Navbar from '../../utils/Navbar'
import ButtonAction from '../../utils/ButtonAction'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import FloatingLabelInput from '../../utils/floatingLabelInput/FloatingLabelInput'

const ReportEdit = () => {
  const [valueWWd, setValueWWd] = useState('')
  const [valueWMI, setValueWMI] = useState('')
  
  const handleEditReport = () =>{
        
  }

  return (
    <TransitionPage>
      <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full bg-white min-h-screen flex-1  ">

        <Navbar />
        <div className="flex gap-3 self-center px-5 mt-8 text-xs leading-5 text-center text-black">
          <IoCheckmarkCircleOutline className='text-xl' />
          <div className="grow my-auto">
            הגש את הדיווח שלך :)
            <span className="font-semibold text-black">מטווחים</span> בשעה{" "}
            <span className="font-semibold text-black">8:00</span>{" "}
          </div>
        </div>
        <img
          loading="lazy"
          srcSet={BACKPAPER}
          className="mt-20 w-full max-w-[700px] max-h-[700px] absolute top-20 aspect-[0.72] stroke-[5px] stroke-neutral-200 stroke-opacity-40"
        />
        <div className=" z-40 flex flex-col justify-center text-sm items-center leading-5 h-full flex-1 text-right max-w-[327px] mx-auto w-full text-zinc-500">
          <div className="flex flex-col text-center leading-[150%] pb-10">
            <div className="self-center text-lg font-semibold text-black">
              עריכת דיווח
            </div>
            <div className="w-full text-sm text-zinc-500">
              הגש ב 12:30
            </div>
          </div>
          {/*  */}
          <div className="w-full">
            {/* <div className=" relative">
              {value != "" && <label className=' absolute -top-2.5 right-2 bg-white px-2 text-gray-400'>איפה אני נמצא?</label>}
              <input onChange={(e) => setValue(e.target.value)} className="justify-center px-4 py-2 bg-white rounded-lg w-full border border-solid border-neutral-200 text-ellipsis" type="text" placeholder='איפה אני נמצא?' />
            </div> */}
            <FloatingLabelInput label={"איפה אני נמצא"} placeholder={"איפה אני נמצא"} setState={setValueWMI} state={valueWMI}/>

            <FloatingLabelInput label={"מה אני עושה?"} placeholder={"מה אני עושה?"} setState={setValueWWd} state={valueWWd}/>
            {/* <div className="justify-center px-4 py-2 mt-5 bg-white rounded-lg w-full border border-solid border-neutral-200 text-ellipsis">
              מה אני עושה?
            </div> */}
          </div>

          {/*  */}
          <div className="w-full pt-10 ">
            <div className="text-xs leading-5 py-2 text-center text-black mx-auto max-w-[286px]">
              לאחר לחיצה על{" "}
              <span className="font-bold text-black">שמירה</span>{" "}
              תעברו לדף הבית
            </div>
            {/*  */}
            <ButtonAction title="שמירה" route={`/startReport`} />
          </div>
        </div>
      </div>
    </TransitionPage>
  )
}

export default ReportEdit