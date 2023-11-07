import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"


const AdminLayout = () => {
  const navigate = useNavigate()
  const locationPath = window.location.pathname
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) navigate('/login')
    if (locationPath === '/admin') navigate('/admin/user-manage')
  }, [navigate])
  return (
    <div className="default-layout">
      <Sidebar/>
      <div className="page-container">
        <Navbar/>
        <div className="page">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
 
export default AdminLayout