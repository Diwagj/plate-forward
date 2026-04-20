import { TestBed } from '@angular/core/testing';

import { FoodDonoServiceService } from './food-dono-service.service';

describe('FoodDonoServiceService', () => {
  let service: FoodDonoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodDonoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
