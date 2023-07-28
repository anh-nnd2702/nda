const express = require('express');
const router = express.Router();
const {authenToken, authenAdminToken} = require('../middlewares/auth.js');
const {createReport, getAllReport, getReportById} = require('../controllers/reportJob.js');

router.post('/:jobId', authenToken, createReport);
router.get('/', authenAdminToken, getAllReport);
router.get('/:reportId', getReportById);

module.exports = router;