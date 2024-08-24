const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// router.get('/google/callback',
//   passport.authenticate('google', {
//     successRedirect: 'http://localhost:5173/HomePage',
//     failureRedirect: 'http://localhost:5173/login'
//   })
// );
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    console.log(req);
    const { token, profile } = req.user;

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const passwordBool = false;
    res.cookie("passwordisthere", passwordBool, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/HomePage");
  }
);


router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true, 
    secure: true,
    sameSite: "none",
    path: "/",
  });

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