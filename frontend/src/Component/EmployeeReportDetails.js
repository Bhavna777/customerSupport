import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Common/Loader';
import Navbar from './Common/Navbar';
import './AdminReportDetails.css'
import ReportData from './Common/ReportData';
import { getEmployees } from '../actions/userAction';
import { assignReport, updateReport } from '../actions/reportAction'
import { useNavigate, useParams } from 'react-router-dom';


const EmployeeReportDetails = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();

  const { isAuthenticated, user } = useSelector(state => state.user);
  const [currentStatus, setStatus] = useState("In Progress")

  const assignTask = (e) => {
    e.preventDefault()
    dispatch(updateReport(params.id, currentStatus))
    alert("Status Updated Successfully")
    navigate('/dashboard')
  }


  return (
    <>
      <div className="assignTask">

        <h2>Update status of the report</h2>

        <form onSubmit={assignTask}>
          <label htmlFor="employee">Choose status : </label>
          <select id="role" name="role"
            value={currentStatus}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    </>
  )
}

export default EmployeeReportDetails   