const express = require('express');
const passport = require('passport');
const router = express.Router();
const { User } = require('../../models');

/* LOGIN 관련(로그인, 로그아웃) */
router.post('/api/user/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async loginErr => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
        });
        const userData = Object.assign({}, fullUser.toJSON());
        delete userData.password;

        return res.status(200).json(userData);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post('/api/user/logout', (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    return res.status(200).json();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
