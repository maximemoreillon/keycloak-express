import dotenv from "dotenv"
dotenv.config()

import express, { type Request, type Response } from "express"
import cors from "cors"
// import { middleware as keycloakConnectMiddleware } from "./keycloak"
import passportMiddleware from "./passport-jwt"

const {
  KEYCLOAK_ISSUER_URL = "",
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_JWKS_URI = "",
} = process.env

const app = express()

app.use(cors())

app.use(passportMiddleware({ jwksUri: KEYCLOAK_JWKS_URI }))

const handler = (req: Request, res: Response) => {
  console.log("GET /data")
  console.log(res.locals.user)
  res.send("This is the data from the server")
}
app.get("/data", handler)

app.listen(7070, () => {
  console.log("Express listening on port 7070")
})
