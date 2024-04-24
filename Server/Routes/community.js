const express = require("express");
const router = express.Router();
const communitymodel = require("../Schemas/Community");
const app = express();
app.use(express.json());
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const data = await communitymodel.find();
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

router.post('/create', async (req, res) => {
  try {
    const { name, description, communityprofile , creator } = req.body;

    const community = {
      name : name,
      description : description,
      communityprofile : communityprofile,
      creator : creator,
      members : []
    }
    const com = await communitymodel.create(community)

    res.status(200).json({ message: 'Community created successfully' , community : com });
  } catch (error) {
    console.error('Error creating community:', error);
    res.status(500).json({ error: 'Internal server error' });
  }});



// DELETE ACCORDING ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await communitymodel.findByIdAndDelete(id);
  res.status(201).json({
    Message: "Deleted Successfully",
  });
});

module.exports = router;
