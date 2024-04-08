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
    const postsWithBase64Images = posts.map(post => {
      const base64Image = post.image.toString('base64');
      return {
        ...post._doc, 
        image: base64Image
      };
    });

    res.status(200).json(postsWithBase64Images);
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


const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
});

const upload = multer({ storage: storage });

router.post("/", authenticate, upload.single("image"), async (req, res) => {
  try {
    const { title, description, topic, video } = req.body;
    const bf = Buffer.from(req.file.buffer, "utf-8");    
    const createdBy = req.userProfileId;
    const username = req.username
    const comments = []
    const image = bf
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

    const postsWithBase64Images = posts.map(post => {
      const base64Image = post.image.toString('base64');
      return {
        ...post._doc, 
        image: base64Image
      };
    });

    res.status(200).json(postsWithBase64Images);
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
  const id = req.params.id;
  await Post.findByIdAndDelete(id);
  res.status(201).json({
    Message: "Deleted Successfully",
  });
});

module.exports = router;
