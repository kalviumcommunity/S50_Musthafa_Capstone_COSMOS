const express = require("express");
const router = express.Router();
const communitymodel = require("../Schemas/Community");
const app = express();
app.use(express.json());
require("dotenv").config();
const multer = require("multer");
const Profile = require("../Schemas/Profile")

router.get("/getAll", async (req, res) => {
  try {
    const communities = await communitymodel.find();
    res.status(200).json(communities);
  } catch (error) {
    console.error("An error occurred while fetching community data:", error);
    res.status(500).json({
      error: "Internal Server Error while fetching community data",
    });
  }
});

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

router.get("/details/:id", async (req, res) => {
  try {
    const communityID = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const community = await communitymodel
      .findById(communityID)
      .populate({
        path: "members",
        select: "name bio",
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

router.get("/mycommunities/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Profile.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const communityIds = user.communities; 
    const communities = await communitymodel.find({ _id: { $in: communityIds } });

    res.status(200).json( communities );
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
      members: [],
    };

    const com = await communitymodel.create(community);

    if (com) {
      res
        .status(200)
        .json({ message: "Community created successfully", community: com });
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

    const community =   await communitymodel.updateOne({ _id: communityid }, { $push: { members: userId } });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    await Profile.updateOne({ _id: userId }, { $push: { communities: communityid } });

    res.status(200).json({ message: "User joined community successfully" });
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// DELETE ACCORDING ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await communitymodel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
