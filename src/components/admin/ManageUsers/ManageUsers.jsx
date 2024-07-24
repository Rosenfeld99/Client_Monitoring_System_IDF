import React, { useState } from 'react'
import TransitionPage from '../../../animation/TransitionPage'
import Navbar from '../../Menu/Navbar'
import { BsPersonVcard } from 'react-icons/bs'
import CustomSelect from '../../../utils/CustomSelect/CustomSelect'
import FloatingLabelInput from '../../../utils/floatingLabelInput/FloatingLabelInput'
import { FaWindowClose } from 'react-icons/fa'
import ButtonAction from '../../../utils/ButtonAction'
import { useToast } from '../../../utils/Toasttify/ToastManager'
import { generateID } from '../../../utils/func/generateId'
import { GrTest } from 'react-icons/gr'
import useUser from '../../../hooks/useUser'

const ManageUsers = () => {
    const { currentUser, handleManageUsers } = useUser()
    const accessOption = [
        { name: "מדגם", value: "מדגם" },
        { name: "מחלקה", value: "מחלקה" },
    ]

    const curseOption = [
        { name: "קמב", value: "קורס מכים ביסלח" },
        { name: "קשב", value: "קורס שיריון בכיר" },
    ]

    const [newUser, setNewUser] = useState({
        password: null,
        name: null,
        curseOption: null,
        accessOption: null,
        userGrup: currentUser?.userGrup || []
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
            case "name":
                setNewUser({ ...newUser, name: newValue })
                break;
            case "userGrup":
                // await to response from server to get correct password to create reletion wetween grup
                console.log(" in case");
                if (newUser?.password?.toString()?.length == 9) {
                    const updateGrupUusers = newUser?.userGrup || {}
                    updateGrupUusers?.historyList?.push({ password: newUser.password, curseOption: newUser.curseOption, accessOption: newUser.accessOption, id: generateID(), name: newUser?.name, reportsList: [] })
                    setNewUser({ ...newUser, userGrup: updateGrupUusers, password: "", name: "" })
                } else {
                    // alert(`ת"ז לא חוקית ...`)
                    showToast('error', 'שגיאה! ת"ז לא חוקית')
                }
                break;

            default:
                break;
        }
    }

    const handleDeletePassFromGrup = (pass) => {
        let filteredGrup = newUser.userGrup
        filteredGrup.historyList = filteredGrup?.historyList?.filter((item) => item != pass)
        setNewUser({ ...newUser, userGrup: filteredGrup })
    }

    const validRequest = () => {
        return newUser?.userGrup?.historyList?.length > 0
    }

    const showToast = useToast();

    console.log(newUser);
    return (
        <TransitionPage>
            <div dir='rtl' className="flex flex-col pb-72 mx-auto w-full  min-h-screen flex-1  ">
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
                <div className="w-64 mx-auto flex flex-col gap-3 items-center justify-center">
                    <FloatingLabelInput label={'ת"ז של משתמש'} placeholder={'ת"ז...'} state={newUser?.password}
                        setState={updateSate}
                        keyToUpdate={"password"}
                        inputType="password"
                        minLen={9}
                        maxLen={9}
                        pattern={/^\d{0,9}$/}
                    />
                    <FloatingLabelInput label={'שם משתמש'} placeholder={'שם...'} state={newUser?.name}
                        setState={updateSate}
                        keyToUpdate={"name"}
                        inputType="text"
                        minLen={1}
                        maxLen={20}
                    />
                    <CustomSelect labelText={"בחר קורס"} options={curseOption} placeholder="קורס..." setState={updateSate} keyToUpdate={"curseOption"} />
                    <CustomSelect labelText={"בחר קבוצה"} options={accessOption} placeholder="קבוצה..." setState={updateSate} keyToUpdate={"accessOption"} />
                    <button onClick={() => updateSate(newUser, "userGrup")} className=' flex w-full rounded-md text-light_primary dark:text-dark_primary font-semibold justify-center px-4 py-2 bg-light_accent_content dark:bg-dark_accent_content'>הוסף{newUser?.accessOption && " ל" + newUser?.accessOption}</button>
                    {newUser?.userGrup?.historyList?.length > 0 &&
                        <React.Fragment>
                            <div className=" flex flex-col items-center pt-10 justify-center w-full gap-3">
                                {newUser?.userGrup?.historyList?.map((item, index) => (
                                    <div key={item} className="px-4 border border-dark_accent_content rounded-md relative w-full flex gap-2">
                                        <span className=' border-l pl-2 py-2'>ת"ז</span>
                                        <span className='py-2'>{item?.password}</span>
                                        <span className={`${item.accessOption == "מדגם" ? "w-10" : "w-6"}  h-6 rounded-full absolute top-0 right-0 -mt-3 -mr-3 text-light_primary dark:text-dark_primary flex items-center justify-center dark:bg-dark_accent_content bg-light_accent_content`}>{index + 1}{item.accessOption == "מדגם" && <GrTest className='' />}</span>
                                        <button><FaWindowClose onClick={() => handleDeletePassFromGrup(item)} className=' absolute top-0 left-0 text-4xl m-0.5 text-error' /></button>
                                    </div>
                                ))}
                            </div>
                        </React.Fragment>}
                </div>
                <div className="px-10 pt-0 pb-10 backdrop-blur-sm z-40 fixed bottom-0 w-full">
                    <ButtonAction disabledBtn={!validRequest()} title={"שמירה וסיום"} route={'/startReport'} doAPI={() => handleManageUsers(newUser?.userGrup)} />
                </div>
            </div>
        </TransitionPage>
    )
}

export default ManageUsers