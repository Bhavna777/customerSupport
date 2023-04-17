import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../../actions/userAction';

const ReportData = ({ item, index }) => {

    const dispatch = useDispatch()

    const { error, userDetails } = useSelector(state => state.userDetails)


    useEffect(() => {

        if (error) {
            return alert(error)
        }
        

        dispatch((getUserDetails(item.createdBy)))

    }, [dispatch, error, item.createdBy])

    return (
        <>
            <td>{index+1}</td>
            <td>{userDetails.username}</td>
            <td>{item.productType}</td>
            <td>{item.issueType}</td>
            <td>{item.createdAt}</td>
            <td>{item.status}</td>
            <td><Link to={`/report/${item._id}`}>More Details</Link></td>
        </>
    )
}

export default ReportData