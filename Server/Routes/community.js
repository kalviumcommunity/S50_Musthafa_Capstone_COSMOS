const express = require("express");
const router = express.Router();
const communitymodel = require("../Schemas/Community");
const app = express();
app.use(express.json());
require("dotenv").config();
const multer = require("multer");
const profile = require("../Schemas/Profile");
const Message = require("../Schemas/Message");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// GET ROUTES
// to get all of the communities
router.get("/getAll/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const communities = await communitymodel.find({
      members: { $nin: [userId] },
    });

    const shuffledCommunities = shuffleArray(communities);
    res.status(200).json(shuffledCommunities);
  } catch (error) {
    console.error("An error occurred while fetching community data:", error);
    res.status(500).json({
      error: "Internal Server Error while fetching community data",
    });
  }
});

// to get a particular community using id
router.get("/:id", async (req, res) => {
  try {
    const communityID = req.params.id;
    const communities = await communitymodel.findById(communityID);
    res.status(200).json(communities);
  } catch (error) {
    console.error("An error occurred while fetching community data:", error);
    res.status(500).json({
      error: "Internal Server Error while fetching community data",
    });
  }
});

//* to get the details of a community such as members, description, etc.
router.get("/details/:id", async (req, res) => {
  try {
    const communityID = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const community = await communitymodel.findById(communityID).populate({
      path: "members",
      select: "name bio profilePic",
      options: {
        limit: perPage,
        skip: (page - 1) * perPage,
      },
    });

    res.status(200).json(community);
  } catch (error) {
    console.error("An error occurred while fetching community data:", error);
    res.status(500).json({
      error: "Internal Server Error while fetching community data",
    });
  }
});

//* to get all the community which a particular user has included
// router.get("/mycommunities/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await profile.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const communityIds = user.communities;
//     const communities = await communitymodel.find({
//       _id: { $in: communityIds },
//     });

//     res.status(200).json(communities);
//   } catch (error) {
//     console.error("An error occurred while fetching community data:", error);
//     res.status(500).json({
//       error: "Internal Server Error while fetching community data",
//     });
//   }
// });
router.get("/mycommunities/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await profile.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const communityIds = user.communities;
    const communities = await Message.aggregate([
      { $match: { communityId: { $in: communityIds } } }, 
      { $unwind: "$messages" }, 
      { $sort: { "messages.date": -1 } },
      {
        $group: {
          _id: "$communityId",
          latestMessage: { $first: "$messages" },
        },
      },
      {
        $lookup: {
          from: "communities",
          localField: "_id",
          foreignField: "_id",
          as: "communityDetails",
        },
      },
      { $unwind: "$communityDetails" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$communityDetails", { latestMessage: "$latestMessage" }],
          },
        },
      },
    ]);

    res.status(200).json(communities);
  } catch (error) {
    console.error("An error occurred while fetching community data:", error);
    res.status(500).json({
      error: "Internal Server Error while fetching community data",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, description, creator, communityprofile } = req.body;

    const community = {
      name: name,
      description: description,
      communityprofile: communityprofile,
      creator: creator,
      members: [creator],
    };

    // Save the community to the database
    const com = await communitymodel.create(community);

    if (com) {
      // Update the creator's user document to add the new community
      await profile.findByIdAndUpdate(creator, {
        $push: { communities: com._id },
      });

      // Create a message document for the new community
      const message = new Message({
        messages: [],
        communityId: com._id,
      });

      await message.save();

      res.status(200).json({
        message: "Community created successfully",
        community: com,
      });
    } else {
      res.status(500).json({ error: "Failed to create community" });
    }
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/join", async (req, res) => {
  const { userId, communityid } = req.body;

  try {
    const community = await communitymodel.updateOne(
      { _id: communityid },
      { $push: { members: userId } }
    );

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    await profile.updateOne(
      { _id: userId },
      { $push: { communities: communityid } }
    );

    res.status(200).json({ message: "User joined community successfully" });
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// *to exit from a community
router.post("/exit", async (req, res) => {
  const { userId, communityId } = req.body;

  try {
    // Remove userId from the community's members array
    const communityResult = await communitymodel.updateOne(
      { _id: communityId },
      { $pull: { members: userId } }
    );

    // Remove communityId from the user's communities array
    const profileResult = await profile.updateOne(
      { _id: userId },
      { $pull: { communities: communityId } }
    );

    // Check if the community was updated
    if (communityResult.matchedCount === 0) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Check if the user was a member of the community
    if (communityResult.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "User is not a member of the community" });
    }

    // Check if the user profile was updated
    if (profileResult.matchedCount === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json({ message: "Successfully exited the community" });
  } catch (error) {
    console.error("Error while exiting the community", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE ACCORDING ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const communityId = req.params.id;

    // Delete the community by ID
    const deletedCommunity = await communitymodel.findByIdAndDelete(
      communityId
    );

    if (!deletedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Delete all messages associated with the community ID
    const deletedMessages = await Message.deleteMany({
      communityId: communityId,
    });

    res.status(200).json({
      message: "Community deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting community and messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
