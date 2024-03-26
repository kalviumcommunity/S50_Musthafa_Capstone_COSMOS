const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/connect")
const pingrouter = require("./Routes/ping");
const userrouter = require("./Routes/user");
const postrouter = require("./Routes/post")

const cors = require('cors');
app.use(cors());
connectDB()


app.use(express.json());
app.use("/ping", pingrouter);
app.use("/users", userrouter);
app.use("/posts", postrouter);



app.listen(port, () => {
  console.log(`server is running on localhost ${port}`);
});
