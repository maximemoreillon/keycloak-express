/*
Although this is working, Keycloak has deprecated keycloak-connect so an alternative must be found
*/
import Keycloak, {
  type KeycloakConfig,
  type KeycloakOptions,
} from "keycloak-connect"

const { KEYCLOAK_SERVER_URL = "http://localhost", KEYCLOAK_REALM = "master" } =
  process.env

const options: KeycloakOptions = {}

const config: KeycloakConfig = {
  realm: KEYCLOAK_REALM,
  "bearer-only": true,
  "auth-server-url": KEYCLOAK_SERVER_URL,
  "ssl-required": "external",
  resource: "nodejs-connect",
  "confidential-port": 0, // Seems irrelevant
}

const keycloak = new Keycloak(options, config)

export const { middleware } = keycloak
