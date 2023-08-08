const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketio = require('socket.io');
const cron = require('node-cron');
const { initializeSocket } = require('./utils/socketManager.js');
dotenv.config();

const candidateRoutes = require('./routes/candidate.js');
const jobRoutes = require('./routes/job.js');
const companyRoutes = require('./routes/company.js');
const cvRoutes = require('./routes/profile.js');
const refeRoutes = require('./routes/reference.js');
const applyRoutes = require('./routes/applyJob.js');
const adminRoutes = require('./routes/admin.js');
const reportRoutes = require('./routes/reportJob.js');

const {cronMatchJob} = require('./controllers/cronJob.js');
const {cronSchedule} = require('./configs/cronSchedule.js')

const app = express();

const corsOptions = {
  origin: '*', // Đổi domain này thành domain thật của client (nơi bạn chạy ứng dụng frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Cho phép gửi cookie trong yêu cầu cross-origin
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/candidate', candidateRoutes);
app.use('/company', companyRoutes);
app.use('/job', jobRoutes);
app.use('/cv', cvRoutes);
app.use('/reference', refeRoutes);
app.use('/apply', applyRoutes);
app.use('/admin', adminRoutes);
app.use('/report', reportRoutes);

const domain = require('./configs/domain.js');
const port = domain.port;

const server = http.createServer(app); 
const io = socketio(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

initializeSocket(io);

cron.schedule(cronSchedule, () => {
  cronMatchJob();
});

server.listen(port, () => {
  console.log(`Your Server is running on port ${port}`);
});

