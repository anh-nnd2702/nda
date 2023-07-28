const ReferServices = require("../services/reference.js");

exports.getCity = async (req, res) =>{
    try{
        const city = await ReferServices.getCity();
        return res.status(200).json({city})
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getEducationLevel = async (req, res) =>{
    try{
        const educationLevel = await ReferServices.getEducationLevel();
        return res.status(200).json({ educationLevel })
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getWorkField = async (req, res) =>{
    try{
        const workField = await ReferServices.getWorkField();
        return res.status(200).json({ workField })
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getWorkLevel = async (req, res) =>{
    try{
        const workLevel = await ReferServices.getWorkLevel();
        return res.status(200).json({ workLevel })
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getJobType = async (req, res) =>{
    try{
        const jobType = await ReferServices.getJobType();
        return res.status(200).json({ jobType })
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getAllReference = async(req, res) =>{
    try{
        const city = await ReferServices.getCity();
        const educationLevel = await ReferServices.getEducationLevel();
        const workField = await ReferServices.getWorkField();
        const workLevel = await ReferServices.getWorkLevel();
        const jobType = await ReferServices.getJobType();
        return res.status(200).json({ city, educationLevel, workField, workLevel, jobType })
    }
    catch(error){
        console.error(error);
        throw error;
    }
}
