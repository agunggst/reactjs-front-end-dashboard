import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import "./style/CreateProduct.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import * as filestack from 'filestack-js'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Toast from "../helpers/toast"
import Swal from "sweetalert2"

const CreateEditProduct = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [images, setImages] = useState([])

  const client = filestack.init(process.env.REACT_APP_FILESTACK_API_KEY)
  const filestackConfig = {
    accept: ["image/*"],
    onUploadDone: file => {
      let imagesTemp = [...images]
      imagesTemp.push(file.filesUploaded[0].url)
      setImages(imagesTemp)
    }
  }
  const openUploadPicker = () => {
    client.picker(filestackConfig).open()
  }
  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Manage Product - Create'
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
            text: 'Manage Product',
            path: '/admin/product-manage'
          },
          {
            text: `Create Product`,
            path: `/admin/product-manage/create-product`
          }
        ]
      }
    })
  }
  const getCategories = async () => {
    if (!accessToken) {
      return
    }
    try {
      const config = {
        url: `http://localhost:3000/categories`,
        method: 'GET',
        headers: {
          access_token: accessToken
        }
      }
      const { data } = await axios(config)
      const categories = data.data.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
      setCategories(categories)
    } catch (error) {
      console.log(error);
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
        saveProductData()
      }
    })
  }
  const saveProductData = async () => {
    try {
      const config = {
        url: `http://localhost:3000/products/create`,
        method: 'POST',
        headers: {
          access_token: accessToken
        },
        data: {
          name,
          description,
          stock,
          price,
          images,
          categories: [categoryId]
        }
      }
      await axios(config)
      emptyFields()
      Toast.fire({
        icon: "success",
        title: "Data saved successfully"
      })
    } catch (error) {
      console.log(error)
    }
  }
  const emptyFields = () => {
    setName('')
    setStock('')
    setDescription('')
    setImages([])
    setStock('')
    setCategoryId('')
    setPrice('')
  }

  useEffect(() => {
    getCategories()
  }, [accessToken])
  useEffect(() => {
    setNavbarData()
  }, [])

  return (
    <div className="create-edit-product">
      <div className="left">
        <div className="user-id-info">
          <div className="content">Product Images</div>
        </div>
        <div className="product-images">
          {images.map((image, index) => {
            return <img className="product-image" src={image} key={index} />
          })}
          <div className="add-product-image" onClick={openUploadPicker}>
            <AddCircleOutlineIcon sx={{ color: '#e3e3e3' }} />
          </div>
        </div>
      </div>
      <div className="right">
      <div className="field">
        <TextField label="Product Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} className="edit-input" />
        <TextField label="Stock" type="number" variant="outlined" value={stock} onChange={(e) => setStock(e.target.value)} className="edit-input" />
        <TextField label="Price" type="number" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} className="edit-input" />
        <FormControl fullWidth className="edit-input">
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            label="Category"
            onChange={e => setCategoryId(e.target.value)}
          >
            {categories.map((item, index) => {
              return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <TextField label="Description" multiline rows={4} maxRows={8} value={description} onChange={(e) => setDescription(e.target.value)} className="edit-input" />
      </div>
        <div className="button-container">
          <Button variant="contained" onClick={saveConfirmation}>Save</Button>
        </div>
      </div>
    </div>
  )
}
 
export default CreateEditProduct