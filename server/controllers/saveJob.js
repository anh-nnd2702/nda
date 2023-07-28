const saveServices = require("../services/saveJob.js");
const jobServices = require("../services/job.js");

exports.getCandidateSavedJob = async (req, res) =>{
    const candId = req.Id;
    try{
        const savedJobs = await saveServices.getJobCandidateSaved(candId);
        return res.status(200).json({savedJobs: savedJobs, message: 'saved jobs get successful'})
    }
    catch(error){
        return res.status(500).json({ message: "can not get saved jobs" })
    }
}

exports.getCandidateSavedByJobId = async (req, res) =>{
    const candId = req.Id;
    const {jobId} = req.params;
    try{
        const savedJob = await saveServices.getSavedJobByJobId(candId, jobId);
        if(savedJob){
            return res.status(200).json({savedJob: savedJob, message: 'saved jobs get successful'})
        }
        else{
            return res.status(203).json({message: 'job is not saved'})
        }
    }
    catch(error){
        return res.status(500).json({ message: "can not get saved job" })
    }
}

exports.saveNewJob = async (req, res) =>{
    const candId = req.Id;
    const {jobId} = req.body;
    const savedTime = new Date();
    try{
        const jobFind = jobServices.getJobById(jobId);
        if(!jobFind){
            return res.status(500).json({ message: "can not find job to save" })
        }
        else{
            const savedJob = await saveServices.savejob({
                jobId,
                candId,
                savedTime
            })
    
            return res.status(200).json({ savedJob: savedJob, message: 'job saved successful' });
        }
    }
    catch(error){
        return res.status(500).json({ message: "can not save job" })
    }
}

exports.deleteSaveJob = async (req, res) =>{
    const candId = req.Id;
    const {savedJobId} = req.params;
    try{
        const unsaved = await saveServices.unSaveJob(savedJobId, candId);
        if(unsaved){
            return res.status(200).json({ message: 'job unsaved successful' });
        }
        else{
            return res.status(503).json({ message: 'saved job not found' });
        }
    }
    catch(error){
        return res.status(500).json({ message: "can not unsave job" })
    }
}

exports.getSavedJobById = async (req, res) =>{
    const {jobId} = req.params;
    try{
        const savedJob = await saveServices.getSavedJobById(jobId);
        if(savedJob){
            return res.status(200).json({savedJob: savedJob, message: 'saved jobs get successful'})
        }
        else{
            return res.status(503).json({message: 'job saved not found'})
        }
    }
    catch(error){
        return res.status(500).json({ message: "can not get saved job" })
    }
}
