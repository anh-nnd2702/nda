const express = require('express');
const router = express.Router();
const {authenToken, authenHrToken} = require('../middlewares/auth.js')
const {getAllApplyByJobId, getAppliedJobByCandidate, getAllCandidateApplied, getApplyById, createApply, updateApplyStatus} = require("../controllers/jobApply.js")

router.get('/job/:jobId', authenHrToken, getAllApplyByJobId);
router.get('/candidate', authenToken, getAllCandidateApplied);
router.get('/:applyId', getApplyById);
router.put('/:applyId', authenHrToken, updateApplyStatus);
router.get('/candidate/job/:jobId', authenToken, getAppliedJobByCandidate);
router.post('/', authenToken, createApply);
router.get('/cv/:applyId', authenHrToken, )
module.exports = router;