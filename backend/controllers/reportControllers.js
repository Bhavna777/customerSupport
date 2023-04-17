const Report = require('./../models/report')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');




// Create Nee Report ---> /api/v1/report/new

exports.newReport = catchAsyncErrors(async (req, res, next) => {

    req.body.createdBy = req.user.id;

    const report = await Report.create(req.body)

    res.status(201).json({
        success: true,
        report
    })
})



// Get ALl Reports ---> /api/v1/admin/reports ---> Admin

exports.getReports = catchAsyncErrors(async (req, res) => {

    const reports = await Report.find();

    res.status(200).json({
        success: true,
        count: reports.length,
        reports
    })
})



// Get Single Report ---> /api/v1/report/:id

exports.getSingleReport = catchAsyncErrors(async (req, res, next) => {
    const report = await Report.findById(req.params.id)

    if (!report) {
        return next(new ErrorHandler('Report not found', 404))
    }

    res.status(200).json({
        success: true,
        report
    })
})




// assignReport to the employee ---> api/v1/admin/report/:id


exports.assignReport = async (req, res, next) => {
    try {
        const reportId = req.params.id;
        const { assignTo } = req.body;

        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        report.assignTo = assignTo;

        await report.save();

        res.json({ message: 'Assigned Report successfully', report });
    } catch (error) {
        next(error);
    }
};





// Get All Assigned Reports  ---> /api/v1/employee/reports

exports.getAssignedReports = catchAsyncErrors(async (req, res, next) => {
    const assignedReprts = await Report.find({assignTo : req.user.id})

    res.status(200).json({
        success: true,
        count: assignedReprts.length,
        assignedReprts
    })
})



exports.updateStatus = async (req, res, next) => {
    try {
        const reportId = req.params.id;
        const { status } = req.body;

        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        report.status = status;

        await report.save();

        res.json({ message: 'Status updated successfully', report });
    } catch (error) {
        next(error);
    }
};