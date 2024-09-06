// NOT WORKING

import jwksRsa from "jwks-rsa"

const { KEYCLOAK_SERVER_URL = "http://localhost", KEYCLOAK_REALM = "master" } =
  process.env

// const jwksUri = `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}/.well-known/openid-configuration`
const jwksUri = `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/certs`

export const keyProvider = jwksRsa.passportJwtSecret({
  jwksUri,
})
