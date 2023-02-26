import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { APIGatewayEvent, Context } from "aws-lambda";
import { apiResponse } from "./_common/apiResponse";
import { signUp } from "./_common/cognitoAccess";

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const cognito = new CognitoIdentityProvider({
    region: process.env.AWS_REGION,
  });
  const poolData = {
    ClientId: "gou0d50er22te9jkccn664cak",
    Username: "hirokixyzrr@gmail.com",
    Password: "111AAAaaa",
  };
  // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  try {
    const result = await cognito.signUp(poolData);
    console.debug(result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "ユーザーの登録が完了しました" }),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};

//   return apiResponse({
//     statusCode: 200,
//     body: "JSON.stringify(result)",
//   });
// };
