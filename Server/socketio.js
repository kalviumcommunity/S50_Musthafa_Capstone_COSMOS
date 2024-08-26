const { Server } = require("socket.io");
const CommunityMessage = require("./Schemas/Message");
const PersonalMessage = require("./Schemas/PersonalMessage");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://cosmos-plum.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinCommunity", async (communityId) => {
      socket.join(communityId);
      const communityMessages = await CommunityMessage.findOne({ communityId });
      socket.emit(
        "communityMessage",
        communityMessages && communityMessages.messages
      );
    });

    socket.on("communityMessage", async (message) => {
      await CommunityMessage.updateOne(
        { communityId: message.communityId },
        { $push: { messages: message } },
        { upsert: true }
      );

      io.to(message.communityId).emit("communityMessage", message);
    });

    // Personal Chat
    socket.on("joinPersonalChat", async ({ userId, otherUserId }) => {
      const room = getPersonalRoomId(userId, otherUserId);
      socket.join(room);

      const personalMessages = await PersonalMessage.findOne({ room });
      socket.emit(
        "personalMessage",
        personalMessages && personalMessages.messages
      );
    });

    socket.on("personalMessage", async (message) => {
      const { senderId, receiverId } = message;
      const room = getPersonalRoomId(senderId, receiverId);

      await PersonalMessage.updateOne(
        { room },
        { $push: { messages: message } },
        { upsert: true }
      );

      io.to(room).emit("personalMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

const getPersonalRoomId = (userId, otherUserId) => {
  return [userId, otherUserId].sort().join("_");
};

module.exports = setupSocket;
