const express = require('express');
const router = express.Router();
const {authenToken, authenAdminToken} = require('../middlewares/auth.js');
const {createReport, getAllReport, getReportById, updateReportStatus, deleteReportById, updateReportStatusByJob} = require('../controllers/reportJob.js');

router.post('/:jobId', authenToken, createReport);
router.get('/', authenAdminToken, getAllReport);
router.get('/:reportId', getReportById);
router.put('/:reportId', authenAdminToken, updateReportStatus);
router.put('/job/:jobId', authenAdminToken, updateReportStatusByJob)
router.delete('/:reportId', authenAdminToken, deleteReportById);

module.exports = router;