import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'Overview',
            link: '/dashboard/profile/user',
            index: 0
        }, 
        // {
        //     label: 'Account Settings',
        //     link: '/dashboard/profile/edit-user',
        //     index: 1
        // },
        {
          label: 'Login & Security',
          link: '/dashboard/profile/auth',
          index: 2
      }, 
      {
          label: 'Help',
          link: '/dashboard/profile/help',
          index: 3
      }
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}




// *785#
// 4
// 2
