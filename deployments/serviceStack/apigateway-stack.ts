import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  //   CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";
// import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { DeploySetting } from "../deploy-list";

export interface ApiProps extends StackProps {
  stage: string;
  stackNameSuffix?: string;
  lambdas: any;
  isUseCognito?: boolean;
  setting: DeploySetting;
}

interface Obj {
  [props: string]: any;
}

export class ApiStack extends Stack {
  private restApi: any = {};
  private cognitoAuthorizer: any;
  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id, props);
    this.restApi = new RestApi(this, "production-pool-bff", {
      restApiName: `${props.stackNameSuffix}`,
      description: "priduction_pool_bff by CDK",
      deployOptions: {
        stageName: props.stage,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
    });
    new CfnOutput(this, "OutputApiUrl", { value: this.restApi.url! });
    //Cognitoへのアクセスに関する処理
    // if (props.isUseCognito) {
    //   const userPool = UserPool.fromUserPoolArn(this, "userPool", "arn名");
    //   this.cognitoAuthorizer = new CognitoUserPoolsAuthorizer(
    //     this,
    //     "cognitoAuthorizer",
    //     {
    //       authorizerName: "CognitoAuthorizer",
    //       cognitoUserPools: [userPool],
    //     }
    //   );
    // }
  }
  deploy(props: ApiProps) {
    // NOTE:なんのthisやろ？
    const accountId = Stack.of(this).account;
    const region = Stack.of(this).region;

    if (!props.setting.urls) return;

    //リソースの作成
    let resorce = this.restApi.root.addResource(props.setting.urls[0]);
    props.setting.urls.shift();
    props.setting.urls.forEach((resorceItem) => {
      resorce = resorce.addResource(resorceItem);
    });

    const stackDevideFunction = props.lambdas[props.setting.name];

    const cognitoSwitch: Obj = {
      requestParameter: props.setting.required,
      validateRequestParameters: props.setting.required ? true : false,
    };
    // TODO:BackendではCognitoを使用したいため後に削除
    // if(props.isUseCognito) cognitoSwitch.authorizer = this.cognitoAuthorizer
    resorce.addMethod(
      props.setting.method,
      new LambdaIntegration(stackDevideFunction),
      cognitoSwitch
    );

    stackDevideFunction.addPermission("myFunctionPermission", {
      principal: new ServicePrincipal("apigateway.amazonaws.com"),
      action: "lambda:InvokeFunction",
      sourceArn: `arn:aws:execute-api:${region}:${accountId}:${this.restApi.restApiName}/*/*/*`,
    });
  }
}
