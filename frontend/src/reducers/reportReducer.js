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



// Get All report reducer 
export const reportReducer = (state = { reports: [] }, action) => {

    switch (action.type) {
        case ALL_REPORT_REQUEST:
            return {
                loading: true,
                reports: []
            }
        case ALL_REPORT_SUCCESS:
            return {
                loading: false,
                reports: action.payload.reports,
                reportsCount: action.payload.count
            }
        case ALL_REPORT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


// Get Single Report Details 

export const reportDetailsReducer = (state = { reportDetails: {} }, action) => {

    switch (action.type) {
        case REPORT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case REPORT_DETAILS_SUCCESS:
            return {
                loading: false,
                reportDetails: action.payload
            }
        case REPORT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}




// Create new Report Reducer

export const newReportReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
            };
        case NEW_REPORT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};






// Assign Report to Employee Reducer

export const assignReportReducer = (state = {}, action) => {
    switch (action.type) {
        case ASSIGN_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ASSIGN_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case ASSIGN_REPORT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};




// Update Report Status Reducer

export const updateReportReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_REPORT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};





// employeeAssignedReport to the employee
export const employeeAssignedReportReducer = (state = { reports: [] }, action) => {

    switch (action.type) {
        case EMPLOYEE_ASSIGNED_REPORT_REQUEST:
            return {
                loading: true,
                reports: []
            }
        case EMPLOYEE_ASSIGNED_REPORT_SUCCESS:
            return {
                loading: false,
                reports: action.payload.assignedReprts,
                reportsCount: action.payload.count
            }
        case EMPLOYEE_ASSIGNED_REPORT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}