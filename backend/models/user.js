const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        maxlength: [30, 'Your name cannot exceed 30 characters'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    role: {
        type: String,
        default : 'customer'
    },
    isAdmin : {
        type: Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Password Encryption 

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// jwt token 

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


// Reset Token 

userSchema.method.getResetPasswordToken = function () {

    // generate token 

    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash and set to reset password token

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // set token expire time 

    this.resetPasswordExpire = Date.now() + 30*60*1000

}


module.exports = mongoose.model('User', userSchema)