const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/connect")
const pingrouter = require("./Routes/ping");
const userrouter = require("./Routes/user");
const latestnews = require("./Routes/news")

const cors = require('cors');
app.use(cors());
connectDB()


app.use(express.json());
app.use("/ping", pingrouter);
app.use("/users", userrouter);
app.use("/latestnews", latestnews);


app.listen(port, () => {
  console.log(`server is running on localhost ${port}`);
});
