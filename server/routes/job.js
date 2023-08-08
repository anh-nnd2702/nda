const express = require('express');
const router = express.Router();

const {authenHrToken, authenAdminToken} = require('../middlewares/auth.js')
const {validateJobData, validateJobDataMiddleware} = require('../validations/jobData.js')
const { getAllJobs, getJobById, getJobByCompanyId, createJob, updateJob, deleteJobById, updateJobStatus } = require('../controllers/job');

router.get('/', getAllJobs);
router.get('/:jobId', getJobById);
router.get('/company/:companyId', getJobByCompanyId);

router.post('/', authenHrToken, validateJobData, validateJobDataMiddleware, createJob);
router.put('/:jobId', authenHrToken, updateJob);
router.delete('/:jobId', authenHrToken, deleteJobById);
router.put('/status/:jobId', authenAdminToken, updateJobStatus);

module.exports = router;