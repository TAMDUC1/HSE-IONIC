import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap , map } from 'rxjs/operators';
import { Observable, from, of, throwError  } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Audit } from '../../app-audit/model/audit.model';
import { DummyModel } from '../../app-audit/model/dummy.model';
import { IAudit } from '../../app-audit/audit';
import { NetworkService,ConnectionStatus } from '../network.service';
import { OfflineManagerService } from '../offline-manager.service';
import { HTTP } from '@ionic-native/http/ngx';

const API_STORAGE_KEY = 'specialkey';
const headerDict = {
    'Accept': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials':'true'
};
//Access-Control-Allow-Origin
let headers : HttpHeaders = new HttpHeaders();
const newHeaders = new HttpHeaders().set("X-CustomHeader", "custom header value")
    .append('Content-Type', 'application/json')
    .append("'Access-Control-Allow-Origin", "*")
    .append("Accept", "application/json")
    .append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

headers.append('','');

/*const httpOptions = {
    headers: new HttpHeaders(headerDict)
};*/
const httpOptions = {
    headers: newHeaders
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

    requestObject : any = null;
    private Audit = new Audit(
        '',
        'any',
        '' ,
        '',
        '',
        0,
        0,
        0,
        0,
        0,
         new Date(),
         new Date(),
        '',
        '');

    private auditUrl : string ='http://54.169.202.105:5000/api/HseAudits/';

    // dummy url get
    private dummyUrl : string = 'http://dummy.restapiexample.com/api/v1/employees';
    constructor(private Http: HttpClient,
                private  networkService: NetworkService,
                private storage: Storage,
                private offlineManager: OfflineManagerService,
                private HTTP :HTTP

    )
    { }
   /* getAllDummy(): Observable<DummyModel[]>{
        return this.Http.get<DummyModel[]>(this.dummyUrl, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
            ;
    }*/
    getAllAudits(): Observable<IAudit[]>{
        return this.Http.get<IAudit[]>(this.auditUrl, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
            ;
    }
    getAllAuditsNative(){
      return this.HTTP.get(this.auditUrl,{},{
            'Content-Type' : 'application/json'
        }).then(res =>
            this.requestObject = JSON.parse(res.data))
            .catch(err => this.requestObject = err)
        ;
    }
    getAuditSingle(uuid:string): Observable<IAudit>{
        var url = this.auditUrl.concat(uuid);
        return this.Http.get<IAudit>(url,httpOptions);
    }

    updateAuditSingle(audit : IAudit, uuid:string): Observable<any>{
        console.log('sending now');
        var url = this.auditUrl.concat(uuid);
        return this.Http.put<any>(url,audit);
    };

    getNewsHse(forceRefresh: boolean = false): Observable<IAudit[]>{
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return from(this.getLocalData('audit'));
        } else{
            return this.Http.get<IAudit[]>(this.auditUrl, httpOptions,)
                .pipe(
                    tap(res =>{
                        this.setLocalData('audit', res);
                    }),
                    catchError(this.handleError),
                    //  map(res => res.uuid),
                )
                ;
        }
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    private setLocalData(key, data) {
        this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
    }

    private getLocalData(key) {
        return this.storage.get(`${API_STORAGE_KEY}-${key}`);
    }
}

