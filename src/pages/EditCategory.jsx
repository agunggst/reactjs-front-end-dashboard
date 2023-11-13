import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/css"
import "./style/EditCategory.css"
import { Button, TextField } from "@mui/material"
import Swal from "sweetalert2"
import Toast from "../helpers/toast"

const EditCategory = () => {
  const dispatch = useDispatch()
  const { id: categoryId } = useParams()
  const [name, setName] = useState('')
  const [baseColor, setBaseColor] = useState('#ffffff')
  const [color, setColor] = useColor(baseColor)
  const accessToken = useSelector(state => state.userReducer.accessToken)

  const getCategory = async () => {
    if (!accessToken) {
      return
    }
    try {
      const config = {
        url: `http://localhost:3000/categories/${categoryId}`,
        method: 'GET',
        headers: {
          access_token: accessToken
        }
      }
      const { data } = await axios(config)
      setName(data.data.name)
      setBaseColor(data.data.baseColor)
      setNavbarData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const setNavbarData = (categoryData) => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Manage Category'
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
            text: 'Manage Category',
            path: '/admin/category-manage'
          },
          {
            text: `${categoryData.name}`,
            path: `/admin/category-manage/${categoryData.id}`
          }
        ]
      }
    })
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
        saveData()
      }
    })
  }
  const saveData = async () => {
    try {
      const config = {
        url: `http://localhost:3000/categories/update/${categoryId}`,
        method: 'PUT',
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
    getCategory()
  }, [accessToken])

  return (
    <div className="edit-category">
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
 
export default EditCategory