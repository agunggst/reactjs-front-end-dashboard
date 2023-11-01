import AdminLayout from './layouts/AdminLayout'
import BlankLayout from './layouts/BlankLayout'
import { adminRoutes, blankRoutes } from './routes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
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
