const {ReportJob, Job, Company, Candidate, City} = require('../models');

exports.createReport = async (reportData) =>{
    try{
        const reportCreated = await ReportJob.create(reportData)
        return reportCreated;
    }
    catch(error){
        throw error;
    }
}

exports.getAllReport = async () =>{
    try{
        const reportList = await ReportJob.findAll({
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
            order:[['reportStatus', 'DESC'], ['reportTime', 'DESC']]
        })
        return reportList;
    }
    catch(error){
        throw error;
    }
}

exports.getReportById = async (reportId) =>{
    try{
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
    catch(error){
        throw error;
    }
}

exports.updateReportStatus = async (jobId) =>{
    try{
        const reportedJob = ReportJob.findOne({
            where: {
                reportId
            },
        });

        reportedJob.reportStatus = 1;
        const savedReport = await reportedJob.save();
        return savedReport;
    }
    catch(error){
        throw error;
    }

}

