import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/css"
import "./style/CreateCategory.css"
import { Button, TextField } from "@mui/material"
import Swal from "sweetalert2"
import Toast from "../helpers/toast"

const CreateCategory = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [color, setColor] = useColor('#ffffff')
  const accessToken = useSelector(state => state.userReducer.accessToken)

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Category Management - Create Category'
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
            text: 'Category Management',
            path: '/admin/category-manage'
          },
          {
            text: `Create Category`,
            path: `/admin/category-manage/create-category`
          }
        ]
      }
    })
  }
  const saveConfirmation = () => {
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please input category name",
      })
      return
    }
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Cancel`
    })
    .then((result) => {
      if (result.isConfirmed) {
        saveData()
      }
    })
  }
  const saveData = async () => {
    try {
      const config = {
        url: `http://localhost:3000/categories/create`,
        method: 'POST',
        headers: {
          access_token: accessToken
        },
        data: {
          name, baseColor: color.hex, icon: ''
        }
      }
      await axios(config)
      Toast.fire({
        icon: "success",
        title: "Data saved successfully"
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setNavbarData()
  }, [])

  return (
    <div className="create-category">
      <TextField label="Category Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} className="edit-input" />
      <div className="color-picker">
        <div className="label">Pick Category Base Color</div>
        <ColorPicker color={color} onChange={setColor} />
      </div>
      <div className="button-container">
        <Button variant="contained" onClick={saveConfirmation}>Save</Button>
      </div>
    </div>
  )
}
 
export default CreateCategory