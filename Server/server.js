const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { createServer } = require("http");

const setupSocket = require("./socketio");
const connectDB = require("./config/connect");
const userrouter = require("./Routes/user");
const postrouter = require("./Routes/post");
const authrouter = require("./GoogleAuth/auth");
const communityrouter = require("./Routes/community");
const chatrouter = require("./Routes/chat");
const newsrouter = require("./Routes/news");
const reviewrouter = require("./Routes/reviews");
const cookieParser = require('cookie-parser')
const port = 3000;
const app = express();
const SESSION_SECRET = process.env.SESSION_SECRET;
connectDB();
require("dotenv").config();
require("./GoogleAuth/GoogleAuth");


const server = createServer(app);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      // sameSite: "Lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    // origin:"https://cosmos-weld.vercel.app",
    secure: false,
    credentials: true,
  })
);

setupSocket(server);

app.use("/users", userrouter);
app.use("/posts", postrouter);
app.use("/auth", authrouter);
app.use("/community", communityrouter);
app.use("/chat", chatrouter);
app.use("/news", newsrouter);
app.use("/review", reviewrouter);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
