const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
    getUserProfile,
    logout,
    getUserDetails,
    getEmployees,
} = require('../controllers/authControllers')


const { isAuthenticatedUser, authorizeRoles, isAdmin } = require('../middlewares/auth')

router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/user/:id').get(isAuthenticatedUser, authorizeRoles('employee'), getUserDetails)
router.route('/admin/employees').get(isAuthenticatedUser, isAdmin, getEmployees)
router.route('/logout').get(logout)

module.exports = router