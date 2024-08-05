const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', 
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:5173/login'
  }), 
  (req, res) => {
    const token = req.session.token;
    console.log(req.session);
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
    });
    const passwordisthere = req.session.passwordisthere;

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
