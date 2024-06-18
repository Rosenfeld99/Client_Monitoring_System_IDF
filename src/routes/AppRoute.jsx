import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/signup/SignUp'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Test from '../test/Test'
import LastReports from '../components/admin/lastReports/LastReports'
import AdvanceSearch from '../components/admin/advanceSearch/AdvanceSearch'
import ReportStart from '../pages/doc/ReportStart'
import ReportEnd from '../pages/doc/ReportEnd'
import HistoryLastDay from '../pages/history/HistoryLastDay'
import ReportEdit from '../pages/doc/ReportEdit'

function AppRoute() {
  return (
    <div className='max-w-[680px] mx-auto'>
      <Routes>
        <Route index element={<ReportStart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/startReport' element={<ReportStart />} />
        <Route path='/endReport' element={<ReportEnd />} />
        <Route path='/ReportEdit/:reportId' element={<ReportEdit />} />
        <Route path='/todayReportsList' element={<HistoryLastDay />} />
        <Route path='/editReports' element={<Home />} />
        <Route path='/advanceSearch' element={<AdvanceSearch />} />
        <Route path='/lastReports' element={<LastReports />} />
        <Route path='/*' element={<h2>Not found 404</h2>} />

      </Routes>


    </div>
  )
}

export default AppRoute