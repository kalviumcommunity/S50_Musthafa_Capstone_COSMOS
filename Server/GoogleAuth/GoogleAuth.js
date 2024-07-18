const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const usermodel = require("../Schemas/Users");
const Profilemodel = require("../Schemas/Profile");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const secretKey = process.env.JWT_SECRET;

const generateToken = (data) => {
  const { _id, name, email } = data;
  const expiresIn = "7h";
  const payload = { _id, name, email };
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://s50-musthafa-capstone-cosmos.onrender.com/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        async function createUser(profile) {
          return {
            name: profile.name.givenName,
            email: profile.email,
            password: "",
          };
        }

        const existingProfile = await Profilemodel.findOne({
          email: profile.email,
          name: profile.name.givenName,
        });

        if (existingProfile) {
          const existingUser = await usermodel.findOne({
            email: profile.email,
            name: profile.name.givenName,
          });

          if (!existingUser) {
            return done(new Error("User not found."));
          }

          const token = generateToken(existingProfile);

          request.res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "None",
          });

          const passwordBool = false;
          request.res.cookie("passwordisthere", passwordBool, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "None",
          });

          return done(null, existingProfile);
        }

        const userDetail = await createUser(profile);
        const userData = await usermodel.create(userDetail);

        const userProfile = {
          name: profile.name.givenName,
          email: profile.email,
          posts: [],
          bio: "",
          communities: [],
          profilePic:
            "https://firebasestorage.googleapis.com/v0/b/cosmos-16de1.appspot.com/o/dp%2FScreenshot%202024-06-27%20011730.png?alt=media&token=46546fec-441e-4fe6-835a-5a39bda65c8a",
          user_id: userData._id,
        };
        const profileData = await Profilemodel.create(userProfile);

        const token = generateToken(profileData);

        request.res.cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "None",
        });
        const passwordBool = false;
        request.res.cookie("passwordisthere", passwordBool, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "None",
        });

        return done(null, profileData);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
