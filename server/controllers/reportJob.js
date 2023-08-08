const ReportServices = require('../services/reportJob.js');

exports.createReport = async (req, res) =>{
    try{
        const candId = req.Id;
        const {jobId} = req.params;
        const {reportDescribe} = req.body;
        const reportTime = new Date();
        const reportData = {
            candId: candId,
            jobId: jobId,
            reportDescribe: reportDescribe,
            reportStatus: 0,
            reportTime: reportTime
        }
        console.log(reportData);
        const reported = await ReportServices.createReport(reportData);
        if(reported){
            return res.status(200).json({message: "Báo cáo thành công", reported: reported});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "internal server error"})
    }
}

exports.getReportById = async (req, res) =>{
    try{
        const {reportId} = req.params;
        const reportJob = await ReportServices.getReportById(reportId);
        if(reportJob){
            return res.status(200).json({reportJob: reportJob});
        }
    }
    catch(error)
    {
        return res.status(500).json({message: "internal server error"})
    }
}

exports.getAllReport = async (req, res) =>{
    try{
        const reportList = await ReportServices.getAllReport();
        if(reportList){
            return res.status(200).json({reportJobs: reportList});
        }
    }
    catch(error)
    {
        return res.status(500).json({message: "internal server error"})
    }
}

exports.updateReportStatus = async (req, res) =>{
    try{
        const {reportId} = req.params;
        const {newStatus} = req.body;
        const updatedReport = await ReportServices.updateReportStatus(reportId, newStatus);
        if(updatedReport){
            return res.status(200).json({reportJob: updatedReport, message: "Update report status success!"});
        }
    }
    catch(error)
    {
        return res.status(500).json({message: "internal server error"})
    }
}

exports.updateReportStatusByJob = async (req, res) =>{
    try{
        const {jobId} = req.params;
        const {newStatus} = req.body;
        const updatedReport = await ReportServices.updateReportByJobId(jobId, newStatus);
        if(updatedReport){
            return res.status(200).json({reportJob: updatedReport, message: "Update report status success!"});
        }
    }
    catch(error)
    {
        return res.status(500).json({message: "internal server error"})
    }
}

exports.deleteReportById = async (req, res) =>{
    try{
        const {reportId} = req.params;
        const deleted = await ReportServices.deleteReport(reportId);
        if(deleted){
            return res.status(200).json({deleted: deleted, message: "Delete report status success!"});
        }
    }
    catch(error)
    {
        return res.status(500).json({message: "internal server error"})
    }
}
