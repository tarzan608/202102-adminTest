const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { USER, MEMBER, STORE, PRODUCT } = require('../models');

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
    const businessNumCheck = await STORE.findOne({
      where: { storeName: store },
    });
    if (businessNumCheck) {
      if (businessNumCheck.storeCode === code) {
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
      } else {
        req.flash('createError', '상점코드가 불일치 합니다.');
        return res.status(401).json({
          result: 'FAILURE',
          message: '상점코드가 불일치 합니다.',
        });
      }
    }
  } catch (error) {
    return next(error);
  }
});

/* 회원가입 중복체크 */

router.get('/api/register/duplicate/:id', async (req, res, next) => {
  try {
    const userCheck = await USER.findOne({ where: { userId: req.params.id } });
    if (userCheck) {
      req.flash('registerError', '이미 존재하는 아이디입니다.');
      return res.status(200).json({
        result: 'FAILURE',
        message: '이미 존재하는 아이디입니다.',
      });
    } else {
      return res.status(200).json({
        result: 'SUCCESS',
        message: '사용가능한 아이디입니다.',
      });
    }
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

router.post('/api/member', (req, res, next) => {
  const { page, perPage, search } = req.body;
  try {
    const total = MEMBER.findAll({
      where: {
        userId: {
          [Op.like]: `%${search}%`,
        },
      },
    })
      .then(total => {
        const member = MEMBER.findAll({
          where: {
            userId: {
              [Op.like]: `%${search}%`,
            },
          },
          limit: perPage, // 출력할 행의 수
          offset: page.current === 1 ? 0 : (page.current - 1) * perPage, // 몇번째 row부터 출력할 지. (1번째 row면 0)
        })
          .then(response => {
            if (response.length > 0) {
              return res.status(200).json({
                data: response,
                total: total.length,
              });
            } else {
              return res.status(200).json();
            }
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (e) {
    next(e);
  }
});

/* 사용자 관련(수정) */

router.post('/api/member/update/:id', async (req, res, next) => {
  const { userId, password, name, email } = req.body;
  const hash = await bcrypt.hash(password, 12);

  try {
    MEMBER.update(
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

router.post('/api/member/delete', async (req, res, next) => {
  try {
    for (let value of req.body) {
      MEMBER.destroy({
        where: { userId: value.userId },
      });
    }
    return res.status(200).json('성공');
  } catch (e) {
    next(e);
  }
});

/* 상점 관련(조회) */

router.post('/api/store', (req, res, next) => {
  const { page, perPage, search } = req.body;
  try {
    const total = STORE.findAll({
      where: {
        storeName: {
          [Op.like]: `%${search}%`,
        },
      },
    })
      .then(total => {
        const store = STORE.findAll({
          where: {
            storeName: {
              [Op.like]: `%${search}%`,
            },
          },
          limit: perPage, // 출력할 행의 수
          offset: page.current === 1 ? 0 : (page.current - 1) * perPage, // 몇번째 row부터 출력할 지. (1번째 row면 0)
        })
          .then(response => {
            if (response.length > 0) {
              return res.status(200).json({
                data: response,
                total: total.length,
              });
            } else {
              return res.status(200).json();
            }
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (e) {
    next(e);
  }
});

/* 상점 관련(추가) */

router.post('/api/store/create', async (req, res, next) => {
  const {
    storeId,
    storeName,
    storeCode,
    userName,
    address,
    tel,
    businessNum,
  } = req.body;

  try {
    const storeCheck = await STORE.findOne({ where: { storeName } }).then(
      check => {
        if (check) {
          req.flash('createError', '이미 존재하는 상점입니다.');
          return res.status(401).json({
            result: 'FAILURE',
            message: '이미 존재하는 상점입니다.',
          });
        } else {
          STORE.create({
            storeId,
            storeName,
            storeCode,
            userName,
            address,
            tel,
            businessNum,
          })
            .then(response => {
              return res.status(200).json(response);
            })
            .catch(err => {
              return res.status(500).json(err);
            });
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

/* 상점 관련(수정) */

router.post('/api/store/update/:id', async (req, res, next) => {
  const { storeId, storeName, userName, address, tel } = req.body;

  try {
    STORE.update(
      {
        storeName,
        userName,
        address,
        tel,
      },
      {
        where: { storeId },
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

/* 상점 관련(삭제) */

router.post('/api/store/delete', async (req, res, next) => {
  try {
    for (let value of req.body) {
      STORE.destroy({
        where: { storeId: value.storeId },
      });
    }
    return res.status(200).json('성공');
  } catch (e) {
    next(e);
  }
});

/* 상품 관련(조회) */

router.post('/api/product', (req, res, next) => {
  const { page, perPage, search } = req.body;
  try {
    const total = PRODUCT.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    })
      .then(total => {
        const product = PRODUCT.findAll({
          where: {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          limit: perPage, // 출력할 행의 수
          offset: page.current === 1 ? 0 : (page.current - 1) * perPage, // 몇번째 row부터 출력할 지. (1번째 row면 0)
        })
          .then(response => {
            if (response.length > 0) {
              return res.status(200).json({
                data: response,
                total: total.length,
              });
            } else {
              return res.status(200).json();
            }
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (e) {
    next(e);
  }
});

/* 상품 관련(추가) */

router.post('/api/product/create', async (req, res, next) => {
  console.log('상품관련 정보: ', req.body);
  const {
    productId,
    name,
    price,
    discount,
    content,
    brand,
    category,
    tag,
    quantity,
    imgage,
  } = req.body;

  try {
    const productCheck = await PRODUCT.findOne({ where: { name } }).then(
      check => {
        if (check) {
          req.flash('createError', '이미 존재하는 상품입니다.');
          return res.status(401).json({
            result: 'FAILURE',
            message: '이미 존재하는 상품입니다.',
          });
        } else {
          PRODUCT.create({
            productId,
            name,
            price,
            discount,
            content,
            brand,
            category,
            tag,
            quantity,
            imgage,
          })
            .then(response => {
              return res.status(200).json(response);
            })
            .catch(err => {
              return res.status(500).json(err);
            });
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

/* 상품 관련(수정) */

router.post('/api/product/update/:id', async (req, res, next) => {
  const {
    productId,
    name,
    price,
    discount,
    content,
    brand,
    category,
    tag,
    quantity,
    imgage,
  } = req.body;

  try {
    PRODUCT.update(
      {
        productId,
        name,
        price,
        discount,
        content,
        brand,
        category,
        tag,
        quantity,
        imgage,
      },
      {
        where: { productId },
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

/* 상품 관련(삭제) */

router.post('/api/product/delete', async (req, res, next) => {
  try {
    for (let value of req.body) {
      PRODUCT.destroy({
        where: { productId: value.productId },
      });
    }
    return res.status(200).json('성공');
  } catch (e) {
    next(e);
  }
});

/* 관리자 관련(조회) */

router.post('/api/user', (req, res, next) => {
  const { page, perPage, search } = req.body;
  try {
    const total = USER.findAll({
      where: {
        userId: {
          [Op.like]: `%${search}%`,
        },
      },
    })
      .then(total => {
        const user = USER.findAll({
          where: {
            userId: {
              [Op.like]: `%${search}%`,
            },
          },
          limit: perPage, // 출력할 행의 수
          offset: page.current === 1 ? 0 : (page.current - 1) * perPage, // 몇번째 row부터 출력할 지. (1번째 row면 0)
        })
          .then(response => {
            if (response.length > 0) {
              return res.status(200).json({
                data: response,
                total: total.length,
              });
            } else {
              return res.status(200).json();
            }
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (e) {
    next(e);
  }
});

/* 관리자 관련(수정) */

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

/* 관리자 관련(삭제) */

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
