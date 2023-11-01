import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"


const AdminLayout = () => {
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