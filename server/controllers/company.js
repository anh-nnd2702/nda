const Company = require('../models/company.js');
const companyServices = require("../services/company.js");

exports.getCompanyInfo = async (req, res) => {
  try {
    const {companyId} = req.params;
    const companyData = await companyServices.getCompanyById(companyId);

    return res.status(200).json({ message: 'Company get success', company: companyData });
  }
  catch (error) {
    console.error('Error getting company:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getAllCompany = async (req, res) =>{
  try{
    const {keyword} = req.query;
    const companyList = await companyServices.getAllCompany(keyword);
    return res.status(200).json({message: "get all company sucess", companyList: companyList});
  }
  catch (error) {
    console.error('Error getting all company:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getAllCompanyJobs = async (req, res) =>{
  const companyId = req.Id;
  try{
    const companyJobs = await companyServices.getCompanyJobs(companyId);
    return res.status(200).json({ message: 'Company get success', jobs: companyJobs });
  }
  catch(error){
    console.error('Error getting company:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.updateCompany = async (req, res) => {
  try {
    const { companyName, companyAddress, companyIntro, companyPhone, companyLink, companyLicense, isActive, cityId } = req.body;
    const email = req.email;
    const company = await Company.findOne({ where: { email: email } });

    if (!company) {
      return res.status(404).json({ message: 'Company account not found' });
    }

    if (companyName != null) company.companyName = companyName;
    if (companyAddress != null) company.companyAddress = companyAddress;
    if (cityId != null) company.cityId = cityId;
    if (companyIntro !== null) company.companyIntro = companyIntro;
    if (companyLicense != null) company.companyLicense = companyLicense;
    if (companyLink != null) company.companyLink = companyLink;
    if (companyPhone != null) company.companyPhone = companyPhone;
    if (isActive != null) company.isActive = isActive;

    await company.save();

    return res.status(200).json({ message: 'Company updated successfully', company });
  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
/*
exports.getCompanyLogo = async (req, res) => {
  try {
    const companyId = req.Id;
    const logoUrl = await companyServices.getCompanyLogo(companyId);

    if (!logoUrl || logoUrl == "") {
      const theNull = "";
      return res.json({ logo: theNull });
    }

    // Đường dẫn tới file avatar
    const filePath = path.join(__dirname, "../", logoUrl);

    const imageData = fs.readFileSync(filePath);

    // Chuyển đổi dữ liệu thành chuỗi base64
    const base64Data = imageData.toString('base64');

    // Trả về dữ liệu ảnh dưới dạng chuỗi base64
    return res.json({ logo: base64Data });
  }
  catch (error) {
    console.error("Error updating logo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}*/

exports.uploadCompanyLogo = async (req, res) => {
  try {
    const companyId = req.Id;
    const logoUrl = req.file.path;

    const updatedLogo = await companyServices.updateLogo(companyId, logoUrl);

    return res.status(200).json({ message: 'Company logo uploaded successfully', updatedLogo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};