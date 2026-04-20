import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-creation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserServiceService);
  private router = inject(Router);

  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user', Validators.required]
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value).subscribe({
        next: (response: any) => {
          console.log('User created successfully', response);
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.error('Error creating user', error);
        }
      });
    }
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }
}
