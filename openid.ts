import { type NextFunction, type Request, type Response } from "express"
import { Issuer, Strategy } from "openid-client"

const {
  KEYCLOAK_SERVER_URL = "http://localhost:8080",
  KEYCLOAK_REALM = "master",
  KEYCLOAK_CLIENT_SECRET = "",
  KEYCLOAK_CLIENT_ID = "",
} = process.env

const issuerUrl = `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}`
const keycloakIssuer = await Issuer.discover(issuerUrl)

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
export const client = new keycloakIssuer.Client({
  client_id: KEYCLOAK_CLIENT_ID,
  // client_secret: KEYCLOAK_CLIENT_SECRET,
})

export const introspectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  const verified = await client.introspect(token as string)
  console.log({ verified })
  next()
}

export const userInfoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  const userInfo = await client.userinfo(token as string)
  console.log({ userInfo })
  next()
}

// Passport (haven't managed to make it work yet)
const verify = () => {
  console.log("verify")
}
export const strategy = new Strategy({ client }, verify)
