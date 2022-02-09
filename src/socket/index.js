const socketIO = require('socket.io');
const logger = require('../config/logger');

export default (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    logger.info('Client Connected!');

    socket.on('initial_data', async () => {
      const feed = await Feed.find({}).sort({ createdAt: -1 });
      io.sockets.emit('get_data', feed);
    });

    // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
    socket.on('post_data', async (body) => {
      const title = body;
      const feed = new Feed({ title });
      await feed.save();
      io.sockets.emit('change_data');
    });

    socket.on('check_all_notifications', async () => {
      const feeds = await Feed.find({});

      feeds.forEach((feed) => {
        feed.read = true;
      });

      await Feed.create(feeds);

      io.sockets.emit('change_data');
    });

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
      logger.info('Client Disconnected!');
    });
  });

  return io;
};
