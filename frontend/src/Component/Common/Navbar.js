import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, logout } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

  const { error, isAuthenticated, user } = useSelector(state => state.user);


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
  }


  useEffect(() => {


    if (error) {
      alert(error)
      dispatch(clearErrors())
    }

    if (!isAuthenticated) {
      navigate("/")
    }

  }, [dispatch, error, isAuthenticated])

  return (
    <>
      <div className='navbar'>
        <div>Navbar</div>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </>
  )
}

export default Navbar