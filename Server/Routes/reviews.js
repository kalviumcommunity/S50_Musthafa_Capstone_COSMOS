const express = require("express");
const Review = require("../Schemas/Review");

const router = express.Router();

// Get all messages for a specific community
router.get("/randomreviews", async (req, res) => {
  try {
    const randomPosts = await Review.aggregate([
        { $sample: { size: 4 } }
    ]);
    
    res.status(200).json(randomPosts);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

router.post("/newreview", async (req, res) => {
  const { review } = req.body;
  console.log(review)
  const savedReview = await Review.create(review);
  res.status(201).json(savedReview);
});

module.exports = router;
