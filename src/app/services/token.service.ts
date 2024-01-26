import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilService } from './util.service';

export class TokenService {

  static helper = new JwtHelperService();
 

  static getToken(): string | null {
    return localStorage.getItem('token'); // Example using localStorage
  }

  static setToken(val: string): void | null {
    return localStorage.setItem('token', val); // Example using localStorage
  }

  static isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expirationDate = new Date(decodedToken?.exp * 1000); 
    return expirationDate < new Date(); 
  }
  static decodeToken(token: string): any {

    // return jwt_decode(token);
  }

  static isTokenValid(): boolean{
    if(!TokenService.getToken()){
      throw new Error("token does not exist");
    }
    return  !TokenService.helper.isTokenExpired(TokenService.getToken());
  }

}


