import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css'

function Signup() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      try {
        const res = await axios.post("http://localhost:5001/signup",{
          email: email,
          password: password
        })
      } catch (error) {
        alert(error.response.data)
        console.log(error.response.data)
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }
  return (
    <div className='signup-container'>
      <div className='signup-header login-signup-header'>
      <h1>Travelogue</h1>
            <ul className='signup-menu login-signup'>
                  <li><Link className="link" to="/">Home</Link></li>
                  <li><Link className="link" to="/about">About</Link></li>
                  <li><Link className="link" to="/blog">Blog</Link></li>
                  <li><Link className="link" to="/contact">Contact</Link></li>
                  <li><Link className="link" to="/login">Login</Link></li>
                </ul>
      </div>
      <div className='signup-background'>          
                <form className='login-signup-form'>
                  <label>Sign up</label>
                    <input name='email' value={email} type='email' placeholder='Email' onChange={(e) => 
                      setEmail(e.target.value)}></input>

                    <input name='password' value={password} type='password' placeholder='Password' 
                      onChange={(e) => setPassword(e.target.value)}></input>

                    <input name='confirmPassword' type='password' value={confirmPassword} placeholder='Confirm password' 
                      onChange={(e) => setConfirmPassword(e.target.value)}></input>

                    <input onClick={handleSubmit} className='submit' type='submit'></input>
                    <p className='link'>Already have an account? <Link className='link' to="/login">Log in</Link></p>
                </form>
      </div>
    </div>
  )
}

export default Signup
