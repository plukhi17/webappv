import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  CognitoUserPool,
  ICognitoUserPoolData,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { config as AwsConfig, CognitoIdentity, AWSError } from 'aws-sdk';
import { from } from 'rxjs';
import { switchMap, map, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  readonly awsData: { [key: string]: any };
  readonly baseUri: string;
  apiGatewayUrl: string;
  poolData: ICognitoUserPoolData;
  userPool: CognitoUserPool;
  cognitoUserSession: CognitoUserSession;
  cognitoIdentity: CognitoIdentity;

  constructor(private http: HttpClient) {
    this.awsData = environment.awsData;
    this.baseUri = environment.baseUri;
    this.setUpAws();
  }

  setUpAws() {
    this.apiGatewayUrl = this.awsData.apiGatewayUrl;

    AwsConfig.update({
      region: this.awsData.region
    });

    this.poolData = {
      UserPoolId: environment.poolId,
      ClientId: environment.clientId
    };
    this.userPool = new CognitoUserPool(this.poolData);
  }

  getIFrame(plant_id: string) {
    return from(this.getCognitoUserToken()).pipe(
      switchMap((openIdToken: string) => {
        return this.http.get(`${this.baseUri}/plants/${plant_id}`).pipe(
          mergeMap((result: any) => {
            const params = new HttpParams()
              .append('dashboardId', result.additional_info.dashboardId)
              .append('openIdToken', openIdToken)
              .append('authenticated', 'true')
              .append('sessionName', this.awsData.roleSessionName)
              .append('resetDisabled', 'false')
              .append('undoRedoDisabled', 'false');
            return this.http.get(this.apiGatewayUrl, { params }).pipe(
              map((response: any) => {
                response.body = JSON.parse(response.body);
                return response;
              })
            );
          })
        );
      })
    );

  }

  async getCognitoUserToken(): Promise<string> {
    try {
      this.cognitoUserSession = await this.getCognitoUserSesson();
      if (this.cognitoUserSession) {
        const cognitoIdentityId = await this.getCognitoIdentityId();
        if (cognitoIdentityId) {
          const openIdToken = await this.getCognitoIdentityOpenIdToken(cognitoIdentityId);
          return openIdToken;
        }
      }
    } catch (error) {
      console.log('error:1', error);
    }
  }

  getCognitoUserSesson(): Promise<CognitoUserSession> {
    return new Promise((resolve, reject) => {
      const cognitoUser = this.userPool.getCurrentUser();
      // console.log('cognito User', cognitoUser);
      cognitoUser.getSession((error: AWSError, session: CognitoUserSession) => {
        if (error) {
          console.log('error:2',error);
          reject(error);
        } else {
          // console.log('session validity: ' + session.isValid());
          // console.log('Jwt Token : ' + session.getIdToken().getJwtToken());
          resolve(session);
        }
      });
    });
  }

  getCognitoIdentityId() {
    this.cognitoIdentity = new CognitoIdentity();

    const getIdParams = {
      IdentityPoolId: environment.identityPoolId,
      Logins: {
        [this.awsData.cognitoAuthenticatedLogins]: this.cognitoUserSession.getIdToken().getJwtToken()
      }
    };

    return new Promise((resolve, reject) => {
      this.cognitoIdentity.getId(getIdParams, (error: AWSError, data: CognitoIdentity.GetIdResponse) => {
        if (error) {
          console.log('error:3',error);
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  getCognitoIdentityOpenIdToken(data: any): Promise<string> {
    data.Logins = {
      [this.awsData.cognitoAuthenticatedLogins]: this.cognitoUserSession.getIdToken().getJwtToken()
    };

    return new Promise((resolve, reject) => {
      this.cognitoIdentity.getOpenIdToken(data, (error: AWSError, data: CognitoIdentity.GetOpenIdTokenResponse) => {
        if (error) {
          console.log('error:4', error);
          reject(error);
          
        } else {
          resolve(data.Token);
        }
      });
    });
  }
}
