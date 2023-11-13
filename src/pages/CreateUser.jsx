import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./style/CreateUser.css"
import { Button, TextField } from "@mui/material"
import Swal from 'sweetalert2'
import Toast from "../helpers/toast"
import axios from "axios"

const CreateUser = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')

  const saveConfirmation = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Cancel`
    })
    .then((result) => {
      if (result.isConfirmed) {
        validateData()
      }
    })
  }
  const validateData = () => {
    if (!password || !username || !email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please input username, email, and password",
      })
      return
    }
    if (password !== passwordConf) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password doesn't match",
      })
      return
    }
    saveData()
  }
  const emptyField = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordConf('')
  }
  const saveData = async () => {
    try {
      const config = {
        url: `http://localhost:3000/users/register`,
        method: 'POST',
        headers: {
          access_token: accessToken
        },
        data: {
          username, fullname: '', password, avatar: '', email, address: '', isAdmin: false
        }
      }
      await axios(config)
      emptyField()
      Toast.fire({
        icon: "success",
        title: "User data saved successfully"
      })
    } catch (error) {
      console.log(error);
    }
  }
  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Manage User - Create'
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
          },
          {
            text: 'Create User',
            path: '/admin/user-manage/create-user'
          }
        ]
      }
    })
  }

  useEffect(() => {
    setNavbarData()
  })
  return (
    <div className="create-user">
      <div className="field">
        <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} className="edit-input"/>
        <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} className="edit-input"/>
        <TextField type="password" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} className="edit-input"/>
        <TextField type="password" label="Confirm Password" variant="outlined" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} className="edit-input"/>
      </div>
      <div className="button-container">
        <Button variant="contained" onClick={saveConfirmation}>Save</Button>
      </div>
    </div>
  )
}
 
export default CreateUser