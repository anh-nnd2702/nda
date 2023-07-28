const { Job, Company, EducationLevel, City, JobType, WorkField, WorkLevel } = require('../models/index.js');
const { Op } = require('sequelize');
const {checkEmpty} = require('../validations/checkEmpty.js');

const moment = require('moment');

exports.createJob = async (jobData) => {
    try {
        const job = await Job.create(jobData);
        return job;
    } catch (error) {
        throw error;
    }
};

exports.getAllJobs = async (cityId, jobTypeId, minExp, maxExp, minWage, workLevelId, workFieldId, keyword) => {
    try {
        const currentDate = moment().format('YYYY-MM-DD');
        const whereClause = {
            isActive: true,
            expireDate: {
                [Op.gte]: currentDate,
            },
        };

        if (cityId>0) {
            whereClause.cityId = cityId;
          }
      
          if (jobTypeId>0) {
            whereClause.jobTypeId = jobTypeId;
          }
      
          if (checkEmpty(minExp) && minExp>=0) {
            whereClause.experience = {
                [Op.between]: [minExp, maxExp],
            };
          }
      
          if (checkEmpty(maxExp) && minWage>=0) {
            whereClause.minWage = {
              [Op.gte]: minWage,
            };
          }

          if(minWage==-1){
            whereClause.minWage = 0,
            whereClause.maxWage = 0
          }
      
          if (workLevelId>0) {
            whereClause.workLevelId = workLevelId;
          }
      
          if (workFieldId>0) {
            whereClause.workFieldId = workFieldId;
          }

          if (checkEmpty(keyword)) {
            whereClause[Op.or] = [
              { jobTitle: { [Op.like]: `%${keyword}%` } },
              { jobDescribe: { [Op.like]: `%${keyword}%` } },
              { jobRequire: { [Op.like]: `%${keyword}%` } },
              { jobBenefit: { [Op.like]: `%${keyword}%` } }
            ];
          }

        const activeJob = await Job.findAll({
            attributes: {
                exclude: ['companyId'],
            },
            where: whereClause,
            include: [
                {
                    model: City
                },
                {
                    model: Company,
                    attributes: {
                        exclude: ['email', 'companyPass', 'companyLicense'],
                    },
                },
            ],
            order: [['modifiedTime', 'DESC']]
        });
        return activeJob;
    }
    catch (error) {
        console.error(error);
        throw new Error('Can not get active jobs');
    }
};

exports.getJobById = async (jobId) => {
    try {
        const currentDate = moment().format('YYYY-MM-DD');
        const jobById = await Job.findOne({
            attributes: {
                exclude: ['companyId'],
            },
            where: {
                jobId: jobId,
                isActive: true,
                expireDate: {
                    [Op.gte]: currentDate,
                },
            },
            include: [
                {
                    model: Company,
                    as: 'company',
                    attributes: {
                        exclude: ['email', 'companyPass', 'companyLicense'], // Bỏ qua các trường không cần lấy trong bảng company
                    }
                },
                {
                    model: City
                },
                {
                    model: JobType
                },
                {
                    model: WorkField
                },
                {
                    model: WorkLevel
                },
                {
                    model: EducationLevel
                }
            ]
        });
        if (!jobById) {
            throw new Error('Job not found')
        }
        return jobById;
    }
    catch (error) {
        throw new Error('Can not get Job by this ID')
    }
}

exports.getJobsByCompanyId = async (companyId) => {
    try {
        const currentDate = moment().format('YYYY-MM-DD');
        const job = await Job.findAll({
            where: {
                companyId: companyId,
                isActive: true,
                expireDate: {
                    [Op.gte]: currentDate,
                },
            },
            include: [
                {
                    model: Company,
                    as: 'company',
                    attributes: {
                        exclude: ['email', 'companyPass', 'companyLicense'], // Bỏ qua các trường không cần lấy trong bảng company
                    }
                },
                {
                    model: City
                }
            ],
            order: [['modifiedTime', 'DESC']]
        });
        return job;
    }
    catch (error) {
        throw new Error('Can not get Job by companyId')
    }
}

exports.updateJob = async (jobId, companyId, updatedData) => {
    try {
        const job = await Job.findOne({
            where: {
                jobId: jobId,
                companyId: companyId,
                isActive: true,
            },
        });

        if (!job) {
            throw new Error('Job not found');
        }

        job.jobTitle = updatedData.jobTitle ?? job.jobTitle;
        job.workAddress = updatedData.workAddress ?? job.workAddress;
        job.modifiedTime = updatedData.modifiedTime ?? job.modifiedTime;
        job.cityId = updatedData.cityId ?? job.cityId;
        job.jobDescribe = updatedData.jobDescribe ?? job.jobDescribe;
        job.eduLevelId = updatedData.eduLevelId ?? job.eduLevelId;
        job.jobTypeId = updatedData.jobTypeId ?? job.jobTypeId;
        job.isActive = updatedData.isActive ?? job.isActive;
        job.expireDate = updatedData.expireDate ?? job.expireDate;
        job.genderRequire = updatedData.genderRequire ?? job.genderRequire;
        job.workLevelId = updatedData.workLevelId ?? job.workLevelId;
        job.minWage = updatedData.minWage ?? job.minWage;
        job.maxWage = updatedData.maxWage ?? job.maxWage;
        job.experience = updatedData.experience ?? job.experience;
        job.hireCount = updatedData.hireCount ?? job.hireCount;
        job.workFieldId = updatedData.workFieldId ?? job.workFieldId;
        job.jobBenefit = updatedData.jobBenefit ?? job.jobBenefit;
        job.jobRequire = updatedData.jobRequire ?? job.jobRequire;

        await job.save();
        const updatedJob = job.toJSON();
        return updatedJob;
    } catch (error) {
        console.log(error)
        throw new Error('Error updating job');
    }
};
