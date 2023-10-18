import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { TerminalService } from 'src/app/services/terminal.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-newterminalrequest',
  templateUrl: './newterminalrequest.component.html',
  styleUrls: ['./newterminalrequest.component.scss']
})
export class NewterminalrequestComponent {

  bodyText: string = "";
  showModal = false;
  terminalRequestForm: FormGroup;
  apiResponse: any;


  constructor(
    private modalService: ModalService, 
    private router:Router,
    private terminalService: TerminalService,
    private toast: NgToastService

    ) {
    this.terminalRequestForm = new FormGroup({
      operatorsFirstName: new FormControl(  '',  [Validators.required]),
      operatorsLastName: new FormControl(  '',  [Validators.required]),
      locationOfTerminal : new FormControl('',   [Validators.required]),
      nameOfTerminal: new FormControl('', [Validators.required]),
      operatorsPhoneNumber: new FormControl('', [Validators.required]),
      noteToTreVauty: new FormControl('', [Validators.required]),
    })
   }

   get formData() { return this.terminalRequestForm.controls; };

   validateForm() { 

    for(let i in this.terminalRequestForm.controls)
      this.terminalRequestForm.controls[i].markAsTouched();
    }

    resetFormInputs() {
      this.terminalRequestForm.setValue({
        operatorsFirstName: '',
        operatorsLastName: '',
        locationOfTerminal: '',
        nameOfTerminal: '',
        operatorsPhoneNumber: '',
        noteToTreVauty: '',
      });
    }

    showSuccess() {
      this.toast.success({detail:"SUCCESS",summary:this.apiResponse.displayMessage ,duration:5000});
    }

    onSubmit(user: any): void {
        if (this.terminalRequestForm.valid) {
          console.log({ user });
          this.terminalService.terminalRequest(this.terminalRequestForm.value).subscribe({
            next: (response: any) => {
              console.log("response =>>>>", response);
              this.apiResponse = response;
              console.log(this.apiResponse);
              this.resetFormInputs();
              this.showSuccess()
              this.toggleModal();
              
              // this.router.navigate(['login']);
            },
            error: (error: any) => {
              console.log("sign up failed", error);
              this.router.navigate([]);
            }
          });
        } else {
          console.log(user);
          this.validateForm();
        }
      }

  ngOnInit() {
      this.bodyText = 'This text can be updated in modal 1';
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


}
