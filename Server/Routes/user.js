const express = require("express");
const router = express.Router();
const usermodel = require("../Schemas/Users");
const app = express();
app.use(express.json());



// GET REQUEST
router.get("/", async (req, res) => {
  try {
    const data = await usermodel.find();
    res.json(data);
  } catch (error) {
    console.error("An error occurred with the GET method while getting the user data:", error);
    res.status(500).json({
      error: "Internal Server Error with the GET method while getting the user data",
    });
  }
});


// GET REQUEST ACCORDING ID
router.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const userData = await usermodel.findById(userID);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error("An error occurred while getting the user details:", error);
    res.status(500).json({
      error: "Internal Server Error with the GET method of getting the user details",
    });
  }
});




// POST REQUEST with Joi Validation


router.post("/", async (req, res) => {
  try {
    const data = await usermodel.create(req.body);
    const token = generateToken(data);

    console.log("Token",token)
    console.log("Data",data)

    res.status(201).json({ user: data, token: token });
  } catch (err) {
    console.log("An error is caught with the POST method while posting the user data", err);
    res.status(500).json({
      error: "Internal Server Error with the POST method while posting the user data",
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

router.patch("/:id" , async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)

    const updateFields = {};
    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.username) {
      updateFields.username = req.body.username;
    }
    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.password) {
      updateFields.password = req.body.password;
    }
    if (req.body.phone_number) {
      updateFields.phone_number = req.body.phone_number;
    }

    const updatedData = await usermodel.findByIdAndUpdate(id, updateFields,{new: true});
    console.log("üpdated",updatedData)

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedData);
  } catch (error) {
    console.error("An error occurred while updating the user:", error);
    res.status(500).json({
      error: "Internal Server Error with the PATCH method of updating the user",
    });
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
