const express = require('express');
const router = express.Router();
const {getCity, getAllReference, getEducationLevel, getJobType, getWorkField, getWorkLevel} = require("../controllers/reference.js")

router.get('/', getAllReference);
router.get('/city', getCity);
router.get('/educationLevel', getEducationLevel);
router.get('/jobType', getJobType);
router.get('/workField', getWorkField);
router.get('/workLevel', getWorkLevel);

module.exports = router;