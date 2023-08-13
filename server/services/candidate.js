const {Candidate, Cv, Keyword} = require("../models")

const checkValid = (inputValue) => {
  if (inputValue === null || inputValue === 'null' || inputValue === undefined || inputValue === "undefined") {
      return false;
  }
  else {
      return true;
  }
}

exports.validateCandidateData = (email, data) => {
  const { fullName } = data;

  if (!fullName) {
    throw new Error('Full name is required');
  }

  if (!email) {
    throw new Error('Email is required');
  }

};

exports.updateCandidate = async (Id, data) => {
  try {
    const candidate = await Candidate.findOne({ where: { Id } });

    if (!candidate) {
      throw new Error('Candidate not found');
    }

    if (checkValid(data.fullName)) candidate.fullName = data.fullName;
    if (checkValid(data.phoneNumber)) candidate.phoneNumber = data.phoneNumber;
    if (checkValid(data.cityId)) candidate.cityId = data.cityId;
    if (checkValid(data.gender)) candidate.gender = data.gender;
    if (checkValid(data.dateOfBirth)) candidate.dateOfBirth = data.dateOfBirth;
    if (checkValid(data.address)) candidate.address = data.address;
    if (checkValid(data.isSeeking)) candidate.isSeeking = data.isSeeking;
    if (checkValid(data.isAcceptEmail)) candidate.isAcceptEmail = data.isAcceptEmail;
    if (checkValid(data.minWage)) candidate.minWage = data.minWage;
    if (checkValid(data.workFieldId)) candidate.workFieldId = data.workFieldId;
    if (checkValid(data.experience)) candidate.experience = data.experience;
    if (checkValid(data.workLevelId)) candidate.workLevelId = data.workLevelId;
    if (checkValid(data.jobTypeId)) candidate.jobTypeId = data.jobTypeId;
    
    await candidate.save();

    const updatedCandidate = candidate.toJSON();
    const candidateNoPassword = { ...updatedCandidate };
    delete candidateNoPassword.password;
    return candidateNoPassword;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating candidate');
  }
};

exports.getCandidate = async (Id) => {
  try {
    const candidate = await Candidate.findOne({
      where: { Id },
      attributes:{ exclude: ['password', 'Id'] },
      include: {
        model: Keyword,
        attributes: ['keywordText'],
      }
    });
    return candidate;
  }
  catch (error) {
    throw Error('Candidate not found')
  }
}

exports.getCandidateCv = async (candId) => {
  try {
    const candidateCv = await Cv.findAll({
      where: { candId },
      order: [['isMainCv','DESC'],['modifiedDate','DESC']]
    });
    return candidateCv;
  }
  catch (error) {
    throw Error('Candidate not found')
  }
}

exports.updateKeyword = async (keywords, candId) =>{
  try{
    await Keyword.destroy({
      where: {candId: candId}
    })
    if(keywords && keywords.length >0){
      await Promise.all(
        keywords.map(async (word) =>{
          await Keyword.create(
            {
              keywordText: word,
              candId: candId
            }
          )
        })
      )
    }
  }
  catch (error) {
    throw Error('Error updating keywords')
  }
}

exports.getAllCandidateSettings = async () =>{
  try {
    const candidates = await Candidate.findAll({
      attributes:{ exclude: ['password', 'phoneNumber', 'address', 'dateOfBirth'] },
      include: {
        model: Keyword,
        attributes: ['keywordText'],
      }
    });
    return candidates;
  }
  catch (error) {
    throw Error('Candidate not found')
  }
}
