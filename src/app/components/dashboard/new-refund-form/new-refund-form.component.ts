import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ModalService } from 'src/app/services/modal.service';
import { TerminalService } from 'src/app/services/terminal.service';


@Component({
  selector: 'app-new-refund-form',
  templateUrl: './new-refund-form.component.html',
  styleUrls: ['./new-refund-form.component.scss']
})
export class NewRefundFormComponent {

  bodyText: string = "";
  showModal = false;
  terminalRequestForm: FormGroup;
  apiResponse: any;
  selectedFile: any | null = null;
  imagePreview: any = "";

  providerList : any[] = [];

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.getProviders();
  }


  constructor(
    private modalService: ModalService,
    private router: Router,
    private terminalService: TerminalService,
    private toast: NgToastService

  ) {
    this.terminalRequestForm = new FormGroup({
      customersFirstName: new FormControl('', [Validators.required]),
      customersLastName: new FormControl('', [Validators.required]),
      locationOfTerminal: new FormControl('', [Validators.required]),
      nameOfTerminal: new FormControl('', [Validators.required]),
      customersPhoneNumber: new FormControl('', [Validators.required]),
      noteToTreVauty: new FormControl('', [Validators.required]),
      operatorsName: new FormControl('', [Validators.required]),
      disputedAMount: new FormControl('', [Validators.required]),
      dateAndTimeOfTransaction: new FormControl('', [Validators.required]),
      evidence: new FormControl(['', [Validators.required]])
      // note: new FormControl('', [Validators.required])
    })
  }



  get formData() { return this.terminalRequestForm.controls; };

  validateForm() {

    for (let i in this.terminalRequestForm.controls)
      this.terminalRequestForm.controls[i].markAsTouched();
  }

  resetFormInputs() {
    this.terminalRequestForm.reset(); // Reset the entire form
    Object.keys(this.terminalRequestForm.controls).forEach(key => {
      this.terminalRequestForm.get(key)?.setErrors(null); // Clear any validation errors
    });
  }

  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showErrorResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    const file: File | null = inputElement.files ? inputElement.files[0] : null;

    if (file) {
      const proofOfTransactionControl = this.terminalRequestForm.get('evidence');
      if (proofOfTransactionControl) {
        proofOfTransactionControl.patchValue(file);
        proofOfTransactionControl.updateValueAndValidity();
      }
    }
  }




  // onSubmit(user: any): void {
  //   if (this.terminalRequestForm) {

  //     console.log({ user });
  //     this.terminalService.terminalRefundRequest(this.terminalRequestForm.value).subscribe({
  //       next: (response: any) => {
  //         console.log("response =>>>>", response);
  //         if (response.status) {
  //           this.apiResponse = response;
  //           console.log(this.apiResponse);
  //           this.resetFormInputs();
  //           this.showSuccessResponse("Submit Terminal Request", response.debugMessage, 6000);
  //           this.toggleModal();
  //         } else {
  //           this.showErrorResponse("Submit Terminal Request", response.debugMessage, 6000);

  //         }

  //         // this.router.navigate(['login']);
  //       },
  //       error: (error: any) => {
  //         console.log("sign up failed", error);
  //         this.showErrorResponse(error.detail, error.title, 3000);
  //         this.router.navigate([]);
  //       }
  //     });
  //   } else {
  //     console.log(user);
  //     this.validateForm();
  //   }
  // }


  onSubmit(user: any): void {
    if (this.terminalRequestForm.valid) {
      const formData = new FormData();
  
      // Append each form control value to the FormData object
      Object.keys(this.terminalRequestForm.value).forEach(key => {
        formData.append(key, this.terminalRequestForm.value[key]);
      });
  
      // Append file to the FormData object
      const proofOfTransactionControl = this.terminalRequestForm.get('evidence');
      if (proofOfTransactionControl && proofOfTransactionControl.value) {
        formData.append('evidence', proofOfTransactionControl.value);
      }
  
      // Send the FormData object
      this.terminalService.terminalRefundRequest(formData).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.apiResponse = response;
            this.resetFormInputs();
            this.showSuccessResponse("Submit Terminal Request", response.debugMessage, 6000);
            this.toggleModal();
          } else {
            this.showErrorResponse("Submit Terminal Request", response.debugMessage, 6000);
          }
        },
        error: (error: any) => {
          console.log("Sign up failed", error);
          this.showErrorResponse(error.detail, error.title, 3000);
          this.router.navigate([]);
        }
      });
    } else {
      this.validateForm();
    }
  }



  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  getProviders(){
    this.terminalService.getProviders().subscribe({
      next: (response: any) => {
        console.log(response);
        this.providerList = response;
      },
      error: (items: any) => {
        console.log(items)

      }
    })
  }

}
