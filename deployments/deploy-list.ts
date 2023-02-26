export const deploylist: DeploySetting[] = [
  {
    name: "bff_test",
    urls: ["bff_test"],
    auth: false,
    method: "GET",
    required: {},
  },
  {
    name: "userSignUp",
    urls: ["userSignUp"],
    auth: false,
    method: "POST",
    lambdaRole: {
      actions: [
        "cognito-idp:AdminCreateUser",
        "cognito-idp:AdminSetUserPassword"
      ],
      resources: ["*"],
    },
    required: {},
  },
];

export interface Keys {
  [key: string]: boolean;
}

export interface LambdaRoleType {
  [key: string]: Array<string>;
}

export interface DeploySetting {
  name: string;
  urls: Array<string>;
  auth: boolean;
  method: string;
  required?: Keys;
  lambdaRole?: LambdaRoleType;
}
