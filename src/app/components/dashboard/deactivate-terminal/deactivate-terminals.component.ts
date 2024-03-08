import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
  selector: 'app-deactivate-terminals',
  templateUrl: './deactivate-terminals.component.html',
  styleUrls: ['./deactivate-terminals.component.scss']
})
export class DeactivateTerminalsComponent {

  constructor(private terminalService: TerminalService,
    private toast: NgToastService
    
    ){
  }

  data: any[] = []

  ngOnInit(): void {
  this.getActionTerminals();
  }

  getActionTerminals(){
    this.terminalService.getActionTerminals().subscribe({
      next:(items: any)=>{
          this.data = items.data.content;
      },
      error:(items:any)=>{

      }
    })
  }


  showSuccessResponse(message: string, header: string, duration: number) {
    this.toast.success({ detail: message, summary: header, duration: duration });
  }
  showErrorResponse(message: string, header: string, duration: number) {
    this.toast.error({ detail: message, summary: header, duration: duration });
  }

  toggleTerminalActiveState(terminalId: string): void {
    console.log("hello world clicked activation method");
    this.terminalService.toggleTerminalActiveState(terminalId).subscribe({
      next: (response: any) => {
        this.showSuccessResponse(response.message, "Activate Terminal", 3000);
      },
      error: (response: any) => {
        this.showErrorResponse(response.message, "Activate Terminal", 3000);

      }
    })
  }
  
}
