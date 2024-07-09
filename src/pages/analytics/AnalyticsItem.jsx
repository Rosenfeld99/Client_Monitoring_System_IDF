import React, { useState } from 'react'
import ChartPei from '../../utils/Charts/ChartPei'
import Navbar from '../../components/Menu/Navbar'
import TransitionPage from '../../animation/TransitionPage'
import { RiArrowLeftWideFill, RiFileExcel2Line } from 'react-icons/ri'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SYSTEMSTRACT } from '../../db/systemStract'
import CustomSelect from '../../utils/CustomSelect/CustomSelect'
import ButtonAction from '../../utils/ButtonAction'
import { HiOutlineDownload } from 'react-icons/hi'

const AnalyticsStract = () => {
    const [searchParams] = useSearchParams()
    const accessOption = [
        { name: "ח", value: "חייל" },
        { name: "כ", value: "כיתה" },
        { name: "מ", value: "מחלק" },
    ]

    const curseOption = [
        { name: "קמב", value: "קורס מכים ביסלח" },
        { name: "קשב", value: "קורס שיריון בכיר" },
    ]

    const dataPoints = [
        { y: 25, label: "מחוץ לבסיס" },
        { y: 70, label: "בסיס" },
        { y: 5, label: "שטח" },
    ]

    const createStractForPei = () => {
        const createDataPoints = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

        }
    }




    const getCategoryDataPoints = (categories, value) => {
        const category = categories.find(category => category.value === value);

        if (!category) {
            return [];
        }

        return category.listOption.map(option => ({ y: option.y, label: option.name }));
    }

    console.log(getCategoryDataPoints(SYSTEMSTRACT, "home"));

    const [dataDiving, setDataDiving] = useState({ access: searchParams.get('access') || "", curs: searchParams.get('curs') || "" })

    const navigation = useNavigate()

    const updateSate = (newValue, keyToUpdate) => {
        switch (keyToUpdate) {
            case "curseOption":
                setDataDiving({ ...dataDiving, curs: newValue })
                break;
            case "accessOption":
                setDataDiving({ ...dataDiving, access: newValue })
                break;
            default:
                break;
        }
    }

    console.log(dataDiving);

    const title = <span className=' flex items-center justify-center gap-2'><HiOutlineDownload /> הורדה לאקסל</span>

    return (
        <TransitionPage>
            <div dir='rtl' className=" flex flex-col overflow-hidden relative pb-20 mx-auto w-full min-h-screen flex-1">
                <Navbar />
                <div className="my-auto h-full">
                    <div className=" shadow-md border-[1px] rounded-2xl p-5 m-5 overflow-hidden">
                        <div className=" flex items-center justify-between gap-3">
                            <CustomSelect layer={'z-40'} defaultValue={searchParams.get('access')} labelText={"משתמש"} options={accessOption} placeholder="משתמש..." setState={updateSate} keyToUpdate={"accessOption"} />
                            <CustomSelect layer={'z-40'} defaultValue={searchParams.get('curs')} labelText={"קורס"} options={curseOption} placeholder="קורס..." setState={updateSate} keyToUpdate={"curseOption"} />
                        </div>
                        <ChartPei dataPoints={getCategoryDataPoints(SYSTEMSTRACT, "home")} />
                    </div>
                    {/* <div className={` flex items-center gap-5 justify-center m-5 text-nowrap font-semibold`}>{SYSTEMSTRACT?.map((item, index) => (
                        <button disabled={dataDiving?.access == "" && dataDiving?.curs == ""} onClick={() => { navigation(`/analytics/${item?.value}?access=${dataDiving?.access}&curs=${dataDiving?.curs}`) }} key={index} className={` w-full p-3 ${dataDiving?.access == "" && dataDiving?.curs == "" && " opacity-50 cursor-not-allowed"} rounded-lg flex items-center justify-center flex-row-reverse ${item.color}`}><RiArrowLeftWideFill /> {item?.name}</button>
                    ))}</div> */}
                </div>
                <div className="px-5 pt-0 pb-10 backdrop-blur-sm z-50 fixed bottom-0 w-full">
                    <ButtonAction className="bg-[#127941]" disabledBtn={false} title={title} route={''} />
                </div>
            </div>
        </TransitionPage>
    )
}

export default AnalyticsStract