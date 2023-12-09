import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SinginComponent } from './components/auth/singin/singin.component';

import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/dashboard/sidenav/sublevel-menu.component';
import { PasswordresetComponent } from './components/auth/passwordreset/passwordreset.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { AnalyticComponent } from './components/dashboard/analytic/analytic.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/dashboard/body/body.component';
// import { ManageTerminalComponent } from './components/dashboard/manage-terminal/manage-terminal.component';
import { TerminalComponent } from './components/dashboard/terminal/terminal.component';
import { MaterialModule } from './components/dashboard/manage-terminal/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageTerminalModule } from './components/dashboard/manage-terminal/manage-terminal.module';
import { ManageTerminalHomeComponent } from './components/dashboard/manage-terminal-home/manage-terminal-home.component';
import { OverviewterminalListComponent } from './components/dashboard/overviewterminal-list/overviewterminal-list.component';
import { NewterminalrequestRoutingModule } from './components/dashboard/newterminalrequest/newterminalrequest-routing.module';
// import { DeactivateTerminalModule } from './components/dashboard/deactivate-terminal/deactivate-terminal.module';
import { DeactivateTerminalRouteModule } from './components/dashboard/deactivate-terminal/deactivate-terminal-route.module';
import { ManageTerminalRouteModule } from './components/dashboard/manage-terminal/manage-terminal-route.module';
import { DeactivateTerminalsComponent } from './components/dashboard/deactivate-terminal/deactivate-terminals.component';
import { DeactivateTerminalModule } from './components/dashboard/deactivate-terminal/deactivate-terminal.module';
// import { ModalComponent } from './components/modal/modal.component';
// import { ModalModule } from './components/modal/modal.module';
import { NewterminalrequestComponent } from './components/dashboard/newterminalrequest/newterminalrequest.component';
import { ModalComponent } from './components/modal/modal.component';
// import { RefundTransactionComponent } from './components/dashboard/refund-transaction/refund-transaction.component';
import { RefundTransactionHomeComponent } from './components/dashboard/refund-transaction-home/refund-transaction-home.component';
import { OverviewRefundTransactionsComponent } from './components/dashboard/overview-refund-transactions/overview-refund-transactions.component';
import { RefundTransactionModule } from './components/dashboard/refund-transaction/refund-transaction.module';
import { NewRefundFormComponent } from './components/dashboard/new-refund-form/new-refund-form.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ProfileHomeComponent } from './components/dashboard/profile-home/profile-home.component';
import { UserProfileComponent } from './components/dashboard/user-profile/user-profile.component';
import { EditUserFormComponent } from './components/dashboard/edit-user-form/edit-user-form.component';
import { ProfileAuthComponent } from './components/dashboard/profile-auth/profile-auth.component';
import { ProfileHelpComponent } from './components/dashboard/profile-help/profile-help.component';
import { FormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';
// import { RefundTransactionModule } from './components/dashboard/refund-transaction/refund-transaction.module';
// import { ManageTerminalRoutingModule } from './components/dashboard/manage-terminal-home/manage-terminal-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SinginComponent,
    SidenavComponent,
    SublevelMenuComponent,
    PasswordresetComponent,
    OverviewComponent,
    AnalyticComponent,
    DashboardComponent,
    BodyComponent,
    TerminalComponent,
    ManageTerminalHomeComponent,
    OverviewterminalListComponent,
    DeactivateTerminalsComponent,
    ModalComponent,
    NewterminalrequestComponent,
    
    // RefundTransactionComponent,
    RefundTransactionHomeComponent,
    OverviewRefundTransactionsComponent,
    NewRefundFormComponent,
    ProfileComponent,
    ProfileHomeComponent,
    UserProfileComponent,
    EditUserFormComponent,
    ProfileAuthComponent,
    ProfileHelpComponent,
    // RefundTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ManageTerminalModule,
    NewterminalrequestRoutingModule,
    DeactivateTerminalModule,
    DeactivateTerminalRouteModule,
    ManageTerminalRouteModule,
    RefundTransactionModule,
    FormsModule,
    NgxOtpInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule 


    // ManageTerminalRoutingModule,

  ],
  providers: [
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
