import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

const secretData = ["Super Secret String 1", "Super Secret String 2"];

export const getData = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(secretData),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
