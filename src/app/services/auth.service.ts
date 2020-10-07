import {Injectable} from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { NavService } from '../services/nav.service';
import { RouteConstant, StorageConstant } from '../constants';
import {StorageService} from '../services/storage.service';



@Injectable({providedIn: 'root'})
export class AuthService {

    private userPool: CognitoUserPool;
   

    constructor(
        private navService: NavService
    ) {
        this._initialise();
    }

    /**
     * Returns payload for current user.
     */
    getUserPayload(): Observable<any> {
        const cu = this.userPool.getCurrentUser();
        /**Killing session after the global signout */
        if(cu==null){
            StorageService.removeAll();
            this.navService.navigate(RouteConstant.LOGIN);  
            return;
           
        }
        return Observable.create(observer => {
            this.userPool.getCurrentUser().getSession((err, result: CognitoUserSession) => {
                if (err) {
                   
                    observer.error(err);
                    

                } else {
                    observer.next(result.getIdToken().payload);
                    observer.complete();
                }
            });
        });
    }

    authenticate(username: string, password: string): Observable<CognitoUserSession> {
        const authDetails = new AuthenticationDetails(
            {
                Username: username,
                Password: password
            }
        );

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool
        });

        return Observable.create(observer => {
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: (result: any) => {
                    observer.next(result);
                    observer.complete();
                },
                onFailure: (err) => {
                    observer.error(err);
                }
            });
        });
    }

    logout() {
        const cognitoUser = this.userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.signOut();
            cognitoUser['storage'].clear();
        }
    }

    private _initialise(): void {
        this.userPool = new CognitoUserPool({
            UserPoolId: environment.poolId,
            ClientId: environment.clientId
        });
    }
}
