import CustomTable from "../components/CustomTable"
import "./style/UserManage.css"
import { Avatar, Button, TextField, Pagination } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import useDebounce from "../hooks/useDebounce"
import { Link } from "react-router-dom"
import Toast from "../helpers/toast"
import Swal from "sweetalert2"
import DeleteIcon from '@mui/icons-material/Delete'

const UserManage = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const tableHeads = ['User Id', 'Username', 'Full Name', 'Avatar', 'Email', 'Address', 'Delete']
  const [users, setUsers] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const search = useDebounce(inputSearch)
  const perPage = 5

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Manage User'
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
            text: 'Manage User',
            path: '/admin/user-manage'
          }
        ]
      }
    })
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
          address: user.address,
          _delete: <DeleteIcon onClick={() => confirmDeleteUser(user.id)} sx={{ color: 'red' }} />
        }
      })
      setUsers(users)
      setPage(1)
    } catch (error) {
      console.log(error);
    }
  }
  const confirmDeleteUser = (id) => {
    Swal.fire({
      title: "Do you want to delete this user?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `Cancel`
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteUser(id)
      }
    })
  }
  const deleteUser = async (id) => {
    try {
      const config = {
        url: `http://localhost:3000/users/delete/${id}`,
        method: 'DELETE',
        headers: {
          access_token: accessToken
        }
      }
      await axios(config)
      Toast.fire({
        icon: "success",
        title: "User deleted successfully"
      })
      getAllUsers()
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
        <Link to='/admin/user-manage/create-user'>
          <Button variant="contained">Create</Button>
        </Link>
      </div>
      <div className="table">
        <CustomTable data={users.slice(0 + perPage * (page - 1), perPage + perPage * (page - 1))} heads={tableHeads} onClickRowPath="/admin/user-manage"/>
        <div className="pagination">
          <Pagination count={Math.ceil(users.length/perPage)} onChange={((e, value) => setPage(value))} page={page} variant="outlined" color="primary" />
        </div>
      </div>
    </div>
  )
}
 
export default UserManage