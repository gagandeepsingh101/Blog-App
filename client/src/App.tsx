import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/HeaderComponents/Header'
import { useDispatch } from 'react-redux'
import { useProfileUserDataQuery } from './features/auth/authApi'
import { addUserInfo } from './features/auth/authSlice'
// type Props = {}

const App: React.FC = () => {
  const { data: userData, isSuccess } = useProfileUserDataQuery("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && userData && userData.data) {
      dispatch(addUserInfo(userData.data))
    }
  }, [dispatch, isSuccess, userData])
  return (
    <div className='h-screen w-screen bg-slate-100 overflow-x-hidden overflow-y-scroll '>
      <Header />
      <Outlet />
    </div>
  )
}

export default App