import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { register } from 'swiper/element/bundle';
import { RegisterService } from './features/auth/services/register.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterOutlet, NgxSpinnerComponent, NavbarComponent, FooterComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('freshcart');
  private readonly registerService = inject(RegisterService)
  private readonly PLATFORM_ID = inject(PLATFORM_ID)
 ngOnInit(): void {
  register();
  if (isPlatformBrowser(this.PLATFORM_ID)) {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      this.registerService.isLogged.set(true);
    }
  }
}
  
}