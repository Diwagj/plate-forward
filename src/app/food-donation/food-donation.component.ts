import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-donation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-donation.component.html',
  styleUrls: ['./food-donation.component.css']
})
export class FoodDonationComponent {
  donatedFood = '';
  address = '';
  submitted = false;

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
