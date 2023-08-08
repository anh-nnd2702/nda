const { ReportJob, Job, Company, Candidate, City } = require('../models');

exports.createReport = async (reportData) => {
    try {
        const reportCreated = await ReportJob.create(reportData)
        return reportCreated;
    }
    catch (error) {
        throw error;
    }
}

exports.updateReportByJobId = async (jobId, newStatus) =>{
    try{
        const reports = await ReportJob.findAll({
            where: {
                jobId: jobId
            }
        })

        if (reports && reports.length > 0) {
            for (const report of reports) {
              await report.update({
                reportStatus: newStatus,
              });
            }
        }

        return true;
    }
    catch (error) {
        throw error;
    }
}

exports.getAllReport = async () => {
    try {
        const reportList = await ReportJob.findAll({
            include: [
                {
                    model: Job,
                    where: {
                        isActive: true,
                    },
                    attributes: {
                        exclude: ['jobDescribe', 'jobRequire', 'jobBenefit']
                    },
                    include: [{
                        model: Company,
                        attributes: {
                            exclude: ['companyIntro', 'companyPhone', 'email', 'companyLicense', 'companyPass', 'companyLink']
                        }
                    },
                    {
                        model: City
                    }
                    ]
                },
                {
                    model: Candidate,
                    attributes: ['fullName', 'email', 'phoneNumber']
                }
            ],
            order: [['reportStatus', 'ASC'], ['reportTime', 'DESC']]
        })
        return reportList;
    }
    catch (error) {
        throw error;
    }
}

exports.getReportById = async (reportId) => {
    try {
        const reportJob = await ReportJob.findOne({
            where: {
                reportId
            },
            include: [
                {
                    model: Job,
                    attributes: {
                        exclude: ['jobDescribe', 'jobRequire', 'jobBenefit']
                    },
                    include: [{
                        model: Company,
                        attributes: {
                            exclude: ['companyIntro', 'companyPhone', 'email', 'companyLicense', 'companyPass', 'companyLink']
                        }
                    },
                    {
                        model: City
                    }
                    ]
                },
                {
                    model: Candidate,
                    attributes: ['fullName', 'email', 'phoneNumber']
                }
            ],
        })
        return reportJob;
    }
    catch (error) {
        throw error;
    }
}

exports.updateReportStatus = async (reportId, newStatus) => {
    try {
        const reportedJob = ReportJob.findOne({
            where: {
                reportId
            },
        });
        if (reportedJob) {
            reportedJob.reportStatus = newStatus;
            const savedReport = await reportedJob.save();
            return savedReport;
        }
        else throw new Error("can not find report", error);
    }
    catch (error) {
        throw error;
    }

}

exports.deleteReport = async (reportId) => {
    try {
        await ReportJob.destroy({
            where: {
                reportId
            }
        });
        return true;
    }
    catch (error) {
        throw error;
    }
}

exports.getReportByJobId = async (jobId) =>{
    try {
        const reports = await ReportJob.findAll({
            where: {
                jobId: jobId
            }
        });
        return reports;
    }
    catch (error) {
        throw error;
    }
}
