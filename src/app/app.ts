import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { register } from 'swiper/element/bundle';

@Component({
  imports: [RouterOutlet, NgxSpinnerComponent, NavbarComponent, FooterComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('freshcart');
  ngOnInit():void{
    register();
  }
}