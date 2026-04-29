import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-food-donation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-donation.component.html',
  styleUrls: ['./food-donation.component.css']
})
export class FoodDonationComponent implements OnInit {
  private userService = inject(UserServiceService);
  private router = inject(Router);
  isLoggedIn = false;
  donatedFood = '';
  address = '';
  submitted = false;

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  submitDonation(food: string, address: string) {
    this.donatedFood = food?.trim() ?? '';
    this.address = address?.trim() ?? '';

    if (this.donatedFood && this.address) {
      this.submitted = true;
      console.log('Donation submitted', { food: this.donatedFood, address: this.address });
      
    } else {
      this.submitted = false;
      alert('Please enter both the food you are donating and the address.');
    }
  }

  
}
