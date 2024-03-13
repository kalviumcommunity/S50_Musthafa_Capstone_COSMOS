const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());

router.get("/", (req, res) => {
  console.log("Received a request to /ping");
  res.send("<h1>Pong</h1>");
});


module.exports = router;
