import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Common/Loader';
import Navbar from './Common/Navbar';
import './AdminReportDetails.css'
import ReportData from './Common/ReportData';
import { getEmployees } from '../actions/userAction';
import { assignReport } from '../actions/reportAction'
import { useNavigate, useParams } from 'react-router-dom';


const AdminReportDetails = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();

  const { isAuthenticated, user } = useSelector(state => state.user);
  const { loading, error, employees } = useSelector(state => state.employees)
  const [assignTo, setAssignTo] = useState(user._id)

  const assignTask = (e) => {
    e.preventDefault()
    dispatch(assignReport(params.id, assignTo))
    alert("Report Assigned Successfully")
    navigate('/dashboard')
  }


  useEffect(() => {

    if (error) {
      return alert(error)
    }

    dispatch(getEmployees())

  }, [dispatch, error])




  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="assignTask">

            <h2>Assign Reports to the Employee</h2>

            <form onSubmit={assignTask}>
              <label htmlFor="employee">Choose an employee : </label>
              <select id="role" name="role"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}>
                {employees && employees.map((item) => {
                  return (
                    <option
                      key={item._id}
                      value={item._id}>
                      {item.username}
                    </option>
                  )
                })}

              </select>
              <input type="submit" />
            </form>
          </div>
        </>
      )
      }

    </>
  )
}

export default AdminReportDetails   