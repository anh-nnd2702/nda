const {Cv, CvCertificate, CvEducation, CvExperience, 
    CvProject, CvSkill, CvActivity, CvAward} = require('../models')

const {sequelize} = require('../dbconnect.js');

const checkValid = (inputValue) => {
    if (inputValue === null || inputValue === 'null' || inputValue === undefined || inputValue === "undefined") {
        return false;
    }
    else {
        return true;
    }
}

exports.findAllMainCv = async () =>{
    try {
        const allCv = await Cv.findAll({
            where: { 
                isMainCv : true
            }
        })
        return allCv;
    }
    catch (error) {
        throw new Error("error getting cv", error)
    }
}

exports.createCV = async (candId, cvData) => {
    const { cvSkill, cvProject, cvEducation, cvExperience, cvCertificate, cvAward, cvActivity } = cvData;
    const modifiedDate = new Date();
    let transaction;

    try {
        // Bắt đầu transaction
        transaction = await sequelize.transaction();
        // Tạo mới CV
        let theMainCv = cvData.isMainCv;
        const mainCv = await Cv.findOne({
            where: {
                candId: candId,
                isMainCv: true
            }
        })
        if(!mainCv){
            theMainCv = true
        }
        else{
            theMainCv = false
        }
        const createdCV = await Cv.create(
            {
                candId: candId,
                cvTitle: cvData.cvTitle,
                fullName: cvData.fullName,
                email: cvData.email,
                phoneNumber: cvData.phoneNumber,
                cvPosition: cvData.cvPosition,
                workFieldId: cvData.workFieldId,
                cvIntro: cvData.cvIntro,
                cityId: cvData.cityId,
                isMainCv: theMainCv,
                address: cvData.address,
                gender: cvData.gender,
                cvImgUrl: cvData.cvImgUrl,
                dateOfBirth: cvData.dateOfBirth,
                externalLink: cvData.externalLink,
                modifiedDate: modifiedDate
            },
            { transaction }
        );

        // Tạo mới các bản ghi liên quan
        if (cvSkill) {
            await createCvSkills(createdCV.cvId, cvSkill, transaction);
        }
        if (cvProject) {
            await createCvProjects(createdCV.cvId, cvProject, transaction);
        }
        if (cvEducation) {
            await createCvEducations(createdCV.cvId, cvEducation, transaction);
        }
        if (cvExperience) {
            await createCvExperiences(createdCV.cvId, cvExperience, transaction);
        }
        if (cvCertificate) {
            await createCvCertificates(createdCV.cvId, cvCertificate, transaction);
        }
        if(cvAward) {
            await createCvAwards(createdCV.cvId, cvAward, transaction);
        }
        if(cvActivity){
            await createCvActivity(createdCV.cvId, cvActivity, transaction);
        }

        // Commit transaction
        await transaction.commit();

        return createdCV;
    } catch (error) {
        // Rollback transaction nếu có lỗi
        if (transaction) await transaction.rollback();
        throw error;
    }
};

const createCvSkills = async (cvId, cvSkills, transaction) => {
    return Promise.all(
        cvSkills.map(async (skill) => {
            const { skillName, skillLevel, skillDescribe } = skill;
            await CvSkill.create({ cvId, skillName, skillLevel, skillDescribe }, { transaction });
        })
    );
};

const createCvCertificates = async (cvId, cvCertificates, transaction) => {
    return Promise.all(
        cvCertificates.map(async (certificate) => {
            const { certTitle, organization, certDate, expireDate, certDescribe } = certificate;
            await CvCertificate.create({ cvId, certTitle, organization, certDate, expireDate, certDescribe }, { transaction });
        })
    );
};

const createCvEducations = async (cvId, cvEducations, transaction) => {
    return Promise.all(
        cvEducations.map(async (education) => {
            const { schoolName, major, eduLevelId, startDate, endDate, eduDescribe } = education;
            await CvEducation.create({ cvId, schoolName, major, eduLevelId, startDate, endDate, eduDescribe }, { transaction });
        })
    );
};

const createCvExperiences = async (cvId, cvExperiences, transaction) => {
    return Promise.all(
        cvExperiences.map(async (experience) => {
            const { companyName, position, startDate, endDate, experDiscribe } = experience;
            await CvExperience.create({ cvId, companyName, position, startDate, endDate, experDiscribe }, { transaction });
        })
    );
};

