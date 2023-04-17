const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken');
const sendRes = require('../utils/sendRes');


// Register User ---> 

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { role, username, password } = req.body;
    const user = await User.create({
        role,
        username,
        password
    })

    sendToken(user, 200, res)
})


// login user ---> /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { role, username, password } = req.body;

    if (!role || !username || !password) {
        sendRes(404, false, 'Fields are missings', res);
    }

    const user = await User.findOne({ username, role }).select('+password')

    if (!user) {
        sendRes(404, false, 'Invalid Credentials', res);
    }


    const isPasswordMatched = await user.comparePassword(password)


    if (role === 'employee' && isPasswordMatched) {
        sendToken(user, 200, res)
    } else if (role === 'customer' && isPasswordMatched) {
        sendToken(user, 200, res)
    } else {
        sendRes(404, false, 'Invalid Credentials', res);
    }
})



// Get Current User Profile :--> /api/v1/me

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})



// Get Single User ---> /api/v1/user/:id 
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})


// Get All Employee List ---> /api/v1/employees

exports.getEmployees = catchAsyncErrors(async (req, res, next) => {
    const employees = await User.find({role : 'employee'})

    res.status(200).json({
        success: true,
        count: employees.length,
        employees
    })
})


// Logout ---> /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out Successfully'
    })
})