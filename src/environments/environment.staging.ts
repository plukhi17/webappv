// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,

    baseUri: 'https://gq20yxo1w7.execute-api.us-east-2.amazonaws.com/dev/v3',

    clientId: '2gue5hkomq114cl29di0qld47m',
    poolId: 'us-east-2_1bgHctRhe',
    identityPoolId: 'us-east-2:6b94d08e-b2b6-42dc-a9f8-fec98c4f1466',
    awsData: {
        dashboardId: '3ee32acd-7cff-4b44-a972-2bb036303327',
        region: 'us-east-2',
        roleSessionName: 'minto',
        apiGatewayUrl: 'https://gq20yxo1w7.execute-api.us-east-2.amazonaws.com/dev/v3/getdashboardembedurl?',
        cognitoAuthenticatedLogins: 'cognito-idp.us-east-2.amazonaws.com/us-east-2_1bgHctRhe'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
