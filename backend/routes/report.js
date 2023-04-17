const express = require('express')
const router = express.Router()

const {
    newReport,
    getReports,
    getSingleReport,
    assignReport,
    getAssignedReports,
    updateStatus
} = require('../controllers/reportControllers')


const { isAuthenticatedUser, isAdmin, authorizeRoles} = require('../middlewares/auth')



router.route('/report/new').post(isAuthenticatedUser, newReport)
router.route('/admin/reports').get(isAuthenticatedUser, isAdmin, getReports)
router.route('/report/:id').get(isAuthenticatedUser, authorizeRoles('employee'), getSingleReport)
router.route('/admin/assignReport/:id').put(isAuthenticatedUser, isAdmin, assignReport)
router.route('/employee/updateReportStatus/:id').put(isAuthenticatedUser, authorizeRoles('employee'), updateStatus)
router.route('/employee/reports').get(isAuthenticatedUser, authorizeRoles('employee'), getAssignedReports)


module.exports = router