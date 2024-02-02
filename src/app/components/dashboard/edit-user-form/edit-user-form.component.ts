import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent {

  userProfileDetails: FormGroup;
  apiResponse: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService
  ) {
    this.userProfileDetails = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      about: new FormControl('', [Validators.required]),

    })
  }
  get formData() { return this.userProfileDetails.controls; };


  // resetFormInputs(){
  //   this.userProfileDetails.setValue({
  //     firstName:"",
  //     lastName:"",
  //     email:"",
  //     about:""
  //   })
  // }

  resetFormInputs() {
    this.userProfileDetails.reset();
    Object.keys(this.userProfileDetails.controls).forEach(key => {
      this.userProfileDetails.get(key)?.setErrors(null);
    });
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showErrorResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  validateForm() {
    for (let i in this.userProfileDetails.controls)
      this.userProfileDetails.controls[i].markAsTouched();
  }

  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: this.apiResponse.displayMessage, duration: 5000 });
  }

  onSubmit(user: any): void {
    if (this.userProfileDetails.valid) {
      console.log({ user });
      this.authService.profileSetting(this.userProfileDetails.value).subscribe({
        next: (response) => {
          console.log("response =>>>>", response);
          this.apiResponse = response;
          console.log(this.apiResponse);

          if (response.status) {
            this.showSuccessResponse("Reset Password", response.data, 5000);
            this.resetFormInputs();
          } else {
            this.showErrorResponse("Reset Password", response.debugMessage || "failed Request", 5000);
          }
        },
        error: (error) => {
          console.log("sign up failed", error);
          this.showErrorResponse("Reset Password", error.debugMessage || "failed Request", 5000);
        }
      });
    } else {
      console.log(user);
      this.validateForm();
    }
  }

}
