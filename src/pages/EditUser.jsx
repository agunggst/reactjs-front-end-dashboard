import {Button, TextField } from "@mui/material"
import "./style/EditUser.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import Toast from "../helpers/toast"

const EditUser = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const { id: userId } = useParams()
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [user, setUser] = useState({
    id: 0,
    username: '',
    fullname: '',
    avatar: '',
    email: '',
    address: ''
  })
  const getUser = async () => {
    if (!accessToken) {
      return
    }
    try {
      const config = {
        url: `http://localhost:3000/users/detail/${userId}`,
        method: 'GET',
        headers: {
          access_token: accessToken
        }
      }
      const { data } = await axios(config)
      setUser({
        id: data.data.id,
        username: data.data.username,
        fullname: data.data.fullname,
        avatar: data.data.avatar,
        email: data.data.email,
        address: data.data.address
      })
      setUsername(data.data.username)
      setFullname(data.data.fullname)
      setEmail(data.data.email)
      setAddress(data.data.address)
      setNavbarData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const saveConfirmation = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Cancel`
    })
    .then((result) => {
      if (result.isConfirmed) {
        saveUserData()
      }
    })
  }
  const saveUserData = async () => {
    try {
      const config = {
        url: `http://localhost:3000/users/update/${userId}`,
        method: 'PUT',
        headers: {
          access_token: accessToken
        },
        data: {
          username,
          fullname,
          avatar: user.avatar,
          email,
          address
        }
      }
      await axios(config)
      Toast.fire({
        icon: "success",
        title: "User data saved successfully"
      })
    } catch (error) {
      console.log(error)
    }
  }
  const setNavbarData = (userData) => {
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
          },
          {
            text: `${userData.username}`,
            path: `/admin/user-manage/${user.id}`
          }
        ]
      }
    })
  }
  useEffect(() => {
    getUser()
  }, [accessToken])
  return (
    <div className="edit-user">
      <div className="left">
        <img src={user.avatar} alt="pokopedia" className="user-profile-picture"/>
        <div className="user-id-info">
          <div className="content">User ID: {user.id}</div>
        </div>
      </div>
      <div className="right">
        <div className="field">
          <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} className="edit-input"/>
          <TextField id="outlined-basic" label="Full Name" variant="outlined" value={fullname} onChange={(e) => setFullname(e.target.value)} className="edit-input"/>
          <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} className="edit-input"/>
          <TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} className="edit-input"/>
        </div>
        <div className="button-container">
          <Button variant="contained" onClick={saveConfirmation}>Save</Button>
        </div>
      </div>
    </div>
  )
}
 
export default EditUser