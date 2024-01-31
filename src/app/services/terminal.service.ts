import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { baseURL } from './utils';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  baseURL = `http://trevauty-pos-application-env.eba-gjfmg4zb.eu-west-1.elasticbeanstalk.com/`;
  authToken = TokenService.getToken();

  constructor(private http: HttpClient) { }

  terminalRequest(userDetails:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(`${baseURL}api/v1/terminal/terminal_request`, userDetails);
  }


  toggleTerminalActiveState(terminalId:any){
    console.log("hello world");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    });
    return this.http.post<any>(`${baseURL}api/v1/terminal/toggle-terminal-state?id=${terminalId}`,{ headers:headers }, {});
  }



  terminalRefundRequest(userDetails:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(`${baseURL}api/v1/terminal/refund/terminal_refund_request`, userDetails);
  }

  accountLogin(authCredentials:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(baseURL, authCredentials);
  }

  passwordReset(usersDetail:any){
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(baseURL, usersDetail);
  }

  getTerminals(): Observable<any> {
    return this.http.get<any>('assets/data/terminalData.json');
  }
  
  getActionTerminals(): Observable<any>{
    return this.http.get<any>('assets/data/actionTerminal.json');
  }

  getTopTerminals(){
    console.log("hello world");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    });
    return this.http.post<any>(`${baseURL}api/v1/customer/top-terminals`,{ headers:headers }, {});
  }

  customerTerminals(){
    console.log("hello world");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    });
    return this.http.post<any>(`${baseURL}api/v1/customer/terminals`,{ headers:headers }, {});
  }

  getTransactions(page: number, size:number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    });
    return this.http.post<any>(`${baseURL}api/v1/analytic/transactions?page=${page}&size=${size}`,{body: {}}, { headers: headers });
  }
  
  getAnalyticsOverview(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    });
    return this.http.post<any>(`${baseURL}api/v1/analytic/terminal_statistic`,{body: {}}, { headers: headers });
  }
  
}
