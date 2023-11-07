import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/admin/user-manage')
  }, [])
  return (
    <></>
  )
}
 
export default NotFound;