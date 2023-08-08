const { Company, City, Job, AppliedJob, WorkField } = require('../models')
const { Op } = require("sequelize");
const { checkEmpty } = require("../validations/checkEmpty.js");

exports.getCompanyById = async (companyId) => {
    try {
        const companyData = await Company.findOne({
            where: {
                Id: companyId
            },
            attributes: {
                exclude: ['companyPass']
            },
            include: {
                model: City
            }
        })
        return companyData;
    }
    catch (error) {
        throw new Error("Error getting company")
    }
}

exports.getCompanyLogo = async (companyId) => {
    try {
        const company = await Company.findOne({
            where: {
                Id: companyId
            },
            attributes: ['companyLogo']

        })
        return company.companyLogo;
    }
    catch (error) {
        throw new Error("Error getting Logo");
    }
}

exports.updateLogo = async (companyId, logoUrl) => {
    try {
        let company = await Company.findOne({
            where: { Id: companyId }
        });

        company.companyLogo = logoUrl;
        await company.save();

        return company.companyLogo;
    } catch (error) {
        throw new Error("Error updating company logo");
    }
}

exports.getCompanyJobs = async (companyId) => {
    try {
        const jobs = await Job.findAll({
            where: {
                companyId: companyId,
                isActive: true,
            },
            attributes: [`companyId`, `jobTitle`, `jobId`, `modifiedTime`, `expireDate`, 'hireCount'],
            order: [['expireDate', 'DESC'], ['modifiedTime', 'DESC']]
        });

        const companyJobs = [];
        for (const job of jobs) {
            const appliedJobs = await AppliedJob.findAll({
                where: { jobId: job.jobId }
            });

            const seenApplieds = await AppliedJob.findAll({
                where: { jobId: job.jobId, applyStatus: 1 },
            });

            const newApplieds = await AppliedJob.findAll({
                where: { jobId: job.jobId, applyStatus: 0 },
            });

            const rejectedApplieds = await AppliedJob.findAll({
                where: { jobId: job.jobId, applyStatus: 3 },
            });

            const appliedCount = appliedJobs.length;
            const newAppliedCount = newApplieds.length;
            const seenAppliedCount = seenApplieds.length;
            const rejectedAppliedCount = rejectedApplieds.length;

            const companyJob = {
                ...job.toJSON(),
                AppliedCount: appliedCount,
                newAppliedCount: newAppliedCount,
                seenAppliedCount: seenAppliedCount,
                rejectedAppliedCount: rejectedAppliedCount
            };

            companyJobs.push(companyJob);
        }

        return companyJobs;
    } catch (error) {
        console.log(error);
        throw new Error("Error getting company jobs");
    }
};

exports.getAllCompany = async (keyword) => {
    try {
        const whereClause = { isActive: true, isGranted: true };

        if (checkEmpty(keyword)) {
            whereClause[Op.or] = [
                { companyName: { [Op.like]: `%${keyword}%` } },
                { companyIntro: { [Op.like]: `%${keyword}%` } }
            ]
        }
        const companyList = await Company.findAll({
            attributes: {
                exclude: ['companyPhone', 'email', 'companyPass']
            },
            where: whereClause,
            include:
            {
                model: City
            }
        });
        return companyList;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error getting company");
    }
}

exports.adminGetAllCompany = async (keyword) => {
    try {
        const whereClause = {};

        if (checkEmpty(keyword)) {
            whereClause[Op.or] = [
                { companyName: { [Op.like]: `%${keyword}%` } },
                { companyIntro: { [Op.like]: `%${keyword}%` } }
            ]
        }
        const companyList = await Company.findAll({
            attributes: {
                exclude: ['companyPhone', 'email', 'companyPass']
            },
            where: whereClause,
            include:
            {
                model: City
            }
        });
        return companyList;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error getting company");
    }
}

exports.getCompanyStatus = async (companyId) => {
    try {
        const companyStatus = await Company.findOne({
            attributes: ['isActive', 'isGranted'],
            where: {
                Id: companyId
            }
        });
        return companyStatus;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error getting company");
    }
}

exports.updateLicense = async (companyId, companyLicenseUrl) => {
    try {
        let company = await Company.findOne({
            where: { Id: companyId }
        });

        company.companyLicense = companyLicenseUrl;
        await company.save();

        return company.companyLicense;
    } catch (error) {
        throw new Error("Error updating company logo");
    }
}

exports.updateCompanyStatus = async (Id, isActive, isGranted) => {
    try {
        let company = await Company.findOne({
            where: { Id }
        });
        if (company) {
            if (isActive == false && isGranted == true) {
                await Job.destroy({
                    where: {
                        companyId: company.Id
                    }
                })
            }

            company.isActive = isActive;
            company.isGranted = isGranted;

            await company.save();

            return company;
        }
    } catch (error) {
        throw new Error("Error updating company logo");
    }
}
