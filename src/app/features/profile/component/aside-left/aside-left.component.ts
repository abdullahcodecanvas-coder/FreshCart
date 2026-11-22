import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-aside-left',
  styleUrl: './aside-left.component.css',
  templateUrl: './aside-left.component.html',
})
export class AsideLeftComponent {}
