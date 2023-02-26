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

  cognito.signUp(poolData, function (err, data) {
    console.error("サインアップに失敗しました", err);
    console.debug("サインアップに失敗しました", data);
  });

  return apiResponse({
    statusCode: 200,
    body: "JSON.stringify(result)",
  });
};
