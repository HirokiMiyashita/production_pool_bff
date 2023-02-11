export const deploylist: DeploySetting[] = [
  {
    name: "test",
    urls: ["test"],
    auth: false,
    method: "GET",
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
