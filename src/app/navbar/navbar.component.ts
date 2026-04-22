import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userService = inject(UserServiceService);
  private subscription: Subscription = new Subscription();
  isLoggedInFlag = false;

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
  }
}
