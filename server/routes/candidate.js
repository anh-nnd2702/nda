const express = require('express');
const router = express.Router();

const {authenToken} = require('../middlewares/auth.js')
const { signUp, login, logout } = require('../controllers/auth.js');
const { updateCandidate, getCandidate, getCandidateCv } = require('../controllers/candidate.js');
const {updateAvatar, getAvatar} = require("../controllers/avatar.js")
const upload = require("../middlewares/upload");
const {getCandidateSavedJob, saveNewJob, getCandidateSavedByJobId, deleteSaveJob, getSavedJobById} = require("../controllers/saveJob.js")

router.post('/signUp', signUp);
router.post('/login', login);
router.put('/', authenToken, updateCandidate);
router.post('/logout', logout);
router.get('/', authenToken, getCandidate);
router.get('/cv', authenToken, getCandidateCv);
router.post('/avatar',authenToken, upload.single("avatar"), updateAvatar);
router.get('/avatar', authenToken, getAvatar);
router.post('/saveJob', authenToken, saveNewJob);
router.delete('/savedJob/:savedJobId', authenToken, deleteSaveJob)
router.get('/saved/job/:jobId', authenToken, getCandidateSavedByJobId)
router.get('/savedJob', authenToken, getCandidateSavedJob);

module.exports = router;