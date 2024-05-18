const express = require("express");
const router = express.Router();
const usermodel = require("../Schemas/Users");
const Profilemodel = require("../Schemas/Profile");
const bcrypt = require("bcrypt");
const app = express();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const profile = require("../Schemas/Profile");
const saltRounds = 10;
app.use(express.json());
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const generateToken = (data) => {
  const { _id, name, username, email } = data;
  const expiresIn = "7h";
  const payload = { _id, name, username, email };
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
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

const PostuserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

// GET REQUEST
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

router.get("/:id", async (req, res) => {
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
      message: error.message, // Include MongoDB error message if available
    });
  }
});

// GET REQUEST ACCORDING ID
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

    const userProfile = await profile.findOne({
      name: user.name,
      username: user.username,
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

// POST REQUEST with Joi Validation

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
        username: req.body.username,
        email: req.body.email,
        posts: [],
        bio: "",
        communities: []
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

// PUT REQUEST with Joi Validation

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = await usermodel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phone_number: req.body.phone_number,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedData);
  } catch (error) {
    console.error("An error occurred while updating the user:", error);
    res.status(500).json({
      error: "Internal Server Error with the PUT method of updating the user",
    });
  }
});

// PATCH REQUEST with Joi Validation

router.patch("/editBio/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { bioText } = req.body;

    console.log(userId);
    console.log(bioText);
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

// DELETE ACCORDING ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await usermodel.findByIdAndDelete(id);
  res.status(201).json({
    Message: "Deleted Successfully",
  });
});

module.exports = router;
