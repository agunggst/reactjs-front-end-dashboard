import { useNavigate } from "react-router-dom"
import "./style/Navbar.css"
import { Button, Breadcrumbs, Avatar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pageTitle = useSelector(state => state.layoutReducer.pageTitle)
  const breadcrumbs = useSelector(state => state.layoutReducer.breadcrumbs)
  const avatar = useSelector(state => state.userReducer.userInfo.avatar)

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    })
    navigate('/login')
  }

  const handleClickBreadcrumb = (path) => {
    if (path) navigate(path)
  }
  return (
    <div className="navbar">
      <div className="left">
        <Breadcrumbs separator="/" aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <div className='breadcumb-item' style={index === breadcrumbs.length-1 ? {fontWeight: 600} : {}} key={index} onClick={() => handleClickBreadcrumb(breadcrumb.path)}>{breadcrumb.text}</div>
            )
          })}
        </Breadcrumbs>
        <div className="title">{pageTitle}</div>
      </div>
      <div className="right">
        <div className="profile-nav">
          <Button variant="text" style={{marginRight: '12px', marginTop: '4px'}} onClick={logout}>Log out</Button>
          {!avatar && <Avatar sx={{ bgcolor: '#11047a' }}>A</Avatar>}
          {avatar && <Avatar src={avatar} />}
        </div>
      </div>
    </div>
  )
}
 
export default Navbar