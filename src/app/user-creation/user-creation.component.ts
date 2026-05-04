import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserServiceService);
  private router = inject(Router);

  // Form group for the create-account page.
  // Controls validation rules and submit state.
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /**
   * Handle user sign-up.
   * On success we redirect to home.
   */
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value).subscribe({
        next: () => {
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
