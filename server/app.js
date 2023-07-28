const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketio = require('socket.io');
const { initializeSocket } = require('./utils/socketManager.js');
dotenv.config();

const candidateRoutes = require('./routes/candidate.js');
const jobRoutes = require('./routes/job.js');
const companyRoutes = require('./routes/company.js');
const cvRoutes = require('./routes/profile.js');
const refeRoutes = require('./routes/reference.js');
const applyRoutes = require('./routes/applyJob.js');

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

app.get('/', (req, res)=>res.json({messsage: "hello world"}))

const domain = require('./configs/domain.js');

const server = http.createServer(app); // Tạo HTTP server bằng thư viện http
const io = socketio(server, {
  cors: {
    origin: '*', // Đổi domain này thành domain thật của client (nơi bạn chạy ứng dụng frontend)
    methods: ['GET', 'POST'],
    credentials: true, // Cho phép gửi cookie trong yêu cầu cross-origin
  },
}); // Tạo Socket.IO server và kết nối nó với HTTP server

initializeSocket(io);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Your Server is running `);
});

/*
const companySockets = {}
io.on('connection', (socket) => {
  console.log('A client connected'); // Log khi có client kết nối tới server Socket.IO
  const companyId = socket.handshake.query.companyId; // Lấy ID của company từ kết nối socket
    if (companyId) {
      companySockets[companyId] = socket; // Lưu kết nối socket của company với ID tương ứng
    }

  // Xử lý các sự kiện từ client
  socket.on('eventFromClient', (data) => {
    console.log('Received data from client:', data);
    // Gửi dữ liệu về cho client
    socket.emit('eventFromServer', { message: 'Hello client, I received your data!' });
  });

  // Xử lý sự kiện khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('A client disconnected');

    if (companyId && companySockets[companyId] === socket) {
      delete companySockets[companyId];
    }
  });
});
*/
