import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from './components/HeaderComponents/Header'
import { addUserInfo } from './features/authSlice'
import { useProfileUserDataQuery } from './services/authApi'
import { useFormatDate } from './utils/useFormatDate'
import { useGetAllBlogQuery } from './services/blogApi'
import { addBlogData } from './features/blogSlice'
// type Props = {}

const App: React.FC = () => {

  const formatDate = useFormatDate
  const { data: userData, isSuccess: isSuccessUser } = useProfileUserDataQuery("");
  const { data: blogData, isSuccess: isSuccessBlog } = useGetAllBlogQuery("")
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccessUser && userData && userData.data) {
      const joinedDate: string = formatDate((userData.data.joinedDate).toString());

      dispatch(addUserInfo({ ...userData.data, joinedDate }))
    }
    if (isSuccessBlog && blogData && blogData.data) {
      dispatch(addBlogData(blogData.data))
    }
  }, [blogData, dispatch, formatDate, isSuccessBlog, isSuccessUser, userData])
  return (
    <div className='h-screen w-screen bg-slate-100 overflow-hidden '>
      <Header />
      <Outlet />
    </div>
  )
}

export default App