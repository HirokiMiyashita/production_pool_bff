import { Duration, Environment, Stack, StackProps } from "aws-cdk-lib";
import { DeploySetting } from "../deploy-list";
import { Construct } from "constructs";
import { SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import * as IAM from "aws-cdk-lib/aws-iam";

export interface LambdaProps extends StackProps {
  env?: Environment;
  name: string;
  stackNameSuffix?: string;
  secretJson?: any;
  vpc?: string;
  securityGroup: string;
  params?: DeploySetting;
}

export class LambdaStack extends Stack {
  public readonly lambdas: any = {};
  //   public readonly vpc: any = undefined;

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id, props);

    // if (props.vpc) {
    //   this.vpc = Vpc.fromLookup(this, "VPC", {
    //     vpcId: props.vpc,
    //   });
    // }
  }
  deploy(props: LambdaProps) {
    const parsedJson = props.secretJson;
    const lambda = new NodejsFunction(
      this,
      `${props.name}-${props.stackNameSuffix}`,
      {
        functionName: `${props.name}-${props.stackNameSuffix}`,
        entry: `./src/action/${props.name}.ts`,
        handler: "handler",
        memorySize: 256,
        timeout: Duration.seconds(180),
        environment: {
          TZ: "Asia/Tokyo",
          database: parsedJson.host,
          //   port: parsedJson.port,
          user: parsedJson.username,
          password: parsedJson.password,
          host: parsedJson.host,
        },
        // vpc: this.vpc,
        // vpcSubnets: {
        //   subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        // },
        securityGroups: [
          SecurityGroup.fromSecurityGroupId(
            this,
            `${props.name}_SG`,
            props.securityGroup
          ),
        ],
        logRetention: RetentionDays.ONE_WEEK,
      }
    );
    if (props.name && props.params?.lambdaRole) {
      const lambdaPolicy = new IAM.PolicyStatement({
        ...props.params.lambdaRole,
      });

      lambda.role?.attachInlinePolicy(
        new IAM.Policy(this, `LambdaRole-${props.name}`, {
          statements: [lambdaPolicy],
        })
      );
    }
    this.lambdas[props.name] = lambda;
  }
}
