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
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;
  password:string = "password";
  newPassword:string = "password";
  confirmNewPassword = "password"


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toast: NgToastService
  ) {
    this.passwordResetDetails = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword : new FormControl('', [Validators.required])
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

  resetFormInput() {
    this.passwordResetDetails.setValue({
      password: "",
      newPassword: "",
      confirmNewPassword :''
    })
  }

  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:this.apiResponse.displayMessage ,duration:5000});
  }

  validateForm() {

    for (let i in this.passwordResetDetails.controls)
      this.passwordResetDetails.controls[i].markAsTouched();
  }

  get formData() {
    return this.passwordResetDetails.controls
  }

  onSubmit(passwordResetDetails: any) {
    console.log(this.passwordResetDetails);
    if (this.passwordResetDetails.valid) {
      this.authService.accountLogin(passwordResetDetails).subscribe({
        next: (res: any) => {
          console.log(res);
          this.resetFormInput();
        },
        error: (err: any) => {
          console.log(err)
        }

      })
    } else {
      this.validateForm()
    }

  }

  showModal = false;
  showOtpModal = false;
  showResetPasswordModal = false;

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
