import { useEffect } from 'react'
import AdminLayout from './layouts/AdminLayout'
import BlankLayout from './layouts/BlankLayout'
import { adminRoutes, blankRoutes } from './routes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')
  const getUserInfo = async () => {
    try {
      const config = {
        url: 'http://localhost:3000/users/profile',
        method: 'GET',
        headers: {
          access_token: accessToken
        }
      }
      const { data } = await axios(config)
      dispatch({
        type: 'LOGIN',
        payload: {
          accessToken,
          userInfo: data.data
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (accessToken) {
      getUserInfo()
    }
  }, [accessToken])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='admin' element={<AdminLayout/>}>
            {adminRoutes.map((route, index) => {
              return (<Route path={route.path} element={route.component} key={index}/>)
            })}
          </Route>
          <Route path='' element={<BlankLayout/> }>
            {blankRoutes.map((route, index) => {
              return (<Route path={route.path} element={route.component} key={index}/>)
            })}
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
