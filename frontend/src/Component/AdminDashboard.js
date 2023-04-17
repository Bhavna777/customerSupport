import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from '../actions/reportAction'
import Loader from './Common/Loader';
import Navbar from './Common/Navbar';
import './AdminDashboard.css'
import ReportData from './Common/ReportData';
import { useState } from 'react';


const AdminDashboard = () => {

  const dispatch = useDispatch()

  const { loading, error, reports, reportsCount } = useSelector(state => state.reports)
  const [currentStatus, setStatus] = useState(true);


  useEffect(() => {

    if (error) {
      return alert(error)
    }

    dispatch(getReport())

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

              <button onClick={(e) => setStatus(true)}>Unassigned</button>
              <button onClick={(e) => setStatus(false)}>Assigned</button>

            </div>
            <div className="showingReports">
              {currentStatus ? "Showing unassigned reports" : "Showing assigned reports"}
            </div>


            <table id="reports">

              <tbody>
                <tr>
                  <th>Serial Number</th>
                  <th>Customers Username</th>
                  <th>Product Type</th>
                  <th>Issue Type</th>
                  <th>Date of Submission</th>
                  <th>More Details</th>
                </tr>

                {currentStatus
                  ? reports && reports.filter(item => !('assignTo' in item)).map((item, index) => {
                    return (
                      <tr key={item._id} className="assigned">
                        <ReportData item={item} index={index} />
                      </tr>
                    );
                  })
                  : reports && reports.filter((item, index) => ('assignTo' in item)).map((item, index) => {
                    return (
                      <tr key={item._id} className="assigned">
                        <ReportData item={item} index={index} />
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>

          </div>
        </div>
      )}

    </>
  )
}

export default AdminDashboard   