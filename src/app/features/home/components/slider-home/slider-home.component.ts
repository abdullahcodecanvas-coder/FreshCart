import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-slider-home',
  styleUrl: './slider-home.component.css',
  templateUrl: './slider-home.component.html',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderHomeComponent {
  
}
