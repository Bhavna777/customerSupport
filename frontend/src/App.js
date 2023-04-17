import { useEffect } from 'react';
import { loadUser } from './actions/userAction';
import store from './store'
import './App.css';
import Login from './Component/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './Component/NotFound'
import CustomerDashboard from './Component/CustomerDashboard'
import EmployeeDashboard from './Component/EmployeeDashboard'
import EmployeeReportDetails from './Component/EmployeeReportDetails'
import AdminReportDetails from './Component/AdminReportDetails'
import AdminDashboard from './Component/AdminDashboard'
import { useSelector } from 'react-redux';


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { isAuthenticated, user } = useSelector(state => state.user);


  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/dashboard" element={isAuthenticated ? (user.role === "customer" ? <CustomerDashboard /> : (user.isAdmin ? <AdminDashboard /> : <EmployeeDashboard />)) : (<Navigate replace to={"/"} />)} />
          <Route path="report/:id" element={isAuthenticated ? (user.role === "customer" ? "Not Authorized" : (user.isAdmin ? <AdminReportDetails /> : <EmployeeReportDetails />)) : (<Navigate replace to={"/"} />)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
