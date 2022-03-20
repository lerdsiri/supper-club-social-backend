import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { JWT_SECRET } from '../util/secrets'
import UserService from '../services/user'

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: { _id: string; email: string }, done: any) => {
    const userEmail = payload.email
    const foundUser = await UserService.findUserByEmail(userEmail)
    done(null, foundUser)
  }
)
