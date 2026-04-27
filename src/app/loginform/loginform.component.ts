import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserServiceService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.error('Login failed', error.error?.error || 'Invalid credentials');
          alert(error.error?.error || 'Login failed');
        }
      });
    } else {
      alert('Please fill valid email and password');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/user-creation']);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
