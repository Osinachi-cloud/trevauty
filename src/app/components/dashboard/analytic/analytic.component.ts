import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TerminalService } from 'src/app/services/terminal.service';
@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent {

  apiResponse: any;
  data: any[] = [];
  page: number = 0;
  size: number = 10;
  analyticsOverview: any;
  filterParams: any = {

  }

  constructor(private terminalService: TerminalService) { }

  ngOnInit(): void {
    this.getTerminals();
    this.getAnalyticsOverview();
  }

  getTerminals(): void {
    console.log(this.page, this.size);
    this.terminalService.getTransactions(this.page, this.size).subscribe({
      next: (response: any) => {
        this.apiResponse = response;
        this.data = this.apiResponse?.content;
        console.log(this.data);
      },
      error: (items: any) => {

      }
    })
  }

  getAnalyticsOverview(): void {
    this.terminalService.getAnalyticsOverview().subscribe({
      next: (response: any) => {
        this.analyticsOverview = response;
        console.log(this.analyticsOverview);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  pageIncrement() {
    console.log("hello 1");
    if (this.page < this.apiResponse?.totalPages) {
      this.page + 1;
      this.getTerminals();
    }
  }
  pageDecrement() {
    console.log("hello 2");
    if (this.page > 1) {
      this.page - 1;
      this.getTerminals();
    }
  }

}
