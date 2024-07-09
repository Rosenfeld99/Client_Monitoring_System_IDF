import React, { useState } from 'react'
import ChartPei from '../../utils/Charts/ChartPei'
import Navbar from '../../components/Menu/Navbar'
import TransitionPage from '../../animation/TransitionPage'
import { RiArrowLeftWideFill } from 'react-icons/ri'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SYSTEMSTRACT } from '../../db/systemStract'
import CustomSelect from '../../utils/CustomSelect/CustomSelect'

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

    const transformToDataPoints = (categories) => {

        const dataPoints = [];
        for (let index = 0; index < categories.length; index++) {
            const element = categories[index];
            dataPoints.push({ y: element.y, label: element.name })
        }
        return dataPoints
    }


    console.log(transformToDataPoints(SYSTEMSTRACT));

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
                        <ChartPei dataPoints={transformToDataPoints(SYSTEMSTRACT) || []} />
                    </div>
                    <div className={` flex items-center gap-5 justify-center m-5 text-nowrap font-semibold`}>{SYSTEMSTRACT?.map((item, index) => (
                        <button disabled={dataDiving?.access == "" && dataDiving?.curs == ""} onClick={() => { navigation(`/analytics/${item?.value}?access=${dataDiving?.access}&curs=${dataDiving?.curs}`) }} key={index} className={` w-full p-3 ${dataDiving?.access == "" && dataDiving?.curs == "" && " opacity-50 cursor-not-allowed"} rounded-lg flex items-center justify-center flex-row-reverse ${item.color}`}><RiArrowLeftWideFill /> {item?.name}</button>
                    ))}</div>
                </div>
            </div>
        </TransitionPage>
    )
}

export default AnalyticsStract