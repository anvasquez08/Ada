const passport = require('passport');
const authRouter = require('express').Router();
const clientUrl = 'http://localhost:8080';
const INSTAGRAM_CLIENT_ID = require('../../config').INSTAGRAM_CLIENT_ID;
const INSTAGRAM_SECRET = require('../../config').INSTAGRAM_SECRET;
const InstagramStrategy = require('passport-instagram').Strategy;

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
  process.nextTick(() => {return done(null, profile)})
  }
));

authRouter.get('/instagram',
  passport.authenticate('instagram'));
  // , {
  //   scope: ['profile', 'email'],
  //   prompt: 'select_account'}),
  //   (req, res) => res.send(""))

authRouter.get('/instagram/callback',
  passport.authenticate('instagram', {failureRedirect: '/'}),
  (req, res) => {
    console.log("Redirecting");
    console.log(res.req.user.username);
    // res.send("Test");
    res.redirect(clientUrl);
  }
)

authRouter.get('/logout'), (req, res) => {
  req.logout();
  res.redirect(clientUrl);
}

module.exports = authRouter;