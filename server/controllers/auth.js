const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const authServices = require("../services/auth.js")

const jwtkey = require('../configs/jwtkey.js')
const secretKey = jwtkey.SECRET_KEY;
const resetkey = jwtkey.SECRET_KEY;
const expiresIn = jwtkey.expiresIn;
const {resetCandidatePasswordEmail, resetCompanyPasswordEmail} = require("../utils/emailSender.js");

const avatarService = require('../services/avatar.js');
const fs = require('fs');

exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {

    const existingCandidate = await authServices.getCandidateAcc(email);
    if (existingCandidate) {
      return res.status(400).json({ error: 'Email này đã được đăng ký!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cityId = 0;
    const isSeeking = true;
    const minWage = 0;
    const workFieldId = 0;
    const workLevelId = 0;
    const jobTypeId = 0;
    const experience = 0;
    const gender = 0;
    const isAcceptEmail = true;

    const candidate = await authServices.createCandidate({
      fullName,
      email,
      hashedPassword,
      cityId,
      isSeeking,
      minWage,
      workFieldId,
      workLevelId,
      jobTypeId,
      experience,
      isAcceptEmail,
      gender
    })

    const token = jwt.sign({ email: candidate.email, Id: candidate.Id }, secretKey);
    const nulAvatar = "";
    const infor = { fullName: candidate.fullName, avatar: nulAvatar }
    res
      .status(200)
      .json({ infor, token })
  } catch (error) {
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

    const candidate = await authServices.getCandidateAcc(email);
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

    const company = await authServices.createCompany({
      companyName,
      email,
      hashedPassword,
      defaultLogo,
      isActive: true,
      isGranted: false
    });

    const token = jwt.sign({ email: company.email, isHr: true, Id: company.Id }, secretKey);

    const infor = { companyName: company.companyName, logo: company.companyLogo, isGranted: false };
    res
      .status(200)
      .json({ infor, token })
  } catch (error) {
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

    const company = await authServices.getCompanyAcc(email);
    if (!company) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const isMatch = await bcrypt.compare(companyPass, company.companyPass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    if(company.isGranted && !company.isActive){
      return res.status(403).json({message: "Tài khoản đã bị khóa do vi phạm tiêu chuẩn đăng tin tuyển dụng!"})
    }

    const token = jwt.sign({ email: email, isHr: true, Id: company.Id }, secretKey);
    const infor = { companyName: company.companyName, logo: company.companyLogo, Id: company.Id };
    res
      .status(200)
      .json({ infor, token })

  }
  catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình đăng nhập.' });
  }
}

exports.loginAdmin = async (req, res) =>{
  try {
    const { email, adminPass } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const admin = await authServices.getAdminAcc(email);
    if (!admin) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const isMatch = await bcrypt.compare(adminPass, admin.adminPass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const token = jwt.sign({ email: email, isAdmin: true, Id: admin.Id }, secretKey);
    const infor = { isAdmin: true };
    res
      .status(200)
      .json({ infor, token })

  }
  catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình đăng nhập.' });
  }
}

exports.candidateRequestChangePassword = async (req, res) =>{
  try{
    const {email} = req.body;
    const candidate = await authServices.getCandidateAcc(email);
    if(candidate){
      const token = jwt.sign({ email: email, Id: candidate.Id, isReset: true }, resetkey);
      await resetCandidatePasswordEmail(email, token);
      console.log(token);
      return res.status(200).json({ message: 'Vui lòng kiểm tra email để đặt lại mật khẩu.' });
    }
    else{
      return res.status(401).json({ message: 'Email không đúng.' });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình xử lý.' });
  }
}

exports.updateCandidatePassword = async (req, res) =>{
    try{
      const email = req.email;
      const {newPassword} = req.body;
      const candidate = await authServices.getCandidateAcc(email);
      if(candidate){
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedCandidate =  await authServices.updateCandidatePassword(candidate.Id, hashedPassword);
        
        return res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công' });
      }
      else{
        return res.status(401).json({ message: 'Email không đúng.' });
      }
    }
    catch (error) {
      res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình xử lý.' });
    }
}
