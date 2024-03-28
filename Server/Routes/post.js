const express = require("express");
const router = express.Router();
const Post = require("../Schemas/Posts");
const Profile = require("../Schemas/Profile");

const authenticate = (req, res, next) => {
  const profileHeader = req.headers["x-profile"];
  const profile = JSON.parse(profileHeader);

  try {
    req.userProfileId = profile._id;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


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
