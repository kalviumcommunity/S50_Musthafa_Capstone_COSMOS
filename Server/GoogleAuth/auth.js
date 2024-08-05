const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");

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
    failureRedirect: 'http://localhost:5173/login'
  }), 
  (req, res) => {
    const token = generateToken(req.session.passport.user);
    console.log("user data:- ",token);
      
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
    });
    const passwordisthere = false;
    res.cookie('passwordisthere', passwordisthere, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
    });

    res.redirect('http://localhost:5173/HomePage');
  }
);


router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).send('Error during logout');
    }
    req.session.destroy(function (err) {
      if (err) {
        return res.status(500).send('Error destroying session');
      }
      res.clearCookie('token');
      res.send('User logged out successfully');
    });
  });
});

module.exports = router;
