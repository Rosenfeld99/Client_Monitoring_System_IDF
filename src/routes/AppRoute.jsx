import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SignUp from '../pages/signup/SignUp'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Test from '../test/Test'
import ReportStart from '../pages/doc/ReportStart'
import ReportEnd from '../pages/doc/ReportEnd'
import HistoryLastDay from '../pages/history/HistoryLastDay'
import ReportEdit from '../pages/doc/ReportEdit'
import SearchResult from '../components/admin/advanceSearch/SearchResult'
import SplashPage from '../pages/splash/SplashPage'
import LastReports from '../components/admin/solidersReports/SolidersReports'
import AdvanceSearch from '../components/admin/advanceSearch/AdvanceSearch'
import ChooseOption from '../pages/doc/ChooseOption'



function AppRoute() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation (e.g., fetching data, initializing app)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  const location = useLocation();
  return (
    <div className='max-w-[680px] mx-auto bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content'>
      {isLoading ? (
        <SplashPage />
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route index element={<ReportStart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/startReport' element={<ReportStart />} />
          <Route path='/startReport/:value' element={<ChooseOption />} />
          <Route path='/endReport' element={<ReportEnd />} />
          <Route path='/ReportEdit/:reportId' element={<ReportEdit />} />
          <Route path='/todayReportsList' element={<HistoryLastDay />} />
          <Route path='/lastReports' element={<LastReports />} />
          <Route path='/searchResult' element={<SearchResult />} />
          <Route path='/advanceSearch' element={<AdvanceSearch />} />

          <Route path='/*' element={<h2>Not found 404</h2>} />
        </Routes>
      )}
    </div>
  )
}

export default AppRoute