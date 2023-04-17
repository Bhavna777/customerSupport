import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userReducer,
    userDetailsReducer,
    employeesReducer,
} from "./reducers/userReducer";
import {
    reportReducer,
    newReportReducer,
    assignReportReducer,
    employeeAssignedReportReducer,
    updateReportReducer
} from "./reducers/reportReducer";

const reducer = combineReducers({
    user: userReducer,
    userDetails: userDetailsReducer,
    employees: employeesReducer,
    reports: reportReducer,
    newReport : newReportReducer,
    assignReport : assignReportReducer,
    employeeReports : employeeAssignedReportReducer,
    updateReport : updateReportReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store