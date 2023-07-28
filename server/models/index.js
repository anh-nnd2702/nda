const { sequelize, Sequelize } = require('../dbconnect.js');
const AdminAcc = require('./adminAcc.js');
const AppliedJob = require('./appliedJob.js');
const Avatar = require('./avatar.js');
const Candidate = require('./candidate.js');
const City = require('./city');
const Company = require('./company.js');
const Cv = require('./cv.js');
const CvEducation = require('./cvEducation.js');
const CvCertificate = require('./cvCertificate.js');
const CvExperience = require('./cvExperience.js');
const CvProject = require('./cvProject.js');
const CvSkill = require('./cvSkill.js');
const EducationLevel = require('./educationLevel.js');
const Job = require('./job.js');
const JobType = require('./jobType.js');
const MatchJob = require('./matchJob.js');
const ReportJob = require('./reportJob.js');
const SavedJob = require('./savedJob.js');
const WorkField = require('./workField.js');
const WorkLevel = require('./workLevel.js');
const CvAward = require('./cvAward.js');
const CvActivity = require('./cvActivity.js');
const AplAward = require('./aplAward.js');
const AplActivity = require('./aplActivity.js');
const AplCertificate = require('./aplCertificate.js');
const AplEducation = require('./aplEducation.js');
const AplExperience = require('./aplExperience.js');
const AplProject = require('./aplProject.js');
const AplSkill = require('./aplSkill.js');
const models = {
    AdminAcc,
    AppliedJob,
    AplAward,
    AplActivity,
    AplCertificate,
    AplEducation,
    AplExperience,
    AplProject,
    AplSkill,
    Avatar,
    Candidate,
    City,
    Company,
    Cv,
    CvEducation,
    CvCertificate,
    CvExperience,
    CvProject,
    CvSkill,
    EducationLevel,
    Job,
    JobType,
    MatchJob,
    ReportJob,
    SavedJob,
    WorkField,
    WorkLevel,
    CvAward,
    CvActivity
}

AppliedJob.belongsTo(Job, { foreignKey: 'jobId' });
AppliedJob.belongsTo(Candidate, { foreignKey: 'candId' });
AppliedJob.belongsTo(City, { foreignKey: 'cityId' });
Company.belongsTo(City, {foreignKey: 'cityId'});
Avatar.belongsTo(Candidate, {
    foreignKey: "candId",
    as: "candidate",
});
Cv.belongsTo(Candidate, { foreignKey: 'candId', as: 'candidate' });
// Kết nối quan hệ với bảng WorkField
Cv.belongsTo(WorkField, { foreignKey: 'workFieldId', as: 'workField' });
Cv.belongsTo(City, { foreignKey: 'cityId', as: 'city' });
CvCertificate.belongsTo(Cv, {
    foreignKey: 'cvId',
    onDelete: 'CASCADE',
});
CvSkill.belongsTo(Cv, {
    foreignKey: 'cvId',
    onDelete: 'CASCADE',
});

CvProject.belongsTo(Cv, {
    foreignKey: 'cvId',
    onDelete: 'CASCADE',
});

CvExperience.belongsTo(Cv, {
    foreignKey: 'cvId',
    onDelete: 'CASCADE',
});

CvEducation.belongsTo(Cv, {
    foreignKey: 'cvId',
    onDelete: 'CASCADE',
});

CvAward.belongsTo(Cv, {
    foreignKey: 'cvId',
    onDelete: 'CASCADE',
});

CvActivity.belongsTo(Cv, {
    foreignKey: 'cvId',
    onDelete: 'CASCADE',
})

// Định nghĩa mối quan hệ giữa CVEducation và EducationLevel
CvEducation.belongsTo(EducationLevel, {
    foreignKey: 'eduLevelId',
    onDelete: 'CASCADE',
});
Job.belongsTo(Company, {
    foreignKey: 'companyId',
});

// Tạo quan hệ 1-n với bảng City
Job.belongsTo(City, {
    foreignKey: 'cityId',
});

// Tạo quan hệ 1-n với bảng EducationLevel
Job.belongsTo(EducationLevel, {
    foreignKey: 'eduLevelId',
});

// Tạo quan hệ 1-n với bảng JobType
Job.belongsTo(JobType, {
    foreignKey: 'jobTypeId',
});

// Tạo quan hệ 1-n với bảng WorkLevel
Job.belongsTo(WorkLevel, {
    foreignKey: 'workLevelId',
});

// Tạo quan hệ 1-n với bảng WorkField
Job.belongsTo(WorkField, {
    foreignKey: 'workFieldId',
});

MatchJob.belongsTo(Job, {
    foreignKey: 'jobId',
    targetKey: 'jobId',
});

// Tạo quan hệ Many-to-One với model Candidate
MatchJob.belongsTo(Candidate, {
    foreignKey: 'candId',
    targetKey: 'Id',
});

ReportJob.belongsTo(Job, {
    foreignKey: 'jobId',
    targetKey: 'jobId',
});

// Tạo quan hệ Many-to-One với model Candidate
ReportJob.belongsTo(Candidate, {
    foreignKey: 'candId',
    targetKey: 'Id',
});
// Tạo quan hệ Many-to-One với model Job
SavedJob.belongsTo(Job, {
    foreignKey: 'jobId',
    targetKey: 'jobId',
    onDelete: 'CASCADE'
});

// Tạo quan hệ Many-to-One với model Candidate
SavedJob.belongsTo(Candidate, {
    foreignKey: 'candId',
    targetKey: 'Id',
    onDelete: 'CASCADE'
});
// Khai báo quan hệ giữa các bảng (foreign keys)
AplAward.belongsTo(AppliedJob, { foreignKey: 'applyId' });
AplActivity.belongsTo(AppliedJob, { foreignKey: 'applyId' });
AplCertificate.belongsTo(AppliedJob, { foreignKey: 'applyId' });
AplEducation.belongsTo(AppliedJob, { foreignKey: 'applyId' });
AplEducation.belongsTo(EducationLevel, { foreignKey: 'eduLevelId' });
AplExperience.belongsTo(AppliedJob, { foreignKey: 'applyid' });
AplProject.belongsTo(AppliedJob, { foreignKey: 'applyId' });
AplSkill.belongsTo(AppliedJob, { foreignKey: 'applyId' });

Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = models;
