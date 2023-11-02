import { useNavigate } from "react-router-dom"
import "./style/Navbar.css"
import { Button, Breadcrumbs, Avatar } from "@mui/material"

const Navbar = () => {
  const navigate = useNavigate()
  const breadcrumbs = [
    {
      text: 'Admin',
      path: false
    },
    {
      text: 'User Management',
      path: '/admin/user-manage'
    }
  ]

  const handleClickBreadcrumb = (path) => {
    if (path) navigate(path)
  }
  return (
    <div className="navbar">
      <div className="left">
        <Breadcrumbs separator="/" aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <div className='breadcumb-item' key={index} onClick={() => handleClickBreadcrumb(breadcrumb.path)}>{breadcrumb.text}</div>
            )
          })}
        </Breadcrumbs>
        <div className="title">User Management</div>
      </div>
      <div className="right">
        <div className="profile-nav">
          <Button variant="text" style={{marginRight: '12px', marginTop: '4px'}}>Log out</Button>
          <Avatar sx={{ bgcolor: '#11047a' }}>A</Avatar>
        </div>
      </div>
    </div>
  )
}
 
export default Navbar