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
    console.log("New client connected", socket.id);

    socket.on("joinCommunity", async (communityId) => {
      socket.join(communityId);
      const communityMessages = await Message.findOne({ communityId });
      socket.emit("message", communityMessages ? communityMessages.messages : []);
    });

    socket.on("message", async (message) => {
      console.log("Message received:", message);

      const newMessage = {
        username: message.username,
        message: message.message,
        date: message.date,
        profile_picture: message.profile_picture,
      };

      // Update the messages array for the community
      const result = await Message.updateOne(
        { communityId: message.communityId },
        { $push: { messages: newMessage } },
        { upsert: true }
      );

      console.log("Database update result:", result);

      // Emit the message to all clients in the community room
      io.to(message.communityId).emit("message", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
