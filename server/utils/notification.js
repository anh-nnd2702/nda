// Gửi thông báo đến nhà tuyển dụng
const { getIO } = require('../utils/socketManager.js');

const notifyCompany = (companyId, message) => {
  const io = getIO(); // Lấy đối tượng io từ socketManager
  if (io && companyId && io.sockets.connected[companyId]) {
    io.sockets.connected[companyId].emit('newNotification', message);
  }
  console.log(message);
};

module.exports = {
  notifyCompany,
};
