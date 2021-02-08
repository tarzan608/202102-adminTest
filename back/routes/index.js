const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { USER } = require('../models');

const router = express.Router();

// // user data router
// router.use('/', require('./user'));

// // store data router
// router.use('/', require('./store'));

// // product data router
// router.use('/', require('./product'));

/* 회원가입 API */

router.post('/api/register', async (req, res, next) => {
  const { userId, password, name, email, store, code } = req.body;

  try {
    const userCheck = await USER.findOne({ where: { userId } });
    if (userCheck) {
      req.flash('registerError', '이미 존재하는 아이디입니다.');
      return res.status(401).json({
        result: 'FAILURE',
        message: '이미 존재하는 회원입니다.',
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await USER.create({
      userId,
      name,
      password: hash,
      email,
      store,
      code,
    });
    return res.status(200).json({
      result: 'SUCCESS',
      message: '회원가입에 성공하였습니다.',
    });
  } catch (error) {
    return next(error);
  }
});

/* 로그인, 로그아웃 API */

router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.status(401).json({
        result: 'FAILURE',
        message: '가입된 정보가 없습니다.',
      });
    }
    return req.login(user, async loginError => {
      try {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        const fullUser = await USER.findOne({
          where: { userId: user.userId },
        });
        const userData = Object.assign({}, fullUser.toJSON());
        delete userData.password;
        return res.status(200).json({
          result: 'SUCCESS',
          message: '로그인에 성공하였습니다.',
          data: userData,
        });
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).json({
    result: 'SUCCESS',
    message: '로그아웃에 성공하였습니다.',
  });
});

module.exports = router;
