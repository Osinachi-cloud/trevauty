import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SinginComponent } from './components/auth/singin/singin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { AnalyticComponent } from './components/dashboard/analytic/analytic.component';
import { PasswordresetComponent } from './components/auth/passwordreset/passwordreset.component';
import { ManageTerminalComponent } from './components/dashboard/manage-terminal/manage-terminal.component';
import { ManageTerminalHomeComponent } from './components/dashboard/manage-terminal-home/manage-terminal-home.component';
import { OverviewterminalListComponent } from './components/dashboard/overviewterminal-list/overviewterminal-list.component';
import { NewterminalrequestComponent } from './components/dashboard/newterminalrequest/newterminalrequest.component';
import { DeactivateTerminalsComponent } from './components/dashboard/deactivate-terminal/deactivate-terminals.component';
import { RefundTransactionHomeComponent } from './components/dashboard/refund-transaction-home/refund-transaction-home.component';
import { RefundTransactionComponent } from './components/dashboard/refund-transaction/refund-transaction.component';
import { OverviewRefundTransactionsComponent } from './components/dashboard/overview-refund-transactions/overview-refund-transactions.component';
import { NewRefundFormComponent } from './components/dashboard/new-refund-form/new-refund-form.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ProfileHomeComponent } from './components/dashboard/profile-home/profile-home.component';
import { UserProfileComponent } from './components/dashboard/user-profile/user-profile.component';
import { EditUserFormComponent } from './components/dashboard/edit-user-form/edit-user-form.component';
import { ProfileAuthComponent } from './components/dashboard/profile-auth/profile-auth.component';
import { ProfileHelpComponent } from './components/dashboard/profile-help/profile-help.component';
import { authGuard } from './pageGuard/auth.guard';


const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate:[authGuard] },
  { path: 'login', component: SinginComponent },
  { path: 'password-reset', component: PasswordresetComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'analytic', component: AnalyticComponent },
    { path: 'manage-terminal', component: ManageTerminalComponent, children:[
      { path: '', component: ManageTerminalHomeComponent, children:[
        { path:"", redirectTo: 'list', pathMatch: 'full'},
        { path:"list", component: OverviewterminalListComponent },
        { path:"request", component: NewterminalrequestComponent },
        { path:"deactivate", component: DeactivateTerminalsComponent }
      ]},
    ] },
    { path:'refund-transaction', component: RefundTransactionComponent, children:[
      { path: '', component: RefundTransactionHomeComponent, children:[
        { path:"", redirectTo: 'list', pathMatch: 'full'},
        { path:"list", component: OverviewRefundTransactionsComponent },
        { path:"refund", component: NewRefundFormComponent },
      ]}
    ]},
    { path:'profile', component: ProfileComponent, children:[
      { path: '', component: ProfileHomeComponent, children:[
        { path:"", redirectTo: 'user', pathMatch: 'full'},
        { path:"user", component: UserProfileComponent },
        { path:"edit-user", component: EditUserFormComponent },
        { path:"auth", component: ProfileAuthComponent },
        { path:"help", component:ProfileHelpComponent },
      ]}
    ]}
  ], canActivate:[authGuard]},
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
