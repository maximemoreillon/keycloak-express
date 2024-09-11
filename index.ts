import express, { type Request, type Response } from "express"
import cors from "cors"
// import { middleware as keycloakConnectMiddleware } from "./keycloak"
import {
  introspectMiddleware,
  userInfoMiddleware,
} from "@moreillon/express-oidc"

const { KEYCLOAK_ISSUER_URL, KEYCLOAK_CLIENT_SECRET, KEYCLOAK_CLIENT_ID } =
  process.env

const app = express()

app.use(cors())

// app.use(introspectMiddleware)
app.use(
  userInfoMiddleware({
    issuer_url: KEYCLOAK_ISSUER_URL,
    client_id: KEYCLOAK_CLIENT_ID,
    client_secret: KEYCLOAK_CLIENT_SECRET,
  })
)

const handler = (req: Request, res: Response) => {
  console.log("GET /data")
  console.log(res.locals.user)
  res.send("Data")
}
app.get("/data", handler)

app.listen(7070, () => {
  console.log("Express listening on port 7070")
})
