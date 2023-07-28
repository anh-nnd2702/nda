const { check, validationResult } = require('express-validator');

const validateJobData = [
  check('jobTitle').notEmpty().withMessage('Job title is required'),
  check('workAddress').notEmpty().withMessage('Work address is required'),
  check('cityId').notEmpty().withMessage('City ID is required'),
  check('jobDescribe').notEmpty().withMessage('Job description is required'),
  check('eduLevelId').notEmpty().withMessage('Education level ID is required'),
  check('jobTypeId').notEmpty().withMessage('Job type ID is required'),
  check('expireDate').notEmpty().withMessage('Expire date is required'),
  check('workLevelId').notEmpty().withMessage('Work level ID is required'),
  check('experience').optional().isNumeric().withMessage('Invalid experience'),
  check('hireCount').optional().isNumeric().withMessage('Invalid hire count'),
  check('workFieldId').notEmpty().withMessage('Work field ID is required'),
];

const validateJobDataMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateJobData,
  validateJobDataMiddleware,
};
