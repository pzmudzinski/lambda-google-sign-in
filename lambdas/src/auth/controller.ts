import { OAuth2Client } from "google-auth-library";
import {
  APIGatewayProxyEvent,
  APIGatewayTokenAuthorizerEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { generateDeny, generateAllow } from "./policies";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const COMPANY_DOMAIN = process.env.COMPANY_DOMAIN;
const client = new OAuth2Client(CLIENT_ID);
const acceptedDomains = [COMPANY_DOMAIN];

async function verify(token?: string) {
  if (!CLIENT_ID) {
    throw Error("Missing GOOGLE_CLIENT_ID env var");
  }

  if (!token) {
    throw Error("Missing auth token");
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload || !payload.hd) {
    throw Error("Missing payload");
  }

  if (acceptedDomains.includes(payload.hd)) {
    return true;
  } else {
    throw Error("Invalid Google Domain");
  }
}

export const authorizationHandler = async (
  event: APIGatewayTokenAuthorizerEvent,
  _
) => {
  try {
    await verify(event.authorizationToken);
    return generateAllow("*");
  } catch (exception) {
    console.error(exception, exception.stack);
    return generateDeny(event.methodArn);
  }
};

export const verifyTokenHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const headers = event.headers || {};
  const responseHeaders = {
    "Access-Control-Allow-Origin": "*",
  };
  try {
    await verify(headers["Authorization"]);
    return {
      statusCode: 200,
      body: "Success",
      headers: responseHeaders,
    };
  } catch (exception) {
    console.error(exception, exception.stack);
    return {
      statusCode: 403,
      body: "Failure",
      headers: responseHeaders,
    };
  }
};
