const express = require("express");
const Message = require("../Schemas/Message");

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


module.exports = router;
