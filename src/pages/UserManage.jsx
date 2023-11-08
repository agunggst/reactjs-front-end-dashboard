import { useNavigate } from "react-router"
import CustomTable from "../components/CustomTable"
import "./style/UserManage.css"
import { Avatar, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

const UserManage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const tableHeads = ['User Id', 'Username', 'Full Name', 'Avatar', 'Email', 'Address']
  const [users, setUsers] = useState([])
  // const users = [
  //   {
  //     id: 1,
  //     username: 'admin1',
  //     fullname: 'admin 123 123',
  //     avatar: <Avatar src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"/>,
  //     email: 'asd@asd.asd',
  //     address: 'Lorem ipum dolor sit amet, consectetur adipiscing el'
  //   }
  // ]
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
        url: 'http://localhost:3000/users',
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
  return (
    <div className="user-manage">
      <div className="utilities">
        <TextField id="standard-basic" label="Search By Id" variant="standard" sx={{ width: '300px' }} />
      </div>
      <div className="table">
        <CustomTable data={users} heads={tableHeads} onClickRow={handleClickTableRow}/>
      </div>
    </div>
  )
}
 
export default UserManage