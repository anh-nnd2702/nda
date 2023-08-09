const candidateServices = require('../services/candidate.js');
const jobServices = require('../services/job.js');
const matchJobServices = require('../services/matchJob.js')
const { candidateEmailSender } = require('../utils/emailSender.js')

exports.cronMatchJob = async () => {
    try {
        console.log("Running cron job !!!");
        const settingList = await candidateServices.getAllCandidateSettings();
        const jobList = await jobServices.getAllJobs();

        if (settingList && settingList.length>0 && jobList && jobList.length>0) {

            const emailList = [];

            for (const candSetting of settingList) {
                const jobRecommend = await matchJobServices.matchJobCalculator(candSetting, jobList);
                //console.log(jobRecommend);
                
                if (jobRecommend && jobRecommend.length > 0 && candSetting.isAcceptEmail) {
                    const emailObj = {
                        emailTo: candSetting.email,
                        candName: candSetting.fullName,
                        jobs: jobRecommend
                    }
                    emailList.push(emailObj);
                    //console.log(emailObj);
                }

            };

            if (emailList.length > 0) {
                await Promise.all(emailList.map(async (emailObj) => {
                    await candidateEmailSender(emailObj);
                }));
            }

        }

    }
    catch (error) {
        console.log(error);
    }

}