# Keycloak + Express

This is sample code to demonstrate how to authenticate an Express API with Keycloak.
Normally, the keycloak-connect could be used but as it is now deprecated, this sample also includes a method using the [@moreillon/express-oidc](https://www.npmjs.com/package/@moreillon/express-oidc) module, which is a wrapper adound [openid-client](https://www.npmjs.com/package/openid-client) .
