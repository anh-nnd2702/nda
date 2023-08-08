const express = require('express');
const router = express.Router();

const {authenToken, authenHrToken} = require('../middlewares/auth.js');
const { createCV, getCvById, getAllCv, updateCv, setMainCv, deleteCv, updateCvWithImg, createCvWithImg } = require('../controllers/candidateCv.js')
const uploadImg = require("../middlewares/uploadCvImg.js");

router.post('/',authenToken, createCV);
router.get('/:cvId', getCvById);
router.get('/', authenHrToken, getAllCv);
router.post('/cvWithImg', authenToken, uploadImg, createCvWithImg);
router.put('/:cvId', authenToken, updateCv);
router.put('/cvWithImg/:cvId', authenToken, uploadImg, updateCvWithImg);
router.put('/mainCv/:cvId', authenToken, setMainCv);
router.delete('/:cvId', authenToken, deleteCv);

module.exports = router;