const createCvProjects = async (cvId, cvProjects, transaction) => {
    return Promise.all(
        cvProjects.map(async (project) => {
            const { prjName, teamSize, startDate, endDate, prjPosition, prjDescribe } = project;
            await CvProject.create({ cvId, prjName, teamSize, startDate, endDate, prjPosition, prjDescribe }, { transaction });
        })
    );
};

const createCvAwards = async (cvId, cvAwards, transaction) => {
    return Promise.all(
        cvAwards.map(async (cvAward) => {
            const { awardTitle, organization, awardYear, awardDescribe } = cvAward;
            await CvAward.create({ cvId, awardTitle, organization, awardYear, awardDescribe}, { transaction });
        })
    );
};

const createCvActivity = async (cvId, cvActivities, transaction)=>{
    return Promise.all(
        cvActivities.map(async (cvActivity) =>{
            const {activityName, organization, startDate, endDate, activityDescribe} = cvActivity;
            await CvActivity.create({cvId, activityName, organization, startDate, endDate, activityDescribe}, {transaction});
        })
    );
};

exports.getCv = async (cvId, candId) => {
    try {
        const cvData = await Cv.findOne({
            where: {
                cvId
            }            
        });

        const cvSkills = await CvSkill.findAll({
            where: {
                cvId
            }
        });

        const cvEducations = await CvEducation.findAll({
            where: {
                cvId
            }
        });

        const cvExperiences = await CvExperience.findAll({
            where: {
                cvId
            }
        });

        const cvProjects = await CvProject.findAll({
            where: {
                cvId
            }
        });

        const cvCertificates = await CvCertificate.findAll({
            where: {
                cvId
            }
        });

        const cvAwards = await CvAward.findAll({
            where: {
                cvId
            }
        });

        const cvActivities = await CvActivity.findAll({
            where: {
                cvId
            }
        });

        const cvJson = {
            cvTitle: cvData.cvTitle,
            fullName: cvData.fullName,
            email: cvData.email,
            phoneNumber: cvData.phoneNumber,
            cvPosition: cvData.cvPosition,
            workFieldId: cvData.workFieldId,
            cvIntro: cvData.cvIntro,
            isMainCv: cvData.isMainCv,
            address: cvData.address,
            gender: cvData.gender,
            cvImgUrl: cvData.cvImgUrl,
            dateOfBirth: cvData.dateOfBirth,
            cityId: cvData.cityId,
            externalLink: cvData.externalLink,
        };

        if (cvSkills.length > 0) {
            cvJson.cvSkill = cvSkills.map((skill) => ({
                skillName: skill.skillName,
                skillLevel: skill.skillLevel,
                skillDescribe: skill.skillDescribe,
            }));
        }

        if (cvCertificates.length > 0) {
            cvJson.cvCertificate = cvCertificates.map((certificate) => ({
                certTitle: certificate.certTitle,
                organization: certificate.organization,
                certDate: certificate.certDate,
                expireDate: certificate.expireDate,
                certDescribe: certificate.certDescribe,
            }));
        }

        if (cvEducations.length > 0) {
            cvJson.cvEducation = cvEducations.map((education) => ({
                schoolName: education.schoolName,
                major: education.major,
                eduLevelId: education.eduLevelId,
                startDate: education.startDate,
                endDate: education.endDate,
                eduDescribe: education.eduDescribe,
            }));
        }

        if (cvExperiences.length > 0) {
            cvJson.cvExperience = cvExperiences.map((experience) => ({
                companyName: experience.companyName,
                position: experience.position,
                startDate: experience.startDate,
                endDate: experience.endDate,
                experDiscribe: experience.experDiscribe,
            }));
        }

        if (cvProjects.length > 0) {
            cvJson.cvProject = cvProjects.map((project) => ({
                prjName: project.prjName,
                teamSize: project.teamSize,
                startDate: project.startDate,
                endDate: project.endDate,
                prjPosition: project.prjPosition,
                prjDescribe: project.prjDescribe,
            }));
        }

        if (cvAwards.length >0){
            cvJson.cvAward = cvAwards.map((cvAward)=>({
                awardTitle: cvAward.awardTitle,
                organization: cvAward.organization,
                awardYear: cvAward.awardYear,
                awardDescribe: cvAward.awardDescribe,
            }));
        }

        if (cvActivities.length >0){
            cvJson.cvActivity = cvActivities.map((cvActivity)=>({
                activityName: cvActivity.activityName,
                organization: cvActivity.organization,
                startDate: cvActivity.startDate,
                activityDescribe: cvActivity.activityDescribe,
                endDate: cvActivity.endDate,
            }));
        }

        return cvJson;

    }
    catch (error) {
        console.log(error);
        throw new Error('cannot get Cv')
    }
}

