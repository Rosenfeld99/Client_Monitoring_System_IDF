import React, { useState } from 'react'
import Navbar from '../../../utils/Navbar'
import ButtonAction from '../../../utils/ButtonAction'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import TransitionPage from '../../../animation/TransitionPage';
import { reportListUsers } from '../../../db/reportsList';
import { UserContextProvider } from '../../../context/UserContext';


function AdvanceSearch() {
    const animatedComponents = makeAnimated();
    const { advanceSearchResults, setAdvanceSearchResults } = UserContextProvider()

    const [inputs, setInputs] = useState({
        date: "",
        place: [],
        missions: [],
        users: []
    })

    const handleInputs = (e, key) => {
        setInputs({ ...inputs, [key]: e.map((user) => user.value) })
    }


    const optionsPlaces = [{ isFixed: true, label: "בסיס", value: "בסיס" },
    { isFixed: true, label: "בית", value: "בית" },
    { isFixed: true, label: "שטח", value: "שטח" },
    { isFixed: true, label: "שונות", value: "שונות" },
    ]
    const optionsMissions = [{ isFixed: true, label: "מטבח", value: "מטבח" },
    { isFixed: true, label: "תפילה", value: "תפילה" }
    ]
    const optionsUsers = [{ isFixed: true, label: "אליהו מאיר", value: "אליהו מאיר" },
    { isFixed: true, label: "נהוראי עטיה", value: "נהוראי עטיה" }
    ]


    const handleSearch = () => {
        const usersFillter = reportListUsers.users.filter((user) => inputs.users.includes(user.username))


        const results = [];
        const chosenDate = inputs?.date.split("-").reverse().join("/");
        for (let index = 0; index < usersFillter.length; index++) {
            // filter with the palace and the missions
            const reports = usersFillter[index]?.reports[0]?.dates[chosenDate]?.filter((report) => inputs.place.includes(report.location) && inputs.missions.includes(report.content))
            if (reports[0]) {
                results.push({ date: chosenDate, name: user.username, lastsReports: reports })
            }

        }
        setAdvanceSearchResults(results)
    }
    const checkInputs = () => {
        if (!inputs.date || !inputs.missions[0] || !inputs.place[0] || !inputs.users[0]) {
            alert("מלא את כל הנתונים")
            return false
        }
        return true
    }

    return (
        <TransitionPage>
            <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full bg-white min-h-screen flex-1  ">
                <Navbar />
                <div className='min-h-[85vh] items-center flex'>
                    <div className='w-[100vw] px-5 '>
                        <div className='flex flex-col items-center w-full justify-center'>
                            <span className='font-bold'>דיווחים אחרונים</span>
                            <span>לפי</span>

                        </div>
                        <div dir='rtl' className='min-h-52 w-full flex flex-col justify-evenly items-center '>
                            <div className='flex border p-1 w-full'>
                                {inputs.date ? inputs?.date?.split('-').reverse().join('-') : "חיפוש לפי תאריכים"}
                                <input onChange={(e) => setInputs({ ...inputs, "date": e.target.value })} type="date" className='w-[20px] mr-auto ' required={true} placeholder='חיפוש לפי תאריכים' />
                            </div>

                            <Select
                                classNamePrefix="select"
                                className=' w-full '
                                name="color"
                                components={animatedComponents}
                                isMulti
                                closeMenuOnSelect={false}
                                placeholder="חיפוש לפי מקומות"
                                options={optionsPlaces}
                                onChange={(e) => handleInputs(e, "place")}
                                required={true}

                            />
                            <Select
                                classNamePrefix="select"
                                className=' w-full '
                                name="color"
                                components={animatedComponents}
                                isMulti
                                closeMenuOnSelect={false}
                                placeholder="חיפוש לפי משימות"
                                options={optionsMissions}
                                onChange={(e) => handleInputs(e, "missions")}
                                required={true}

                            />
                            <Select
                                components={animatedComponents}
                                isMulti
                                className=' w-full '
                                closeMenuOnSelect={false}
                                name="color"
                                placeholder="חיפוש לפי משתמשים"
                                options={optionsUsers}
                                onChange={(e) => handleInputs(e, "users")}
                                required={true}
                            />

                        </div>
                        <div className='divide-solid divide-y border m-4 ' ></div>
                        <div onClick={handleSearch}>
                            <ButtonAction route={checkInputs && "/searchResult"} title={"חיפוש"} />
                        </div>
                    </div>
                </div>
            </div>
        </TransitionPage>
    )
}

export default AdvanceSearch