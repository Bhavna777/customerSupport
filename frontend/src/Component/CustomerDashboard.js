import React, { useEffect, useState } from 'react';
import './CustomerDashboard.css'
import Navbar from './Common/Navbar'
import { useNavigate } from 'react-router-dom';
import { clearErrors, createNewReport } from '../actions/reportAction';
import { useDispatch, useSelector } from 'react-redux';

const CustomerDashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { isAuthenticated, user } = useSelector(state => state.user);
  const { loading, error, newReport } = useSelector(state => state.newReport)


  const [productType, setProductType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issueDesc, setIssueDesc] = useState('');


  const newReportSubmit = (e) => {
    e.preventDefault()
    dispatch(createNewReport(productType, issueType, issueDesc))
    alert("Your Report Register Successfully")
    navigate('/dashboard')
    setProductType('')
    setIssueType('')
    setIssueDesc('')
  }


  useEffect(() => {

    if(error){
      alert(error)
    }

    if (isAuthenticated) {
      navigate("/dashboard")
    }

  }, [dispatch, alert, isAuthenticated])




  const getIssue = (productType) => {
    switch (productType) {
      case 'Mobile Phone':
        return ['Broken Screen', 'Faulty Camera', 'Overheating Issue'];
      case 'TV':
        return ['Damaged Screen', 'Discoloration Of Screen', 'Adapter Issues'];
      case 'Refrigerator':
        return ['Panel Controls Broken', 'Compressor Not Working', 'Unable To Turn On'];
      case '“Washing Machine':
        return ['Water overflowing', 'Motor not working']
      default:
        return [];
    }
  };

  return (
    <div className='fileComplaint'>
      <Navbar />
      <h1>Register Complaint</h1>
      <form onSubmit={newReportSubmit}>
        <label>
          ProductType:
          <select value={productType} onChange={(e) => setProductType(e.target.value)}>
            <option value="" disabled>--- Select Product ---</option>
            <option value="Mobile Phone">Mobile Phone</option>
            <option value="TV">TV</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="“Washing Machine">“Washing Machine</option>
          </select>
        </label>

        <label>
          IssueType:
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
            <option value="" disabled>--- Select Issue ---</option>
            {getIssue(productType).map((issueType) => (
              <option key={issueType} value={issueType}>
                {issueType}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="issueDesc">
          Description: <br />
          <textarea className='issueDesc' name="" id="" cols="30" rows="10" value={issueDesc} onChange={(e) => setIssueDesc(e.target.value)}></textarea>
        </label>

        <div className='submit'>
          <button>Submit</button>
        </div>

      </form>
    </div>
  );
};

export default CustomerDashboard;
