import { useEffect } from "react"
import { useDispatch } from "react-redux"

const CreateUser = () => {
  const dispatch = useDispatch()

  const setNavbarData = () => {
    dispatch({
      type: 'SET_PAGE_TITLE',
      payload: {
        pageTitle: 'User Management - Create User'
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
      create user
    </div>
  )
}
 
export default CreateUser