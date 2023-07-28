const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const jwtkey = require('../configs/jwtkey.js')
const secretKey = jwtkey.SECRET_KEY;
const expiresIn = jwtkey.expiresIn;

const Candidate = require('../models/candidate.js');
const Company = require('../models/company.js');

const candidateServices = require('../services/candidate.js');
const avatarService = require('../services/avatar.js');
const path = require("path");
const fs = require('fs');

exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {

    const existingCandidate = await Candidate.findOne({ where: { email } });
    if (existingCandidate) {
      return res.status(400).json({ error: 'Email này đã được đăng ký!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cityId = '0';
    const isSeeking = 'false';
    const minWage = 0;
    const workFiledId = '0';
    const workLevelId = '0';
    const jobTypeId = '0';
    const experience = 0;

    const candidate = await Candidate.create({
      fullName,
      email,
      password: hashedPassword,
      cityId,
      isSeeking,
      minWage,
      workFiledId,
      workLevelId,
      jobTypeId,
      experience
    });


    const token = jwt.sign({ email: candidate.email, Id: candidate.Id }, secretKey, { expiresIn: expiresIn });
    const nulAvatar = "";
    const infor = { fullName: candidate.fullName, avatar: nulAvatar }
    res
      .status(200)
      .json({ infor, token })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const candidate = await Candidate.findOne({ where: { email } });
    if (!candidate) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    let avatarUrl = await avatarService.getAvatar(candidate.Id);
    if (!avatarUrl) {
      theNull = ""
      avatarUrl = theNull;
    }
      const token = jwt.sign({ email: email, Id: candidate.Id }, secretKey);
      const infor = { fullName: candidate.fullName, avatar: avatarUrl, candidateId: candidate.Id }
      res
        .status(200)
        .json({ infor, token })
  }
  catch (error) {
    console.error('Đăng nhập thất bại:', error);
    res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình đăng nhập.' });
  }
}

exports.logout = async (req, res) => {
  try {

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during logout' });
  }
};

//company hr auth controllers:

exports.signUpHr = async (req, res) => {
  const { companyName, email, companyPass } = req.body;
  try {

    const existingCompany = await Company.findOne({ where: { email } });
    if (existingCompany) {
      return res.status(400).json({ error: 'Email này đã được đăng ký!' });
    }

    const hashedPassword = await bcrypt.hash(companyPass, 10);
    const defaultLogo = "https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl"

    const company = await Company.create({
      companyName,
      email,
      companyPass: hashedPassword,
      companyLogo: defaultLogo,
      isActive: true
    });


    const token = jwt.sign({ email: company.email, isHr: true, Id: company.Id }, secretKey, { expiresIn: expiresIn });

    const infor = { companyName: company.companyName, logo: company.companyLogo };
    res
      .status(200)
      .json({ infor, token })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Có lỗi xảy ra trong quá trình đăng ký!' });
  }
};



exports.loginHr = async (req, res) => {
  try {
    const { email, companyPass } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const company = await Company.findOne({ where: { email } });
    if (!company) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const isMatch = await bcrypt.compare(companyPass, company.companyPass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const token = jwt.sign({ email: email, isHr: true, Id: company.Id }, secretKey);
    const infor = { companyName: company.companyName, logo: company.companyLogo, Id: company.Id };
    res
      .status(200)
      .json({ infor, token })

  }
  catch (error) {
    console.error('Đăng nhập thất bại:', error);
    res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình đăng nhập.' });
  }
}
