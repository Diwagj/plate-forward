import { Component, inject, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userService = inject(UserServiceService);
  private router = inject(Router);
  private elementRef = inject(ElementRef<HTMLElement>);
  private subscription: Subscription = new Subscription();
  isLoggedInFlag = false;
  isDropdownOpen = false;

  ngOnInit() {
    this.subscription = this.userService.currentUser$.subscribe(user => {
      this.isLoggedInFlag = !!user;
      if (!user) {
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.isDropdownOpen) {
      return;
    }

    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  isLoggedIn() {
    return this.isLoggedInFlag;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.closeDropdown();
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
