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

router.get("/logout", (req, res) => {
  res.cookies("token", null, {secure: false, httpOnly: false});                                  
  res.clearCookie('token');
  res.clearCookie('passwordisthere');
  req.logout(function (err) {
    if (err) {
      return res.status(500).send("Error during logout");
    }
    req.session.destroy(function (err) {
      if (err) {
        return res.status(500).send("Error destroying session");
      }
      res.status(200).send("User logged out successfully");
    });
  });

});


module.exports = router;
