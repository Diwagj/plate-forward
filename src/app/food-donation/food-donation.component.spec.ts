import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDonationComponent } from './food-donation.component';

describe('FoodDonationComponent', () => {
  let component: FoodDonationComponent;
  let fixture: ComponentFixture<FoodDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
