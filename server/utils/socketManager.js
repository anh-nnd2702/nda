const allSockets = {};

const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A client connected');

    const socketId = socket.id;
    const { companyId, candidateId } = socket.handshake.query;

    if (companyId) {
      const companySocketId = `company${companyId}`;
      allSockets[companySocketId] = socket;
    }
    if (candidateId) {
      const candidateSocketId = `candidate${candidateId}`;
      allSockets[candidateSocketId] = socket;
    }

    socket.on('disconnect', () => {
      console.log('A client disconnected');

      if (companyId) {
        const companySocketId = `company${companyId}`;
        if (allSockets[companySocketId]) {
          delete allSockets[companySocketId];
        }
      }
      if (candidateId) {
        const candidateSocketId = `candidate${candidateId}`;
        if (allSockets[candidateSocketId]) {
          delete allSockets[candidateSocketId];
        }
      }
    });
  });
};

const sendNotificationToCompany = (companyId, message, jobId, applyId) => {
  const socketId = `company${companyId}`;
  const companySocket = allSockets[socketId];
  if (companySocket) {
    companySocket.emit('companyNotification', { message, jobId, applyId });
  }
};

const sendNotificationToCandidate = (candidateId, message, jobId, applyId) => {
  const socketId = `candidate${candidateId}`;
  const candidateSocket = allSockets[socketId];
  console.log(candidateId, message, jobId, applyId, candidateSocket);
  if (candidateSocket) {
    candidateSocket.emit('applyNotification', { message, jobId, applyId });
  }
};

module.exports = { initializeSocket, sendNotificationToCompany, sendNotificationToCandidate };
