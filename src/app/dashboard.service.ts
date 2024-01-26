import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';
import { baseURL } from './services/utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  @Injectable({
    providedIn: 'root'
  })
  
    baseURL = `http://trevauty-pos-application-env.eba-gjfmg4zb.eu-west-1.elasticbeanstalk.com/`;
    singupUrl = 'https://smartb2c.ubagroup.com/bscv2/api/Accounts/Login';
    // authToken = window.localStorage.getItem("token");
    authToken = TokenService.getToken();
  
    data = [
      {
        paymentId:"06c1774-7f3d-46ad...90a1",
        status:"succeded",
        amount:19623.00,
        creationDate:"Mar 23, 2022, 13:00 PM",
        paymentMethod:"visa",
        cardRef:"•••• 4242"
      },
      {
        paymentId:"06c1774-7f3d-46ad...90a2",
        status:"pending",
        amount:19623.00,
        creationDate:"Mar 23, 2022, 13:00 PM",
        paymentMethod:"master",
        cardRef:"•••• 4242"
      },
      {
        paymentId:"06c1774-7f3d-46ad...90a3",
        status:"created",
        amount:19623.00,
        creationDate:"Mar 23, 2022, 13:00 PM",
        paymentMethod:"visa",
        cardRef:"•••• 4242"
      },
      {
        paymentId:"06c1774-7f3d-46ad...90a4",
        status:"rejected",
        amount:19623.00,
        creationDate:"Mar 23, 2022, 13:00 PM",
        paymentMethod:"visa",
        cardRef:"•••• 4242"
      },
      {
        paymentId:"06c1774-7f3d-46ad...90a5",
        status:"pending",
        amount:19623.00,
        creationDate:"Mar 23, 2022, 13:00 PM",
        paymentMethod:"visa",
        cardRef:"•••• 4242"
      },
      {
        paymentId:"06c1774-7f3d-46ad...90a6",
        status:"pending",
        amount:19623.00,
        creationDate:"Mar 23, 2022, 13:00 PM",
        paymentMethod:"nibbs",
        cardRef:"•••• 4242"
      },
      {
        paymentId:"06c1774-7f3d-46ad...90a7",
        status:"succeded",
        amount:19623.00,
        creationDate:"Mar 23, 2022, 13:00 PM",
        paymentMethod:"nibbs",
        cardRef:"•••• 4242"
      }
    ]
  
    constructor(private http: HttpClient) { }
  
    accountSignUp(signup:any): Observable<any>{
      console.log("hello world");
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      return this.http.post<any>(`${baseURL}api/v1/authenticate/register`, signup);
    }
  
    accountLogin(authCredentials:any): Observable<any>{
      console.log("hello world");
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      return this.http.post<any>(`${baseURL}api/v1/authenticate/auth`, authCredentials);
    }
  
    validateToken(tokenDetails: any): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getToken()}`
      });
      return this.http.post<any>(`${baseURL}api/v1/authenticate/login`, tokenDetails, { headers: headers });
    }
  
    forgotPasswordAuth(authCredentials:any): Observable<any>{
      console.log("hello world");
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      return this.http.post<any>(this.singupUrl, authCredentials);
    }
  
    passwordReset(usersDetail:any): Observable<any>{
      console.log("hello world");
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      return this.http.post<any>(this.singupUrl, usersDetail);
    }
  
    changePasswordAuth(usersDetail:any): Observable<any>{
      console.log("hello world");
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      return this.http.post<any>(this.singupUrl, usersDetail);
    }
  
    getOverviewReport(): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getToken()}`
      });
      console.log({headers});
      return this.http.post<any>(`${baseURL}api/v1/analytic/dashboard`, {body: {}}, { headers: headers });
    }

    getDeposit(): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getToken()}`
      });
      return this.http.post<any>(`${baseURL}api/v1/analytic/deposit_data?page=0&size=5`, {body: {}} , { headers: headers });
      // return this.http.get<any>(`https://fakestoreapi.com/products`, { headers: headers }); 
      // return this.http.post<any>(`${baseURL}api/v1/authenticate/test`, { headers: headers }); 

    }

    getWithdrawal(): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getToken()}`
      });
      return this.http.get<any>(`${baseURL}api/v1/analytic/withdrawal_data?page=0&size=5`, { headers: headers });
    }
    

    getCustomerDeposit(): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getToken()}`
      });
      return this.http.get<any>(`${baseURL}api/v1/customer/deposit_data?page=0&size=5`, { headers: headers });
    }

    getTransactions(): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getToken()}`
      });
      return this.http.get<any>(`${baseURL}api/v1/analytic/transactions`, { headers: headers });
    }

}
