import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from './components/HeaderComponents/Header'
import { addUserInfo } from './features/authSlice'
import { useProfileUserDataQuery } from './services/authApi'
import { useFormatDate } from './utils/useFormatDate'
import { Toaster } from 'react-hot-toast'
// type Props = {}

const App: React.FC = () => {

  const formatDate = useFormatDate
  const { data: userData, isSuccess: isSuccessUser } = useProfileUserDataQuery("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccessUser && userData && userData.data) {
      const joinedDate: string = formatDate((userData.data.joinedDate).toString());

      dispatch(addUserInfo({ ...userData.data, joinedDate }))
    }

  }, [dispatch, formatDate, isSuccessUser, userData])
  return (
    <div className='h-screen w-screen bg-slate-100 overflow-hidden '>
      <Toaster />
      <Header />
      <Outlet />
    </div>
  )
}

export default App