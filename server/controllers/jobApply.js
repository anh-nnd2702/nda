const applyServices = require('../services/jobApply.js');
const { sendNotificationToCompany, sendNotificationToCandidate } = require('../utils/socketManager');

exports.getApplyById = async (req, res) =>{
    const {applyId} = req.params;
    try{
        const applied = await applyServices.getApplyById(applyId);
        return res.status(200).json({ appliedJob: applied.appliedJob, message: 'job apply get successful' });
    }
    catch(error){
        return res.status(500).json({ message: "can not get apply" })
    }
}

exports.getAllApplyByJobId = async (req, res) => {
    const {jobId} = req.params;
    try{
        const jobApply = await applyServices.getApplyByJobId(jobId);
        return res.status(200).json({ appliedJobs: jobApply, message: 'job apply get successful' });
    }
    catch(error){
        return res.status(500).json({ message: "can not get apply" })
    }
}

exports.getAllCandidateApplied = async (req, res) => {
    const candId = req.Id;
    try{
        const candidateApply = await applyServices.getApplyByCandidate(candId);
        return res.status(200).json({ appliedJobs: candidateApply, message: 'job apply get successful' });
    }
    catch(error){
        return res.status(500).json({ message: "can not get apply" })
    }
}

exports.createApply = async (req, res) => {
    const { jobId, cvId, coverLetter } = req.body;
    const candId = req.Id;
    const applyStatus = 0;
    const applyTime = new Date();
    try {
        const appliedJob = await applyServices.createNewApply({
            jobId,
            candId,
            cvId,
            coverLetter,
            applyTime,
            applyStatus
        })
        sendNotificationToCompany(appliedJob.companyId, 'Ứng viên mới ứng tuyển:' , appliedJob.jobId, appliedJob.applyId );

        return res.status(200).json({ appliedJob: appliedJob, message: 'job applied successful' });
    }
    catch (error) {
        return res.status(500).json({ message: "can not apply" })
    }

}

exports.updateApplyStatus = async (req, res) =>{
    const {applyStatus} = req.body;
    const {applyId} = req.params;
    try{
        const appliedJob = await applyServices.updateAppliedStatus(applyId, applyStatus);
        let notiMessage = '';
        if(applyStatus==1){
            notiMessage = 'Nhà tuyển dụng vừa xem hồ sơ của bạn';
        }
        else if(applyStatus==2){
            notiMessage = 'Nhà tuyển dụng đã đánh giá hồ sơ phù hợp';
        }
        else if(applyStatus==3){
            notiMessage = 'Nhà tuyển dụng đã loại hồ sơ của bạn';
        }
        sendNotificationToCandidate(appliedJob.candId, notiMessage, appliedJob.jobId, appliedJob.applyId);
        return res.status(200).json({ appliedJob: appliedJob, message: 'job apply update successful' });
    }
    catch(error){
        return res.status(500).json({ message: "can not update apply" })
    }
}

exports.getAppliedJobByCandidate = async (req, res) =>{
    const candId = req.Id;
    const {jobId} = req.params;
    try{
        const appliedJob = await applyServices.getJobAppliedByCandidate(candId, jobId);
        if(appliedJob){
            return res.status(200).json({ appliedJob: appliedJob, message: 'job apply get successful' });
        }
        else{
            throw new Error("applied not found", error)
        }
    }
    catch(error){
        return res.status(202).json({ message: "can not get apply" })
    }
}
