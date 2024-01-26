import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';
import { baseURL } from './utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = `http://trevauty-pos-application-env.eba-gjfmg4zb.eu-west-1.elasticbeanstalk.com/`;
  singupUrl = 'https://smartb2c.ubagroup.com/bscv2/api/Accounts/Login';
  // authToken = window.localStorage.getItem("token");
  // TokenService.getToken();
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
    return this.http.post<any>(`${this.baseURL}api/v1/authenticate/register`, signup);
  }

  accountLogin(authCredentials:any): Observable<any>{
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(`${baseURL}api/v1/authenticate/auth`, authCredentials);
  }

  validateToken(tokenDetails: any): Observable<any>{
    console.log("token ===>> " + TokenService.getToken());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    });
    console.log({headers});
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
    return this.http.post<any>(`${this.baseURL}api/v1/authenticate/forget_password`, usersDetail);
  }

  changePasswordAuth(usersDetail:any): Observable<any>{
    console.log("hello world");
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.post<any>(this.singupUrl, usersDetail);
  }

  getTerminalAnalysis(): Observable<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    return this.http.get<any>(this.singupUrl);
  }


}








// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { HttpClient, HttpHeaders  } from '@angular/common/http';
// import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent {

//   myform: FormGroup;	  
//   showPassword: boolean = false;
//   showConfirmPassword: boolean = false;
//   password:string = "password";
//   confirmPassword:string = "password";


//   constructor( private http: HttpClient,
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//     ) {
//     this.myform = new FormGroup({
//        uName: new FormControl(	'',	[Validators.required]),
//        mobile: new FormControl(	'',	[Validators.required,  Validators.pattern(/^\+?\d{1,3}[-\s]?\d{9,11}$/)]),
//        password: new FormControl(  '',  [Validators.required]),
//        eMail: new FormControl(  '',  [Validators.required, Validators.pattern('^.+@.+\..+$')]),
//        cOption: new FormControl('',   [Validators.required]),
//        optionsRadios : new FormControl('',   [Validators.required]),
//        optionChecked : new FormControl('',   [Validators.required]),
//        address: new FormControl('', 	[Validators.required]),
//        dBirth : new FormControl('',   [Validators.required])
//     });  
//   }

//    get formData() { return this.myform.controls; };

// validateForm() { 

// for(let i in this.myform.controls)
//   this.myform.controls[i].markAsTouched();

// }

// toggleShowPassword(){
//   if (this.password === 'password') {
//     this.password = 'text';
//     this.showPassword = true;
//   } else {
//     this.password = 'password';
//     this.showPassword = false;
//   }
// }
// toggleShowConfirmPassword(){
//   if (this.confirmPassword === 'password') {
//     this.confirmPassword = 'text';
//     this.showConfirmPassword = true;
//   } else {
//     this.confirmPassword = 'password';
//     this.showConfirmPassword = false;
//   }
// }

// resetFormInputs() {
//   this.myform = this.formBuilder.group({
//     uName: '',
//     mobile: '',
//     password: '',
//     eMail: '',
//     cOption: '',
//     optionsRadios: '',
//     optionChecked: '',
//     address: '',
//     dBirth: ''
//   });
// }


// onSubmit (user: any): void  {
// // console.log(user);   
// // if(!this.myform.valid){
// //   this.validateForm();
// // }else{
// //   this.authService.accountSignUp(this.myform).subscribe({
// //     next:(response)=>{
// //       console.log("response =>>>>",response);
// //       this.router.navigate(['login']);
// //     },
// //     error:(error)=>{
// //       alert("sign up failed");
// //       this.router.navigate([]);
// //     }
// //   })
// // }
// this.resetFormInputs();
//   if (this.myform.valid) {
//   let url = "https://reqres.in/api/users";     
//       const headers = new HttpHeaders()
//         .set('Authorization', 'my-auth-token')
//         .set('Content-Type', 'application/json');
//     this.http.post(url, user).subscribe((res:any) => console.log("Data Post Done"));
  
// }
// else{this.validateForm()}
// }

// }


















// <div class="wrapper">
//     <div class="left">
//         <div class="leftComponent">
//             <div class="header">Back to sign in</div>
//             <div>
//                 <div class="title">Registration</div>
//                 <p class="sub-title">New to Trevauty, register below</p>
//                 <div class="top">`
//                     <div class="logo">
//                         <img src="/assets/images/google.jpg">
//                         <h4 class="text-[14px]">Sign up with google</h4>
//                     </div>
//                 </div>
//                 <div class="horizontal-line-container">
//                     <hr class="horizontal-line">
//                     <span class="or">Or</span>
//                     <hr class="horizontal-line">
//                 </div>
//                 <form [formGroup]="myform" (ngSubmit)="onSubmit(myform.value)">
//                     <div class="w-full"
//                         [ngClass]="{'has-error': !formData['uName'].valid && formData['uName'].touched}">
//                         <label for="fname">Full Name*</label>
//                         <div class="border-none " *ngIf="formData['uName'].touched && formData['uName'].errors">
//                             <div class="shadow-none border-none  text-danger"
//                                 *ngIf="formData['uName'].errors['required']">
//                                 The Full Name is required
//                             </div>
//                             <div class="shadow-none text-danger" *ngIf="formData['uName'].errors['pattern']">

