const {City, EducationLevel, JobType, WorkField, WorkLevel} = require('../models');

exports.getCity = async () =>{
    try{
        const city = await City.findAll();
        return city;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getEducationLevel = async () =>{
    try{
        const educationLevel = await EducationLevel.findAll();
        return educationLevel;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getJobType = async () =>{
    try{
        const jobType = await JobType.findAll();
        return jobType;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getWorkField = async () =>{
    try{
        const workField = await WorkField.findAll();
        return workField;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

exports.getWorkLevel = async () =>{
    try{
        const workLevel = await WorkLevel.findAll();
        return workLevel;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}
