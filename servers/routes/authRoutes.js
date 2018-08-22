const express = require('express');
const passport = require('passport');
const axios = require('axios');
const authRouter = require('express').Router();
const clientUrl = 'http://localhost:8080';
const INSTAGRAM_CLIENT_ID = require('../../config').INSTAGRAM_CLIENT_ID;
const INSTAGRAM_SECRET = require('../../config').INSTAGRAM_SECRET;
const InstagramStrategy = require('passport-instagram').Strategy;
const userDB = require('../../databases/Users.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new InstagramStrategy({
  clientID: INSTAGRAM_CLIENT_ID,
  clientSecret: INSTAGRAM_SECRET,
  callbackURL: 'http://localhost:8080/auth/instagram/callback'
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, {profile: profile, accessToken: accessToken})})
  }
));

authRouter.get('/instagram',
  passport.authenticate('instagram')
);

authRouter.get('/instagram/callback',
  passport.authenticate('instagram', {successRedirect: '/', failureRedirect: '/'}),
  (req, res) => {res.redirect('/')}
);

authRouter.get('/current_user', (req, res) => {
  if (req.user !== undefined) {
    req.session.accessToken = req.user.accessToken;
    userDB.getUser(req.user.profile.username, (err, data) => {
      if (err) {
        console.log("User not found in DB - saving user to DB: ", req.user.profile.username)
        userDB.saveUser(req.user.profile.username)
      }
    });
    res.send(req.user.profile.username);
  } else {
    res.send('');
  }
});

authRouter.get('/media', (req, res) => {
  axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${req.session.accessToken}`)
  .then((result) => {
    res.send(result.data);
  })
  .catch((err) => {console.log("Log in to see your Instagram feed")})
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


module.exports = authRouter;