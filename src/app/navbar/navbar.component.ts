import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userService = inject(UserServiceService);
  private router = inject(Router);
  private subscription: Subscription = new Subscription();
  isLoggedInFlag = false;
  isDropdownOpen = false;
  private notification = inject(NotificationService);

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
    this.router.navigate(['/profile']);
  }

  goToDonation(event: Event) {
    event.preventDefault();
    this.router.navigate(['/food-donation']);
  }
}
