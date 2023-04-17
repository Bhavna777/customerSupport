const sendRes = (statusCode, status, msg, res) => {
    
    res.status(statusCode).json({
        success: status,
        message: msg
    })

}

module.exports = sendRes;