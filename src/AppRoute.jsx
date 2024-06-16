import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import Login from './pages/login/Login'

function AppRoute() {
  return (
   <>
   
   <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/home' element={<Home/>}/>
     <Route path='/startReport' element={<Home/>}/>
     <Route path='/endReport' element={<Home/>}/>
     <Route path='/todayReportsList' element={<Home/>}/>
     <Route path='/editReports' element={<Home/>}/>
   </Routes>
   
   
   </>
  )
}

export default AppRoute