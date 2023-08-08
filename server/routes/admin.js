const express = require('express');
const router = express.Router();

const {authenAdminToken} = require('../middlewares/auth.js')
const { loginAdmin, logout } = require('../controllers/auth.js');
const {updateCompanyStatus} = require('../controllers/company.js')

router.post('/login', loginAdmin);
router.post('/logout', logout);
router.put('/companyStatus/:Id', authenAdminToken, updateCompanyStatus)
module.exports = router;