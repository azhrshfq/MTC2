// backend/src/services/adminSocket.js
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');

class AdminSocketService {
  constructor(server) {
    this.io = socketIO(server, {
      path: '/admin-socket',
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
      }
    });

    this.setupMiddleware();
    this.setupEvents();
  }

  setupMiddleware() {
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.adminId = decoded.id;
        next();
      } catch (err) {
        next(new Error('Authentication error'));
      }
    });
  }

  setupEvents() {
    this.io.on('connection', (socket) => {
      console.log(`Admin ${socket.adminId} connected`);

      // Join admin room for broadcasts
      socket.join('admins');

      // Handle subscription to specific events
      socket.on('subscribe', (events) => {
        events.forEach(event => {
          socket.join(`event:${event}`);
        });
      });

      socket.on('disconnect', () => {
        console.log(`Admin ${socket.adminId} disconnected`);
      });
    });
  }

  // Emit events to all connected admins
  emitToAll(event, data) {
    this.io.to('admins').emit(event, data);
  }

  // Emit to specific admin
  emitToAdmin(adminId, event, data) {
    this.io.to(`admin:${adminId}`).emit(event, data);
  }

  // Real-time updates
  notifyNewMember(memberData) {
    this.emitToAll('new_member', memberData);
  }

  notifyPaymentFailure(paymentData) {
    this.emitToAll('payment_failed', paymentData);
  }

  notifySystemAlert(alertData) {
    this.emitToAll('system_alert', alertData);
  }

  updateDashboardStats(stats) {
    this.emitToAll('stats_update', stats);
  }
}

module.exports = AdminSocketService;