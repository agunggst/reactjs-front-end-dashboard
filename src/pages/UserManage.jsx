import { useNavigate } from "react-router"
import CustomTable from "../components/CustomTable"
import "./style/UserManage.css"
import { Avatar, TextField } from "@mui/material"

const UserManage = () => {
  const navigate = useNavigate()
  const tableHeads = ['User Id', 'Username', 'Full Name', 'Avatar', 'Email', 'Address']
  const users = [
    {
      id: 1,
      username: 'admin1',
      fullname: 'admin 123 123',
      avatar: <Avatar src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"/>,
      email: 'asd@asd.asd',
      address: 'Lorem ipum dolor sit amet, consectetur adipiscing el'
    }
  ]
  const handleClickTableRow = (path) => {
    navigate(path)
  }
  return (
    <div className="user-manage">
      <div className="utilities">
        <TextField id="standard-basic" label="Search By Id" variant="standard" sx={{ width: '300px' }} />
      </div>
      <div className="table">
        <CustomTable data={users} heads={tableHeads} onClickRow={handleClickTableRow}/>
      </div>
    </div>
  )
}
 
export default UserManage