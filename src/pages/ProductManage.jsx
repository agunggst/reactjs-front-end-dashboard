import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./style/ProductManage.css"
import { Button, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import useDebounce from "../hooks/useDebounce"
import axios from "axios"
import CustomTable from "../components/CustomTable"
import moment from "moment/moment"
import rupiahFormatter from "../helpers/rupiahFormater"

const ProductManage = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const tableHeads = ['Product Id', 'Name', 'Stock', 'Price', 'Category(es)', 'Created Date']
  const [products, setProducts] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const search = useDebounce(inputSearch)

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Product Management'
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
            text: 'Product Management',
            path: '/admin/product-manage'
          }
        ]
      }
    })
  }
  const getAllProducts = async () => {
    if (!accessToken) {
      return
    }
    try {
      const config = {
        url: `http://localhost:3000/products?name=${search || ''}`,
        method: 'GET',
        headers: {
          access_token: accessToken
        }
      }
      const { data } = await axios(config)
      const products = data.data.map(item => {
        return {
          id: item.id,
          name: item.name,
          stock: item.stock,
          price: rupiahFormatter(item.price),
          categories: item.categories.map(category => category.name).join(','),
          createdDate: moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')
        }
      })
      setProducts(products)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setNavbarData()
  }, [])
  useEffect(() => {
    getAllProducts()
  }, [accessToken])
  useEffect(() => {
    getAllProducts()
  }, [search])

  return (
    <div className="product-manage">
      <div className="utilities">
        <TextField id="standard-basic" label="Search" variant="standard" sx={{ width: '300px' }} value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}/>
        <Link to='/admin/product-manage/create-product'>
          <Button variant="contained">Create</Button>
        </Link>
      </div>
      <div className="table">
        <CustomTable data={products} heads={tableHeads} onClickRowPath="/admin/product-manage"/>
      </div>
    </div>
  )
}
 
export default ProductManage