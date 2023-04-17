import React, { useEffect, useState } from 'react'
import Loader from './Common/Loader';
import Navbar from './Common/Navbar'
import EmployeeReportData from './Common/EmployeeReportData'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeAssignedReports } from '../actions/reportAction';
import './AdminDashboard.css'

const EmployeeDashboard = () => {

  const dispatch = useDispatch()

  const { loading, error, reports, reportsCount } = useSelector(state => state.employeeReports)
  const [currentStatus, setStatus] = useState('In Progress');


  useEffect(() => {

    if (error) {
      return alert(error)
    }

    dispatch(getEmployeeAssignedReports())

  }, [dispatch, error])


  return (
    <>
      <Navbar />


      {loading ? (
        <Loader />
      ) : (
        <div className='getAllReports container'>
          <div className='row'>
            <div className="btns">

              <button onClick={(e) => setStatus('In Progress')}>In Progress</button>
              <button onClick={(e) => setStatus('On Hold')}>On Hold</button>
              <button onClick={(e) => setStatus('Completed')}>Completed</button>

            </div>

            <div className='showingReports'>
              {(currentStatus === 'In Progress') ? "Showing in progress reports"
                : (currentStatus === 'On Hold') ? "Showing on hold reports" : 'Showing Completed Reports'}
            </div>


            <table id="reports">

              <tbody>
                <tr>
                  <th>Serial Number</th>
                  <th>Customers Username</th>
                  <th>Product Type</th>
                  <th>Issue Type</th>
                  <th>Date of Submission</th>
                  <th>Status</th>
                  <th>More Details</th>
                </tr>

                {(currentStatus === 'In Progress') ? reports && reports.filter(item => (item.status === 'In Progress')).map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <EmployeeReportData item={item} index={index} />
                    </tr>
                  );
                })
                  : (currentStatus === 'On Hold') ? reports && reports.filter(item => (item.status === 'On Hold')).map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <EmployeeReportData item={item} index={index} />
                      </tr>
                    );
                  }) : reports && reports.filter(item => (item.status === 'Completed')).map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <EmployeeReportData item={item} index={index} />
                      </tr>
                    );
                  })}

              </tbody>
            </table>

          </div>
        </div>
      )}


    </>
  )
}

export default EmployeeDashboard  