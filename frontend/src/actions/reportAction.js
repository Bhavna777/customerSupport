import axios from 'axios'
import {
    ALL_REPORT_REQUEST,
    ALL_REPORT_SUCCESS,
    ALL_REPORT_FAIL,
    NEW_REPORT_REQUEST,
    NEW_REPORT_SUCCESS,
    NEW_REPORT_FAIL,
    REPORT_DETAILS_REQUEST,
    REPORT_DETAILS_SUCCESS,
    REPORT_DETAILS_FAIL,
    ASSIGN_REPORT_REQUEST,
    ASSIGN_REPORT_SUCCESS,
    ASSIGN_REPORT_FAIL,
    EMPLOYEE_ASSIGNED_REPORT_REQUEST,
    EMPLOYEE_ASSIGNED_REPORT_SUCCESS,
    EMPLOYEE_ASSIGNED_REPORT_FAIL,
    UPDATE_REPORT_REQUEST,
    UPDATE_REPORT_SUCCESS,
    UPDATE_REPORT_FAIL,
    CLEAR_ERRORS
} from './../constants/reportConstants'

export const getReport = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_REPORT_REQUEST
        })

        const { data } = await axios.get("/api/v1/admin/reports")

        dispatch({
            type: ALL_REPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_REPORT_FAIL,
            payload: error.response.data.message,
        })
    }
}



export const getReportDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: REPORT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/report/${id}`)

        dispatch({
            type: REPORT_DETAILS_SUCCESS,
            payload: data.report
        })
    } catch (error) {
        dispatch({
            type: REPORT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}



// Create New Report 

 
export const createNewReport = (productType, issueType, issueDesc) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REPORT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/report/new`,
            { productType, issueType, issueDesc },
            config
        );

        dispatch({
            type: NEW_REPORT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REPORT_FAIL,
            payload: error.response.data.message,
        });
    }
};





// Assign Report to employee
export const assignReport = (id, assignTo) => async (dispatch) => {
    try {
        dispatch({ type: ASSIGN_REPORT_REQUEST });


        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `/api/v1/admin/assignReport/${id}`,
            { assignTo },
            config
        );

        dispatch({
            type: ASSIGN_REPORT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: ASSIGN_REPORT_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Update Report Status 
export const updateReport = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REPORT_REQUEST });


        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `/api/v1/employee/updateReportStatus/${id}`,
            { status },
            config
        );

        dispatch({
            type: UPDATE_REPORT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_REPORT_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Get All reports assigned to an employee 

export const getEmployeeAssignedReports = () => async (dispatch) => {
    try {
        dispatch({
            type: EMPLOYEE_ASSIGNED_REPORT_REQUEST
        })

        const { data } = await axios.get("/api/v1/employee/reports")

        dispatch({
            type: EMPLOYEE_ASSIGNED_REPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: EMPLOYEE_ASSIGNED_REPORT_FAIL,
            payload: error.response.data.message,
        })
    }
}


// It will use for clear errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
