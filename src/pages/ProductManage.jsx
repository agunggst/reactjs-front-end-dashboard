import { useEffect } from "react"
import { useDispatch } from "react-redux"

const ProductManage = () => {
  const dispatch = useDispatch()
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
  useEffect(() => {
    setNavbarData()
  }, [])
  return (
    <div className="product-manage">prod</div>
  )
}
 
export default ProductManage