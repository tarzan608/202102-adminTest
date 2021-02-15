const passport = require('passport');
const db = require('../models');
const local = require('./local');
const kakao = require('./kakaoStrategy');

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.userId);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await db.USER.findOne({
        where: { userId },
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local(passport);
  kakao(passport);
};
