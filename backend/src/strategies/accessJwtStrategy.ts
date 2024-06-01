import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../config/config';

export const initializeJwtStrategy = (passport: any) => {
  passport.use(
    'jwt',
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.accessTokenKey,
        ignoreExpiration: false,
      },
      async (payload, done) => {
        try {
          return done(null, payload.id);
        } catch (error: any) {
          return done(null, false, { message: error.message });
        }
      }
    )
  );
};
