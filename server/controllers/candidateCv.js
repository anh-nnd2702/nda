const CVService = require('../services/cv.js');

exports.createCV = async (req, res) => {
  try {
    const cvData = req.body;
    const candId = req.Id;
    const createdCV = await CVService.createCV(candId, cvData);
    return res.status(200).json({ message: "cv created success!", createdCV });
  } catch (error) {
    console.error('Error creating CV:', error);
    res.status(500).json({ error: 'Failed to create CV' });
  }
};

exports.getAllCv = async (req, res) => {
  try{
    const cvList = await CVService.findAllMainCv();
    return res.status(200).json({ message: "all cv get success!", cvList: cvList });
  }
  catch (error) {
    console.error('Error creating CV:', error);
    res.status(500).json({ error: 'Failed to create CV' });
  }
}

exports.createCvWithImg = async (req, res) =>{
  try{
    const cvData = req.body;
    const candId = req.Id;
    const createdCV = await CVService.createCV(candId, cvData);
    return res.status(200).json({ message: "cv created success!", createdCV });
  } catch (error) {
    console.error('Error creating CV:', error);
    res.status(500).json({ error: 'Failed to create CV' });
    
  }
}

exports.getCvById = async (req, res) => {
  try {
    const { cvId } = req.params;
    const cvData = await CVService.getCv(cvId);
    return res.status(200).json({ cvData });
  }
  catch (error) {
    console.error('error getting cv ', error);
    res.status(500).json({ error: 'failed to get cv' });
  }
}

exports.updateCv = async (req, res) => {
  try {
    const { cvId } = req.params;
    const { cvTitle, cvPosition, cvIntro, workFieldId,
      fullName, email, phoneNumber, cityId, address, cvImgUrl, gender, dateOfBirth,
      cvSkill, cvCertificate, cvEducation, cvExperience, cvProject, cvAward, cvActivity } = req.body;

    const updatedCV = await CVService.updateCV(cvId, { cvTitle, cvPosition, cvIntro, workFieldId, fullName, email, phoneNumber, cityId, address, cvImgUrl, gender, dateOfBirth});
    await CVService.updateCvSkills(cvId, cvSkill);
    await CVService.updateCvCertificate(cvId, cvCertificate);
    await CVService.updateCvEducation(cvId, cvEducation);
    await CVService.updateCvExperience(cvId, cvExperience);
    await CVService.updateCvProject(cvId, cvProject);
    await CVService.updateCvActivity(cvId, cvActivity);
    await CVService.updateCvAward(cvId, cvAward);

    return res.status(200).json({ updatedCV });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update CV' });
  }
}

exports.updateCvWithImg = async (req, res) => {
  try {
    const { cvId } = req.params;
    const { cvTitle, cvPosition, cvIntro, workFieldId,
      fullName, email, phoneNumber, cityId, address, cvImgUrl, gender, dateOfBirth,
      cvSkill, cvCertificate, cvEducation, cvExperience, cvProject, cvAward, cvActivity } = req.body;
   

    const updatedCV = await CVService.updateCV(cvId, { cvTitle, cvPosition, cvIntro, workFieldId, fullName, email, phoneNumber, cityId, address, cvImgUrl, gender, dateOfBirth});
    await CVService.updateCvSkills(cvId, cvSkill);
    await CVService.updateCvCertificate(cvId, cvCertificate);
    await CVService.updateCvEducation(cvId, cvEducation);
    await CVService.updateCvExperience(cvId, cvExperience);
    await CVService.updateCvProject(cvId, cvProject);
    await CVService.updateCvActivity(cvId, cvActivity);
    await CVService.updateCvAward(cvId, cvAward);
    console.log(cvSkill, cvEducation, cvProject, cvCertificate, cvExperience);

    return res.status(200).json({ updatedCV });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update CV' });
  }
}

exports.setMainCv = async (req, res) => {
  const { cvId } = req.params;
  const candId = req.Id;
  try{
    const settedMainCv = await CVService.setMainCv(cvId, candId);
    if (!settedMainCv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json({ message: 'CV setted main successfully', cvData: settedMainCv });

  }
  catch(error){
    console.error('Error setting main Cv:', error);
    res.status(500).json({ message: 'Failed to set main CV' });
  }
}

exports.deleteCv = async (req, res) => {
  const { cvId } = req.params;
  const candId = req.Id;
  try {
    const deletedCv = await CVService.deleteCvById(cvId, candId);

    if (!deletedCv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ message: 'Failed to delete CV' });
  }
}
