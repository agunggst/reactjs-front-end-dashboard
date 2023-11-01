import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"


const AdminLayout = () => {
  return (
    <div className="default-layout">
      <Sidebar/>
      <Navbar/>
      <div className="page-container">
        <Outlet/>
      </div>
    </div>
  )
}
 
export default AdminLayout