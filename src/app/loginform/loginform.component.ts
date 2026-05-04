import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
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
        next: () => {
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
