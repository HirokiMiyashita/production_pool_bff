import * as cdk from "aws-cdk-lib";
import { execSync } from "child_process";
import { deploylist } from "./deploy-list";
import { ApiStack } from "./serviceStack/apigateway-stack";
// import { DBStack } from "./serviceStack/db-stack";
import { LambdaStack } from "./serviceStack/lambda-stack";
const { STAGE = "local" } = process.env;
const { STACK_NAME_SUFFIX = "local" } = process.env;
// const { VPC = undefined } = process.env;
const { SECURITY_GROUP_ID = "" } = process.env;

const createApp = async (lambdaJson: any): Promise<cdk.App> => {
  const app = new cdk.App();
  cdk.Tags.of(app).add("Name", "PRODUCTION-POOL-BACKEND-CDK");
  cdk.Tags.of(app).add("Price", "production-pool-backend");
  cdk.Tags.of(app).add("CmVillingGroup", "production-pool-backend");
  cdk.Tags.of(app).add("Maiking", "miyashita-hiroki");
  cdk.Tags.of(app).add("Sys-group", "production-pool-backend");

  const lambda = new LambdaStack(app, `lambda-${STACK_NAME_SUFFIX}`, {
    // vpc: VPC,
    env:
      STAGE === "local"
        ? undefined
        : {
            account: process.env.CDK_DEFAULT_ACCOUNT,
            region: process.env.CDK_DEFAULT_REGION,
          },
    name: deploylist[0].name,
    securityGroup: SECURITY_GROUP_ID,
  });

  const apiGateway = new ApiStack(app, `api-${STACK_NAME_SUFFIX}`, {
    stage: STAGE,
    stackNameSuffix: STACK_NAME_SUFFIX,
    lambdas: lambda.lambdas,
    // NOTE:everyでdeploylistの何を見てる？
    // isUseCognito: STAGE != "local" && deploylist.every((v) => v.auth),
    setting: {
      name: "",
      urls: [],
      auth: false,
      method: "",
      required: {},
    },
  });
  //   NOTE:apiGatewayを作成した際にapiGatewayがなんのlambdaを呼ぶかの設定という認識でいい？
  apiGateway.addDependency(lambda);

  deploylist.forEach(async (deployListItem) => {
    await lambda.deploy({
      stackNameSuffix: STACK_NAME_SUFFIX,
      name: deployListItem.name,
      securityGroup: SECURITY_GROUP_ID,
      secretJson: lambdaJson,
      params: deployListItem,
    });

    await apiGateway.deploy({
      stage: STAGE,
      lambdas: lambda.lambdas,
      isUseCognito: STAGE != "local" && deployListItem.auth,
      setting: deployListItem,
    });
  });

  //   const db = new DBStack();
  //   await db.initDatebase({ stage: STAGE, secretJson: DBJson });

  return app;
};

// let DBJson = {};
let lambdaJson = {};
const get_command = `aws secretsmanager get-secret-value --secret-id pool/postgres`;
const result = execSync(get_command);
const secretsManagerJson = JSON.parse(result.toString());
lambdaJson = JSON.parse(secretsManagerJson.SecretString);
// DBJson = JSON.parse(secretsManagerJson.SecretString);

createApp(lambdaJson);
