import React, { useState } from 'react'
import Navbar from '../../../utils/Navbar'
import ButtonAction from '../../../utils/ButtonAction'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import TransitionPage from '../../../animation/TransitionPage';


function AdvanceSearch() {
    const animatedComponents = makeAnimated();

    const [inputs, setInputs] = useState({
        date: "",
        place: "",
        users: ""
    })

    const handleInputs = (e, key) => {
        setInputs({ ...inputs, [key]: e.map((user) => user.value) })
    }


    console.log(inputs);

    const optionsPlaces = [{ isFixed: true, label: "ים", value: "ocean" },
    { isFixed: true, label: "יבשה", value: "ש" }
    ]
    const optionsUsers = [{ isFixed: true, label: "אלי", value: "אלי" },
    { isFixed: true, label: "משה", value: "משה" }
    ]
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
                                <input onChange={(e) => setInputs({ ...inputs, "date": e.target.value })} type="date" className='w-[20px] mr-auto ' placeholder='חיפוש לפי תאריכים' />
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
                            />

                        </div>
                        <div className='divide-solid divide-y border m-4 ' ></div>
                        <ButtonAction route={"/searchResult"} title={"חיפוש"} />
                    </div>
                </div>
            </div>
        </TransitionPage>
    )
}

export default AdvanceSearch