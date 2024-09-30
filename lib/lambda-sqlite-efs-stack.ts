import * as cdk from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import * as efs from "aws-cdk-lib/aws-efs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";

export class LambdaSqliteEfsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new Vpc(this, "api-vpc", {
            natGateways: 0,
            maxAzs: 1,
            createInternetGateway: false,
        });
        // The code that defines your stack goes here

        const EFS_PATH = "/mnt/lambda";

        const dataBaseEFS = new efs.FileSystem(this, "db-file-system", {
            vpc,
        });

        const accessPoint = dataBaseEFS.addAccessPoint("EfsAccessPoint", {
            createAcl: {
                ownerGid: "1001",
                ownerUid: "1001",
                permissions: "750",
            },
            path: "/lambda",
            posixUser: {
                gid: "1001",
                uid: "1001",
            },
        });

        new lambda_nodejs.NodejsFunction(this, "api-function", {
            vpc,
            filesystem: lambda.FileSystem.fromEfsAccessPoint(
                accessPoint,
                EFS_PATH
            ),
            environment: {
                EFS_PATH: EFS_PATH,
                EFS_DB_PATH: EFS_PATH + "/lambda-prisma.db",
            },
            handler: "index.handler",
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: path.join(__dirname, "../api/index.ts"),
            bundling: {
                esbuildArgs: {
                    "--packages": "bundle",
                },
                nodeModules: ["prisma", "@prisma/client"],
                commandHooks: {
                    beforeInstall: (i, o) => [
                        // Copy prisma directory to Lambda code asset
                        // the directory must be placed on the same directory as your Lambda code
                        `cp -r ${i}/prisma ${o}`,
                    ],
                    beforeBundling: () => [],
                    afterBundling: () => [],
                },
            },
        });
    }
}
