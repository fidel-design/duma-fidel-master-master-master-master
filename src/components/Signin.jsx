import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const submit = async (e) => {

    e.preventDefault()

    setLoading("Please wait as we log you in...")
    setError("")

    try {

      // FORM DATA
      const data = new FormData()

      data.append("email", email)
      data.append("password", password)

      // API REQUEST
      const response = await axios.post(
        "http://dumafidel.alwaysdata.net/api/signin",
        data
      )

      console.log(response.data)

      setLoading("")

      // SUCCESS LOGIN
      if (response.data.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        )

        navigate("/")

      } else {

        setError(response.data.message)

      }

    } catch (error) {

      setLoading("")

      console.log(error)

      setError("Login failed. Please try again.")

    }

  }

  return (

    <div className='row mt-4 justify-content-center'>

      <div className='col-md-6 card shadow p-4'>

        <h2>Sign In</h2>

        <form onSubmit={submit}>

          {loading && (
            <p className='text-info'>{loading}</p>
          )}

          {error && (
            <p className='text-danger'>{error}</p>
          )}

          <input
            type="email"
            placeholder='Email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />

          <input
            type="password"
            placeholder='Password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br />

          <button
            className='btn btn-primary w-100'
            type='submit'
          >
            Sign In
          </button>

          <p className='mt-3'>
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>

        </form>

      </div>

    </div>

  )

}

export default Signin