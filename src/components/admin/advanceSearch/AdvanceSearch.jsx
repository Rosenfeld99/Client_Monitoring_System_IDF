import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Menu/Navbar'
import ButtonAction from '../../../utils/ButtonAction'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import TransitionPage from '../../../animation/TransitionPage';
import { reportListUsers } from '../../../db/reportsList';

import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { ContextStore } from '../../../context/ContextStore';

import useTheme from '../../../hooks/useTheme';

const optionsPlaces = [{ isFixed: true, label: "בסיס", value: "בסיס" },
{ isFixed: true, label: "בית", value: "בית" },
{ isFixed: true, label: "שטח", value: "שטח" },
{ isFixed: true, label: "שונות", value: "שונות" },
]

function AdvanceSearch() {
    const animatedComponents = makeAnimated();
    const { advanceSearchResults, setAdvanceSearchResults } = useUser();
    const { searchInputs, setSearchInputs } = useContext(ContextStore);
    const [theme, toggleTheme] = useTheme();
    const navigate = useNavigate()

    // custom style for react select component
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent', // Make background transparent
            color: theme === "light" ? "black" : "white",
            borderColor: theme === "light" ? "#ccc" : "#444", // Adjust border color
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === "light" ? "white" : "#444", // Adjust menu background
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'transparent' : state.isSelected ? 'transparent' : 'transparent',
            color: theme === "light" ? (state.isSelected ? "black" : "black") : (state.isSelected ? "white" : "white"),
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: theme === "light" ? "#ddd" : "#555", // Adjust selected value background color
            color: theme === "light" ? "black" : "white", // Adjust selected value text color

        }),
        placeholder: (provided) => ({
            ...provided,
            color: theme === "light" ? "black" : "white", // Adjust placeholder color
        }),
    };

    useEffect(() => {
        setAdvanceSearchResults([])
    }, [])

    const handleInputs = (e, key) => {
        setSearchInputs({ ...searchInputs, [key]: e.map((user) => user.value) })
    }


    const optionsMissions = [{ isFixed: true, label: "מטבח", value: "מטבח" },
    { isFixed: true, label: "תפילה", value: "תפילה" }
    ]






    const optionsUsers = reportListUsers.users.map((user) => { return { isFixed: true, label: user.username, value: user.username } })

    const handleSearch = () => {
        if (!checkInputs()) {
            return
        }
        const usersFillter = reportListUsers.users.filter((user) => searchInputs.users.includes(user.username))
        const results = [];
        const chosenDate = searchInputs?.date.split("-").reverse().join("/");
        for (let index = 0; index < usersFillter.length; index++) {
            // filter with the palace and the missions

            const reports = usersFillter[index]?.reports[0]?.dates[chosenDate]?.filter((report) => searchInputs.place.includes(report.location) && searchInputs.missions.includes(report.content))
            if (reports?.length > 0) {
                results.push({ date: chosenDate, name: usersFillter[index].username, lastsReports: reports })
            }
        }
        setAdvanceSearchResults(results)
        navigate("/searchResult")
    }

    const checkInputs = () => {
        if (!searchInputs.date || !searchInputs.missions[0] || !searchInputs.place[0] || !searchInputs.users[0]) {
            alert("מלא את כל הנתונים")
            return false
        }
        return true
    }
    console.log(theme);
    return (
        <TransitionPage>
            <div dir='rtl' className="  flex flex-col pb-20 mx-auto w-full min-h-screen flex-1  ">
                <Navbar />
                <div className='min-h-[85vh] items-center flex'>
                    <div className='w-[100vw] px-5 '>
                        <div className='flex flex-col items-center w-full justify-center'>
                            <span className='font-bold'>דיווחים אחרונים</span>
                            <span>לפי</span>

                        </div>
                        <div dir='rtl' className='min-h-52 w-full flex flex-col justify-evenly items-center '>
                            <div className={` ${theme === "dark" && "border-[#838386]"}    flex border p-1 w-full`}>
                                {searchInputs.date ? searchInputs?.date?.split('-').reverse().join('/') : "חיפוש לפי תאריכים"}
                                <input onChange={(e) => setSearchInputs({ ...searchInputs, "date": e.target.value })} type="date" className="  w-[20px] mr-auto" required={true} placeholder='חיפוש לפי תאריכים' />
                            </div>

                            <Select
                                classNamePrefix="select"
                                className=' w-full '
                                name="color"
                                components={animatedComponents}
                                isMulti
                                closeMenuOnSelect={false}
                                blurInputOnSelect={false}
                                placeholder="חיפוש לפי מקומות"
                                options={optionsPlaces}
                                onChange={(e) => handleInputs(e, "place")}
                                required={true}
                                styles={customStyles}

                            />
                            <Select
                                classNamePrefix="select"
                                className=' w-full '
                                name="color"
                                components={animatedComponents}
                                isMulti
                                closeMenuOnSelect={false}
                                blurInputOnSelect={false}
                                placeholder="חיפוש לפי משימות"
                                options={optionsMissions}
                                onChange={(e) => handleInputs(e, "missions")}
                                required={true}
                                styles={customStyles}
                            />
                            <Select
                                classNamePrefix="select"
                                components={animatedComponents}
                                isMulti
                                className=' w-full '
                                closeMenuOnSelect={false}
                                blurInputOnSelect={false}
                                name="color"
                                placeholder="חיפוש לפי משתמשים"
                                options={optionsUsers}
                                onChange={(e) => handleInputs(e, "users")}
                                required={true}
                                styles={customStyles}
                            />

                        </div>
                        <div className='divide-solid divide-y border m-4 ' ></div>
                        <div onClick={handleSearch}>
                            <ButtonAction title={"חיפוש"} />
                        </div>
                    </div>
                </div>
            </div>
        </TransitionPage>
    )
}

export default AdvanceSearch