import React, { useEffect, useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login } from './../actions/userAction'
import { useNavigate } from 'react-router-dom'



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isAuthenticated } = useSelector(state => state.user)

  const [loginRole, setRole] = useState("customer")
  const [loginUsername, setUsername] = useState("")
  const [loginPassword, setPassword] = useState("")


  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginRole, loginUsername, loginPassword))
  }



  useEffect(() => {
    if (error) {
      alert(error)
      dispatch(clearErrors())
    }

    if (isAuthenticated) {
      navigate("/dashboard")
    }

  }, [dispatch, error, isAuthenticated])


  return (
    <>
      <div className="loginForm">
        <h1>Login Form</h1>
        <form onSubmit={loginSubmit}>
          <div className="form-group">
            <label htmlFor="role">Select Role:</label>
            <select id="role" name="role"
              value={loginRole}
              onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text"
              id="username"
              name="username"
              required
              value={loginUsername}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password"
              id="password"
              name="password"
              required
              value={loginPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" />
          </div>
        </form>
        <p>1. role :- customer, username :- customer, password :- customer</p>
        <p>2. role :- employee, username :- employee1, password :- employee1</p>
        <p>3. role :- employee, username :- employee2, password :- employee2</p>
      </div>

    </>
  )
}

export default Login