import { type NextFunction, type Request, type Response } from "express"
import { Issuer, Strategy } from "openid-client"

const {
  KEYCLOAK_ISSUER_URL = "http://localhost:8080/realms/master",
  KEYCLOAK_CLIENT_SECRET = "",
  KEYCLOAK_CLIENT_ID = "",
} = process.env

const keycloakIssuer = await Issuer.discover(KEYCLOAK_ISSUER_URL)

// https://www.npmjs.com/package/openid-client/v/2.4.3#manually-recommended
/* 
> You should provide at least the following metadata: 
  - client_id, 
  - client_secret, 
  - id_token_signed_response_alg (defaults to RS256) 
  - token_endpoint_auth_method (defaults to client_secret_basic) 
  for a basic client definition, but you may provide any IANA registered client metadata.
*/
// Note: for the userInfo method, client_secret is not needed
// This probably implies that the token is not verified
export const client = new keycloakIssuer.Client({
  client_id: KEYCLOAK_CLIENT_ID,
  client_secret: KEYCLOAK_CLIENT_SECRET, // Necessary for introspect
})

export const introspectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token || token === "undefined")
    return res.status(401).send("Missing token")

  try {
    const introspection = await client.introspect(token)
    // NOTE: Introspection works even if token is "undefined", resulting in {active: false}
    if (!introspection.active) return res.status(401).send("Not active")

    res.locals.user = introspection
    next()
  } catch (error) {
    console.error(error)
    res.status(401).send(error)
  }
}

export const userInfoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token || token === "undefined")
    return res.status(401).send("Missing token")

  console.log(token)

  try {
    const userInfo = await client.userinfo(token)
    res.locals.user = userInfo
    next()
  } catch (error) {
    console.error(error)

    res.status(401).send(error)
  }
}

// Passport (haven't managed to make it work yet)
const verify = () => {
  console.log("verify")
}
export const strategy = new Strategy({ client }, verify)
