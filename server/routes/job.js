const express = require('express');
const router = express.Router();

const {authenHrToken} = require('../middlewares/auth.js')
const {validateJobData, validateJobDataMiddleware} = require('../validations/jobData.js')
const { getAllJobs, getJobById, getJobByCompanyId, createJob, updateJob, deleteJobById } = require('../controllers/job');

router.get('/', getAllJobs);
router.get('/:jobId', getJobById);
router.get('/company/:companyId', getJobByCompanyId);

router.post('/', authenHrToken, validateJobData, validateJobDataMiddleware, createJob);
router.put('/:jobId', authenHrToken, updateJob);
router.delete('/:jobId', authenHrToken, deleteJobById);

module.exports = router;