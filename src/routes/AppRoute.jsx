import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ReportStart from '../pages/doc/ReportStart'
import ReportEnd from '../pages/doc/ReportEnd'
import HistoryLastDay from '../pages/history/HistoryLastDay'
import ReportEdit from '../pages/doc/ReportEdit'
import SearchResult from '../components/admin/advanceSearch/SearchResult'
import SplashPage from '../pages/splash/SplashPage'
import LastReports from '../components/admin/solidersReports/SolidersReports'
import AdvanceSearch from '../components/admin/advanceSearch/AdvanceSearch'
import ChooseOption from '../pages/doc/ChooseOption'
import ReportDate from '../components/admin/reportDate/ReportDate'
import ManageUsers from '../components/admin/ManageUsers/ManageUsers'
import useUser from '../hooks/useUser'
import InitPage from '../pages/initPage/InitPage'



function AppRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUser()
  // console.log(currentUser);
  useEffect(() => {
    // Simulate an async operation (e.g., fetching data, initializing app)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  if (currentUser?.isInit) {
    return <InitPage />
  }

  const location = useLocation();
  return (
    <div className='max-w-[680px] mx-auto bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content'>
      {isLoading ? (
        <SplashPage />
      ) : (
        <Routes location={location} key={location.pathname}>
          {/* Auth */}
          <Route index element={(currentUser?.role == "manager" || currentUser?.role == "admin") ? <LastReports/> : currentUser?.isProcess ? <ReportEnd /> : <ReportStart />} />

          {/* User */}
          {currentUser?.isProcess ?
            <Route path='/endReport' element={<ReportEnd />} /> :
            <>
              <Route path='/startReport' element={(currentUser?.role == "manager" || currentUser?.role == "admin")?<LastReports/>:<ReportStart />} />
              <Route path='/startReport/:value' element={<ChooseOption />} />
              <Route path='/ReportEdit/:reportId' element={<ReportEdit />} />
              <Route path='/todayReportsList' element={<HistoryLastDay />} />
            </>
          }

          {/* Admin */}
          <Route path='/lastReports' element={<LastReports />} />
          <Route path='/searchResult' element={<SearchResult />} />
          <Route path='/advanceSearch' element={<AdvanceSearch />} />
          <Route path='/manageDate' element={<ReportDate />} />
          <Route path='/manageUsers' element={<ManageUsers />} />

          <Route path='/*' element={<h2>Not found 404</h2>} />
        </Routes>
      )}
    </div>
  )
}

export default AppRoute