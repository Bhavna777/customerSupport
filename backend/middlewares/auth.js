const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require('../models/user')

exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next ) => {
    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler('You have to login first'))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)

    next()
})


exports.authorizeRoles = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access the resources!`, 403)
            )
        }
        next()
    }
}


exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized access' });
    }
}