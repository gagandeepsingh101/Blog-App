import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import store from './store/store.ts'
import Profile from './pages/Profile.tsx'
import CreateBlog from './pages/CreateBlog.tsx'
import SingleBlog from './pages/SingleBlog.tsx'
import UpdateBlog from './pages/UpdateBlog.tsx'
import SearchPage from './pages/SearchPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/blog/:id', element: <SingleBlog /> },
    ],
  },

  { path: '/search/:searchQuery', element: <SearchPage /> },
  { path: '/updateBlog/:id', element: <UpdateBlog /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/createBlog',
    element: <CreateBlog />,
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
