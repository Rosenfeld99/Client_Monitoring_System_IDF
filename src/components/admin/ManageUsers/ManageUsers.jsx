import React, { useState } from 'react'
import TransitionPage from '../../../animation/TransitionPage'
import Navbar from '../../Menu/Navbar'
import { BsPersonVcard } from 'react-icons/bs'
import FloatingLabelInput from '../../../utils/floatingLabelInput/FloatingLabelInput'
import { FaWindowClose } from 'react-icons/fa'
import ButtonAction from '../../../utils/ButtonAction'
import { useToast } from '../../../utils/Toasttify/ToastManager'
import { generateID } from '../../../utils/func/generateId'
import { GrTest } from 'react-icons/gr'
import useUser from '../../../hooks/useUser'
import { SiGoogleclassroom } from 'react-icons/si'

const ManageUsers = () => {
    const { currentUser, handleManageUsers } = useUser()
    const [newUser, setNewUser] = useState({
        systemUsername: currentUser?.username || "",
        password: null,
        name: null,
        nameClass: '',
        curseOption: null,
        accessOption: null,
        userTests: [...currentUser?.userTests] || [],
        reportsClass:[ ...currentUser?.reportsClass] || []
    })
  
    const updateSate = (newValue, keyToUpdate) => {
     
        switch (keyToUpdate) {
            case "systemUsername":
                setNewUser({ ...newUser, systemUsername: newValue })
                break;
            case "curseOption":
                setNewUser({ ...newUser, curseOption: newValue })
                break;
            case "password":
                setNewUser({ ...newUser, password: newValue })
                break;
            case "nameClass":
                setNewUser({ ...newUser, nameClass: newValue })
                break;
            case "name":
                setNewUser({ ...newUser, name: newValue })
                break;
            case "userTests":
                // await to response from server to get correct password to create reletion wetween grup
                if (newUser?.password?.toString()?.length == 9) {
                    const updateGrupUusers = newUser?.userTests || []
                    updateGrupUusers?.push({ password: newUser.password, curseOption: newUser.curseOption, id: Date.now(), name: newUser?.name, reportsList: [] })
                    setNewUser({ ...newUser, userTests: updateGrupUusers, password: "", name: "" })
                } else {
                    showToast('error', 'שגיאה! ת"ז לא חוקית')
                }
                break;
            case "reportsClass":
          
                // await to response from server to get correct password to create reletion wetween grup
                if (newUser?.nameClass?.toString()?.length > 1) {
                    const updateGrupUusers = newUser?.reportsClass || [] 
                    updateGrupUusers?.push({ id: Date.now(), nameClass: newValue?.nameClass })
                  
                    setNewUser({
                        ...newUser, reportsClass: updateGrupUusers, nameClass: "", reportsList: [], lastReport: null
                    })
                 
                } else {
                    // alert(`ת"ז לא חוקית ...`)
                    showToast('error', '(נידרש 2 תווים)שגיאה! שם מחלקה לא תקין')
                }
                break;
            default:
                break;
        }
    }

    const handleDeletePassFromTests = (pass) => {
        const filteredGrup = newUser?.userTests?.filter((item) => item?.password != pass)
        setNewUser({ ...newUser, userTests: filteredGrup })
    }

    const handleDeletePassFromGClass = (pass) => {
        const filteredGrup = newUser?.reportsClass?.filter((item) => item?.id != pass)
        setNewUser({ ...newUser, reportsClass: filteredGrup })
    }

    const validRequest = () => {
        return newUser?.systemUsername?.length > 1
    }

    const showToast = useToast();
   
  const exsistClass=newUser?.reportsClass?.length>0
    return (
        <TransitionPage>
            <div dir='rtl' className="flex flex-col pb-72 mx-auto w-full  min-h-screen flex-1  ">
                <Navbar />
                {/* header screen */}
                <div className=" flex items-center gap-5 pt-20 justify-center">
                    <div className="flex flex-col text-center ">
                        <div className="self-center text-lg font-bold ">
                            {(currentUser?.role == "admin" || currentUser?.role == "manager") && "ניהול משתמשים"}
                        </div>
                        <div className="w-full text-sm text-light_neutral dark:text-dark_accent_content">
                            {(currentUser?.role == "admin" || currentUser?.role == "manager") ? "הגדרת נתוני משתמש" : "עריכת שם פרטי"}
                        </div>
                    </div>
                    <div className=" text-4xl">
                        <BsPersonVcard />
                    </div>
                </div>
                <div className="w-64 mx-auto flex flex-col gap-3 py-5 pb-10 items-center justify-center">
                    <FloatingLabelInput label={'שם פרטי שלי'} placeholder={'שם שלי...'} state={newUser?.systemUsername}
                        setState={updateSate}
                        keyToUpdate={"systemUsername"}
                        inputType="text"
                        minLen={1}
                        maxLen={20}
                    />
                </div>
                {/* Tests */}
                {(currentUser?.role == "manager") &&
                    <React.Fragment>
                        <div className=" flex items-center flex-col p-5 relative">
                            <div className="w-full border-b absolute top-0 border-gray-400 text-center" />
                            <span className="px-2 max-w-[680px] mx-auto bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content -mt-8 z-30 font-semibold">הגדרת משתמשי מדגם</span>
                        </div>
                        <div className="w-64 mx-auto flex flex-col gap-3 items-center justify-center">
                            <FloatingLabelInput label={'ת"ז מדגם'} placeholder={'ת"ז...'} state={newUser?.password}
                                setState={updateSate}
                                keyToUpdate={"password"}
                                inputType="password"
                                minLen={9}
                                maxLen={9}
                                pattern={/^\d{0,9}$/}
                            />
                            <FloatingLabelInput label={'שם מדגם'} placeholder={'שם...'} state={newUser?.name}
                                setState={updateSate}
                                keyToUpdate={"name"}
                                inputType="text"
                                minLen={1}
                                maxLen={20}
                            />
                            <button onClick={() => updateSate(newUser, "userTests")} className=' flex w-full rounded-md text-light_primary dark:text-dark_primary font-semibold justify-center px-4 py-2 bg-light_accent_content dark:bg-dark_accent_content'>יצירת מדגם</button>
                        </div>
                    </React.Fragment>
                }

                {(currentUser?.role == "admin" || currentUser?.role == "manager") && <React.Fragment>
                    {/* divider */}
                    <div className=" flex items-center flex-col p-5 relative mt-12">
                        <div className="w-full border-b absolute top-0 border-gray-400 text-center" />
                        <span className="px-2 max-w-[680px] mx-auto bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content -mt-8 z-30 font-semibold">{(currentUser?.role == "manager") ? "הגדרת כיתה" : "הגדרת מחלקה"}</span>
                    </div>

                    {/* Classes */}
                    <div className="w-64 mx-auto flex flex-col gap-3 items-center justify-center">
                        <FloatingLabelInput label={currentUser?.role == "manager"?"שם כיתה":'שם מחלקה'} placeholder={'שם...'} state={newUser?.nameClass}
                            setState={updateSate}
                            keyToUpdate={"nameClass"}
                            inputType="text"
                            minLen={1}
                            maxLen={20}
                            
                        />
                        <button
                         disabled={exsistClass}
                          onClick={() => updateSate(newUser, "reportsClass")}
                           className={` ${exsistClass&&"dark:bg-slate-700 bg-slate-300"} flex w-full rounded-md text-light_primary dark:text-dark_primary font-semibold justify-center px-4 py-2 bg-light_accent_content dark:bg-dark_accent_content`} 
                           >{(currentUser?.role == "manager") ? "יצירת כיתה" : "יצירת מחלקה"}</button>
                    </div>

                    {/* Results */}
                    <div className=" flex items-center flex-col p-5 relative mt-12">
                        <div className="w-full border-b absolute top-0 border-gray-400 text-center" />
                        <span className="px-2 max-w-[680px] mx-auto bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content -mt-8 z-30 font-semibold">{(currentUser?.role == "manager") ? "רשימת כיתה/מדגם" : "רשימת מחלקות"} </span>
                    </div>

                    {newUser?.userTests?.length === 0 && newUser?.reportsClass?.length === 0 && <div className=" text-xl font-semibold text-center my-10">אין נתונים להציג...</div>}

                    <div className="w-64 mx-auto flex flex-col gap-3 items-center justify-center">
                        {newUser?.userTests?.length > 0 &&
                            <div className=" flex flex-col items-center pt-10 justify-center w-full gap-3">
                                {newUser?.userTests?.map((item, index) => (
                                    <div key={item?.id} className="px-4 border border-dark_accent_content rounded-md relative w-full flex gap-2">
                                        <span className=' border-l pl-2 py-2'>ת"ז</span>
                                        <span className='py-2'>{item?.password}</span>
                                        <span className={`${"w-10"}  h-6 rounded-full absolute top-0 right-0 -mt-3 -mr-3 text-light_primary dark:text-dark_primary flex items-center justify-center dark:bg-dark_accent_content bg-light_accent_content gap-1`}>{index + 1}<GrTest className='' /></span>
                                        <button><FaWindowClose onClick={() => handleDeletePassFromTests(item?.password)} className=' absolute top-0 left-0 text-4xl m-0.5 text-error' /></button>
                                    </div>
                                ))}
                            </div>}
                        {newUser?.reportsClass?.length > 0 && <div className=" flex flex-col items-center pt-10 justify-center w-full gap-3">
                            {newUser?.reportsClass?.map((item, index) => (
                                <div key={item?.id} className="px-4 border border-dark_accent_content rounded-md relative w-full flex gap-2">
                                    <span className=' border-l pl-2 py-2'>מחלקה</span>
                                    <span className='py-2'>{item?.nameClass}</span>
                                    <span className={`${"w-10"}  h-6 rounded-full absolute top-0 right-0 -mt-3 -mr-3 text-light_primary dark:text-dark_primary flex items-center justify-center dark:bg-dark_accent_content bg-light_accent_content gap-1`}>{index + 1}<SiGoogleclassroom className='' /></span>
                                    <button><FaWindowClose onClick={() => handleDeletePassFromGClass(item?.id)} className=' absolute top-0 left-0 text-4xl m-0.5 text-error' /></button>
                                </div>
                            ))}
                        </div>}
                    </div>
                </React.Fragment>}
                <div className="px-10 pt-0 pb-10 backdrop-blur-sm z-40 fixed bottom-0 w-full">
                    <ButtonAction disabledBtn={!validRequest()} title={"שמירה וסיום"} route={currentUser?.role == "user" ? '/startReport' : '/lastReports'} doAPI={() => handleManageUsers(newUser)} />
                </div>
            </div>
        </TransitionPage>
    )
}

export default ManageUsers