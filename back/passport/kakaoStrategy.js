const KakaoStrategy = require('passport-kakao').Strategy;

const { USER } = require('../models');

module.exports = passport => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/api/kakao/callback',
      },
      async (accesssToken, refreshToken, profile, done) => {
        try {
          const exUser = await USER.find({
            where: { userId: profile.id, provider: 'kakao' },
          });

          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await USER.create({
              email: profile._json && profile._json.kaccount_email,
              name: profile.displayName,
              userId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
