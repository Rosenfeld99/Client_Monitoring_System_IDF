import { IoClose } from 'react-icons/io5'
import TransitionPage from '../../animation/TransitionPage'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import ButtonAction from '../../utils/ButtonAction'
import { getSingleSystemStract } from '../../db/systemStract'
import { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { getCurrentTime } from '../../utils/func/generateId'

const ReportStart = ({ }) => {
    const navigation = useNavigate()
    const { pathname } = useLocation()
    // console.log(pathname?.split('/')[2]);
    const [currentSelect, setCurrentSelect] = useState(null)
    const { inActiveIsEdit, activeIsEdit, isEdit } = useUser()

    const handleStartReport = () => {

    }

    const [searchParams] = useSearchParams()

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


    const processText = (text) => {
        // Regular expression to match text inside parentheses
        const regex = /\(([^)]+)\)/g;
        let result = [];
        let lastIndex = 0;

        text.replace(regex, (match, p1, offset) => {
            // Push the text before the match
            result.push(text.slice(lastIndex, offset));
            // Push the matched text wrapped in a span
            result.push(<span className="text-sm px-2 ">{`(${p1})`}</span>);
            lastIndex = offset + match.length;
        });

        // Push the remaining text
        result.push(text.slice(lastIndex));
        return result;
    };

    function InnerListOPtionByStarct() {
        const current = getSingleSystemStract(pathname?.split('/')[2])
        return (
            <div dir='rtl' className="flex flex-col items-center w-full justify-center mt-60 pb-20">
                {current.listOption?.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentSelect(item);
                            navigation(`${pathname}?location=${item.name}&report=${searchParams.get('report')}`);
                        }}
                        className="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-[#ebebeb] dark:border-[#686868]"
                    >
                        <div className={`text-lg font-bold flex items-center justify-start w-full p-4 px-6 ${currentSelect === item && "text-light_accent bg-slate-100 dark:bg-[#121212]"}`}>
                            {processText(item?.name)}
                        </div>
                    </button>
                ))}
            </div>
        )
    }

    const routeingOnClick = () => {
        if (searchParams.get('access') == "manager") {
            // isEdit ? '/startReport' : `/endReport?s=${pathname?.split('/')[2]}&location=${searchParams.get('location')}`
        }
    }

    const innerTypeOfReport = (typeMsg) => {
        switch (typeMsg) {
            case "grup":
                return {
                    title: "דיווח מחלקתי",
                    description: isEdit ? " אתם עורכים דיווח מחלקה:)" : "הזנת משימה עבור מחלקה : )",
                    link: `/lastReports?end=process&s=${pathname?.split('/')[2]}&report=grup`,
                    btnText: isEdit ? "עריכה דיווח" : 'שלח דיווח'
                }
            case "tests":
                return {
                    title: "דיווח מדגם",
                    description: isEdit ? " אתם עורכים דיווח מדגם:)" : "הזנת משימה עבור מדגם : )",
                    link: isEdit ? `/lastReports?end=complate&report=tests` : `/lastReports?end=process&s=${pathname?.split('/')[2]}&report=tests`,
                    btnText: isEdit ? "עריכה דיווח" : 'שלח דיווח'
                }
            default:
                return {
                    title: isEdit ? "עריכת דיווח" : "דיווח חדש",
                    description: isEdit ? "? 29/6 איפה הייתם ביום" : `איפה תהיו היום בשעה ${getCurrentTime()}`,
                    link: isEdit ? '/startReport' : `/endReport?s=${pathname?.split('/')[2]}&location=${searchParams.get('location')}`,
                    btnText: isEdit ? "עריכה דיווח" : 'שלח דיווח'
                }
        }
    }

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
                    <div className="self-center text-lg font-bold text-black">
                        {innerTypeOfReport(searchParams.get('report')).title}
                    </div>
                    <div dir='ltr' className="w-full text-sm text-zinc-800">
                        {innerTypeOfReport(searchParams.get('report')).description}
                    </div>
                </div>


                {/* List option */}
                <InnerListOPtionByStarct />
                {/* if is edit do inactive for global state */}
                <div className="px-10 pt-0 pb-10 backdrop-blur-sm z-50 fixed bottom-0 w-full">
                    <ButtonAction disabledBtn={!currentSelect} title={innerTypeOfReport(searchParams.get('report')).btnText} route={innerTypeOfReport(searchParams.get("report")).link} />
                </div>
            </div>
        </TransitionPage>
    )
}

export default ReportStart