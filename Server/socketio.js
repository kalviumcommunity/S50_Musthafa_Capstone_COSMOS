const { Server } = require("socket.io");
const Message = require("./Schemas/Message");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinCommunity", async (communityId) => {
      socket.join(communityId);
      const communityMessages = await Message.findOne({ communityId });
      socket.emit("message", communityMessages ? communityMessages.messages : []);
    });

    socket.on("message", async (message) => {

      // Update the messages array for the community
      await Message.updateOne(
        { communityId: message.communityId },
        { $push: { messages: message } },
        { upsert: true }
      );
      
      // Emit the message to all clients in the community room
      io.to(message.communityId).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
