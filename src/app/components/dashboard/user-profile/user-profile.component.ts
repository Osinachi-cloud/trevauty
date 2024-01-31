import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  userDetails = UtilService.getUserDetails() || "";

}
