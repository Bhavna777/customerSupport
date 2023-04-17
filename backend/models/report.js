const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const reportSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true
    },
    issueType: [
        {
            type: String,
            required: true
        }
    ],
    issueDesc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "In Progress",
        enum: {
            values: [
                'In Progress',
                'On Hold',
                'Completed'
            ],
            message: 'Please select correct option'
        }

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    assignTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})



module.exports = mongoose.model('Report', reportSchema)