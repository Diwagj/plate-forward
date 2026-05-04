import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userService = inject(UserServiceService);
  private router = inject(Router);
  private subscription: Subscription = new Subscription();
  isLoggedInFlag = false;
  isDropdownOpen = false;

  ngOnInit() {
    this.subscription = this.userService.currentUser$.subscribe(user => {
      this.isLoggedInFlag = !!user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isLoggedIn() {
    return this.isLoggedInFlag;
  }

  logout() {
    this.userService.logout();
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.isDropdownOpen = false;
  }

  goToDonation(event: Event) {
    event.preventDefault();
    this.router.navigate(['/food-donation']);
  }
}
