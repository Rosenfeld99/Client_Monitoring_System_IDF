import React, { useState } from 'react'
import TransitionPage from '../../../animation/TransitionPage'
import Navbar from '../../Menu/Navbar'
import { BsPersonVcard } from 'react-icons/bs'
import CustomSelect from '../../../utils/CustomSelect/CustomSelect'
import FloatingLabelInput from '../../../utils/floatingLabelInput/FloatingLabelInput'
import { FaWindowClose } from 'react-icons/fa'
import ButtonAction from '../../../utils/ButtonAction'

const ManageUsers = () => {
    const accessOption = [
        { name: "ח", value: "חייל" },
        { name: "כ", value: "כיתה" },
        { name: "מ", value: "מחלק" },
        { name: "א", value: "אדמין" },
    ]

    const curseOption = [
        { name: "קמב", value: "קורס מכים ביסלח" },
        { name: "קשב", value: "קורס שיריון בכיר" },
    ]

    const [singlePassGrup, setSinglePassGrup] = useState(null)
    const [newUser, setNewUser] = useState({
        password: null,
        curseOption: null,
        accessOption: null,
        grupAccess: []
    })

    const updateSate = (newValue, keyToUpdate) => {
        switch (keyToUpdate) {
            case "curseOption":
                setNewUser({ ...newUser, curseOption: newValue })
                break;
            case "accessOption":
                setNewUser({ ...newUser, accessOption: newValue })
                break;

            case "password":
                setNewUser({ ...newUser, password: newValue })
                break;
            case "grupAccess":
                // await to response from server to get correct password to create reletion wetween grup
                if (singlePassGrup?.toString()?.length == 9) {
                    const updateGrupAccess = newUser?.grupAccess || []
                    updateGrupAccess?.push(newValue)
                    setNewUser({ ...newUser, grupAccess: updateGrupAccess })
                    setSinglePassGrup("")
                } else {
                    alert("משתמש לא קיים במערכת ...")
                }
                break;

            default:
                break;
        }
    }

    const handleDeletePassFromGrup = (pass) => {
        const filteredGrup = newUser.grupAccess.filter((item) => item != pass)
        setNewUser({ ...newUser, grupAccess: filteredGrup })
    }

    const validRequest = () => {
        return newUser.password && newUser.password?.toString()?.length == 9 && newUser.accessOption && newUser.curseOption
    }

    console.log(newUser);
    return (
        <TransitionPage>
            <div dir='rtl' className="flex flex-col pb-20 mx-auto w-full  min-h-screen flex-1  ">
                <Navbar />

                {/* header screen */}
                <div className=" flex items-center gap-5 justify-center">
                    <div className="flex flex-col text-center py-20">
                        <div className="self-center text-lg font-bold ">
                            הוספת משתמש
                        </div>
                        <div className="w-full text-sm text-light_neutral dark:text-dark_accent_content">
                            הגדרת נתוני משתמש
                        </div>
                    </div>
                    <div className=" text-4xl">
                        <BsPersonVcard />
                    </div>
                </div>

                {/* choose option */}
                <div className="w-64 mx-auto flex flex-col gap-10 items-center justify-center">
                    <FloatingLabelInput label={'ת"ז של משתמש'} placeholder={'ת"ז...'} state={newUser?.password}
                        setState={updateSate}
                        keyToUpdate={"password"}
                        inputType="password"
                        minLen={9}
                        maxLen={9}
                        pattern={/^\d{0,9}$/}
                    />
                    <CustomSelect labelText={"בחר קורס"} options={curseOption} placeholder="קורס..." setState={updateSate} keyToUpdate={"curseOption"} />
                    <CustomSelect labelText={"רמת הרשאה"} options={accessOption} placeholder="הרשאה..." setState={updateSate} keyToUpdate={"accessOption"} />
                    {(newUser.accessOption == "כ" || newUser.accessOption == "מ") &&
                        <React.Fragment>
                            <div className=" flex items-center gap-3 justify-center">
                                <FloatingLabelInput label={'שיוך משתמשים ( ת"ז )'} placeholder={'ת"ז...'} state={singlePassGrup}
                                    setState={setSinglePassGrup}
                                    inputType="password"
                                    minLen={9}
                                    maxLen={9}
                                    pattern={/^\d{0,9}$/}
                                />
                                <button onClick={() => updateSate(singlePassGrup, "grupAccess")} className=' flex rounded-md text-light_primary dark:text-dark_primary font-semibold justify-center px-4 py-2 bg-light_accent_content dark:bg-dark_accent_content'>שיוך</button>
                            </div>
                            <div className=" flex flex-col items-center justify-center w-full gap-3 pb-20">
                                {newUser.grupAccess.map((item, index) => (
                                    <div key={item} className="px-4 border border-dark_accent_content rounded-md relative w-full flex gap-2">
                                        <span className=' border-l pl-2 py-2'>ת"ז</span>
                                        <span className='py-2'>{item}</span>
                                        <span className=' w-6 h-6 rounded-full absolute top-0 right-0 -mt-3 -mr-3 text-light_primary dark:text-dark_primary flex items-center justify-center dark:bg-dark_accent_content bg-light_accent_content'>{index + 1}</span>
                                        <button><FaWindowClose onClick={() => handleDeletePassFromGrup(item)} className=' absolute top-0 left-0 text-4xl m-0.5 text-error' /></button>
                                    </div>
                                ))}
                            </div>
                        </React.Fragment>}
                </div>
                <div className="px-10 pt-0 pb-10 backdrop-blur-sm z-50 fixed bottom-0 w-full">
                    <ButtonAction disabledBtn={!validRequest()} title={"הוספת משתמש"} route={'/startReport'} />
                </div>
            </div>
        </TransitionPage>
    )
}

export default ManageUsers