exports.upDateCvImg = async (cvId, imgUrl) => {
    try {
        const cvToUpdate = await Cv.findOne({
            where: { cvId }
        })
        if (checkValid(imgUrl)) {
            cvToUpdate.cvImgUrl = imgUrl;
        }

        const cvUpdated = await cvToUpdate.save()
        if (cvUpdated) {
            return cvUpdated.cvImgUrl;
        }
        else {
            throw new Error("can not update Cv image", error)
        }
    }
    catch (error) {
        throw new Error("error updating Cv image", error)
    }
}


exports.updateCV = async (cvId, cvData) => {
    const { cvTitle, cvPosition, cvIntro, workFieldId, fullName,
        email, phoneNumber, cityId, address, gender, cvImgUrl, dateOfBirth, externalLink } = cvData;
    const modifiedDate = new Date();
    let transaction = null;

    try {
        if (transaction === null) {
            transaction = await sequelize.transaction();
        }
        const cvToUpdate = await Cv.findOne({
            where: {
                cvId: cvId
            }
        }, transaction);
        if (!cvToUpdate) {
            throw new Error('CV not found');
        }

        // Kiểm tra và cập nhật các trường có trong req
        if (checkValid(cvTitle)) {
            cvToUpdate.cvTitle = cvTitle;
        }
        if (checkValid(cvPosition)) {
            cvToUpdate.cvPosition = cvPosition;
        }
        if (checkValid(cvIntro)) {
            cvToUpdate.cvIntro = cvIntro;
        }
            cvToUpdate.cvImgUrl = cvImgUrl;
        if (checkValid(workFieldId)) {
            cvToUpdate.workFieldId = workFieldId;
        }
        if (checkValid(fullName)) {
            cvToUpdate.fullName = fullName;
        }
        if (checkValid(email)) {
            cvToUpdate.email = email;
        }
        if (checkValid(phoneNumber)) {
            cvToUpdate.phoneNumber = phoneNumber;
        }
        if (checkValid(cityId)) {
            cvToUpdate.cityId = cityId;
        }
        if (checkValid(address)) {
            cvToUpdate.address = address;
        }
        if (checkValid(gender)) {
            cvToUpdate.gender = gender;
        }
        if (checkValid(cvImgUrl)) {
            cvToUpdate.cvImgUrl = cvImgUrl;
        }
        if (checkValid(dateOfBirth)) {
            cvToUpdate.dateOfBirth = dateOfBirth;
        }
        if (checkValid(externalLink)) {
            cvToUpdate.externalLink = externalLink;
        }

        cvToUpdate.modifiedDate = modifiedDate;
        await cvToUpdate.save({ transaction });

        await transaction.commit();

        const updatedCV = cvToUpdate;

        return updatedCV;

    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
};

exports.updateCvSkills = async (cvId, cvSkill) => {
    let transaction = null;

    try {
        if (!transaction) {
            transaction = await sequelize.transaction();
        }

        // Xóa các bản ghi CvSkill
        await CvSkill.destroy({
            where: { cvId },
            transaction
        });

        if (cvSkill && cvSkill.length > 0) {
            await Promise.all(
                cvSkill.map(async (skill) => {
                    const { skillName, skillLevel, skillDescribe } = skill;
                    await CvSkill.create(
                        {
                            cvId,
                            skillName,
                            skillLevel,
                            skillDescribe
                        },
                        { transaction }
                    );
                })
            );
        }

        await transaction.commit()
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
};

exports.updateCvCertificate = async (cvId, cvCertificate) => {
    let transaction = null;

    try {
        if (transaction === null) {
            transaction = await sequelize.transaction();
        }

        await CvCertificate.destroy({
            where: {
                cvId
            },
            transaction
        })


        if (cvCertificate && cvCertificate.length > 0) {
            await Promise.all(
                cvCertificate.map(async (certificate) => {
                    const { certTitle, organization, certDescribe, certDate, expireDate } = certificate;
                    await CvCertificate.create({ cvId, certTitle, organization, certDescribe, certDate, expireDate }, { transaction });
                })
            );
        }

        await transaction.commit();
    }
    catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

exports.updateCvEducation = async (cvId, cvEducation) => {
    let transaction = null;

    try {
        if (transaction === null) {
            transaction = await sequelize.transaction();
        }

        await CvEducation.destroy({
            where: {
                cvId
            },
            transaction
        })

        if (cvEducation && cvEducation.length > 0) {
            await Promise.all(
                cvEducation.map(async (education) => {
                    const { schoolName, major, eduLevelId, startDate, endDate, eduDescribe } = education;
                    await CvEducation.create({ cvId, schoolName, major, eduLevelId, startDate, endDate, eduDescribe }, { transaction });
                })
            );
        }

        await transaction.commit();
    }
    catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

exports.updateCvExperience = async (cvId, cvExperience) => {
    let transaction = null;

    try {
        if (transaction === null) {
            transaction = await sequelize.transaction();
        }

        await CvExperience.destroy({
            where: {
                cvId
            },
            transaction
        })

        if (cvExperience && cvExperience.length > 0) {
            await Promise.all(
                cvExperience.map(async (experience) => {
                    const { companyName, position, startDate, endDate, experDescribe } = experience;
                    await CvExperience.create({ cvId, companyName, position, startDate, endDate, experDescribe }, { transaction });
                })
            );
        }

        await transaction.commit();
    }
    catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

exports.updateCvProject = async (cvId, cvProject) => {
    let transaction = null;

    try {
        if (transaction === null) {
            transaction = await sequelize.transaction();
        }

        await CvProject.destroy({
            where: {
                cvId
            },
            transaction
        })

        if (cvProject && cvProject.length > 0) {
            await Promise.all(
                cvProject.map(async (project) => {
                    const { prjName, teamSize, prjPosition, startDate, endDate, prjDescribe } = project;
                    await CvProject.create({ cvId, prjName, teamSize, prjPosition, startDate, endDate, prjDescribe }, { transaction });
                })
            );
        }

        await transaction.commit();
    }
    catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

exports.updateCvActivity = async (cvId, cvActivity) => {
    let transaction = null;

    try {
        if (transaction === null) {
            transaction = await sequelize.transaction();
        }

        await CvActivity.destroy({
            where: {
                cvId
            },
            transaction
        })

        if (cvActivity && cvActivity.length > 0) {
            await Promise.all(
                cvActivity.map(async (activity) => {
                    const { activityName, organization, startDate, endDate, activityDescribe } = activity;
                    await CvActivity.create({ cvId, activityName, organization, startDate, endDate, activityDescribe }, { transaction });
                })
            );
        }

        await transaction.commit();
    }
    catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

exports.updateCvAward = async (cvId, cvAward) => {
    let transaction = null;

    try {
        if (transaction === null) {
            transaction = await sequelize.transaction();
        }

        await CvAward.destroy({
            where: {
                cvId
            },
            transaction
        })

        if (cvAward && cvAward.length > 0) {
            await Promise.all(
                cvAward.map(async (award) => {
                    const { awardTitle, organization, awardYear, awardDescribe } = award;
                    await CvAward.create({ cvId, awardTitle, organization, awardYear, awardDescribe}, { transaction });
                })
            );
        }

        await transaction.commit();
    }
    catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

exports.deleteCvById = async (cvId, candId) => {
    try {
        const cv = await Cv.findOne(
            {
                where: {
                    cvId: cvId,
                    candId: candId
                }
            }
        );

        if (!cv) {
            throw new Error('can not delete cv')
        }
        await CvCertificate.destroy({ where: { cvId } });
        await CvSkill.destroy({ where: { cvId } });
        await CvEducation.destroy({ where: { cvId } });
        await CvExperience.destroy({ where: { cvId } });
        await CvProject.destroy({ where: { cvId } });
        await CvActivity.destroy({ where: { cvId } });
        await CvAward.destroy({ where: { cvId } });
        const deletedCv = await Cv.destroy({ where: { cvId } });
        return deletedCv;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

exports.setMainCv = async (cvId, candId) => {
    try {
        const mainCv = await Cv.findOne(
            {
                where: {
                    cvId: cvId,
                    candId: candId
                }
            }
        );

        if (!mainCv) {
            throw new Error('can not set main cv')
        }

        const cvList = await Cv.findAll({
            where: {
                candId: candId
            }
        });

        if (cvList.length === 1) {
            mainCv.isMainCv = true;
            await mainCv.save();
        }
        else {
            await Promise.all(
                cvList.map(async (cvItem) => {
                    if (cvItem.cvId !== cvId) {
                        cvItem.isMainCv = false;
                    }
                    await cvItem.save();
                })
            );
            mainCv.isMainCv = true;
            await mainCv.save();
        }
        return mainCv;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

