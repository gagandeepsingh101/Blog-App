import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

// type Props = {}

const App: React.FC = () => {
  return (
    <div className='h-screen w-screen bg-slate-50 overflow-x-hidden overflow-y-scroll '>
      <Header />
      <Outlet />
    </div>
  )
}

export default App