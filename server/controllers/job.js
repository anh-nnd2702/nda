const { validationResult } = require('express-validator');
const Job = require('../models/job.js');
const jobService = require('../services/job.js');

exports.getAllJobs = async (req, res) => {
    try {
        const { cityId, jobTypeId, minExp, maxExp, minWage, workLevelId, workFieldId, keyword } = req.query;
        const jobs = await jobService.getAllJobs(cityId, jobTypeId, minExp, maxExp, minWage, workLevelId, workFieldId, keyword);
        return res.status(200).json({ jobs });
    }
    catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: 'internal server error' });
    }
}

exports.getJobById = async (req, res) => {
    const { jobId } = req.params;
    const {isAdmin} = req.query;
    try {
        if(isAdmin=='true'){
            const job = await jobService.adminGetJobById(jobId);
            return res.status(200).json({ job });
        }
        else{
            const job = await jobService.getJobById(jobId);
            return res.status(200).json({ job });
        }
        
    } catch (error) {
        console.error('Error retrieving job by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getJobByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    try {
        const job = await jobService.getJobsByCompanyId(companyId);
        return res.status(200).json({ job });
    } catch (error) {
        console.error('Error retrieving job by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.createJob = async (req, res) => {
    try {
        const { error } = validationResult(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const companyId = req.Id;
        const isActive = true;
        const { jobTitle, workAddress, cityId, jobDescribe, jobRequire, jobBenefit, eduLevelId, jobTypeId, expireDate, genderRequire, workLevelId, minWage, maxWage, experience, hireCount, workFieldId } = req.body;
        const modifiedTime = new Date();
        const jobData = {
            jobTitle,
            companyId,
            workAddress,
            cityId,
            jobDescribe,
            jobRequire,
            jobBenefit,
            eduLevelId,
            jobTypeId,
            isActive,
            expireDate,
            genderRequire,
            workLevelId,
            minWage,
            maxWage,
            experience,
            hireCount,
            workFieldId,
            modifiedTime
        };

        const job = await jobService.createJob(jobData);

        return res.status(201).json({ job, message: 'job created successfull' });
    } catch (error) {
        console.error('Error creating job:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateJob = async (req, res) => {
    const { jobId } = req.params;
    const companyId = req.Id;
    const { jobTitle, workAddress, cityId, jobDescribe, jobRequire, jobBenefit, eduLevelId, jobTypeId, expireDate, genderRequire, workLevelId, minWage, maxWage, experience, hireCount, workFieldId } = req.body;
    const modifiedTime = new Date();
    const jobData = {
        jobTitle,
        companyId,
        workAddress,
        cityId,
        jobDescribe,
        jobRequire,
        jobBenefit,
        eduLevelId,
        jobTypeId,
        expireDate,
        genderRequire,
        workLevelId,
        minWage,
        maxWage,
        experience,
        hireCount,
        workFieldId,
        modifiedTime
    };
    try {
        console.log(jobId, companyId, jobData);
        const updatedJob = await jobService.updateJob(jobId, companyId, jobData);
        return res.status(200).json({ job: updatedJob, message: 'job update successful' });
    } catch (error) {
        console.error('Error updating job:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateJobStatus = async (req, res) => {
    const { jobId } = req.params;
    const {isActive} = req.body;
    try {
        const deactivatedJob = await jobService.updateJobStatus(jobId, isActive);
        if(deactivatedJob){
            return res.status(200).json({ message: 'job deactivate successful' });
        }
    } catch (error) {
        console.error('Error updating job:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteJobById = async (req, res) => {
    const { jobId } = req.params;
    const companyId = req.Id;
    try {
        const deletedJob = await jobService.deleteJob(jobId, companyId);
        return res.status(200).json({ message: 'job delete successful' });
    } catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

