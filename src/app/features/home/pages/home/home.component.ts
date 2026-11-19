import { Component } from '@angular/core';
import { SliderHomeComponent } from '../../components/slider-home/slider-home.component';
import { ProductHomeComponent } from '../../components/product-home/product-home.component';
import { CategreyHomeComponent } from '../../components/categrey-home/categrey-home.component';
import { SubCategryComponent } from '../../../sub_categries/sub-categry/sub-categry.component';
import { PromoMarqueeComponent } from '../../../promo/promo-marquee/promo-marquee.component';

@Component({
  imports: [SliderHomeComponent, ProductHomeComponent, CategreyHomeComponent , PromoMarqueeComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
