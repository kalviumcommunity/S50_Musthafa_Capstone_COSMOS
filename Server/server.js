const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/connect");
const userrouter = require("./Routes/user");
const postrouter = require("./Routes/post");
const authrouter = require("./GoogleAuth/auth");
const communityrouter = require("./Routes/community");
require("dotenv").config();
const SESSION_SECRET = process.env.SESSION_SECRET;

require("./GoogleAuth/GoogleAuth");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
connectDB();

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

app.use(express.json());

app.use("/users", userrouter);
app.use("/posts", postrouter);
app.use("/auth", authrouter);
app.use("/community", communityrouter);


app.listen(port, () => {
  console.log(`server is running on localhost ${port}`);
});
