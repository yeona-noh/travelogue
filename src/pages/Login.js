import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'

function Login() {


  const [userEmail, setUserEmail] = useState()
  const [userPassword, setUserPassword] = useState()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5001/login", {
        email: userEmail,
        password: userPassword
      })
    console.log(res.data)
    if (res.status === 200) {
      const accessToken = res.data.accessToken;

      // Store the token in localStorage or a secure storage method
      localStorage.setItem('accessToken', accessToken);

      console.log("Access Token:", accessToken)
      console.log("Request Headers:", {
        'Authorization': `Bearer ${accessToken}`
      }); //make sure header has the correct value

      try {
        const response = await axios.get("http://localhost:5001/login/success", {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        console.log(response.data)
      } catch (error) {
        console.log(error.message)
      }


    } else {
      console.error('Login failed:', res.status);
      // Handle login failure, show error message, etc.
    }
    } catch (error) {
      console.log(error)
    }

    
  }

  return (
    <div className='login-container'>
        <div className='login-header login-signup-header'>
        <h1>Travelogue</h1>
            <ul className='signup-menu login-signup'>
                  <li><Link className="link" to="/">Home</Link></li>
                  <li><Link className="link" to="/about">About</Link></li>
                  <li><Link className="link" to="/blog">Blog</Link></li>
                  <li><Link className="link" to="/contact">Contact</Link></li>
                  <li><Link className="link" to="/signup">Signup</Link></li>
                </ul>
        </div>
        <div className='login-background'>
          <form className='login-signup-form'>
            <label>Login</label>
              <input type='email' name='email' placeholder='email'
                value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
              ></input>
              <input type='password' name='password' placeholder='password'
                value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
              ></input>
              <input onClick={handleLogin} type='button' className='submit' value="Go"></input>
              <p className='link'>Need an account? <Link className='link' to="/signup"> Sign up</Link></p>
          </form>
        </div>
      
    </div>
  )
}

export default Login
