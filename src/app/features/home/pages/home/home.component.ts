import { Component } from '@angular/core';
import { SliderHomeComponent } from '../../components/slider-home/slider-home.component';
import { ProductHomeComponent } from '../../components/product-home/product-home.component';
import { CategreyHomeComponent } from '../../components/categrey-home/categrey-home.component';

@Component({
  imports: [SliderHomeComponent,ProductHomeComponent,CategreyHomeComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
