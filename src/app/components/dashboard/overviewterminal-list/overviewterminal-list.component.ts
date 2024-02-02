import { Component, OnInit, Input } from '@angular/core';
import { ITerminal } from 'src/app/models/ITerminal';
import { TerminalService } from 'src/app/services/terminal.service';
import { ITerminalData, ITerminalReport } from 'src/app/types/Type';


@Component({
  selector: 'app-overviewterminal-list',
  templateUrl: './overviewterminal-list.component.html',
  styleUrls: ['./overviewterminal-list.component.scss']
})



export class OverviewterminalListComponent implements OnInit {

  constructor(private terminalService: TerminalService){

  }

  topTerminalData: ITerminalData[] = [];

  dataTerminal : ITerminalReport [] = [];

  data: any[] = []

  ngOnInit(): void {
  this.getTopTerminals();
  this.getCustomerTerminals();
  }

  getTopTerminals(){
    this.terminalService.getTopTerminals().subscribe({
      next:(res: any)=>{
          this.topTerminalData = res?.data?.content;
      },
      error:(items:any)=>{

      }
    })
  }

  getCustomerTerminals(){
    this.terminalService.customerTerminals().subscribe({
      next:(res: any)=>{
          this.dataTerminal = res.data.content;
      },
      error:(items:any)=>{

      }
    })
  }

  

}
