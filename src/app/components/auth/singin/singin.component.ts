import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
// import {Component} from '@angular/core';


@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],

})
export class SinginComponent implements OnInit{

  showModal = false;
  authForm: FormGroup;	  
  showPassword: boolean = false;
  password:string = "password";
  formSubmitted: boolean = false;
  apiResponse:any;
  message:string = "";
  otp:string  = "";
  otpObj: FormGroup;

  constructor( private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
  
    
    ) {
    this.authForm = new FormGroup({
      email: new FormControl(  '',  [Validators.required, Validators.pattern('^.+@.+\..+$')]),
       password: new FormControl(  '',  [Validators.required]),
       keepMeLoggedIn : new FormControl(false),
  
    }); 

    this.otpObj = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
    })
    
    // this.authForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.pattern('^.+@.+\..+$')]],
    //   password: ['', [Validators.required]],
    //   keepMeLoggedIn: ['', [Validators.required]],
    // });
  }


   get formData() { return this.authForm.controls; };

validateForm() { 

for(let i in this.authForm.controls)
  this.authForm.controls[i].markAsTouched();
}

showSuccess(message: string) {
  this.toast.success({detail:message,summary:this.apiResponse?.displayMessage ,duration:5000});
}

showError(message: string) {
  this.toast.error({detail:message,summary:this.apiResponse?.displayMessage ,duration:5000});
}


ngOnInit(): void {
  this.showSuccess(this.message);
console.log(this.formSubmitted);
}


toggleShowPassword(){
  if (this.password === 'password') {
    this.password = 'text';
    this.showPassword = true;
  } else {
    this.password = 'password';
    this.showPassword = false;
  }
}

resetFormInputs() {
  this.authForm.setValue({
    email: '',
    password: '',
    keepMeLoggedIn: '',
  });
}

onSubmit(user: any): void {
  // window.localStorage.setItem("token");
console.log(this.formSubmitted);
  this.formSubmitted = true;
  if (this.authForm.valid) {
    console.log({ user });
    this.authService.accountLogin(this.authForm.value).subscribe({
      next: (response) => {
        console.log("response =>>>>", response);
        this.apiResponse = response;
        console.log(this.apiResponse);
        this.resetFormInputs();
        this.message = response?.response;
        window.localStorage.setItem("token", response?.token);
        this.showSuccess(this.message);

        this.toggleModal();
        
        // this.router.navigate(['login']);
      },
      error: (error) => {
        console.log("sign up failed", error);
        let errRes = error?.response;
        let errReason = error?.debugMessage;
        this.showError(errRes + errReason);
        this.router.navigate([]);
      }
    });
  } else {
    console.log(user);
    this.validateForm();
  }
}

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };

  handeOtpChange(value: string[]): void {

    if(this.otp.length === 6){
      console.log("correct");
      this.otp = value.join();
      let optObj = {
        otp:this.otp
      }
      this.authService.validateToken(optObj).subscribe({
        next:(res: any)=>{
          console.log(res)
  
        },
        error:(err: any)=>{
          console.log(err);
        }
      })
    }


  }

  handleFillEvent(value: string): void {
    if(value.length === 6){
      console.log("correct");
      // this.otp = value.join();
      let optObj = {
        otp:value
      }
      this.authService.validateToken(JSON.stringify(optObj)).subscribe({
        next:(res: any)=>{
          console.log(res);
          this.router.navigate(['dashboard']);
          window.localStorage.setItem('token', res?.token);
          console.log("success");
        },
        error:(err: any)=>{
          console.log(err);
          this.router.navigate(['login']); 
          console.log("failure");
        }
      })
    }
    console.log(value);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  handleToken(tokenValue: string){
    // this.handleToken = !
  }



}
