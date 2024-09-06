import express, { type Request, type Response } from "express"
import cors from "cors"
// import { middleware as keycloakConnectMiddleware } from "./keycloak"
import { introspectMiddleware, userInfoMiddleware } from "./openid"

const app = express()

app.use(cors())

app.use(userInfoMiddleware)

const handler = (req: Request, res: Response) => {
  console.log("GET /data")
  res.send("Data")
}
app.get("/data", handler)

app.listen(7070, () => {
  console.log("Express listening on port 7070")
})
