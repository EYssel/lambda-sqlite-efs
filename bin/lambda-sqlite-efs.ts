#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { LambdaSqliteEfsStack } from "../lib/lambda-sqlite-efs-stack";
const process = require("process");

const GIT_BRANCH = process.env.GIT_BRANCH;

const getBranchSuffix = (branchName: string) => {
    return branchName !== `master` ? `-${branchName || "".replace("/", "_")}` : "";
};

const app = new cdk.App();
new LambdaSqliteEfsStack(
    app,
    `LambdaSqliteEfsStack + ${getBranchSuffix(GIT_BRANCH)}`,
    {
        /* If you don't specify 'env', this stack will be environment-agnostic.
         * Account/Region-dependent features and context lookups will not work,
         * but a single synthesized template can be deployed anywhere. */

        /* Uncomment the next line to specialize this stack for the AWS Account
         * and Region that are implied by the current CLI configuration. */
        // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

        /* Uncomment the next line if you know exactly what Account and Region you
         * want to deploy the stack to. */
        env: {
            account: process.env.AWS_ACCOUNT_NUMBER,
            region: process.env.AWS_REGION,
        },

        /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
    }
);
