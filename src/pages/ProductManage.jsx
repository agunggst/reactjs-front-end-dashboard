import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./style/ProductManage.css"
import { Button, Pagination, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import useDebounce from "../hooks/useDebounce"
import axios from "axios"
import CustomTable from "../components/CustomTable"
import moment from "moment/moment"
import rupiahFormatter from "../helpers/rupiahFormater"
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from "sweetalert2"
import Toast from "../helpers/toast"

const ProductManage = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const tableHeads = ['Product Id', 'Name', 'Stock', 'Price', 'Category(s)', 'Created Date', 'Delete']
  const [products, setProducts] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const search = useDebounce(inputSearch)
  const [page, setPage] = useState(1)
  const perPage = 10

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Manage Product'
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
          createdDate: moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
          _delete: <DeleteIcon onClick={() => confirmDeleteProduct(item.id)} sx={{ color: 'red' }} />
        }
      })
      setProducts(products)
      setPage(1)
    } catch (error) {
      console.log(error);
    }
  }
  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `Cancel`
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
      }
    })
  }
  const deleteProduct = async (id) => {
    try {
      const config = {
        url: `http://localhost:3000/products/delete/${id}`,
        method: 'DELETE',
        headers: {
          access_token: accessToken
        }
      }
      await axios(config)
      Toast.fire({
        icon: "success",
        title: "Product deleted successfully"
      })
      getAllProducts()
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
        <CustomTable data={products.slice(0 + perPage * (page - 1), perPage + perPage * (page - 1))} heads={tableHeads} onClickRowPath="/admin/product-manage"/>
        <div className="pagination">
          <Pagination count={Math.ceil(products.length/perPage)} onChange={((e, value) => setPage(value))} page={page} variant="outlined" color="primary" />
        </div>
      </div>
    </div>
  )
}
 
export default ProductManage