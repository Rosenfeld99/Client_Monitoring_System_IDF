import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SignUp from '../pages/signup/SignUp'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import ReportStart from '../pages/doc/ReportStart'
import ReportEnd from '../pages/doc/ReportEnd'
import HistoryLastDay from '../pages/history/HistoryLastDay'
import ReportEdit from '../pages/doc/ReportEdit'
import SearchResult from '../components/admin/advanceSearch/SearchResult'
import SplashPage from '../pages/splash/SplashPage'
import LastReports from '../components/admin/solidersReports/SolidersReports'
import AdvanceSearch from '../components/admin/advanceSearch/AdvanceSearch'
import ChooseOption from '../pages/doc/ChooseOption'
import CustomDatePicker from '../components/admin/reportDate/CustomDatePicker'
import ReportDate from '../components/admin/reportDate/ReportDate'
import ManageUsers from '../components/admin/ManageUsers/ManageUsers'
import AnalyticsStract from '../pages/analytics/AnalyticsStract'
import AnalyticsItem from '../pages/analytics/AnalyticsItem'
import useUser from '../hooks/useUser'



function AppRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const { getUser, currentUser } = useUser()

  useEffect(() => {
    getUser("2", null)
    // Simulate an async operation (e.g., fetching data, initializing app)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);
  console.log(currentUser);
  const location = useLocation();
  return (
    <div className='max-w-[680px] mx-auto bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content'>
      {isLoading ? (
        <SplashPage />
      ) : (
        <Routes location={location} key={location.pathname}>
          {/* Auth */}
          <Route index element={<ReportStart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          {/* User */}
          <Route path='/home' element={<Home />} />
          <Route path='/startReport' element={<ReportStart />} />
          <Route path='/startReport/:value' element={<ChooseOption />} />
          <Route path='/endReport' element={<ReportEnd />} />
          <Route path='/ReportEdit/:reportId' element={<ReportEdit />} />
          <Route path='/todayReportsList' element={<HistoryLastDay />} />

          {/* Admin */}
          <Route path='/lastReports' element={<LastReports />} />
          <Route path='/searchResult' element={<SearchResult />} />
          <Route path='/advanceSearch' element={<AdvanceSearch />} />
          <Route path='/manageDate' element={<ReportDate />} />
          <Route path='/manageUsers' element={<ManageUsers />} />
          <Route path='/analytics' element={<AnalyticsStract />} />
          <Route path='/analytics' element={<AnalyticsStract />} />
          <Route path='/analytics/:item' element={<AnalyticsItem />} />
          <Route path='/analytics/users' element={<AnalyticsItem />} />

          <Route path='/*' element={<h2>Not found 404</h2>} />
        </Routes>
      )}
    </div>
  )
}

export default AppRoute