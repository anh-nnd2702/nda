const { Cv, Job, AppliedJob, AplActivity, AplAward, AplCertificate,
    AplEducation, AplExperience, AplProject, AplSkill, CvActivity, Company, City,
    CvAward, CvCertificate, CvEducation, CvExperience, CvProject, CvSkill, EducationLevel
} = require("../models")


const { sequelize } = require('../dbconnect.js');

exports.createNewApply = async (applyData) => {
    try {
        const cvId = applyData.cvId;
        const result = await sequelize.transaction(async (transaction) => {
            const cv = await Cv.findOne({
                where: {
                    cvId,
                },
                transaction,
            })

            if (!cv) {
                throw new Error('can not get cv');
            }
            const applyJobData = {
                jobId: applyData.jobId,
                coverLetter: applyData.coverLetter,
                applyTime: applyData.applyTime,
                applyStatus: applyData.applyStatus,
                candId: applyData.candId,
                position: cv.cvPosition,
                cvIntro: cv.cvIntro,
                cityId: cv.cityId,
                email: cv.email,
                phoneNumber: cv.phoneNumber,
                address: cv.address,
                cvImgUrl: cv.cvImgUrl,
                gender: cv.gender,
                dateOfBirth: cv.dateOfBirth,
                externalLink: cv.externalLink,
                fullName: cv.fullName
            }
            const appliedJob = await AppliedJob.create(applyJobData, { transaction });
            const jobApplied = await Job.findOne({
                where: {
                    jobId: appliedJob.jobId
                },
                attributes: ['companyId']
            })
            appliedJob.companyId = jobApplied.companyId;
            if (!appliedJob.applyId) {
                throw new Error('Cannot create appliedJob');
            }
            else {

                const cvSkills = await CvSkill.findAll({
                    where: {
                        cvId
                    },
                    transaction,
                });

                const cvEducations = await CvEducation.findAll({
                    where: {
                        cvId
                    },
                    transaction,
                });

                const cvExperiences = await CvExperience.findAll({
                    where: {
                        cvId
                    },
                    transaction,
                });

                const cvProjects = await CvProject.findAll({
                    where: {
                        cvId
                    },
                    transaction,
                });

                const cvCertificates = await CvCertificate.findAll({
                    where: {
                        cvId
                    },
                    transaction,
                });

                const cvAwards = await CvAward.findAll({
                    where: {
                        cvId
                    },
                    transaction,
                });

                const cvActivities = await CvActivity.findAll({
                    where: {
                        cvId
                    },
                    transaction,
                });

                if (cvActivities && cvActivities.length > 0) {
                    await Promise.all(
                        cvActivities.map(async (activity) => {
                            const { activityName, organization, startDate, endDate, activityDescribe } = activity;
                            await AplActivity.create({
                                applyId: appliedJob.applyId,
                                activityName,
                                organization,
                                startDate,
                                endDate,
                                activityDescribe
                            }, { transaction })
                        }),
                    );
                }

                if (cvAwards && cvAwards.length > 0) {
                    await Promise.all(
                        cvAwards.map(async (award) => {
                            const { awardTitle, organization, awardYear, awardDescribe } = award;
                            await AplAward.create({
                                applyId: appliedJob.applyId,
                                awardTitle,
                                organization,
                                awardYear,
                                awardDescribe
                            }, { transaction });
                        })
                    );
                }

                if (cvSkills && cvSkills.length > 0) {
                    await Promise.all(
                        cvSkills.map(async (skill) => {
                            const { skillName, skillLevel, skillDescribe } = skill;
                            await AplSkill.create(
                                {
                                    applyId: appliedJob.applyId,
                                    skillName,
                                    skillLevel,
                                    skillDescribe
                                },
                                { transaction }
                            );
                        })
                    );
                }

                if (cvCertificates && cvCertificates.length > 0) {
                    await Promise.all(
                        cvCertificates.map(async (certificate) => {
                            const { certTitle, organization, certDescribe, certDate, expireDate } = certificate;
                            await AplCertificate.create({
                                applyId: appliedJob.applyId,
                                certTitle,
                                organization,
                                certDate,
                                expireDate,
                                certDescribe
                            }, { transaction });
                        })
                    );
                }

                if (cvEducations && cvEducations.length > 0) {
                    await Promise.all(
                        cvEducations.map(async (education) => {
                            const { schoolName, major, eduLevelId, startDate, endDate, eduDescribe } = education;
                            await AplEducation.create({
                                applyId: appliedJob.applyId,
                                schoolName,
                                major,
                                eduLevelId,
                                startDate,
                                endDate,
                                eduDescribe
                            }, { transaction });
                        })
                    );
                }

                if (cvExperiences && cvExperiences.length > 0) {
                    await Promise.all(
                        cvExperiences.map(async (experience) => {
                            const { companyName, position, startDate, endDate, experDescribe } = experience;
                            await AplExperience.create({
                                applyId: appliedJob.applyId,
                                companyName,
                                position,
                                startDate,
                                endDate,
                                experDescribe
                            }, { transaction });
                        })
                    );
                }

                if (cvProjects && cvProjects.length > 0) {
                    await Promise.all(
                        cvProjects.map(async (project) => {
                            const { prjName, teamSize, prjPosition, startDate, endDate, prjDescribe } = project;
                            await AplProject.create({
                                applyId: appliedJob.applyId,
                                prjName,
                                teamSize,
                                startDate,
                                prjPosition,
                                prjDescribe,
                                endDate
                            }, { transaction });
                        })
                    );
                }
            }
            return appliedJob;
        });

        return result;

    }
    catch (error) {
        console.log(error);
        throw new Error("Can not apply job:", error);
    }
}

