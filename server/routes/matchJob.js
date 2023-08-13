const express = require('express');
const { getMatchJobByCandidate, updateMatchJobStatus } = require('../controllers/matchJob.js');
const router = express.Router();

const {authenToken} = require('../middlewares/auth.js');

router.get('/', authenToken, getMatchJobByCandidate);
router.put('/:matchId', authenToken, updateMatchJobStatus);

module.exports = router;