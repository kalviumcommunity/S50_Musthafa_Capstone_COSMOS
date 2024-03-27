const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/HomePage',
    failureRedirect: 'http://localhost:5173/login'
  })
);


module.exports = router;