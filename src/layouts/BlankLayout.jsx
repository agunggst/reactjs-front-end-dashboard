import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const BlankLayout = () => {
  const navigate = useNavigate()
  const locationPath = window.location.pathname
  useEffect(() => {
    if (locationPath === '/') navigate('/admin/user-manage')
  }, [])
  return (
    <div className="blank-layout">
      <Outlet/>
    </div>
  )
}
 
export default BlankLayout