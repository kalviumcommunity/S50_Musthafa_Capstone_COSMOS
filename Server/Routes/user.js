const express = require("express");
const router = express.Router();
const usermodel = require("../Schemas/Users");
const Profilemodel = require("../Schemas/Profile");
const bcrypt = require("bcrypt");
const app = express();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const Post = require("../Schemas/Posts");
const Message = require("../Schemas/Message");
const postModel = require("../Schemas/Posts");
const saltRounds = 10;
app.use(express.json());
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

// MIDDLE WARES

const PostuserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

const generateToken = (data) => {
  const { _id, name, email } = data;
  const expiresIn = "7h";
  const payload = { _id, name, email };
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.cookies.token || req.query.token || req.headers["x-access-token"];
    console.log("token",token);
  if (!token) {
    return res.status(200).json({ error: "Token is not provided" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Failed to authenticate token" });
  }
};

router.post("/tokenvalidate", verifyToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.decoded });
});

// GET REQUESTS

// *to get all of the users
router.get("/", async (req, res) => {
  try {
    const data = await usermodel.find();
    res.json(data);
  } catch (error) {
    console.error(
      "An error occurred with the GET method while getting the user data:",
      error
    );
    res.status(500).json({
      error:
        "Internal Server Error with the GET method while getting the user data",
    });
  }
});

// *to get a particular user
router.get("/getAsingleUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await Profilemodel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error("An error occurred while getting the user data:", error);
    res.status(500).json({
      error: "Internal Server Error while getting the user data",
      message: error.message,
    });
  }
});

//* get random users
router.get("/getusersforuserpost", async (req, res) => {
  try {
    // Get random users and project only the name and profile picture
    const users = await Profilemodel.aggregate([
      { $sample: { size: 4 } },
      { $project: { name: 1, profilePic: 1 } },
    ]);

    res.json(users);
  } catch (err) {
    console.error("Error while fetching the user data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// POST REQUESTS
//* to login authentication
router.post("/getone", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const userProfile = await Profilemodel.findOne({
      name: user.name,
    });
    const token = generateToken(userProfile);
    const responseData = {
      token,
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = PostuserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const userData = { ...req.body, password: hashedPassword };

      // Create user
      const user = await usermodel.create(userData);

      // Create user profile
      const userProfileData = {
        name: req.body.name,
        email: req.body.email,
        posts: [],
        bio: "",
        communities: [],
        profilePic:
          "https://firebasestorage.googleapis.com/v0/b/cosmos-16de1.appspot.com/o/dp%2FScreenshot%202024-06-27%20011730.png?alt=media&token=46546fec-441e-4fe6-835a-5a39bda65c8a",
        user_id: user._id,
      };

      const userProfile = await Profilemodel.create(userProfileData);
      const token = generateToken(userProfile);

      res.status(201).json({ token });
    }
  } catch (err) {
    console.log(
      "An error is caught with the POST method while posting the user data",
      err
    );
    res.status(500).json({
      error:
        "Internal Server Error with the POST method while posting the user data",
    });
  }
});

router.post("/saveThePost/:id", async (req, res) => {
  const { id } = req.params;
  const { postId, action } = req.body;

  try {
    const user = await Profilemodel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (action === "saved") {
      await Profilemodel.updateOne(
        { _id: id },
        { $push: { saved_posts: postId } }
      );
    } else {
      await Profilemodel.updateOne(
        { _id: id },
        { $pull: { saved_posts: postId } }
      );
    }

    const updatedProfile = await Profilemodel.findById(id);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT REQUEST
router.put("/editBio/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { bioText } = req.body;
    const updatedUser = await Profilemodel.findOneAndUpdate(
      { _id: userId },
      { bio: bioText },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/updateProfilePic/:id", async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body;

  try {
    // Find the old profile to get the current profilePic
    const oldProfile = await Profilemodel.findById(id);
    if (!oldProfile) {
      return res.status(404).send("User not found");
    }

    // Update profile picture in Profilemodel
    const updatedProfile = await Profilemodel.findByIdAndUpdate(
      id,
      { profilePic: imageUrl },
      { new: true }
    );

    // Update profile pictures in comments in Post model
    await Post.updateMany(
      { "comments.profilepic": oldProfile.profilePic },
      { $set: { "comments.$[elem].profilepic": imageUrl } },
      { arrayFilters: [{ "elem.profilepic": oldProfile.profilePic }] }
    );

    // Update profile pictures in messages in Message model
    await Message.updateMany(
      { "messages.profile_picture": oldProfile.profilePic },
      { $set: { "messages.$[elem].profile_picture": imageUrl } },
      { arrayFilters: [{ "elem.profile_picture": oldProfile.profilePic }] }
    );

    res.json(updatedProfile);
  } catch (err) {
    console.error("Error while updating profile picture:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/checkPassword/:id", async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;
  try {
    const user = await usermodel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.json({ success: true, message: "Password is correct" });
    } else {
      return res.json({ success: false, message: "Password is incorrect" });
    }
  } catch (err) {
    console.error("Error checking password:", err);
    return res
      .status(500)
      .json({ message: "An error occurred while checking the password" });
  }
});

// to change the password
router.post("/changepassword/:id", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;

  try {
    const user = await usermodel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.log("it is false");
      return res.json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE ACCORDING ID
router.delete("/deleteMyAccount/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("coming", userId);
  try {
    // Find the profile by userId
    const profile = await Profilemodel.findById(userId);
    console.log(profile);

    // If the profile is not found, return a 404 error
    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    // Delete the profile
    await Profilemodel.findByIdAndDelete(userId);

    // Delete the posts created by the user
    await postModel.deleteMany({ createdBy: userId });

    // Delete the user account
    await usermodel.findOneAndDelete({
      email: profile.email,
      _id: profile.user_id,
    });

    // Send a success response
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({
      message: "An error occurred while deleting the account",
    });
  }
});

module.exports = router;
