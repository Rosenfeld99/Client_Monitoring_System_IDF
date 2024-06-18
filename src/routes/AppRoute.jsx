import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/signup/SignUp'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Test from '../test/Test'
import LastReports from '../components/admin/lastReports/LastReports'
import AdvanceSearch from '../components/admin/advanceSearch/AdvanceSearch'

function AppRoute() {
  return (
    <>

      <Routes>
        {/* <Route index element={<LastReports />} /> */}
        <Route index element={<Test />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/startReport' element={<Home />} />
        <Route path='/endReport' element={<Home />} />
        <Route path='/todayReportsList' element={<Home />} />
        <Route path='/editReports' element={<Home />} />
        <Route path='/advanceSearch' element={<AdvanceSearch />} />
        <Route path='/lastReports' element={<LastReports />} />
        <Route path='/*' element={<h2>Not found 404</h2>} />

      </Routes>


    </>
  )
}

export default AppRoute