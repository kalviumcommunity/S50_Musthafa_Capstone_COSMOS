const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const generateToken = (data) => {
  const { _id } = data;
  const expiresIn = "7h";
  const payload = { _id };
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/HomePage',
    failureRedirect: 'http://localhost:5173/login'
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).send("Error during logout");
    }
    req.session.destroy(function (err) {
      if (err) {
        return res.status(500).send("Error destroying session");
      }
      res.send("User logged out successfully");
    });
  });

});


module.exports = router;
