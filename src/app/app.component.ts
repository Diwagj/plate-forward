import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'plate-forward';
  noticeMessage = '';
  private subscription: Subscription | undefined;
  private notification = inject(NotificationService);
  private router = inject(Router);

  ngOnInit() {
    this.subscription = this.notification.message$.subscribe(msg => {
      this.noticeMessage = msg;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  goToLogin(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigate(['/login']);
    this.notification.clear();
  }
}
