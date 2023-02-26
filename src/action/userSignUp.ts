import { APIGatewayEvent, Context } from "aws-lambda";
import { apiResponse } from "./_common/apiResponse";
import { signUp } from "./_common/cognitoAccess";

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const result = await signUp(event.body);

  return apiResponse({
    statusCode: 200,
    body: JSON.stringify(result),
  });
};
