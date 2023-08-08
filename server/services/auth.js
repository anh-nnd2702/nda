const { AdminAcc, Candidate, Company } = require('../models');

exports.getAdminAcc = async (email) => {
    try {
        const adminAcc = await AdminAcc.findOne({
            where: {
                adminEmail: email
            }
        })
        return adminAcc;
    }
    catch (error) {
        throw new Error("Error getting admin account");
    }
}

exports.getCandidateAcc = async (email) => {
    try {
        const candidate = await Candidate.findOne({
            where: {
                email: email
            },
        })
        return candidate;
    }
    catch (error) {
        throw new Error("Error getting candidate account");
    }
}

exports.getCompanyAcc = async (email) => {
    try {
        const company = await Company.findOne({
            where: {
                email: email
            },
        })
        return company;
        
    }
    catch (error) {
        throw new Error("Error getting company account");
    }
}

exports.createCandidate = async (candidateData) => {
    try {
        const { fullName, email, hashedPassword, cityId, isSeeking, minWage, workFieldId,
            workLevelId, jobTypeId, experience, isAcceptEmail, gender } = candidateData
        const newCandidate = await Candidate.create({
            fullName,
            email,
            password: hashedPassword,
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
        if (newCandidate) {
            return newCandidate;
        }
    }
    catch (error) {
        throw new Error("Error creating account");
    }
}

exports.createCompany = async (companyData) => {
    try {
        const { companyName, email, hashedPassword, defaultLogo, isActive, isGranted } = companyData;
        const newCompany = await Company.create({
            companyName,
            email,
            companyPass: hashedPassword,
            companyLogo: defaultLogo,
            isActive,
            isGranted
        })
        if (newCompany) {
            return newCompany;
        }
    }
    catch (error) {
        throw new Error("Error creating account");
    }
}

exports.updateCandidatePassword = async (candId, hashedPassword) => {
    try{
        const candidate = await Candidate.findOne({
            where: {
                Id: candId
            }
        });
        candidate.password = hashedPassword;
        await candidate.save();
        return candidate;
    }
    catch (error) {
        throw new Error("Error creating account");
    }
}
