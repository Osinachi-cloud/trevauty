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
    ){
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

  validateForm(){
    for(let i in this.userProfileDetails.controls)
  this.userProfileDetails.controls[i].markAsTouched();
  }

  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:this.apiResponse.displayMessage ,duration:5000});
  }

  onSubmit(user: any): void {
      if (this.userProfileDetails.valid) {
        console.log({ user });
        this.authService.profileSetting(this.userProfileDetails.value).subscribe({
          next: (response) => {
            console.log("response =>>>>", response);
            this.apiResponse = response;
            console.log(this.apiResponse);
            this.resetFormInputs();
            this.showSuccess()
            
          },
          error: (error) => {
            console.log("sign up failed", error);
            this.resetFormInputs();
            // this.router.navigate([]);
          }
        });
      } else {
        console.log(user);
        this.validateForm();
      }
    }

}
