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
  res.clearCookie("token", {
    httpOnly: true, 
    secure: true,
    sameSite: "none",
    path: "/",
  });

<<<<<<< HEAD
=======
  console.log(res.cookies)
  console.log(req)
  console.log(req.cookies)
>>>>>>> e1167974565b8983e39c4280c9f69f11d3c5fc41
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