//                                 The Name is not valid, Numeric data not allowed
//                             </div>
//                         </div>
//                         <div class="rounded-[16px] border px-[0.5rem] py-[0.8rem] flex justify-between mb-[10px]">
//                             <input class=" border-none shadow-none outline-none w-[90%] p-[0.5rem]" type="text"
//                                 placeholder="mail@simmmple.com" name="uName" formControlName="uName">
//                         </div>
//                     </div>

//                     <div class="w-full "
//                         [ngClass]="{'has-error': !formData['mobile'].valid && formData['mobile'].touched}">
//                         <label for="fname">Phone Number*</label>
//                         <div class="border-none " *ngIf="formData['mobile'].touched && formData['mobile'].errors">
//                             <div class="shadow-none border-none  text-danger"
//                                 *ngIf="formData['mobile'].errors['required']">
//                                 The Phone Number is required
//                             </div>
//                             <div class="shadow-none text-danger" *ngIf="formData['mobile'].errors['pattern']">

//                                 The Phone Number is not valid, Alphabets not allowed
//                             </div>
//                         </div>
//                         <div class="rounded-[16px] border px-[0.5rem] py-[0.8rem] flex justify-between mb-[10px]">
//                             <input class=" border-none shadow-none outline-none w-[90%] p-[0.5rem]" type="text"
//                                 placeholder="mail@simmmple.com" name="mobile" formControlName="mobile">
//                         </div>
//                     </div>




//                     <div class="w-full"
//                         [ngClass]="{'has-error': !formData['password'].valid && formData['password'].touched}">
//                         <label for="password">Password*</label>
//                         <div class="border-none " *ngIf="formData['password'].touched && formData['password'].errors">
//                             <div class="shadow-none border-none  text-danger"
//                                 *ngIf="formData['password'].errors['required']">
//                                 The Password is required
//                             </div>
//                             <div class="shadow-none text-danger" *ngIf="formData['password'].errors['pattern']">

//                                 The Password is not valid
//                             </div>
//                         </div>
//                         <div
//                             class="rounded-[16px] border px-[0.5rem] py-[0.8rem] flex justify-between items-center mb-[10px]">
//                             <input class=" border-none shadow-none outline-none w-[90%] p-[0.5rem]" [type]="password"
//                                 placeholder="mail@simmmple.com" name="password" formControlName="password">
//                             <img (click)="toggleShowPassword()" src="/assets/images/eye.png">
//                         </div>
//                     </div>


//                     <div class="w-full"
//                         [ngClass]="{'has-error': !formData['password'].valid && formData['password'].touched}">
//                         <label for="password">Confirm Password*</label>
//                         <div class="border-none " *ngIf="formData['password'].touched && formData['password'].errors">
//                             <div class="shadow-none border-none  text-danger"
//                                 *ngIf="formData['password'].errors['required']">
//                                 The Password is required
//                             </div>
//                             <div class="shadow-none text-danger" *ngIf="formData['password'].errors['pattern']">

//                                 The Password is not valid
//                             </div>
//                         </div>
//                         <div
//                             class="rounded-[16px] border px-[0.5rem] py-[0.8rem] flex justify-between items-center mb-[10px]">
//                             <input class=" border-none shadow-none outline-none w-[90%] p-[0.5rem]" [type]="confirmPassword"
//                                 placeholder="mail@simmmple.com" name="password" formControlName="password">
//                             <img (click)="toggleShowConfirmPassword()" src="/assets/images/eye.png">
//                         </div>
//                     </div>

//                     <div class="form-group"  [ngClass]="{'has-error': !formData['optionChecked'].valid && formData['optionChecked'].touched}">
//                         <div *ngIf="formData['optionChecked'].touched && formData['optionChecked'].errors" style="margin-top:10px">
//                             <div class="text-danger" *ngIf="formData['optionChecked'].errors['required']">
//                               The Check option is required
//                             </div>         
//                           </div>
//                         <div class="form-check flex gap-[2rem] items-center">
//                           <label class="form-check-label">
//                             <input type="checkbox" class="form-check-input" name="optionChecked" formControlName="optionChecked">
//                             <span class="ml-[1rem] font-[200]">I agree with the term of use</span>  
                            
//                           </label>
//                         <label for="using" class="terms">Terms of use</label>

//                         </div>
               
//                       </div>
//                     <button type="submit" class="w-full gap-2.5 text-white mx-0 my-4 pl-2 pr-[8px,] py-[10px,] p-[1.2rem] rounded-2xl border-[none] bg-[#7b57fc]">Sign Up</button>
//                 </form>
//                 <p class="sign-in">Have an account?<a href="#" class="sign"> Sign in</a></p>
//             </div>
//             <h4 class="reserved">© 2023 Trevauty. All Rights Reserved.</h4>
//         </div>
//     </div>
//     <div class="right flex">
//         <div class="rightComponent">
//             <img src="assets/images/LOGO 3.png">
//             <div class="boxing">
//                 <p>Learn more about Horizon UI on</p>
//                 <h3>trevauty.com</h3>
//             </div>
//         </div>
//         <footer>
//             <ul>
//                 <li>Marketplace</li>
//                 <li>License</li>
//                 <li>Term of use</li>
//                 <li>Blog</li>
//             </ul>
//         </footer>
//     </div>
// </div>
