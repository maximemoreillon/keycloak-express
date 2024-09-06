import {
  Strategy,
  ExtractJwt,
  type StrategyOptionsWithoutRequest,
  type VerifyCallback,
} from "passport-jwt"
import { keyProvider } from "./jwks"

const myDone = (a: any, b: any) => {
  console.log({ a, b })
}

const opts: StrategyOptionsWithoutRequest = {
  // secretOrKeyProvider: (request, rawJwtToken, done) => {
  //   keyProvider(request, rawJwtToken, myDone)
  // },
  secretOrKeyProvider: keyProvider,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const verifyCallback: VerifyCallback = (jwtPayload, done) => {
  console.log({ jwtPayload })
  done(null, "verify")
}

export const strategy = new Strategy(opts, verifyCallback)
