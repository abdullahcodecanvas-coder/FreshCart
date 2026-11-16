import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-section-title',
  styleUrl: './section-title.component.css',
  templateUrl: './section-title.component.html',
})
export class SectionTitleComponent {
    @Input() title: string = '';   
  @Input() highlight: string = ''; 
}
