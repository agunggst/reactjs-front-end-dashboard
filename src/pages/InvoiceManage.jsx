import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useDebounce from "../hooks/useDebounce"
import axios from "axios"
import CustomTable from "../components/CustomTable"

const InvoiceManage = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.userReducer.accessToken)
  const userInfo = useSelector(state => state.userReducer.userInfo)
  const tableHeads = ['Invoice Id', 'Created Date', 'Customer', 'Payment Type', ]
  const [invoices, setInvoices] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const search = useDebounce(inputSearch)

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'Invoice Management'
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
            text: 'Invoice Management',
            path: '/admin/invoice-manage'
          }
        ]
      }
    })
  }
  const getAllInvoices = async () => {
    if (!accessToken) {
      return
    }
    try {
      const config = {
        url: `http://localhost:3000/${userInfo.username}/invoices/all?id=${search || ''}`,
        method: 'GET',
        headers: {
          access_token: accessToken
        }
      }
      const { data } = await axios(config)
      // const products = data.data.map(item => {
      //   return {
      //     id: item.id,
      //     name: item.name,
      //     stock: item.stock,
      //     price: rupiahFormatter(item.price),
      //     categories: item.categories.map(category => category.name).join(','),
      //     createdDate: moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')
      //   }
      // })
      // setProducts(products)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllInvoices()
  }, [accessToken])
  useEffect(() => {
    setNavbarData()
  }, [])

  return (
    <div className="invoice-manage">
      <div className="utilities">
        <TextField id="standard-basic" label="Search" variant="standard" sx={{ width: '300px' }} value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}/>
      </div>
      <div className="table">
        <CustomTable data={invoices} heads={tableHeads} onClickRowPath="/admin/invoice-manage"/>
      </div>
    </div>
  )
}
 
export default InvoiceManage