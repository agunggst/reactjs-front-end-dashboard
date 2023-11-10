import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import moment from "moment"
import CustomTable from "../components/CustomTable"
import { Avatar, Button } from "@mui/material"
import { Link } from "react-router-dom"
import "./style/CategoryManage.css"

const CategoryManage = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const tableHeads = ['Category Id', 'Name', 'Color', 'Created Date']
  const [categories, setCategories] = useState([])

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Category Management'
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
          }
        ]
      }
    })
  }
  const getAllCategories = async () => {
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
          name: item.name,
          color: <Avatar sx={{ bgcolor: item.baseColor }}> </Avatar> ,
          createdDate: moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')
        }
      })
      setCategories(categories)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [accessToken])
  useEffect(() => {
    setNavbarData()
  }, [])

  return (
    <div className="category-manage">
      <div className="utilities">
        <Link to='/admin/category-manage/create-category'>
          <Button variant="contained">Create</Button>
        </Link>
      </div>
      <div className="table">
        <CustomTable data={categories} heads={tableHeads} onClickRowPath="/admin/category-manage"/>
      </div>
    </div>
  )
}
 
export default CategoryManage