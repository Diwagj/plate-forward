import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { FoodDonoServiceService } from '../food-dono-service.service';

@Component({
  selector: 'app-food-donation',
  standalone: true,
  templateUrl: './food-donation.component.html',
  styleUrls: ['./food-donation.component.css']
})
export class FoodDonationComponent implements OnInit {
  private userService = inject(UserServiceService);
  private foodDonoService = inject(FoodDonoServiceService);
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
      const donationData = {
        title: this.donatedFood,
        description: `Donation of ${this.donatedFood}`,
        location: this.address,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now
      };
      this.foodDonoService.saveFoodDono(donationData).subscribe({
        next: () => {
          this.submitted = true;
        },
        error: (err) => {
          console.error('Error saving donation', err);
          alert('Failed to save donation. Please try again.');
        }
      });
    } else {
      this.submitted = false;
      alert('Please enter both the food you are donating and the address.');
    }
  }
}
