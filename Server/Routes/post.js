const express = require("express");
const router = express.Router();
const Post = require("../Schemas/Posts");
const Profile = require("../Schemas/Profile");
const multer = require("multer");
const fs = require("fs");

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
    req.username = profile.username;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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

router.post("/addcomment", async (req, res) => {
  try {
    const { postid, name, comment, profilepic } = req.body;
    const post = await Post.findById(postid);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({ name, comment, profilepic });

    await post.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

router.post('/newpost',authenticate,  upload.any(), async (req, res) => {
  try {
    const { title, description, topic, video, image } = req.body;
    const createdBy = req.userProfileId;
    const username = req.username
    const comments = []
    const post = new Post({
      username,
      title,
      description,
      image,
      video,
      topic,
      createdBy,
      comments
    });

    await Profile.updateOne({ _id : createdBy }, { $push: { posts: post._id } });

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

router.get("/getcomments", (req, res) => {
  const postId = req.headers.postid;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post.comments);
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    res.status(200).json({
      message: "Deleted successfully",
      deletedPost: deletedPost
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router;
