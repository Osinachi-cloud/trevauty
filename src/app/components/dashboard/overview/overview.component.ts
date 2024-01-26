import { Component } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent{

  overviewReport: any;
  deposits:any = [];
  withdrawal:any;
  constructor( private dashboardService: DashboardService){
    
  }

  ngOnInit(): void {
    this.getOverviewReport();
    this.getDeposit();
  }

  getOverviewReport(): void {
        this.dashboardService.getOverviewReport().subscribe({
          next: (response) => {
            console.log("response =>>>>", response);
            this.overviewReport = response.data;
            console.log(this.overviewReport);
          },
          error: (error) => {
            console.log("sign up failed", error);
          }
        });
    }

    getDeposit(): void {
      this.dashboardService.getDeposit().subscribe({
        next: (response) => {
          console.log("response =>>>> array", response);
          this.deposits = response?.data?.content;
          console.log(this.deposits);
        },
        error: (error) => {
          console.log("sign up failed", error);
        }
      });
  }

  getWithdrawal(): void {
    this.dashboardService.getWithdrawal().subscribe({
      next: (response) => {
        console.log("response =>>>>", response);
        this.withdrawal = response.content;
        console.log(this.deposits);
      },
      error: (error) => {
        console.log("sign up failed", error);
      }
    });
}

}
