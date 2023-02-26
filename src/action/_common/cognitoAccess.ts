import { UserPool } from "aws-cdk-lib/aws-cognito";
import {
  AdminCreateUserCommandOutput,
  CognitoIdentityProvider,
} from "@aws-sdk/client-cognito-identity-provider";
import { aws_cognito } from "aws-cdk-lib";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

interface signUpProps {
  email: string;
  password: string;
  userPoolId?: string;
}

export const createCognitoUser = async (): // userPoolId: string,
// email: string,
// password: string
Promise<AdminCreateUserCommandOutput> => {
  const cognito = new CognitoIdentityProvider({
    region: process.env.AWS_REGION,
  });

  try {
    const userCommandOutput = await cognito.adminCreateUser({
      UserPoolId: "ap-northeast-1_mOgcJakUe",
      MessageAction: "SUPRESS",
      Username: "hirokixyzrr@gmail.com",
      UserAttributes: [
        {
          Name: "emal",
          Value: "hirokixyzrr@gmail.com",
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
    });

    await cognito.adminSetUserPassword({
      UserPoolId: "ap-northeast-1_mOgcJakUe",
      Username: userCommandOutput.User?.Username,
      Password: "111AAAaaa",
      Permanent: true,
    });
    return userCommandOutput;
  } finally {
    console.debug("end");
  }
};

export const signUp = (event: signUpProps) => {
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
    if (err) {
      console.error("サインアップに失敗しました", data);
      return err;
    } else {
      console.debug("サインアップに失敗しました", data);
      return data;
    }
  });
};
