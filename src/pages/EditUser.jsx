import { Button, TextField } from "@mui/material"
import "./style/EditUser.css"

const EditUser = () => {
  const user = {
    id: 1,
    username: 'admin1',
    fullname: 'admin 123 123',
    avatar: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
    email: 'asd@asd.asd',
    address: 'Lorem ipum dolor sit amet, consectetur adipiscing el'
  }
  return (
    <div className="edit-user">
      <div className="field">
        <TextField id="outlined-basic" label="Username" variant="outlined" value={user.username} className="edit-input"/>
        <TextField id="outlined-basic" label="Full Name" variant="outlined" value={user.fullname} className="edit-input"/>
        <TextField id="outlined-basic" label="Email" variant="outlined" value={user.email} className="edit-input"/>
        <TextField id="outlined-basic" label="Address" variant="outlined" value={user.address} className="edit-input"/>
      </div>
      <div className="button-container">
        <Button variant="contained">Save</Button>
      </div>
    </div>
  )
}
 
export default EditUser