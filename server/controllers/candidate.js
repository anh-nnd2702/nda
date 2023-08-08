const candidateServices = require('../services/candidate.js')

exports.updateCandidate = async (req, res) => {
  try {
    const { fullName, phoneNumber, cityId, gender, dateOfBirth, address, isSeeking, isAcceptEmail, minWage, workFieldId, experience, workLevelId, jobTypeId, tags } = req.body;
    const email = req.email;
    const Id = req.Id;
    candidateServices.validateCandidateData(email, req.body);
    // Cập nhật thông tin ứng viên
    const updatedCandidate = await candidateServices.updateCandidate(Id, {
      email,
      fullName,
      phoneNumber,
      cityId,
      gender,
      dateOfBirth,
      address,
      isSeeking,
      isAcceptEmail,
      minWage,
      workFieldId,
      experience,
      workLevelId,
      jobTypeId
    });

    const updatedKeyword = await candidateServices.updateKeyword(tags, Id);
    updatedCandidate.keyword = updatedKeyword;
    
    return res.status(200).json({ message: 'Candidate updated successfully', candidate: updatedCandidate });
  } catch (error) {
    console.error('Error updating candidate:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCandidate = async (req, res) => {
  try {
    const Id = req.Id;
    const candidateData = await candidateServices.getCandidate(Id);

    return res.status(200).json({ message: 'Candidate get success', candidate: candidateData });
  }
  catch (error) {
    console.error('Error getting candidate:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getCandidateCv = async (req, res) => {
  try {
    const Id = req.Id;
    const candidateCv = await candidateServices.getCandidateCv(Id);

    return res.status(200).json({ message: 'Candidate Cv get success', candidateCv: candidateCv });
  }
  catch (error) {
    console.error('Error getting candidate Cv:', error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}
