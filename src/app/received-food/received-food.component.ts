import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FoodDonoServiceService } from '../food-dono-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-received-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './received-food.component.html',
  styleUrls: ['./received-food.component.css']
})
export class ReceivedFoodComponent implements OnInit {
  private foodService = inject(FoodDonoServiceService);
  private userService = inject(UserServiceService);
  private router = inject(Router);
  donations = this.foodService.foodDonoList;
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.foodService.fetchFoodDonos();
  }

  getDonation(donation: any) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    this.foodService.updateFoodDono(donation._id, { requester: currentUser.id }).subscribe(() => {
      alert(`You have requested the donation: ${donation.title || donation.food}`);
      this.foodService.fetchFoodDonos(); // refresh the list
    });
  }
}
