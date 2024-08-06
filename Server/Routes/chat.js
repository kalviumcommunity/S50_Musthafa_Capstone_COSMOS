const express = require("express");
const Message = require("../Schemas/Message");
const PersonalMessage = require("../Schemas/PersonalMessage");
const router = express.Router();

// Get all messages for a specific community
router.get("/:communityId", async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const messageDocument = await Message.findOne({ communityId });

    if (!messageDocument) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Extract the messages array
    const { messages } = messageDocument;
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example endpoint in your server file
router.get("/personalMessages/:otherUserId", async (req, res) => {
  const { userData } = req.query;
  const parsedUserData = JSON.parse(userData);

  const currentUserId = parsedUserData._id;

  // Replace with actual user ID from the request (e.g., from JWT or session)
  const { otherUserId } = req.params;
  const room = [currentUserId, otherUserId].sort().join("_");

  try {
    const personalMessages = await PersonalMessage.findOne({ room });
    res.json(personalMessages ? personalMessages.messages : []);
  } catch (error) {
    console.error("Error fetching personal messages:", error);
    res.status(500).send("Error fetching personal messages");
  }
});


module.exports = router;
