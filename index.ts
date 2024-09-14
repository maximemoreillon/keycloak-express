import dotenv from "dotenv"
dotenv.config()

import express, { type Request, type Response } from "express"
import cors from "cors"
import passportMiddleware from "@moreillon/express-oidc"

const { KEYCLOAK_JWKS_URI = "" } = process.env

const app = express()

app.use(cors())

app.use(passportMiddleware({ jwksUri: KEYCLOAK_JWKS_URI }))

const handler = (req: Request, res: Response) => {
  console.log("GET /data")
  console.log(req.user)
  res.send("This is the data from the server")
}
app.get("/data", handler)

app.listen(7070, () => {
  console.log("Express listening on port 7070")
})
