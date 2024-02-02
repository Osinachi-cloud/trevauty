import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile-auth',
  templateUrl: './profile-auth.component.html',
  styleUrls: ['./profile-auth.component.scss']
})
export class ProfileAuthComponent {

  apiResponse: any;
  passwordResetDetails: FormGroup;
  forgotPasswordDetails:FormGroup;
  changePasswordRequest:FormGroup;
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;
  password:string = "password";
  newPassword:string = "password";
  confirmNewPassword = "password"
  showModal = false;
  showOtpModal = false;
  showResetPasswordModal = false;


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toast: NgToastService
  ) {
    this.passwordResetDetails = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required])
    })

    this.forgotPasswordDetails = new FormGroup({
      email: new FormControl([Validators.required, Validators.email])
    })

    this.changePasswordRequest = new FormGroup({
        password: new FormControl([Validators.required]),
        confirmPassword: new FormControl([Validators.required]),

    })
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

  toggleShowNewPassword(){
    if (this.newPassword === 'password') {
      this.newPassword = 'text';
      this.showNewPassword = true;
    } else {
      this.newPassword = 'password';
      this.showNewPassword = false;
    }
  }

  toggleShowConfirmNewPassword(){
    if (this.confirmNewPassword === 'password') {
      this.confirmNewPassword = 'text';
      this.showConfirmNewPassword = true;
    } else {
      this.confirmNewPassword = 'password';
      this.showConfirmNewPassword = false;
    }
  }

  // resetFormInput() {
  //   this.passwordResetDetails.setValue({
  //     password: "",
  //     newPassword: "",
  //     confirmNewPassword :''
  //   })
  // }

  resetFormInput() {
    this.passwordResetDetails.reset(); 
    Object.keys(this.passwordResetDetails.controls).forEach(key => {
        this.passwordResetDetails.get(key)?.setErrors(null); 
    });
}

  // showSuccess() {
  //   this.toast.success({detail:"SUCCESS",summary:this.apiResponse.displayMessage ,duration:5000});
  // }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showErrorResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  validateForm() {
    for (let i in this.passwordResetDetails.controls)
      this.passwordResetDetails.controls[i].markAsTouched();
  }
  validateFormForgotPasswordEmail() {
    for (let i in this.forgotPasswordDetails.controls)
      this.forgotPasswordDetails.controls[i].markAsTouched();
  }

  validateFormChangePasswordRequest() {
    for (let i in this.changePasswordRequest.controls)
      this.changePasswordRequest.controls[i].markAsTouched();
  }

  get formData() {
    return this.passwordResetDetails.controls
  }

  get passwordResetFormData() {
    return this.forgotPasswordDetails.controls
  }

  get passwordChangeFormData(){
    return this.changePasswordRequest.controls
  }

  onSubmit(passwordResetDetails: any) {
    console.log(this.passwordResetDetails.value);
    if (this.passwordResetDetails.valid) {
      this.authService.updatePassword(passwordResetDetails).subscribe({
        next: (res: any) => {
          console.log(res);
          if(res.status){
            this.showSuccessResponse( "Reset Password",  res.data, 5000);
            this.resetFormInput();
          }else{
          this.showErrorResponse( "Reset Password",res.debugMessage, 5000);
          }
        },
        error: (err: any) => {
          this.showErrorResponse("Reset Password",err.debugMessage,  5000);
          console.log(err)
        }

      })
    } else {
      this.validateForm()
    }

  }

 submitForgotPassword(forgotPasswordDetails: any){
  this.toggleOtpModal();
  if (this.forgotPasswordDetails.valid) {
    this.authService.forgotPasswordAuth(forgotPasswordDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toggleOtpModal()
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  } else {
    this.validateFormForgotPasswordEmail();
  }
 }

 submitChangePassword(forgotPasswordDetails: any){
  this.toggleResetPasswordModal();
  if (this.changePasswordRequest.valid) {
    this.authService.changePasswordAuth(forgotPasswordDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toggleResetPasswordModal();
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  } else {
    this.validateFormChangePasswordRequest();
  }
 }


  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleOtpModal() {
    this.showOtpModal = !this.showOtpModal;
    this.showModal = false;
  }

  toggleResetPasswordModal() {
    this.showResetPasswordModal = !this.showResetPasswordModal;
    this.showOtpModal = false;
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
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

}
