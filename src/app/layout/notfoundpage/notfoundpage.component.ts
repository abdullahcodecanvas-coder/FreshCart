
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfoundpage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notfoundpage.component.html',
  styleUrl: './notfoundpage.component.css',
})
export class NotfoundpageComponent {

  private router = inject(Router);
  private location = inject(Location);

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
