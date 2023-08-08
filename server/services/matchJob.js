const { Job, MatchJob } = require('../models/index.js');

exports.matchJobCalculator = async (candSetting, jobList) => {
    try {
        let matchJobs = jobList.map((job) => ({
            candId: candSetting.Id,
            jobId: job.jobId,
            jobTitle: job.jobTitle,
            minWage: job.minWage,
            maxWage: job.maxWage,
            address: `${job.City.cityName} - ${job.workAddress}`,
            matchPoint: matchJobPointCount(job, candSetting),
        }))

        matchJobs = matchJobs.filter((matchJob) => {
            return (matchJob.matchPoint > 6)
        })

        if (matchJobs.length > 0) {
            matchJobs.sort((a, b) => b.matchPoint - a.matchPoint);

            if (matchJobs.length > 20) {
                matchJobs = matchJobs.slice(0, 20);
            }

            const newMatchJobs = await processMatchJobs(matchJobs);
            if(!newMatchJobs || newMatchJobs.length===0){
                return [];
            }

            else{
                return matchJobs;
            }
        }
        else {
            return [];
        }
    }
    catch (error) {
        return [];
    }
}

const matchJobPointCount = (candSetting, job) => {
    let matchPoint = 0;

    if (job.cityId === candSetting.cityId || candSetting.cityId === 0) {
        matchPoint += 2;
    }

    if (job.workFieldId === candSetting.workFieldId || candSetting.workFieldId === 0) {
        matchPoint += 2;
    }

    if (job.minWage >= candSetting.minWage || job.maxWage >= candSetting.minWage) {
        matchPoint += 2;
    }
    else if (job.minWage === 0 && job.maxWage === 0) {
        matchPoint += 1;
    }

    if (job.workLevelId === candSetting.workLevelId || candSetting.workLevelId === 0) {
        matchPoint += 1;
    }

    if (job.jobTypeId === candSetting.jobTypeId || candSetting.jobTypeId === 0) {
        matchPoint += 1;
    }

    if (job.genderRequire === candSetting.gender || job.genderRequire === 0) {
        matchPoint += 1;
    }

    if (job.experience <= candSetting.experience || job.experience === 0) {
        matchPoint += 1;
    }

    if ((candSetting.Keywords) && (candSetting.Keywords).length > 0) {
        (candSetting.Keywords).forEach((kw) => {
            if (job.jobTitle.includes(kw) || job.jobBenefit.includes(kw) || job.jobRequire.includes(kw) || job.jobDescribe.includes(kw)) {
                matchPoint += 1;
            }
        });
    }

    return matchPoint;
}

const isMatchJobExist = async (jobId, candId) => {
    const matchJob = await MatchJob.findOne({
        where: {
            jobId: jobId,
            candId: candId,
        },
    });
    return matchJob !== null;
};

const processMatchJobs = async (matchJobs) => {
    const newMatchJobs = [];

    for (const matchJob of matchJobs) {
        const { jobId, candId } = matchJob;

        if (await isMatchJobExist(jobId, candId)) {
            continue;
        }

        const newMatchJob = await MatchJob.create({
            jobId: jobId,
            candId: candId,
        });

        newMatchJobs.push(newMatchJob);
    }

    return newMatchJobs;
};
