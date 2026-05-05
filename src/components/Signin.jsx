import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Signin = () => {
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // function to post data in the database
  const submit = async (e) => {
    // prevent the form default behaviour of reloading
    e.preventDefault()
    // updating the loading message
    setLoading("Please wait as we log you in")
    // adding user inputs to the database
    try {
      // storing user inputs into data variables
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)

      // posting user into the database
      const response = await axios.post("http://dumafidel.alwaysdata.net/api/signin" , data)

      // updating the loading message to empty
      setLoading("")
      // checking if the user exists
      if (response.data.user) {
        // adding the user to the browser local storage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // redirecting user to the landing page
        navigate("/")

      }
      else{
        // if the log in fails 
        setError(response.data.message)
      }

    } catch (error) {
      // updating loading message
      setLoading("")
      // updating the error message
      setError(error.response.data.message)
    }
  }

  return (
    <div className='row mt-4 justify-content-center'>
        <div className='col-md-6 card shadow p-4'>
          <h2>Sign In</h2>
          <form onSubmit={submit}>
            {loading}
            {error}
            <input type="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value) 
            } /> <br />
            <input type="password" placeholder='Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
            <button className='btn btn-primary w-100' type='submit'>
              Sign In
            </button>
            <p>Don't have an account? <Link to= "/signup">Sign Up</Link>  </p>
            
          </form>

        </div>
    </div>
  )
}

export default Signin