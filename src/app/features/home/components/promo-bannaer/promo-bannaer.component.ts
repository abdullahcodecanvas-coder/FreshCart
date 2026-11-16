import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-promo-bannaer',
  styleUrl: './promo-bannaer.component.css',
  templateUrl: './promo-bannaer.component.html',
})
export class PromoBannaerComponent {
   @ViewChild('wrapper') wrapper!: ElementRef<HTMLElement>;

  visible = signal(false);
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          this.observer?.disconnect(); // يشتغل مرة واحدة بس
        }
      },
      { threshold: 0.25 }
    );
    this.observer.observe(this.wrapper.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
