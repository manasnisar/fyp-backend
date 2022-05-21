const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { createServer } = require('http');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
});

const server = createServer(app);
server.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const io = new Server(server, {
  cors: {
    origin: config.corsOrigins,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  logger.info('Client Connected!');
  global.socketio = io;

  // socket.on('initial_data', async () => {
  //   const feed = await Feed.find({}).sort({ createdAt: -1 });
  //   io.sockets.emit('get_data', feed);
  // });
  //
  // // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
  // socket.on('post_data', async (body) => {
  //   const title = body;
  //   const feed = new Feed({ title });
  //   await feed.save();
  //   io.sockets.emit('change_data');
  // });
  //
  // socket.on('check_all_notifications', async () => {
  //   const feeds = await Feed.find({});
  //
  //   feeds.forEach((feed) => {
  //     feed.read = true;
  //   });
  //
  //   await Feed.create(feeds);
  //
  //   io.sockets.emit('change_data');
  // });

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    logger.info('Client Disconnected!');
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
