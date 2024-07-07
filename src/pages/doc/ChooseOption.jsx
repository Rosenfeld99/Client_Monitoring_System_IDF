import { IoClose } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import ButtonAction from '../../utils/ButtonAction'
import { getSingleSystemStract } from '../../db/systemStract'
import { useContext, useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import useReports from '../../hooks/useReports'
import { ContextStore } from '../../context/ContextStore'

const ReportStart = ({ }) => {
    const navigation = useNavigate()
    const { pathname } = useLocation()
    const [currentSelect, setCurrentSelect] = useState(null)
    // const { reportDeatile } = useContext(ContextStore);

    const { inActiveIsEdit, currentUser, activeIsEdit, isEdit } = useUser()
    const { newReport, editReport } = useReports()
    const [searchParams] = useSearchParams()

    const destructureUrl = () => {
        const urlParams = {
            s: searchParams.get('s'),
            location: searchParams.get('location'),
            startTime: searchParams.get('startTime'),
            endTime: searchParams.get('endTime'),
            reportId: searchParams.get('reportId')
        };
        return urlParams
    }

    const handleStartReport = () => {
        if (!currentSelect.name || !currentSelect.value) {
            console.log("choose location and action");
            return
        }
        console.log(currentSelect);
        const date = new Date()
        if (isEdit) {
            const urlParams = destructureUrl()
            const editObj = {
                startTime: urlParams?.startTime,
                content: currentSelect?.name,
                location: currentSelect?.value,
                userId: currentUser?.userId,
                reportId: urlParams?.reportId
            }
            console.log(editObj);
            editReport(editObj)
        }
        else {
            const newReportObj = {
                startTime: date,
                content: currentSelect?.name,
                location: currentSelect?.value,
                completed: false,
                userId: currentUser?.userId
            }
            newReport(newReportObj)
        }

    }



    // console.log(pathname);

    useEffect(() => {
        if (searchParams.get('s') &&
            searchParams.get('location') &&
            searchParams.get('startTime') &&
            searchParams.get('endTime')) {
            console.log("in case");
            activeIsEdit()
        }
        else if (searchParams.get('report')) {
            console.log(searchParams.get('report'));
        }
    }, [searchParams, isEdit])

    const innerIcon = () => {
        return getSingleSystemStract(pathname?.split('/')[2]).icon
    }

    function InnerListOPtionByStarct() {
        const current = getSingleSystemStract(pathname?.split('/')[2])
        return (
            <div className=" flex flex-col items-center w-full justify-center mt-60 ">
                {current.listOption?.map((item, index) => (
                    <button onClick={() => setCurrentSelect(item)} key={index} className=" flex w-full flex-col items-center justify-center gap-2 border-b-2 border-[#ebebeb] dark:border-[#686868]">
                        <div className={`text-lg font-bold flex items-start justify-start w-full p-4 px-6 ${currentSelect == item && "text-light_accent bg-slate-100 dark:bg-[#121212]"}`}>{item?.name}</div>
                    </button>
                ))}
            </div>
        )
    }
    //,navigation(`${pathname}?location=${item.name}`)}
    return (
        <TransitionPage>

            <div dir='rtl' className=" flex flex-col overflow-hidden pb-10 mx-auto w-full min-h-screen flex-1">
                <div className=" fixed top-0 right-0 min-h-8 flex-row-reverse flex gap-5 items-center justify-between px-4 py-2 w-full text-2xl font-semibold tracking-tight leading-9 text-center z-50 text-white shadow-md shadow-[#0000003d]">
                    <button>
                        <IoClose className='text-4xl' onClick={() => navigation('/startReport')} />
                    </button>
                    <button>
                        <FaArrowRight className='text-2xl' onClick={() => navigation(-1)} />
                    </button>
                </div>
                <div className="flex w-full p-12 h-62 fixed top-0 right-0 pt-20 gradient-bg-dark gradient-bg-light shadow-md shadow-slate-400 flex-col text-center gap-3 dark:shadow-[#000000]">
                    <div className="mx-auto w-fit text-4xl text-white">
                        {innerIcon()}
                    </div>
                    <div dir='ltr' className="self-center text-lg font-bold text-black">
                        {searchParams.get('report') == "grup" ? "דיווח מחלקתי" : isEdit ? "? 29/6 איפה הייתם ביום" : "איפה תהיו היום בשעה 11:00"}
                    </div>
                    <div className="w-full text-sm text-zinc-800">
                        {searchParams.get('report') == "grup" ? "הזנת משימה עבור מחלקה : )" : isEdit ? "אתם עורכים דיווח :)" : "הזן את המשימה הקרובה שלך :)"}
                    </div>
                </div>


                {/* List option */}
                <InnerListOPtionByStarct />
                {/* if is edit do inactive for global state */}
                <div onClick={handleStartReport} className="px-10 pt-0 pb-10 backdrop-blur-sm z-50 fixed bottom-0 w-full">
                    {/* <ButtonAction disabledBtn={!currentSelect} title={isEdit ? "עריכה דיווח" : " שלח דיווח"} route={isEdit ? '/startReport' : '/endReport'} /> */}
                    <ButtonAction disabledBtn={!currentSelect} title={isEdit ? "עריכה דיווח" : " שלח דיווח"} />

                </div>
            </div>
        </TransitionPage>
    )
}

export default ReportStart