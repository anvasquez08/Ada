const passport = require('passport');
const authRouter = require('express').Router();
const clientUrl = 'http://localhost:8080';

authRouter.get('/instagram',
  passport.authenticate('instagram'));
  // , {
  //   scope: ['profile', 'email'],
  //   prompt: 'select_account'}),
  //   (req, res) => res.send(""))

authRouter.get('/instagram/callback',
  passport.authenticate('instagram',
  (req, res) => {
    console.log("Redirecting");
    res.redirect(clientUrl);
  }
))

authRouter.get('/logout'), (req, res) => {
  req.logout();
  res.redirect(clientUrl);
}

module.exports = authRouter;