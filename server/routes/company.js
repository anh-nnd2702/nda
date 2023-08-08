const express = require('express');
const router = express.Router();

const { authenHrToken, authenAdminToken } = require('../middlewares/auth.js');
const { signUpHr, loginHr, logout } = require('../controllers/auth.js');
const { updateCompany, getAllCompany, uploadCompanyLogo, uploadCompanyLicense, getCompanyInfo } = require('../controllers/company.js');
const upload = require("../middlewares/upload.js");
const { getAllCompanyJobs } = require("../controllers/company.js")

router.post('/signUpHr', signUpHr);
router.post('/loginHr', loginHr);
router.put('/', authenHrToken, updateCompany);
router.post('/logout', logout);
router.post('/companyLogo', authenHrToken, upload.single("logo"), uploadCompanyLogo);
router.get('/infor/:companyId', getCompanyInfo);
router.get('/jobs', authenHrToken, getAllCompanyJobs);
router.get('/', getAllCompany);
router.post('/license', authenHrToken, upload.single("license"), uploadCompanyLicense);
router.put('/:companyId', authenAdminToken)

module.exports = router;