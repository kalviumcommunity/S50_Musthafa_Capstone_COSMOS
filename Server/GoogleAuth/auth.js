const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://thecosmos-lovuhjb24-swe1.vercel.app/login",
  }),
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

    res.redirect("https://thecosmos-lovuhjb24-swe1.vercel.app/HomePage");
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token", "connect.sid", "passwordisthere", {
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
