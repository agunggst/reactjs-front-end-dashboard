import { useNavigate } from "react-router"
import CustomTable from "../components/CustomTable"
import "./style/UserManage.css"
import { Avatar, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import useDebounce from "../hooks/useDebounce"

const UserManage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const tableHeads = ['User Id', 'Username', 'Full Name', 'Avatar', 'Email', 'Address']
  const [users, setUsers] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const search = useDebounce(inputSearch)

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'User Management'
      }
    })
    dispatch({
      type: 'SET_BREADCRUMBS',
      payload: {
        breadcrumbs: [
          {
            text: 'Admin',
            path: false
          },
          {
            text: 'User Management',
            path: '/admin/user-manage'
          }
        ]
      }
    })
  }
  const handleClickTableRow = (path) => {
    navigate(path)
  }
  const getAllUsers = async () => {
    if (!accessToken) {
      return
    }
    try {
      const config = {
        url: `http://localhost:3000/users?username=${search || ''}`,
        method: 'GET',
        headers: {
          access_token: accessToken
        }
      }
      const { data } = await axios(config)
      const users = data.data.map(user => {
        return {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          avatar: <Avatar src={user.avatar}/>,
          email: user.email,
          address: user.address
        }
      })
      setUsers(users)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setNavbarData()
  }, [])
  useEffect(() => {
    getAllUsers()
  }, [accessToken])
  useEffect(() => {
    getAllUsers()
  }, [search])
  
  return (
    <div className="user-manage">
      <div className="utilities">
        <TextField id="standard-basic" label="Search" variant="standard" sx={{ width: '300px' }} value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}/>
      </div>
      <div className="table">
        <CustomTable data={users} heads={tableHeads} onClickRow={handleClickTableRow}/>
      </div>
    </div>
  )
}
 
export default UserManage