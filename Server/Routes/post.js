const express = require("express");
const router = express.Router();
const Post = require("../Schemas/Posts");
const Profile = require("../Schemas/Profile");

const authenticate = async (req, res, next) => {
  try {
    const profileHeader = req.headers["x-profile"];

    if (!profileHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Profile header missing" });
    }

    let profile;
    try {
      profile = JSON.parse(profileHeader);
    } catch (error) {
      return res.status(400).json({ error: "Invalid profile data" });
    }

    if (!profile || !profile._id) {
      return res.status(400).json({ error: "Invalid profile data" });
    }

    const userProfile = await Profile.findById(profile._id);
    if (!userProfile) {
      return res.status(401).json({ error: "Unauthorized: Profile not found" });
    }

    req.userProfileId = profile._id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, image, video, topic } = req.body;

    if (!image && !video) {
      return res
        .status(400)
        .json({ error: "Either imageLink or videoLink is required" });
    }

    const createdBy = req.userProfileId;

    const post = new Post({
      title,
      description,
      image,
      video,
      topic,
      createdBy,
    });

    await Profile.updateOne({ _id: createdBy }, { $push: { posts: post._id } });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getmyposts/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ createdBy: userId });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
