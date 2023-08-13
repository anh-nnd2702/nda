const matchJobServices = require("../services/matchJob.js");

exports.getMatchJobByCandidate = async (req, res) =>{
    try {
        const Id = req.Id;
        const matchJobs = await matchJobServices.getMatchJobByCandidate(Id);
    
        return res.status(200).json({ message: 'Candidate get success', matchJobs: matchJobs });
      }
      catch (error) {
        console.error('Error getting candidate match jobs:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
}

exports.updateMatchJobStatus = async (req, res) =>{
    try {
        const Id = req.Id;

        const {matchJobId} = req.body;

        const matchJob = await matchJobServices.updateMatchjobStatus(matchJobId, Id);
    
        return res.status(200).json({ message: 'Candidate get success', matchJob: matchJob });
      }
      catch (error) {
        console.error('Error getting candidate match jobs:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
}
