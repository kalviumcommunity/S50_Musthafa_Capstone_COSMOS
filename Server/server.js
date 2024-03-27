const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/connect");
const pingrouter = require("./Routes/ping");
const userrouter = require("./Routes/user");
const postrouter = require("./Routes/post");
const authrouter = require("./Routes/auth");
require("dotenv").config();
const SESSION_SECRET = process.env.SESSION_SECRET;

require("./Routes/googleAuth");
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

function isLoggedIn(req, res, next) {
  console.log("ll",isLoggedIn)
  req.user ? next() : res.sendStatus(401);
}



app.use(express.json());

app.use("/ping", pingrouter);
app.use("/users", userrouter);
app.use("/posts", postrouter);
app.use("/auth", authrouter);


app.listen(port, () => {
  console.log(`server is running on localhost ${port}`);
});
