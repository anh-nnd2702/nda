const {Job, SavedJob, Company, City} = require('../models');

exports.savejob = async (saveData) => {
    try {
        const checkSaved = await SavedJob.findOne({
            where: {
                jobId: saveData.jobId,
                candId: saveData.candId
            }
        })
        if (!checkSaved) {
            const savedJob = await SavedJob.create(saveData);
            return savedJob;
        }
        else {
            return checkSaved;
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("Can not save job:", error)
    }
}

exports.getSavedJobById = async (savedJobId) => {
    try {
        const savedJob = await SavedJob.findOne({
            where: { savedJobId: savedJobId },
            include: [
                {
                    model: Job
                }
            ]
        })
        return savedJob;
    }
    catch (error) {
        throw new Error("cannot get saved job", error);
    }
}

exports.getJobCandidateSaved = async (candId) => {
    try {
        const savedJob = await SavedJob.findAll({
            where: { candId: candId },
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
                }
            ],
            order: [['savedTime', 'DESC']]
        });

        return savedJob;
    }
    catch (error) {
        throw new Error("cannot get saved job", error);
    }
}

exports.getSavedJobByJobId = async (candId, jobId) => {
    try {
        const savedJob = await SavedJob.findOne({
            where: {
                candId: candId,
                jobId: jobId
            }
        });

        return savedJob;
    }
    catch (error) {
        throw new Error("cannot get saved job", error);
    }
}

exports.unSaveJob = async (savedJobId, candId) => {
    try {
        await SavedJob.destroy({
            where: {
                savedJobId: savedJobId,
                candId: candId
            }
        });
        return true;
    }
    catch (error) {
        throw new Error("cannot get saved job", error);
    }
}
