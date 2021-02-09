const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { USER } = require('../models');

const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

/* 사용자 관련(조회) */

router.post('/api/user', (req, res, next) => {
  const { page, perPage, search } = req.body;
  try {
    const user = USER.findAll({
      where: {
        userId: {
          [Op.like]: `%${search}%`,
        },
      },
      limit: perPage, // 출력할 행의 수
      offset: page === 1 ? 0 : page * perPage, // 몇번째 row부터 출력할 지. (1번째 row면 0)
    })
      .then(response => {
        if (response.length > 0) {
          return res.status(200).json(response);
        } else {
          return res.status(200).json();
        }
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (e) {
    next(e);
  }
});

/* 사용자 관련(수정) */

router.post('/api/user/update/:id', async (req, res, next) => {
  const { userId, password, name, email } = req.body;
  const hash = await bcrypt.hash(password, 12);

  try {
    USER.update(
      {
        userId,
        password: hash,
        name,
        email,
      },
      {
        where: { userId },
      }
    )
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (e) {
    next(e);
  }
});

/* 사용자 관련(삭제) */

router.post('/api/user/delete', async (req, res, next) => {
  try {
    for (let value of req.body) {
      USER.destroy({
        where: { userId: value.userId },
      });
    }
    return res.status(200).json('성공');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
