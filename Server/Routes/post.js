const express = require("express");
const router = express.Router();
const Post = require("../Schemas/Posts");
const Profile = require("../Schemas/Profile");
const multer = require("multer");
const fs = require("fs");

// MIDDLEWARES
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
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
    req.name = profile.name;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET REQUESTS

// *to get all of the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// *to get all of the posts of a particular user to show in the profile
router.get("/getmyposts/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ createdBy: userId });

    if (posts.length == 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch random 4 posts
router.get("/getrandomposts", async (req, res) => {
  try {
      const randomPosts = await Post.aggregate([
          { $sample: { size: 4 } }
      ]);

      res.status(200).json(randomPosts);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


//* to get all of the comments of a particular post
router.get("/getAllComments/:id", (req, res) => {
  const  post_id = req.params.id;
  Post.findById(post_id)
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

// POST REQUESTS
router.post("/newpost", authenticate, upload.any(), async (req, res) => {
  try {
    const { caption, topic, image } = req.body;
    const createdBy = req.userProfileId;
    const comments = [];
    const name = req.name
    const likes = []
    const post = new Post({
      name,
      caption,
      image,
      topic,
      createdBy,
      comments,
      likes
    });

    await Profile.updateOne({ _id: createdBy }, { $push: { posts: post._id } });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//*get all my saved posts
router.get('/getmysavedPosts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const savedPostIds = profile.saved_posts;

    const savedPosts = await Post.find({ _id: { $in: savedPostIds } });
    res.status(200).json(savedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD Like 
router.post('/like/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, action } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (action === 'liked') {
      await Post.updateOne({ _id: id }, { $push: { likes: userId } });
    } else {
      await Post.updateOne({ _id: id }, { $pull: { likes: userId } });
    }

    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// PUT REQUESTS
// to update a posts caption and topic
router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { caption, topic } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption, topic },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.send(updatedPost);
  } catch (error) {
    res.status(500).send({ message: "Error updating post", error });
  }
});



// DELETE REQUESTS
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    res.status(200).json({
      message: "Deleted successfully",
      deletedPost: deletedPost,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