exports.updateAppliedStatus = async (applyId, statusUpdate) => {
    try {
        const appliedJob = await AppliedJob.findOne({
            where: { applyId: applyId }
        })

        if (!appliedJob) {
            throw new Error('Apply not found!');
        }

        appliedJob.applyStatus = statusUpdate;
        appliedJob.save();
        return appliedJob;
    }
    catch (error) {
        throw new Error("cannot get applied job", error);
    }
}

exports.getApplyById = async (applyId) => {
    try {
        const appliedJob = await AppliedJob.findOne({
            where: { applyId: applyId },
            include: [
                {
                    model: Job
                },
                {
                    model: City
                }
            ]
        })

        const aplEducations = await AplEducation.findAll({
            where: { applyId: applyId },
            include: {
                model: EducationLevel
            }
        })

        const aplCertificates = await AplCertificate.findAll({
            where: { applyId: applyId },
        })

        const aplExperiences = await AplExperience.findAll({
            where: { applyId: applyId },
        })

        const aplSkills = await AplSkill.findAll({
            where: { applyId: applyId },
        })

        const aplProjects = await AplProject.findAll({
            where: { applyId: applyId },
        })

        const aplActivities = await AplActivity.findAll({
            where: { applyId: applyId },
        })

        const aplAwards = await AplAward.findAll({
            where: { applyId: applyId },
        })

        return {
            appliedJob: {
                ...appliedJob.toJSON(),
                aplEducation: aplEducations, aplProject: aplProjects,
                aplCertificate: aplCertificates, aplSkill: aplSkills, aplExperience: aplExperiences,
                aplActivity: aplActivities, aplAward: aplAwards
            }
        }
    }
    catch (error) {
        throw new Error("cannot get applied job" + error);
    }
}

exports.getApplyByJobId = async (jobId) => {
    try {
        const appliedJob = await AppliedJob.findAll({
            where: { jobId: jobId },
            order: [['applyTime', 'DESC'], ['applyStatus', 'ASC']]
        });

        return appliedJob;
    }
    catch (error) {
        throw new Error("cannot get applied job", error);
    }
}

exports.getApplyByCandidate = async (candId) => {
    try {
        const appliedJobs = await AppliedJob.findAll({
            where: { candId: candId },
            include: {
                model: Job,
                attributes: {
                    exclude: ['jobDescribe', 'jobRequire', 'jobBenefit']
                },
                include: [
                    {
                        model: Company,
                        as: 'company',
                        attributes: {
                            exclude: ['email', 'companyPass', 'companyLicense', 'companyIntro', 'companyLink', 'isActive']
                        }
                    }, {
                        model: City,
                        as: 'City'
                    }
                ]
            },
            order: [['applyStatus', 'ASC'], ['applyTime', 'DESC']]
        })
        return appliedJobs;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

exports.getJobAppliedByCandidate = async (candId, jobId) => {
    try {

        const apply = await AppliedJob.findOne({
            where: {
                candId: candId,
                jobId: jobId
            }
        })

        return apply;
    } catch (error) {
        throw error;
    }
}


