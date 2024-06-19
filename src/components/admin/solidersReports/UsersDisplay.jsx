import React, { useState } from 'react'


const DisplayUser = () => {
    const [chooseReport, setChooseReport] = useState(false)
    return (<>
        <div onClick={() => setChooseReport(!chooseReport)} className={` ${chooseReport && 'bg-[#e9f6fd] border-[1px]  border-[#62bcee] rounded-lg'} min-h-10 grid grid-cols-12 my-1 gap-3 py-1 `} >
            <div className="flex w-full col-span-2 items-center justify-center ">עושה</div>
            <div className="flex w-full  col-span-3 items-center justify-center ">חדר אוכל</div>
            <div className="flex w-full col-span-4 items-center justify-center ">דיווח אחרון</div>
            <div className="flex w-full col-span-3 items-center  justify-center ">משתמש</div>
        </div>
        <div className='divide-solid divide-y border  ' ></div>
    </>)
}




function UsersDisplay() {
    return (
        <div className='w-full'> <div className=' grid grid-cols-12 gap-3 px-1 mt-5  '>
            <div className="flex w-full col-span-2 items-center justify-center font-semibold">עושה</div>
            <div className="flex w-full  col-span-3 items-center justify-center font-semibold">נמצא</div>
            <div className="flex w-full col-span-4 items-center justify-center font-semibold">דיווח אחרון</div>
            <div className="flex w-full col-span-3 items-center  justify-center font-semibold">משתמש</div>
        </div>
            <div className='divide-solid divide-y border mt-1 ' ></div>
            <div className='  max-h-64 overflow-y-auto'>
                {new Array(15).fill(0).map((_, i) =>
                    <div key={i}>
                        <DisplayUser key={i} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UsersDisplay