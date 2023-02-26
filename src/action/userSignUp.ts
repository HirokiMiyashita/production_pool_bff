// import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { APIGatewayEvent, Context } from "aws-lambda";
import { apiResponse } from "./_common/apiResponse";
import { createCognitoUser } from "./_common/cognitoAccess";

export const handler = async (event: APIGatewayEvent, context: Context) => {
  try {
    const result = await createCognitoUser();
    console.debug(result);
    return apiResponse({
      statusCode: 200,
      body: JSON.stringify(result),
    });
  } catch (error) {
    return apiResponse({
      statusCode: 500,
      body: JSON.stringify(error),
    });
  }
};

//   return apiResponse({
//     statusCode: 200,
//     body: "JSON.stringify(result)",
//   });
// };
