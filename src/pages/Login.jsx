import { Button, Checkbox, TextField } from '@mui/material'
import PokopediaLogo from '../assets/pokopedia-Icon.png'
import "./style/Login.css"
import { useState } from 'react'

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const login = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login">
      <div className="form-container">
        <div className="head">
          <img src={PokopediaLogo} alt="pokopedia" />
          <div className='form-subtitle'>Welcome to Pokopedia Dashboard!</div>
        </div>
        <form className="login-form" onSubmit={(e) => login(e)}>
          <TextField id="outlined-email-input" label="Email" className='input input-email'/>
          <TextField id="outlined-password-input" label="Password" type={isShowPassword ? 'text' : 'password'} className='input input-password'/>
          <div className="password-show">
            <Checkbox checked={isShowPassword} onClick={() => setIsShowPassword(!isShowPassword)} /> <span>Show Password</span>
          </div>
          <Button variant="contained" className='login-button' onClick={(e) => login(e)}>Log In</Button>
        </form>
      </div>
    </div>
  )
}
 
export default Login